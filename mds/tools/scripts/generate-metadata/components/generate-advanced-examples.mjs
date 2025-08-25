import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Generate advanced examples for MDS components
 * Extracts examples from the stories/examples folder structure
 */
export async function generateAdvancedExamples(packageDir, componentTagName) {
  const examplesDir = join(packageDir, 'stories', 'examples');

  if (!existsSync(examplesDir)) {
    console.warn(`Examples directory not found at ${examplesDir}`);
    return {};
  }

  try {
    const advancedExamples = {};
    const exampleFolders = getExampleFolders(examplesDir);

    for (const folderPath of exampleFolders) {
      const exampleData = extractExampleFromFolder(folderPath);
      if (exampleData) {
        advancedExamples[exampleData.key] = exampleData.template;
      }
    }

    return advancedExamples;
  } catch (error) {
    console.warn(`Error extracting advanced examples for ${componentTagName}:`, error.message);
    return {};
  }
}

/**
 * Recursively get all example folders that contain both default.stories.ts and code-preview.ts
 */
export function getExampleFolders(examplesDir) {
  const folders = [];

  function scanDirectory(dir) {
    try {
      const items = readdirSync(dir);

      for (const item of items) {
        if (item.startsWith('.')) continue; // Skip hidden files like .DS_Store

        const itemPath = join(dir, item);
        const stats = statSync(itemPath);

        if (stats.isDirectory()) {
          // Check if this folder contains the required files
          const storiesFile = join(itemPath, 'default.stories.ts');
          const codePreviewFile = join(itemPath, 'code-preview.ts');

          if (existsSync(storiesFile) && existsSync(codePreviewFile)) {
            folders.push(itemPath);
          } else {
            // Recursively scan subdirectories
            scanDirectory(itemPath);
          }
        }
      }
    } catch (error) {
      console.warn(`Error scanning directory ${dir}:`, error.message);
    }
  }

  scanDirectory(examplesDir);
  return folders;
}

/**
 * Extract example data from a single folder
 */
export function extractExampleFromFolder(folderPath) {
  try {
    const storiesFile = join(folderPath, 'default.stories.ts');
    const codePreviewFile = join(folderPath, 'code-preview.ts');

    // Extract the example name (key) from the stories file
    const exampleKey = extractExampleKey(storiesFile);
    if (!exampleKey) {
      console.warn(`Could not extract example key from ${storiesFile}`);
      return null;
    }

    // Extract the HTML template from the code preview file
    const template = extractHtmlTemplate(codePreviewFile);
    if (!template) {
      console.warn(`Could not extract template from ${codePreviewFile}`);
      return null;
    }

    return {
      key: exampleKey,
      template: template,
    };
  } catch (error) {
    console.warn(`Error extracting example from ${folderPath}:`, error.message);
    return null;
  }
}

/**
 * Extract the example key from the default.stories.ts file
 * Looks for pattern: export const ExampleName: StoryObj = {};
 */
export function extractExampleKey(storiesFilePath) {
  try {
    const content = readFileSync(storiesFilePath, 'utf8');

    // Look for export const pattern
    const exportMatch = content.match(/export\s+const\s+(\w+)\s*:\s*StoryObj\s*=\s*\{/);

    if (exportMatch) {
      return exportMatch[1];
    }

    return null;
  } catch (error) {
    console.warn(`Error reading stories file ${storiesFilePath}:`, error.message);
    return null;
  }
}

/**
 * Extract the template value from the code-preview.ts file
 * Looks for the template string in the preview array and returns the entire content
 */
export function extractHtmlTemplate(codePreviewFilePath) {
  try {
    const content = readFileSync(codePreviewFilePath, 'utf8');

    // Look for template string in the preview array
    // This regex captures content between template: ` and the closing `
    const templateMatch = content.match(/template\s*:\s*`([^`]+)`/s);

    if (templateMatch) {
      // Return the entire template content as-is
      return templateMatch[1];
    }

    return null;
  } catch (error) {
    console.warn(`Error reading code preview file ${codePreviewFilePath}:`, error.message);
    return null;
  }
}
