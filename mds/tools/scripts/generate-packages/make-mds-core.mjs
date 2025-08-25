import fs from 'fs';
import path from 'path';
import { removeDirectory, getLatestPackageVersion, getMdsPackages } from './utils.mjs';

const outDir = 'dist/packages';
const packageName = 'mds-components-core';

// clean up mds-components-core package
removeDirectory(`${outDir}/${packageName}`);

const packageVersion = await getLatestPackageVersion();
const uiPackages = getMdsPackages(outDir);

function createIndexBarrelFile(subfolders) {
  // Create import statements for each subfolder
  const exportStatements = subfolders.map((subfolder) => `export * from './${subfolder}/index.js';`).join('\n');

  // Combine import and export statements
  return `${exportStatements}`;
}

function createPackageJson(packageName, packageVersion, uiPackages) {
  const packageDependencies = {};
  const packageExports = {};
  uiPackages.forEach((pkg) => {
    packageDependencies[`@maersk-global/${pkg.replace('mc-', 'mds-components-core-')}`] = `${packageVersion}`;
    packageExports[`./${pkg}`] = `./${pkg}/index.js`;
    packageExports[`./${pkg}/`] = `./${pkg}/`;
    packageExports[`./${pkg}/*`] = `./${pkg}/*.js`;
    packageExports[`./${pkg}/*.js`] = `./${pkg}/*.js`;
    packageExports[`./${pkg}/types`] = `./${pkg}/types.d.ts`;
  });
  return {
    name: `@maersk-global/${packageName}`,
    version: packageVersion,
    license: 'UNLICENSED',
    type: 'module',
    module: './index.js',
    main: './index.js',
    types: './index.d.ts',
    customElements: 'custom-elements.json',
    repository: {
      type: 'git',
      url: 'git+https://github.com/Maersk-Global/mds.git',
    },
    bugs: {
      url: 'https://github.com/Maersk-Global/mds/issues',
    },
    homepage: 'https://community-ui.maersk.com',
    keywords: ['Maersk Design System'],
    engines: {
      node: '>=16',
    },
    dependencies: packageDependencies,
    exports: {
      '.': './index.js',
      './*': './index.js',
      './types': './types.d.ts',
      ...packageExports,
    },
    files: ['**/*.js', '**/*.d.ts'],
  };
}

function createSinglePackageFiles(dirName, uiPackages) {
  uiPackages.forEach((pkg) => {
    const dirPath = path.join(dirName, pkg);
    const packageName = `@maersk-global/${pkg.replace('mc-', 'mds-components-core-')}`;
    fs.mkdirSync(dirPath, { recursive: true });

    const packageSelfDir = path.join(outDir, pkg.replace('mc-', 'mds-components-core-'));
    fs.readdirSync(packageSelfDir).forEach((file) => {
      const filePath = path.join(packageSelfDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile() && file !== 'package.json' && file !== 'custom-elements.json') {
        const parsedFile = path.parse(file);
        const fileName = parsedFile.name;
        if (parsedFile.ext === '.map') {
          fs.copyFileSync(filePath, path.join(dirPath, file));
        } else {
          if (fileName.startsWith('index')) {
            fs.writeFileSync(path.join(dirPath, `${fileName}${parsedFile.ext}`), `export * from '${packageName}';`);
          } else if (parsedFile.ext === '.js') {
            fs.writeFileSync(
              path.join(dirPath, `${fileName}${parsedFile.ext}`),
              `export * from '${packageName}/${fileName}${parsedFile.ext}';`,
            );
          } else {
            fs.writeFileSync(
              path.join(dirPath, `${fileName}${parsedFile.ext}`),
              `export * from '${packageName}/${fileName.replace(/\.d$/, '')}';`,
            );
          }
        }
      }
    });
  });
}

function createMdsComponents() {
  console.log('Generating Mds Components Core Wrapper 🚀 ...');
  const dirName = path.join(outDir, packageName);
  // Create index.js with a exports for each component
  const indexContent = createIndexBarrelFile(uiPackages);
  // Create package.json
  const packageContent = createPackageJson(packageName, packageVersion, uiPackages);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  // Write index.js
  fs.writeFileSync(path.join(dirName, 'index.js'), indexContent);

  // Write index.d.ts
  fs.writeFileSync(path.join(dirName, 'index.d.ts'), indexContent);

  // Write types.d.ts, this's for the sake of backward compatibility, should be removed in the future major bumpss
  fs.writeFileSync(path.join(dirName, 'types.d.ts'), indexContent);

  // Write package.json
  fs.writeFileSync(path.join(dirName, 'package.json'), JSON.stringify(packageContent, null, 2));
  // Write single package barrel files
  createSinglePackageFiles(dirName, uiPackages);

  // Create base class's folder
  createBaseClasses();
}

function createBaseClasses() {
  const dirName = path.join(outDir, packageName, 'base-class');

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }

  fs.writeFileSync(
    path.join(dirName, 'list-item-base.js'),
    `export * from '@maersk-global/mds-components-core-list-item/base.js';`,
  );

  fs.writeFileSync(
    path.join(dirName, 'list-item-base.d.ts'),
    `export * from '@maersk-global/mds-components-core-list-item/base';`,
  );

  fs.writeFileSync(
    path.join(dirName, 'mc-select-base.js'),
    `export * from '@maersk-global/mds-components-core-select/base.js';`,
  );

  fs.writeFileSync(
    path.join(dirName, 'mc-select-base.d.ts'),
    `export * from '@maersk-global/mds-components-core-select/base';`,
  );
}

// generate mds-components-core package
createMdsComponents();
