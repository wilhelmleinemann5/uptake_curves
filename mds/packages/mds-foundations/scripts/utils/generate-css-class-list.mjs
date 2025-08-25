import fs from 'fs';
import path from 'path';

const cssFolderPath = path.resolve('dist/packages/mds-foundations/css');

const getCssClassNames = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const classNames = new Set();
  const regex = /\.([a-zA-Z0-9_-]+)\s*{/g;
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    classNames.add(match[1]);
  }

  return Array.from(classNames);
};

const generateCssClassList = () => {
  const files = fs
    .readdirSync(cssFolderPath)
    .filter((file) => file.endsWith('.css') && !file.endsWith('.min.css') && !file.includes('foundations'));
  const allClassNames = [];

  files.forEach((file) => {
    const filePath = path.join(cssFolderPath, file);
    const classNames = getCssClassNames(filePath);
    const category = path.basename(file, '.css').replace('_', '');
    const packageFile = filePath.replace(/^.*\/packages\//, '@maersk-global/');

    classNames.forEach((className) => {
      allClassNames.push({
        className,
        category,
        packageFile,
      });
    });
  });

  return allClassNames;
};

export const buildCssClassList = () => {
  const cssClassList = generateCssClassList();

  // Save the generated list as a JSON file
  const outputFilePath = path.join('packages/mds-foundations/stories/documentation/css-class-list.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(cssClassList, null, 2), 'utf8');
};
