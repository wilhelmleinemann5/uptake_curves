import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getPackageInfo } from '../utils.mjs';
import { fetchUxBestPractices, enhanceGuidelines } from '../get-ux-docs.mjs';
import { uxGeneralGuidelinesMapping } from './ux-general-mapping.mjs';

const __filename = fileURLToPath(import.meta.url);

/**
 * Generate metadata for MDS Foundations CSS classes
 */
export async function generateFoundationsMetadata(packageDir) {
  const rootPath = packageDir;

  console.log('🔄 Generating MDS Foundations metadata...');

  try {
    const packagePath = join('/', rootPath, 'dist', 'packages', 'mds-foundations', 'package.json');
    const cssDir = join('/', rootPath, 'dist', 'packages', 'mds-foundations', 'css');

    if (!existsSync(cssDir)) {
      throw new Error(`CSS directory not found: ${cssDir}`);
    }

    // Get all CSS files (exclude minified versions)
    const cssFiles = readdirSync(cssDir)
      .filter((file) => file.endsWith('.css') && !file.endsWith('.min.css'))
      .filter((file) => !file.startsWith('foundations.')) // Exclude the combined file
      .sort();

    // Get package information
    const packageInfo = getPackageInfo(packagePath);

    // Process each CSS file
    for (const file of cssFiles) {
      const filePath = join(cssDir, file);
      const fileName = basename(file, '.css');

      console.log(`📄 Processing ${file}...`);

      const fileMetadata = await processCSSFile(filePath, fileName);
      const metadata = {
        overview: {
          ...packageInfo,
          description: 'MDS Foundations provides foundational CSS classes for layout, typography, and more.',
        },
        usage: {
          installation: 'npm install @maersk-global/mds-foundations',
          description:
            'Import the whole foundations.cSS file to use all CSS classes across your project, or import specific files as needed.',
          import: {
            html: '<link rel="stylesheet" href="./node_modules/@maersk-global/mds-foundations/css/foundations.min.css" />',
            css: '@import url("@maersk-global/mds-foundations/css/foundations.min.css");',
            javascript: 'import "@maersk-global/mds-foundations/css/foundations.min.css";',
            sass: '@import url("@maersk-global/mds-foundations/css/index.scss");',
          },
        },
        api: fileMetadata,
        guidelines: {
          general: {},
          designPrinciples: {},
          relatedGuidelines: {},
        },
      };

      // Get UX docs
      const generalGuidelinesEntry = uxGeneralGuidelinesMapping[fileName]?.find(
        (entry) => entry.docCategory === 'general',
      );
      if (generalGuidelinesEntry) {
        let guidelines = await fetchUxBestPractices(generalGuidelinesEntry.docType, generalGuidelinesEntry.docName);
        if (guidelines && Object.keys(guidelines).length > 0) {
          metadata.guidelines.general = guidelines;
          console.log(`✅ Successfully fetched themes guidelines for ${fileName}`);
        } else {
          console.log(`ℹ️  No theme-specific guidelines found for ${fileName}`);
        }
      }

      const additionalGuidelinesEntry = uxGeneralGuidelinesMapping[fileName]?.filter(
        (entry) => entry.docCategory === 'designPrinciples' || entry.docCategory === 'relatedGuidelines',
      );
      if (additionalGuidelinesEntry) {
        // Enhance with general guidelines using mapping
        console.log(`🔗 Enhancing ${fileName} with general guidelines...`);
        const generalGuidelines = await enhanceGuidelines(additionalGuidelinesEntry);
        metadata.guidelines.designPrinciples = [...(generalGuidelines.designPrinciples || [])];
        metadata.guidelines.relatedGuidelines = [...(generalGuidelines.relatedGuidelines || [])];
        console.log(`✅ Successfully enhanced guidelines for ${fileName}`);
      }
      // Write metadata to file
      const fileOutputPath = join(cssDir, `${fileName}.metadata.json`);
      writeFileSync(fileOutputPath, JSON.stringify(metadata, null, 2));
      console.log(`✅ Generated MDS Foundations metadata for ${file} at ${fileOutputPath}`);
    }
  } catch (error) {
    console.error('❌ Error generating MDS Foundations metadata:', error);
    throw error;
  }
}

/**
 * Process a single CSS file and extract class information
 */
export async function processCSSFile(filePath) {
  const content = readFileSync(filePath, 'utf8');

  const fileMetadata = {
    description: getFileDescription(filePath),
    classes: extractCSSClasses(content),
    summary: {
      totalClasses: 0,
      categories: new Set(),
    },
  };

  // Calculate summary
  fileMetadata.summary.totalClasses = fileMetadata.classes.length;
  fileMetadata.classes.forEach((cls) => {
    if (cls.category) {
      fileMetadata.summary.categories.add(cls.category);
    }
  });

  fileMetadata.summary.categories = Array.from(fileMetadata.summary.categories);

  return fileMetadata;
}

