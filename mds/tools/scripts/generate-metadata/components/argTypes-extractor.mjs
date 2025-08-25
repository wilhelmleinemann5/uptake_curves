import { unlink, writeFileSync } from 'fs';
import { join } from 'path';
import * as esbuild from 'esbuild';

/**
 * Bundle TypeScript file using esbuild
 * @param {string} filePath - Path to the TypeScript file
 * @param {string} packageDir - Package directory for context
 * @param {string} componentName - Component name
 * @returns {Promise<Object>} Bundled result
 */
export async function bundleWithEsbuild(filePath, packageDir, componentName) {
  const packageName = componentName.replace('mc-', 'mds-components-core-');
  const rootPath = packageDir.split('/').slice(1, -2).join('/');
  const outputPath = join('/', rootPath, 'dist', 'packages', packageName, 'argTypes.js');

  try {
    const result = await esbuild.build({
      entryPoints: [filePath],
      bundle: true,
      platform: 'browser',
      format: 'esm',
      outfile: outputPath,
      target: 'es2020',
      metafile: true,
      external: ['lit', '@lit/*'],
      loader: {
        '.svg': 'text', // Load SVG files as text
        '.png': 'dataurl', // Load PNG as data URL (base64)
        '.jpg': 'dataurl', // Load JPG as data URL
        '.jpeg': 'dataurl', // Load JPEG as data URL
        '.gif': 'dataurl', // Load GIF as data URL
        '.webp': 'dataurl', // Load WebP as data URL
      },
      // plugins: [
      //   {
      //     name: 'exclude-specific-files',
      //     setup(build) {
      //       // First, let's see all files being resolved
      //       build.onResolve({ filter: /.*/ }, (args) => {
      //         // Check if this is one of the files we want to exclude
      //         if (
      //           args.path.includes('slots') ||
      //           args.path.includes('dialog-host-css') ||
      //           args.path.includes('types') ||
      //           args.path.includes('base-path') ||
      //           args.path.includes('lit') ||
      //           args.path.includes('icon-list') ||
      //           args.path.includes('banners') ||
      //           args.path.includes('themes') ||
      //           args.path.includes('generate-theme-stories') ||
      //           args.path.includes('generate-theme-selector') ||
      //           args.path.includes('sample-data') ||
      //           args.path.includes('change-case') ||
      //           args.path.includes('generate-state') ||
      //           args.path.includes('generate-code') ||
      //           args.path.includes('css-parts') ||
      //           args.path.includes('css-example') ||
      //           args.path.includes('default-values') ||
      //           args.path.includes('define-stories') ||
      //           args.path.includes('@maersk-global/icons') ||
      //           args.path.includes('.svg')
      //         ) {
      //           return { path: args.path, external: true };
      //         }
      //         return undefined;
      //       });
      //     },
      //   },
      // ],
      write: true,
      logLevel: 'silent',
    });
    return outputPath; // Return the output path for further processing
  } catch (error) {
    console.error(`❌ esbuild error:`, error.message);
    throw error;
  }
}

/**
 * Main function to orchestrate the complete argTypes extraction process
 * @param {string} packageDir - Package directory path
 * @param {string} componentName - Component name (e.g., 'mc-button')
 * @returns {Promise<{success: boolean, bundlePath?: string, jsonPath?: string, argTypesCount?: number}>}
 */
export async function extractArgTypes(packageDir, componentName) {
  console.log(`Starting args extraction for ${componentName}...`);
  const packageName = componentName.replace('mc-', 'mds-components-core-');
  const rootPath = packageDir.split('/').slice(1, -2).join('/');
  const outputPath = join('/', rootPath, 'dist', 'packages', packageName, 'args.json');

  try {
    // Step 1: Bundle argTypes.ts to JavaScript
    const argTypesPath = join(packageDir, 'stories', 'argTypes.ts');
    const jsFileOutputPath = await bundleWithEsbuild(argTypesPath, packageDir, componentName);

    // Step 2: Import the bundled JavaScript module directly
    const importModule = await import(jsFileOutputPath);
    const extractedArgTypes = importModule.default || importModule;

    // Step 3: Save extracted args and clean-up
    if (extractedArgTypes && Object.keys(extractedArgTypes).length > 0) {
      const args = extractedArgTypes.argTypes ? extractedArgTypes.argTypes : extractedArgTypes;
      const jsonContent = JSON.stringify(args, null, 2);
      writeFileSync(outputPath, jsonContent, 'utf8', (err) => {
        if (err) {
          console.error(`❌ Error saving args file: ${outputPath}`, err);
        }
      });
      unlink(jsFileOutputPath, (err) => {
        if (err) {
          console.error(`❌ Error deleting temporary file: ${jsFileOutputPath}`, err);
        }
      });
    }
    console.log(`Args extraction done for ${componentName}...`);

    return outputPath;
  } catch (error) {
    console.error(`❌ Unexpected error: ${error.message}`);
  }
}
