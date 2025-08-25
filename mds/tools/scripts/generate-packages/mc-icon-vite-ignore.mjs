import fs from 'fs';
import path from 'path';

const filePath = `dist/packages/mds-components-core-icon/index.js`;

fs.readFile(filePath, 'utf8', (err, fileData) => {
  if (err) return onErr(err);
  const updatedFileData = fileData.replaceAll(/await import\(/gm, 'await import( /* @vite-ignore */ ');
  fs.writeFile(filePath, updatedFileData, 'utf8', (err) => {
    if (err) return onErr(err);
    console.log('mc-icon: Vite ignore added');
  });
});
