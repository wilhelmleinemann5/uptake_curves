#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import { getPackageInfo } from '../utils.mjs';
import { fetchUxBestPractices, enhanceGuidelines } from '../get-ux-docs.mjs';
import { uxGeneralGuidelinesMapping } from './ux-general-mapping.mjs';

const __filename = fileURLToPath(import.meta.url);

// Helper function to determine category based on token name and type
export function categorizeToken(token) {
  const { name, category } = token;

  // Typography tokens
  if (name.includes('typography') || name.includes('font') || name.includes('text') || name.includes('headline')) {
    return 'Typography';
  }

  // Color tokens
  if (category === 'color' || name.includes('color') || name.includes('appearance') || name.includes('opacity')) {
    return 'Colors';
  }

  // Border and radius tokens
  if (name.includes('border') || name.includes('radius')) {
    return 'Borders';
  }

  // Layout tokens (breakpoints, grid, spacing)
  if (
    name.includes('breakpoint') ||
    name.includes('grid') ||
    name.includes('gap') ||
    name.includes('margin') ||
    name.includes('padding')
  ) {
    return 'Layout';
  }

  // Motion tokens (transitions, animations)
  if (category === 'time' || name.includes('transition') || name.includes('duration') || name.includes('timing')) {
    return 'Motion';
  }

  // Shadow tokens
  if (name.includes('shadow')) {
    return 'Effects';
  }

  // Brand-specific tokens
  if (name.startsWith('brand_') && !name.includes('typography') && !name.includes('appearance')) {
    return 'Brand';
  }

  // Default fallback
  return 'Other';
}

// Helper function to get category description
export function getCategoryDescription(categoryName) {
  const descriptions = {
    Typography: 'Font families, sizes, weights, and text styling tokens',
    Colors: 'Color palette, theme colors, and appearance tokens',
    Borders: 'Border width, style, and radius tokens',
    Layout: 'Breakpoints, grid, and layout-related tokens',
    Motion: 'Animation duration, timing, and transition tokens',
    Effects: 'Shadow, blur, and visual effect tokens',
    Brand: 'Brand-specific design tokens',
    Other: 'Miscellaneous design tokens',
  };
  return descriptions[categoryName] || 'Design tokens';
}

// Helper function to convert token references to CSS variables
export function convertTokenValueToCssVar(value) {
  // Check if the value is a string that contains a token reference starting with $
  if (typeof value === 'string' && value.startsWith('$')) {
    // Convert $brand.appearance.neutral.default.text-color to var(--mds_brand_appearance_neutral_default_text-color)
    const cssVarName = value.replace(/^\$/, 'mds_').replace(/\./g, '_');
    return `var(--${cssVarName})`;
  }
  return value;
}

