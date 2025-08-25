import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getPackageInfo } from '../utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Parse README.md content and extract relevant sections for guidelines
 */
function parseReadmeContent(readmeContent) {
  const guidelines = {};

  // Split content by main headings (# headers)
  const sections = readmeContent.split(/^# /gm).filter((section) => section.trim());

  sections.forEach((section) => {
    const lines = section.split('\n');
    const title = lines[0]?.trim();

    if (!title) return;

    // Skip table of contents section
    if (title.toLowerCase().includes('table of contents')) {
      return;
    }

    // Create a key from the title (lowercase, replace spaces with hyphens)
    const key = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Extract content (everything after the title)
    const fullContent = lines.slice(1).join('\n').trim();

    if (fullContent && key) {
      // Parse subsections (## and ### headers)
      const parsedSection = parseSubsections(fullContent, title);
      guidelines[key] = parsedSection;
    }
  });

  return guidelines;
}

/**
 * Parse subsections within a main section
 */
function parseSubsections(content, mainTitle) {
  // Use the generic function starting at level 2 (##)
  return parseNestedSections(content, mainTitle, 2, 4);
}

/**
 * Generic function to parse subsections at any header level
 * @param {string} content - The content to parse
 * @param {string} sectionTitle - The title of the current section
 * @param {number} currentLevel - Current header level (2 = ##, 3 = ###, 4 = ####)
 * @param {number} maxLevel - Maximum header level to parse (default: 4)
 */
function parseNestedSections(content, sectionTitle, currentLevel = 2, maxLevel = 4) {
  const result = {
    title: sectionTitle,
    content: [],
  };

  // Generate the header pattern for the current level
  const headerPattern = new RegExp(`^${'#'.repeat(currentLevel)} `, 'gm');
  const parts = content.split(headerPattern);

  // First part is content before any headers at this level
  if (parts[0] && parts[0].trim()) {
    const paragraphs = parts[0].split('\n\n').filter((p) => p.trim());
    result.content = paragraphs;
  }

  const subsections = {};

  // Process subsections at this level
  parts.slice(1).forEach((part) => {
    const lines = part.split('\n');
    const subTitle = lines[0]?.trim();

    if (!subTitle) return;

    const subKey = subTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const subContent = lines.slice(1).join('\n').trim();

    if (subContent) {
      if (currentLevel < maxLevel) {
        // Recursively parse deeper levels
        const nestedSections = parseNestedSections(subContent, subTitle, currentLevel + 1, maxLevel);
        subsections[subKey] = nestedSections;
      } else {
        // At maximum level, just store content as paragraphs
        const paragraphs = subContent.split('\n\n').filter((p) => p.trim());
        subsections[subKey] = {
          title: subTitle,
          content: paragraphs,
        };
      }
    }
  });

  // Only add subsections property if there are actual subsections
  if (Object.keys(subsections).length > 0) {
    result.subsections = subsections;
  }

  return result;
}

/**
 * Generate metadata for MDS config
 */
export async function generateConfigMetadata(packageDir) {
  const rootPath = packageDir;

  console.log('🔄 Generating MDS Config metadata...');

  try {
    // Fix the package path - remove leading slash
    const packagePath = join(rootPath, 'dist', 'packages', 'mds-config', 'package.json');
    const readmePath = join(rootPath, 'README.md');
    const outputDir = join(rootPath, 'dist', 'packages', 'mds-config');
    const outputPath = join(outputDir, 'metadata.json');

    // Check if package.json exists
    if (!existsSync(packagePath)) {
      throw new Error(`Package file not found at: ${packagePath}`);
    }

    // Get package information
    const packageInfo = getPackageInfo(packagePath);

    console.log(`📄 Processing README.md...`);

    let guidelines = {};

    // Check if README.md exists and parse it
    if (existsSync(readmePath)) {
      const readmeContent = readFileSync(readmePath, 'utf8');
      guidelines = parseReadmeContent(readmeContent);
      console.log(`✅ Parsed ${Object.keys(guidelines).length} sections from README.md`);
    } else {
      console.warn(`⚠️  README.md not found at: ${readmePath}`);
    }

    const metadata = {
      overview: {
        ...packageInfo,
        description: 'MDS config and set-up documentation.',
      },
      usage: {
        description: `Setup needed in order to use MDS basic styles for HTML tags, CSS resets, typography, useful css classes to be used for getting text, border and background colours. 
It includes also CSS classes that allow you to use MDS grid and MDS layout in your project. 
You need to add MDS design tokens CSS file as well, to get theming and brands in project.`,
        installation: 'npm install @maersk-global/mds-components-core',
        usage: `import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = process.env.NODE_ENV === 'development' ? '/node_modules/' : '/assets/node_modules/';`,
      },
      guidelines: guidelines,
    };

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      console.warn(`⚠️  Output directory doesn't exist: ${outputDir}`);
      return;
    }

    // Write metadata to file
    writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`✅ Generated MDS Config metadata at ${outputPath}`);

    return metadata;
  } catch (error) {
    console.error('❌ Error generating MDS Config metadata:', error);
    throw error;
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const packageDir = process.cwd();

  generateConfigMetadata(packageDir)
    .then(() => {
      console.log('✅ MDS Config metadata generation completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ MDS Config metadata generation failed:', error);
      process.exit(1);
    });
}
