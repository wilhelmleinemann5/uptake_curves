import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import prettierConfig from '../../../prettier.config.cjs';
import { getAllComponents } from './get-custom-element-from-manifest.mjs';
import { pascalCase } from 'pascal-case';
import { removeDirectory, getLatestPackageVersion, getMdsPackages } from './utils.mjs';

const nativeEvents = ['Event', 'InputEvent', 'FocusEvent', 'MouseEvent', 'KeyboardEvent'];
const customElementsJson = 'custom-elements.json';
const outDir = 'dist/packages';
const packageName = 'mds-react-wrapper';
const libraryName = 'components-core';

// clean up react-wrapper package
removeDirectory(`${outDir}/${packageName}`);

const packageVersion = await getLatestPackageVersion();
const mdsPackages = getMdsPackages(outDir);

function createIndexBarrelFile(subfolders) {
  // Create import statements for each subfolder
  const exportStatements = subfolders
    .map((subfolder) => `export { ${pascalCase(subfolder)} } from './${subfolder}/index.js';`)
    .join('\n');

  // Combine import and export statements
  return `${exportStatements}`;
}

function createGlobalFiles(dirName) {
  const globalJs = `export {};`;
  const globalDTs = `declare module 'react' {
  interface HTMLAttributes<T> {
      focusstartanchor?: boolean;
      focusendanchor?: boolean;
  }
}
${globalJs}`;
  fs.writeFileSync(path.join(dirName, 'global.js'), globalJs);
  fs.writeFileSync(path.join(dirName, 'global.d.ts'), globalDTs);
}

function createPackageJson(packageName, packageVersion, mdsPackages) {
  const packageDependencies = {};
  const packageExports = {};

  mdsPackages.forEach((pkg) => {
    packageDependencies[`@maersk-global/${pkg.replace('mc-', 'mds-components-core-')}`] = `${packageVersion}`;
    packageExports[`./${pkg}/`] = `./${libraryName}/${pkg}/`;
    packageExports[`./${pkg}`] = `./${libraryName}/${pkg}/index.js`;
    packageExports[`./${pkg}/*`] = `./${libraryName}/${pkg}/*`;
    packageExports[`./${pkg}/*.js`] = `./${libraryName}/${pkg}/*.js`;

    /*
     * Added for backward compatibility to support old import paths
     * after moving community components and restructuring directories.
     */
    packageExports[`./${libraryName}/${pkg}/`] = `./${libraryName}/${pkg}/`;
    packageExports[`./${libraryName}/${pkg}`] = `./${libraryName}/${pkg}/index.js`;
    packageExports[`./${libraryName}/${pkg}/*`] = `./${libraryName}/${pkg}/*`;
    packageExports[`./${libraryName}/${pkg}/*.js`] = `./${libraryName}/${pkg}/*.js`;
  });
  return {
    name: `@maersk-global/${packageName}`,
    version: packageVersion,
    license: 'UNLICENSED',
    type: 'module',
    module: './index.js',
    main: './index.js',
    types: './index.d.ts',
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
    peerDependencies: {
      '@lit/react': '^1.0.3',
      react: '^17.0.2 || ^18.2.0 || ^19.0.0',
    },
    dependencies: {
      '@lit/react': '^1.0.3',
      ...packageDependencies,
    },
    exports: {
      '.': './index.js',
      './*': './index.js',
      ...packageExports,
    },
  };
}