export async function generateDesignTokensMetadata(packageDir) {
  const rootPath = packageDir;

  try {
    console.log('🔄 Generating MDS Design Tokens metadata...');

    // Get package information
    const packagePath = join('/', rootPath, 'dist', 'packages', 'mds-design-tokens');
    const packageJsonPath = join(packagePath, 'package.json');
    const packageInfo = getPackageInfo(packageJsonPath);

    // Get all brand directories
    const brandDirs = await fs.readdir(packagePath);
    const validBrands = [];

    for (const brandDir of brandDirs) {
      const brandPath = join(packagePath, brandDir);
      const stat = await fs.stat(brandPath);
      if (
        stat.isDirectory() &&
        brandDir !== 'metadata.json' &&
        brandDir !== 'flutter' &&
        brandDir !== 'implementation' &&
        brandDir !== 'apmterminalsexperimental'
      ) {
        validBrands.push(brandDir);
      }
    }

    // Process each brand and generate separate metadata files
    for (const brand of validBrands) {
      console.log(`\n🎨 Processing brand: ${brand}`);

      const brandPath = join(packagePath, brand);
      const themeDirs = await fs.readdir(brandPath);

      const metadata = {
        overview: packageInfo,
        usage: {
          themes: [],
        },
        guidelines: {
          general: {},
          designPrinciples: {},
          relatedGuidelines: {},
        },
      };

      for (const themeDir of themeDirs) {
        const themePath = join(brandPath, themeDir);
        const stat = await fs.stat(themePath);

        if (stat.isDirectory()) {
          console.log(`  🎯 Processing theme: ${themeDir}`);

          // Look for JSON directory
          const jsonDir = join(themePath, 'json');
          try {
            await fs.access(jsonDir);

            // Read the design-tokens-array.json file
            const tokensFile = join(jsonDir, 'design-tokens-array.json');
            const tokensData = JSON.parse(await fs.readFile(tokensFile, 'utf-8'));

            // Organize tokens by category
            const categories = {};

            tokensData.forEach((token) => {
              const category = categorizeToken(token);

              if (!categories[category]) {
                categories[category] = {
                  name: category,
                  description: getCategoryDescription(category),
                  tokens: [],
                  summary: {
                    totalTokens: 0,
                  },
                };
              }

              // Add token directly to category level
              categories[category].tokens.push({
                name: token.cssPropertyName,
                cssPropertyName: `var(--${token.cssPropertyName})`,
                description: token.description,
                value: convertTokenValueToCssVar(typeof token.value === 'number' ? `${token.value}px` : token.value),
              });

              categories[category].summary.totalTokens++;
            });

            // Convert categories object to array and sort
            const categoriesArray = Object.values(categories).sort((a, b) => a.name.localeCompare(b.name));

            const themeMetadata = {
              name: themeDir,
              usage: {
                import: {
                  html: `<link rel="stylesheet" href="./node_modules/@maersk-global/mds-design-tokens/${brand}/${themeDir}/css/design-tokens-px.css" />`,
                  css: `@import url("@maersk-global/mds-design-tokens/${brand}/${themeDir}/css/design-tokens-px.css");`,
                  javascript: `import "@maersk-global/mds-design-tokens/${brand}/${themeDir}/css/design-tokens-px.css";`,
                  sass: `@import url("@maersk-global/mds-design-tokens/${brand}/${themeDir}/css/design-tokens-px.scss");`,
                },
              },
              categories: categories,
              summary: {
                totalTokens: tokensData.length,
                totalCategories: categoriesArray.length,
                lastUpdated: new Date().toISOString(),
              },
            };

            metadata.usage.themes.push(themeMetadata);
          } catch (error) {
            console.warn(`  ⚠️  Could not process theme ${themeDir}: ${error.message}`);
          }
        }
      }

      // Write individual brand metadata file
      if (metadata.usage.themes.length > 0) {
        // Get UX docs
        let guidelines = await fetchUxBestPractices('design-language', 'themes');
        if (guidelines && Object.keys(guidelines).length > 0) {
          metadata.guidelines.general = guidelines;
          console.log(`✅ Successfully fetched themes guidelines for ${brand}`);
        } else {
          console.log(`ℹ️  No theme-specific guidelines found for ${brand}`);
        }

        // Enhance with general guidelines using mapping
        console.log(`🔗 Enhancing design-tokens with general guidelines...`);
        const generalGuidelines = await enhanceGuidelines(uxGeneralGuidelinesMapping);
        metadata.guidelines = {
          general: guidelines,
          designPrinciples: [...(generalGuidelines.designPrinciples || [])],
          relatedGuidelines: [...(generalGuidelines.relatedGuidelines || [])],
        };
        console.log(`✅ Successfully enhanced guidelines for design-tokens`);

        const metadataPath = join(packagePath, brand, 'metadata.json');
        await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

        console.log(`  ✅ Brand metadata written to: ${metadataPath}`);
        console.log(`  📊 Total themes: ${metadata.usage.themes.length}`);

        // Print theme summary
        metadata.usage.themes.forEach((theme) => {
          console.log(
            `    🎯 ${theme.name}: ${theme.summary.totalTokens} tokens, ${theme.summary.totalCategories} categories`,
          );
        });
      }
    }
  } catch (error) {
    console.error('❌ Error generating design tokens metadata:', error);
    process.exit(1);
  }
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const packageDir = process.cwd();

  generateDesignTokensMetadata(packageDir)
    .then(() => {
      console.log('✅ MDS Design Tokens metadata generation completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ MDS Design Tokens metadata generation failed:', error);
      process.exit(1);
    });
}
