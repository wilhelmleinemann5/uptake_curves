#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Check for missing metadata.json files in key packages
 */
export function checkMissingMetadata() {
  const packagePrefixes = ['mds-foundations', 'mds-design-tokens', 'mds-config'];
  const componentPrefixes = ['mc-']; // Individual component packages

  const packagesDir = './packages';
  const missingMetadata = [];

  if (!existsSync(packagesDir)) {
    console.error('❌ Packages directory not found:', packagesDir);
    process.exit(1);
  }

  // Get all directories in packages folder
  const allPackages = readdirSync(packagesDir).filter((item) => {
    const fullPath = join(packagesDir, item);
    return statSync(fullPath).isDirectory();
  });

  // Filter packages that match the prefixes (foundations, design-tokens, config)
  const foundationPackages = allPackages.filter((pkg) => packagePrefixes.some((prefix) => pkg.startsWith(prefix)));

  // Filter component packages (mc-*)
  const componentPackages = allPackages.filter((pkg) => componentPrefixes.some((prefix) => pkg.startsWith(prefix)));

  // Combine all target packages
  const targetPackages = [...foundationPackages, ...componentPackages];

  console.log(`🔍 Checking ${targetPackages.length} packages for metadata.json files...`);
  console.log(`   📦 Foundation packages: ${foundationPackages.length}`);
  console.log(`   🧩 Component packages: ${componentPackages.length}\n`);
  for (const pkg of targetPackages) {
    let metadataPath;
    let displayName = pkg;

    // Component packages (mc-*) are built as mds-components-core-{component}
    if (pkg.startsWith('mc-')) {
      const componentName = pkg.substring(3); // Remove 'mc-' prefix
      metadataPath = join('dist', 'packages', `mds-components-core-${componentName}`, 'metadata.json');
    } else {
      // Other packages use their original name
      metadataPath = join('dist', 'packages', pkg, 'metadata.json');
    }

    if (!existsSync(metadataPath)) {
      // Special cases for packages that create individual metadata files
      if (pkg === 'mds-foundations') {
        const cssDir = join('dist', 'packages', pkg, 'css');
        if (existsSync(cssDir)) {
          // Get all CSS files with _ prefix (non-minified)
          const cssFiles = readdirSync(cssDir).filter(
            (file) => file.startsWith('_') && file.endsWith('.css') && !file.endsWith('.min.css'),
          );
          const metadataFiles = readdirSync(cssDir).filter((file) => file.endsWith('.metadata.json'));

          // Check if every CSS file has a corresponding metadata file
          const missingMetadataFiles = cssFiles.filter((cssFile) => {
            const expectedMetadataFile = cssFile.replace('.css', '.metadata.json');
            return !metadataFiles.includes(expectedMetadataFile);
          });

          if (missingMetadataFiles.length === 0) {
            console.log(`✅ Found:   ${pkg} (${metadataFiles.length} CSS metadata files)`);
            continue;
          } else {
            console.log(`❌ Missing: ${pkg} - missing metadata for: ${missingMetadataFiles.join(', ')}`);
            missingMetadata.push(pkg);
            continue;
          }
        }
      } else if (pkg === 'mds-design-tokens') {
        const packageDir = join('dist', 'packages', pkg);
        const expectedBrands = ['maersk', 'apmterminals', 'alianca'];

        if (existsSync(packageDir)) {
          const missingBrands = expectedBrands.filter((brand) => {
            const brandMetadataPath = join(packageDir, brand, 'metadata.json');
            return !existsSync(brandMetadataPath);
          });

          if (missingBrands.length === 0) {
            console.log(`✅ Found:   ${pkg} (${expectedBrands.length} brand metadata files)`);
            continue;
          } else {
            console.log(`❌ Missing: ${pkg} - missing metadata for brands: ${missingBrands.join(', ')}`);
            missingMetadata.push(pkg);
            continue;
          }
        }
      }

      missingMetadata.push(pkg);
      console.log(`❌ Missing: ${displayName}`);
    } else {
      console.log(`✅ Found:   ${displayName}`);
    }
  }

  console.log('\n' + '='.repeat(50));

  if (missingMetadata.length === 0) {
    console.log('🎉 All packages have metadata.json files!');
  } else {
    console.log(`📋 Summary: ${missingMetadata.length} package(s) missing metadata.json:`);
    missingMetadata.forEach((pkg) => {
      console.log(`   • ${pkg}`);
    });

    console.log('\n💡 To generate metadata for a package, run:');
    console.log('   npx nx run <package-name>:build');
    console.log('\n💡 Or to build all packages:');
    console.log('   npm run build');
  }

  return missingMetadata.length;
}

// Main execution for testing individual components
// Only run if this file is being executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const missingCount = checkMissingMetadata();
  process.exit(missingCount > 0 ? 1 : 0);
}
