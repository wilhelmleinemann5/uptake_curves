import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const cdnPath = join(distPath, 'cdn');
const coreDestinationDir = join(cdnPath, 'components-core');
const designTokensDestinationDir = join(cdnPath, 'design-tokens');
const foundationDestinationDir = join(cdnPath, 'foundations');

// create cdn folder and all sub folders
if (!existsSync(cdnPath)) {
  mkdirSync(cdnPath, { recursive: true });
  console.log('Created "cdn" folder under "dist".');
} else {
  console.log('"cdn" folder already exists under "dist".');
}
if (!existsSync(coreDestinationDir)) {
  mkdirSync(coreDestinationDir, { recursive: true });
  console.log('Created "components/core" folder under "cdn".');
} else {
  console.log('"components/core" folder already exists under "cdn".');
}

if (!existsSync(designTokensDestinationDir)) {
  mkdirSync(designTokensDestinationDir, { recursive: true });
  console.log('Created "design-tokens" folder under "cdn".');
} else {
  console.log('"design-tokens" folder already exists under "cdn".');
}

if (!existsSync(foundationDestinationDir)) {
  mkdirSync(foundationDestinationDir, { recursive: true });
  console.log('Created "foundations" folder under "cdn".');
}

// copy mds bundle to cdn
const sourceFile = join(distPath, 'packages', 'mds-components-core', 'index.bundle.esm.min.js');
const coreDestinationFile = join(coreDestinationDir, 'index.bundle.esm.min.js');

if (!existsSync(coreDestinationDir)) {
  mkdirSync(coreDestinationDir, { recursive: true });
  console.log('Created "components-core" folder under "cdn".');
}

copyFileSync(sourceFile, coreDestinationFile);
console.log('Copied "index.bundle.esm.min.js" to "components-core" folder under "cdn".');

// copy design tokens to cdn
const designTokensSourceDir = join(distPath, 'packages', 'mds-design-tokens');
const copyFolderSync = (source, destination) => {
  readdirSync(source).forEach((item) => {
    const sourceItem = join(source, item);
    const destinationItem = join(destination, item);
    if (statSync(sourceItem).isDirectory()) {
      if (item !== 'js' && item !== 'json') {
        if (!existsSync(destinationItem)) {
          mkdirSync(destinationItem);
        }
        copyFolderSync(sourceItem, destinationItem);
      }
    } else if (item === 'design-tokens-px.css') {
      const destinationItemMin = join(destination, 'design-tokens-px.min.css');
      copyFileSync(sourceItem, destinationItemMin);
    }
  });
};

copyFolderSync(designTokensSourceDir, designTokensDestinationDir);
console.log('Copied content of "mds-design-tokens" to "design-tokens" folder under "cdn".');

// copy foundation.css to cdn
const foundationSourceFile = join(distPath, 'packages', 'mds-foundations', 'css', 'foundations.min.css');

const foundationDestinationFile = join(foundationDestinationDir, 'foundations.min.css');
copyFileSync(foundationSourceFile, foundationDestinationFile);
console.log('Copied "foundations.min.css" to "foundations" folder under "cdn".');