/**
 * Extract CSS classes and their information from CSS content
 */
export function extractCSSClasses(content) {
  const classes = [];

  // Split content into blocks based on CSS selectors
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for CSS class selectors
    if (line.startsWith('.') && line.includes('{')) {
      const className = extractClassName(line);
      if (className) {
        // Look for comment after the selector (inside the CSS rule)
        const commentInfo = extractInlineComment(lines, i + 1);
        const classInfo = commentInfo ? parseClassComment(commentInfo.content, className) : null;

        if (classInfo && classInfo.name) {
          // Use the @name from the comment if available
          const currentClass = {
            name: classInfo.name,
            category: classInfo.category,
            example: classInfo.example,
            usage: classInfo.usage,
          };
          classes.push(currentClass);
        } else if (classInfo) {
          // Fallback to selector name if no @name is found
          const currentClass = {
            name: className,
            category: classInfo.category,
            example: classInfo.example,
            usage: classInfo.usage,
          };
          classes.push(currentClass);
        }
      }
    }
  }

  return classes;
}

/**
 * Extract inline comment within a CSS rule
 */
export function extractInlineComment(lines, startIndex) {
  let content = '';
  let foundComment = false;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    // Stop if we reach the end of the CSS rule
    if (line.includes('}')) {
      break;
    }

    // Check for multi-line comment start
    if (line.includes('/*')) {
      foundComment = true;
      let commentStart = line.substring(line.indexOf('/*') + 2);

      // Check if comment ends on the same line
      if (commentStart.includes('*/')) {
        content = commentStart.substring(0, commentStart.indexOf('*/')).trim();
        break;
      } else {
        content = commentStart;
      }
      continue;
    }

    // Continue collecting comment content
    if (foundComment) {
      if (line.includes('*/')) {
        content += '\n' + line.substring(0, line.indexOf('*/')).trim();
        break;
      } else {
        content += '\n' + line;
      }
    }
  }

  return foundComment ? { content: content.trim() } : null;
}

/**
 * Extract class name from CSS selector line
 */
export function extractClassName(line) {
  // Handle various selector formats
  const match = line.match(/\.([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Parse class documentation from comment content
 */
export function parseClassComment(commentContent, fallbackClassName) {
  if (!commentContent || commentContent.length < 10) {
    return null;
  }

  const lines = commentContent.split('\n').map((line) => line.trim());

  let name = '';
  let example = '';
  let category = '';
  let usage = '';

  let currentSection = 'none';

  for (const line of lines) {
    if (line.startsWith('@name:')) {
      name = line.replace('@name:', '').trim();
      currentSection = 'none';
      continue;
    } else if (line.startsWith('@example:')) {
      currentSection = 'example';
      continue;
    } else if (line.startsWith('@category:')) {
      category = line.replace('@category:', '').trim();
      currentSection = 'none';
      continue;
    } else if (line.startsWith('@usage:')) {
      currentSection = 'usage';
      continue;
    }

    if (currentSection === 'example' && line) {
      example += (example ? '\n' : '') + line;
    } else if (currentSection === 'usage' && line) {
      usage += (usage ? ' ' : '') + line;
    }
  }

  return {
    name: name || fallbackClassName,
    category: category || 'No categry available',
    example: example || null,
    usage: usage || null,
  };
}

/**
 * Get file description by reading @description from CSS file content
 */
export function getFileDescription(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');

    // Look for @description: pattern in comments
    // Matches @description: followed by any content until the comment block ends
    const descriptionMatch = content.match(/\/\*[\s\S]*?@description:\s*([\s\S]*?)\*\//);

    if (descriptionMatch && descriptionMatch[1]) {
      // Clean up the description text by removing leading/trailing whitespace
      // and removing any comment markers (*, leading whitespace) that might be part of the capture
      const description = descriptionMatch[1]
        .split('\n')
        .map((line) => line.replace(/^\s*\*?\s?/, '').trim()) // Remove leading *, whitespace from each line
        .filter((line) => line.length > 0) // Remove empty lines
        .join(' ') // Join with spaces
        .trim();

      return description || 'No description available';
    }

    return 'No description available';
  } catch (error) {
    console.warn(`Warning: Could not read file for description: ${filePath}`, error.message);
    return 'No description available';
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const packageDir = process.cwd();

  generateFoundationsMetadata(packageDir)
    .then(() => {
      console.log('✅ MDS Foundations metadata generation completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ MDS Foundations metadata generation failed:', error);
      process.exit(1);
    });
}
