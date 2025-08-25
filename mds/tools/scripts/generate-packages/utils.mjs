import fs from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';

const excludedFolders = [
  'mds-components-core',
  'mds-components-utils',
  'mds-config',
  'mds-design-tokens',
  'mds-dev-utils',
  'mds-foundations',
  'mds-legacy',
  'mds-mcp-server',
  'mds-react-wrapper',
  'mds-shared-types',
  'mds-vscode-extension',
  'mds-vue-mc-model',
];

export function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        removeDirectory(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

export function getMdsPackages(dirName) {
  // Read the directory
  return fs
    .readdirSync(dirName)
    .filter((subfolder) => {
      // Check if the subfolder is not in the excludedFolders array
      return fs.statSync(path.join(dirName, subfolder)).isDirectory() && !excludedFolders.includes(subfolder);
    })
    .map((dirName) => dirName.replace('mds-components-core-', 'mc-'));
}

export async function getLatestPackageVersion() {
  try {
    const data = await readFile('./package.json', 'utf8');
    const packageData = JSON.parse(data);
    return packageData.version;
  } catch (err) {
    console.log('ERR', err);
  }
}
