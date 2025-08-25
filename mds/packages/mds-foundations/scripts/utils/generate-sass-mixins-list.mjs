import fs from 'fs';
import path from 'path';

// Directory containing the SCSS mixins
const mixinsDir = path.join('packages/mds-foundations/scss/mixins');

// Function to extract mixin names from a file
function extractMixins(fileContent) {
  const mixinRegex = /@mixin\s+([a-zA-Z0-9_-]+)\s*\(([^)]*)\)/g;
  const mixins = [];
  let match;
  while ((match = mixinRegex.exec(fileContent)) !== null) {
    const mixinName = match[1];
    const mixinParams = match[2]
      .split(',')
      .map((param) => param.trim())
      .filter((param) => param)
      .join(', ');
    mixins.push(`${mixinName}(${mixinParams})`);
  }
  return mixins;
}

// Function to read all SCSS files in the directory and extract mixin names
function getAllMixins(dir) {
  const mixins = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const extractedMixins = extractMixins(fileContent);
    const category = file.replace(/^_/, '').replace(/\.scss$/, '');
    const packageFile = filePath.replace('packages', '@maersk-global');
    extractedMixins.forEach((mixin) => {
      mixins.push({ mixin, packageFile, category });
    });
  });

  return mixins;
}

export const buildSassMixinList = () => {
  // Get all mixins and print the list
  const mixinList = getAllMixins(mixinsDir);

  // Save the generated list as a JSON file
  const outputFilePath = path.join('packages/mds-foundations/stories/documentation/sass-mixins-list.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(mixinList, null, 2), 'utf8');
};