function createSinglePackageFiles(dirName, outDir, mdsPackages) {
  const components = [];
  mdsPackages.forEach((pkg) => {
    const dirPath = path.join(dirName, pkg);
    fs.mkdirSync(dirPath, { recursive: true });
    const packageName = `@maersk-global/${pkg.replace('mc-', 'mds-components-core-')}`;
    const metadataPath = path.join(outDir, pkg.replace('mc-', 'mds-components-core-'), customElementsJson);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    components.push({ packageName, subComponents: getAllComponents(metadata) });
    components.forEach(({ packageName, subComponents }) => {
      subComponents.map((component) => {
        if (component.tagName) {
          const componentTagName = component.tagName.replace(/`/g, '');
          const componentClassName = pascalCase(componentTagName);
          const componentFile = path.join(dirPath, 'index.js');
          const componentTypesFile = path.join(dirPath, 'index.d.ts');
          const importPath = component.modulePath.replace(/\.ts$/, '');

          // A map of <'event-payload-import-path', 'array of event names to be imported from that path'>.
          const eventPayloads = new Map([]);
          const events = (component.events || []).reduce((aggregatedEvents, event) => {
            const eventNameWithoutBackTick = event.name.replace(/`/g, '');

            if (event.type && !nativeEvents.includes(event.type.text)) {
              const genericTypeRegex = /<([A-Z]\w+)>/;
              const match = genericTypeRegex.exec(event.type.text);
              const newEventPayloadType = match ? match[1] : null;

              if (newEventPayloadType) {
                let payloadImportPath = `'${packageName}/${importPath.replace('/index', '/types')}'`;

                if (event.inheritedFrom) {
                  payloadImportPath = event.inheritedFrom.module.startsWith('@')
                    ? event.inheritedFrom.module
                    : `'${packageName}/${event.inheritedFrom.module.replace('/index.js', '/types')}'`;
                }

                const correspondingEvents = eventPayloads.get(payloadImportPath);
                eventPayloads.set(
                  payloadImportPath,
                  correspondingEvents
                    ? [
                        ...correspondingEvents,
                        ...(correspondingEvents.includes(newEventPayloadType) ? [] : [newEventPayloadType]),
                      ]
                    : [newEventPayloadType],
                );
              }
            }

            return aggregatedEvents[eventNameWithoutBackTick]
              ? aggregatedEvents
              : {
                  ...aggregatedEvents,
                  [eventNameWithoutBackTick]: `EventName<${
                    /**
                     * TODO: remove 'any' when we decide to bump our package version to v3,
                     * as any is purely added for the purpose of backward compatibility within v2.
                     */
                    event.type ? event.type.text : 'CustomEvent'
                  }>`,
                };
          }, {});

          fs.mkdirSync(dirPath, { recursive: true });

          // create & write index.js file
          const eventsMapping = Object.keys(events).reduce(
            (eventsString, eventName) => `${eventName}: '${eventName}',\n${eventsString}`,
            '',
          );

          prettier
            .format(
              `
            import * as React from 'react';
            import '../../global.js';
            import { createComponent } from '@lit/react';
            import { ${componentClassName} as WebComponent } from '${packageName}';

            export const ${componentClassName} = createComponent({
              react: React,
              tagName: '${componentTagName}',
              elementClass: WebComponent
              ${eventsMapping ? `,events: {${eventsMapping}}` : ''}
            });
          `,
              Object.assign(prettierConfig, {
                parser: 'babel-ts',
              }),
            )
            .then((source) => fs.writeFileSync(componentFile, source, 'utf8'));

          // create & write index.d.ts file
          const eventsMappingTypes = Object.keys(events).reduce(
            (eventsString, eventName) => `${eventName}: ${events[eventName]},\n${eventsString}`,
            '',
          );

          prettier
            .format(
              `
            import '../../global.js';
            import { ReactWebComponent${eventsMapping.includes('EventName') ? ', EventName' : ''} } from '@lit/react';
            import { ${componentClassName} as WebComponent } from '${packageName}';
            ${Array.from(eventPayloads)
              .map(([path, types]) => `import { ${types.join(',')} } from ${path};`)
              .join('\n')}
            export declare const ${componentClassName}: ReactWebComponent<WebComponent, {${
              eventsMappingTypes ? `${eventsMappingTypes}` : ''
            }}>;
            `,
              { parser: 'babel-ts' },
            )
            .then((sourceTypes) => fs.writeFileSync(componentTypesFile, sourceTypes, 'utf8'));
        }
      });
    });
  });
}

function createReactWrapper() {
  console.log('Generating React Wrapper 🚀 ...');
  const packageDistFolder = path.join(outDir, `${packageName}`);
  const libraryFolderInDist = path.join(packageDistFolder, libraryName);
  // Create index.js with a exports for each component
  const indexContent = createIndexBarrelFile(mdsPackages);
  // Create package.json
  const packageContent = createPackageJson(packageName, packageVersion, mdsPackages);

  // Create directory if it doesn't exist
  if (!fs.existsSync(packageDistFolder)) {
    fs.mkdirSync(packageDistFolder);
  }

  // Create the library folder if it doesn't exist
  if (!fs.existsSync(libraryFolderInDist)) {
    fs.mkdirSync(libraryFolderInDist);
  }

  // Write index.js
  fs.writeFileSync(path.join(packageDistFolder, 'index.js'), `export * from './${libraryName}/index.js';`);
  fs.writeFileSync(path.join(packageDistFolder, 'index.d.ts'), `export * from './${libraryName}';`);

  //write library folder's barrel files
  fs.writeFileSync(path.join(libraryFolderInDist, 'index.js'), indexContent);
  fs.writeFileSync(path.join(libraryFolderInDist, 'index.d.ts'), indexContent);

  // Write package.json
  fs.writeFileSync(path.join(packageDistFolder, 'package.json'), JSON.stringify(packageContent, null, 2));
  // write global.js & global.d.ts file
  createGlobalFiles(packageDistFolder);
  // Write single package barrel files
  createSinglePackageFiles(libraryFolderInDist, outDir, mdsPackages);
}

// generate react-wrapper package
createReactWrapper();
