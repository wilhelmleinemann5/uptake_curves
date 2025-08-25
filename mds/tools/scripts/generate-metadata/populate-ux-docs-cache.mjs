#!/usr/bin/env node

/**
 * Script to populate the UX docs cache locally
 * This should be run before committing to ensure the cache has the latest data
 *
 * This script dynamically caches all index.mdx files from the folders specified
 * in the foldersToCache array. Currently caches:
 * 1. Component documentation files: src/pages/components/{component}/index.mdx
 * 2. Design language documentation: All index.mdx files under src/pages/design-language (recursive)
 * 3. Guidelines documentation: All index.mdx files under src/pages/guidelines (recursive)
 *
 * To add more folders, simply add them to the foldersToCache array.
 */

import { config } from 'dotenv';
import { existsSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';

config();

const PACKAGES_DIR = join(process.cwd(), 'packages');
const CACHE_DIR = join(process.cwd(), 'cache/ux-docs');

// GitHub API configuration
const token = process.env.GITHUB_TOKEN;
const owner = 'Maersk-Global';
const urls = {
  GITHUB_API_URL: 'https://api.github.com',
};

const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'mds-build',
};

// Constants for request configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 1;
const RETRY_DELAY = 1000; // 1 second

const foldersToCache = ['components', 'design-language', 'guidelines', 'layout', 'content'];

// Ensure cache directory exists and clear old cache
if (existsSync(CACHE_DIR)) {
  console.log('🗑️  Clearing old cache files...');
  rmSync(CACHE_DIR, { recursive: true, force: true });
}
mkdirSync(CACHE_DIR, { recursive: true });

// Helper function to add timeout to fetch
export async function fetchWithTimeout(url, options = {}) {
  const { timeout = REQUEST_TIMEOUT } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}

// Helper function to implement retry logic
export async function fetchWithRetry(url, options = {}) {
  let lastError = null;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (error instanceof Error && error.name === 'AbortError') {
        console.debug(`Request timeout, attempt ${i + 1} of ${MAX_RETRIES}`);
      } else {
        console.debug(`Request failed, attempt ${i + 1} of ${MAX_RETRIES}: ${lastError.message}`);
      }

      if (i < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (i + 1)));
      }
    }
  }

  throw lastError || new Error('Request failed after all retries');
}

// Helper function to save to cache
export function saveToCache(key, data) {
  try {
    const cacheFile = join(CACHE_DIR, `${key}.json`);
    const cacheData = {
      timestamp: Date.now(),
      data: data,
    };
    writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.warn(`Failed to save cache for ${key}: ${error.message}`);
  }
}

// Function to fetch file content from GitHub (always fresh, never cached)
export async function fetchFileContentFresh(path, repo) {
  const url = `${urls.GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetchWithRetry(url, {
      headers,
      timeout: REQUEST_TIMEOUT,
    });

    if (!response.ok) {
      return null;
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      return null;
    }

    if (!data || !data.content) {
      return null;
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    return null;
  }
}

// Function to recursively fetch directory structure from GitHub
export async function fetchDirectoryStructure(path, repo) {
  const url = `${urls.GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetchWithRetry(url, {
      headers,
      timeout: REQUEST_TIMEOUT,
    });

    if (!response.ok) {
      return [];
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.warn(`Failed to fetch directory structure for ${path}: ${error.message}`);
    return [];
  }
}

// Function to recursively find all index.mdx files in a directory tree
export async function findAllIndexMdxFiles(basePath, repo, currentPath = '') {
  const fullPath = currentPath ? `${basePath}/${currentPath}` : basePath;
  const files = [];

  try {
    const items = await fetchDirectoryStructure(fullPath, repo);

    for (const item of items) {
      if (item.type === 'file' && item.name === 'index.mdx') {
        const relativePath = currentPath ? `${currentPath}/${item.name}` : item.name;
        files.push({
          path: `${basePath}/${relativePath}`,
          name: item.name,
          relativePath: relativePath,
          fullPath: fullPath,
        });
      } else if (item.type === 'dir') {
        // Recursively search subdirectories
        const subPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        const subFiles = await findAllIndexMdxFiles(basePath, repo, subPath);
        files.push(...subFiles);
      }
    }
  } catch (error) {
    console.warn(`Failed to search directory ${fullPath}: ${error.message}`);
  }

  return files;
}

// Helper function to generate cache key based on folder and file path
export function generateCacheKey(folderName, relativePath) {
  // For other folders, use folder-path format
  const cleanPath = relativePath.replace(/\//g, '-').replace(/\-index\.mdx$/, '');
  return `${folderName}-${cleanPath}`;
}

// Helper function to process a single folder
export async function processFolderDocs(folderName) {
  const docsPath = `src/pages/${folderName}`;
  console.log(`📖 Caching ${folderName} documentation files...`);

  try {
    const indexFiles = await findAllIndexMdxFiles(docsPath, 'mds-docs');
    console.log(`  - Found ${indexFiles.length} index.mdx files in ${folderName}`);

    let cachedCount = 0;
    let failedCount = 0;

    for (const file of indexFiles) {
      console.log(`    - Caching ${file.path}...`);

      try {
        const content = await fetchFileContentFresh(file.path, 'mds-docs');

        if (content) {
          const cacheKey = generateCacheKey(folderName, file.relativePath);
          saveToCache(cacheKey, content);
          console.log(`      ✅ Cached as ${cacheKey}`);
          cachedCount++;
        } else {
          console.log(`      ⚠️  No content found for ${file.relativePath}`);
          failedCount++;
        }
      } catch (error) {
        console.warn(`      ❌ Failed to cache ${file.relativePath}: ${error.message}`);
        failedCount++;
      }
    }

    console.log(`  📊 ${folderName}: ${cachedCount} cached, ${failedCount} failed`);
  } catch (error) {
    console.error(`❌ Failed to cache ${folderName} docs: ${error.message}`);
  }
}

export async function populateCache() {
  console.log('🚀 Populating UX docs cache...');

  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is required to populate cache');
    process.exit(1);
  }

  try {
    console.log(`📁 Processing ${foldersToCache.length} documentation folders: ${foldersToCache.join(', ')}`);

    // Process each folder in the foldersToCache array
    for (const folderName of foldersToCache) {
      await processFolderDocs(folderName);
    }

    console.log('✅ Cache population completed successfully!');
    console.log('💡 You can now commit the cache files');
  } catch (error) {
    console.error('❌ Failed to populate cache:', error);
    process.exit(1);
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  populateCache();
}
