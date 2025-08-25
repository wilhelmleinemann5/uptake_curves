import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cache configuration
const CACHE_DIR = join(__dirname, '../../../cache/ux-docs');

export async function fetchUxBestPractices(docsType, docsName, repo = 'mds-docs') {
  try {
    let result = {};
    const path = join(CACHE_DIR, `${docsType}-${docsName}.json`);
    if (existsSync(path)) {
      const docs = JSON.parse(readFileSync(path, 'utf-8'));
      const data = docs.data;
      if (data) {
        console.log(`Using cached data for ${docsType}-${docsName}`);
        result = parseGuidelinesFromContent(data);
        return result;
      } else {
        console.warn(`No data found in cache for ${docsType}-${docsName}`);
        return result;
      }
    }
  } catch (error) {
    console.error(`Failed to fetch component UX best practices for ${docsType}-${docsName}: ${error}`);
    return {};
  }
}

/**
 * Parse guidelines from MDX content
 */
export function parseGuidelinesFromContent(content) {
  const guidelines = {
    categories: [],
    title: '',
    description: '',
    rules: [],
  };

  try {
    // Extract front matter (tags, title, description)
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];

      // Extract tags
      const tagsMatch = frontMatter.match(/tags:\s*\n((?:\s*-\s*.+\n?)*)/);
      if (tagsMatch) {
        const tagsList = tagsMatch[1];
        guidelines.categories = tagsList
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('-'))
          .map((line) => line.substring(1).trim())
          .filter((tag) => tag.length > 0);
      }

      // Extract title
      const titleMatch = frontMatter.match(/title:\s*(.+)/);
      if (titleMatch) {
        guidelines.title = titleMatch[1].trim();
      }

      // Extract description
      const descriptionMatch = frontMatter.match(/description:\s*>?-?\s*\n?([\s\S]*?)(?=\n\w+:|$)/);
      if (descriptionMatch) {
        guidelines.description = descriptionMatch[1].replace(/\n\s+/g, ' ').trim();
      }
    }

    // Extract content sections for general guidelines
    const generalContent = {};

    // Remove front matter from content before processing sections
    const contentWithoutFrontMatter = content.replace(/^---\n[\s\S]*?\n---\n\n?/, '');

    // Find all H2 sections (##) and extract their content
    const sectionRegex = /## ([^#\n]+)\n([\s\S]*?)(?=\n##|\Z)/g;
    let match;

    while ((match = sectionRegex.exec(contentWithoutFrontMatter)) !== null) {
      const sectionTitle = match[1]
        .trim()
        .replace(/\//g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/\&/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
      const sectionContent = match[2].trim();

      if (sectionContent) {
        // Extract list items from this section
        const items = extractListItems(sectionContent);

        // If no list items found, include the raw content (might be paragraphs)
        if (items.length === 0) {
          // Split by paragraphs and filter out empty ones
          const paragraphs = sectionContent
            .split('\n\n')
            .map((p) => p.trim())
            .filter((p) => p.length > 0 && !p.startsWith('import ') && !p.startsWith('<'));

          if (paragraphs.length > 0) {
            generalContent[sectionTitle] = paragraphs;
          }
        } else {
          generalContent[sectionTitle] = items;
        }
      }
    }

    // If no sections found, try to extract any list items from the content without front matter
    if (Object.keys(generalContent).length === 0) {
      const allItems = extractListItems(contentWithoutFrontMatter);
      if (allItems.length > 0) {
        generalContent['general'] = allItems;
      }
    }

    // Set the general content
    guidelines.rules = generalContent;
  } catch (error) {
    console.warn(`Failed to parse guidelines: ${error}`);
  }

  return guidelines;
}

/**
 * Extract list items from markdown content
 */
export function extractListItems(content) {
  const items = [];

  // Match both bullet points and numbered lists, including nested items
  const listItemRegex = /^[\s]*[-*+]\s+(.+)$/gm;
  const numberedListRegex = /^[\s]*\d+\.\s+(.+)$/gm;

  let match;

  // Extract bullet points
  while ((match = listItemRegex.exec(content)) !== null) {
    const item = match[1].trim();
    if (item && !item.startsWith('#') && !item.startsWith('import ') && !item.startsWith('<')) {
      // Clean up markdown formatting
      const cleanItem = item
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
        .replace(/`(.*?)`/g, '$1') // Remove code backticks
        .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Remove links, keep text

      items.push(cleanItem);
    }
  }

  // Extract numbered list items
  while ((match = numberedListRegex.exec(content)) !== null) {
    const item = match[1].trim();
    if (item && !item.startsWith('#') && !item.startsWith('import ') && !item.startsWith('<')) {
      // Clean up markdown formatting
      const cleanItem = item
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
        .replace(/`(.*?)`/g, '$1') // Remove code backticks
        .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Remove links, keep text

      items.push(cleanItem);
    }
  }

  return items;
}

/**
 * Enhance guidelines with general design principles and related guidelines
 */
export async function enhanceGuidelines(guidelineConfig) {
  // Process each mapped guideline
  let enhanced = {
    designPrinciples: [],
    relatedGuidelines: [],
  };
  for (const entry of guidelineConfig) {
    try {
      const data = await fetchUxBestPractices(entry.docType, entry.docName);
      if (data) {
        const enhancedData = {
          relevance: entry.relevance || 'medium',
          applicableSections: entry.applicableSections || [],
          ...data,
        };
        if (entry.docCategory === 'designPrinciples') {
          enhanced.designPrinciples.push(enhancedData);
        } else if (entry.docCategory === 'relatedGuidelines') {
          enhanced.relatedGuidelines.push(enhancedData);
        } else {
          console.warn(`⚠️  Unknown docCategory ${entry.docCategory} for ${entry.docType} ${entry.docName}`);
          continue;
        }
        console.log(`✅ Added ${entry.docType} ${entry.docName} to ${entry.docCategory}`);
      } else {
        console.warn(`⚠️  Could not find cached data for ${entry.docType} ${entry.docName}`);
      }
    } catch (error) {
      console.warn(`⚠️  Error processing guideline ${guidelineConfig.docsName}: ${error.message}`);
    }
  }
  return enhanced;
}
