import fs from 'fs';
import ncpPackage from 'ncp';
import path from 'path';
import prompt from 'prompt';

const { ncp } = ncpPackage;

const properties = [
  {
    name: 'componentName',
    description: 'Component name, i.e. dropdown (use `-` as word separator)',
    required: true,
  },
];

prompt.start();

prompt.get(properties, function (err, result) {
  let componentClassName = '';
  for (const item of result.componentName.split('-')) {
    componentClassName += item[0].toUpperCase() + item.slice(1);
  }
  let componentStoryName = '';
  for (const item of result.componentName.split('-')) {
    componentStoryName += item[0].toUpperCase() + item.slice(1);
  }

  const component = {
    // i.e. core
    componentType: 'core',
    // i.e. dropdown-item
    componentName: result.componentName,
    // i.e. DropdownItem
    componentClassName,
    // i.e. Dropdown Item
    componentStoryName,
    // current version of packages
    version: '',
  };

  // i.e. ./packages/mc-dropdown-item
  const destination = `./packages/mc-${component.componentName}`;

  const source = './tools/scripts/add-new-component/mc-component';
  const sourceDesignTokens = './tools/scripts/add-new-component/design-tokens';

  fs.readFile(`./package.json`, 'utf8', (err, data) => {
    if (err) return onErr(err);
    const packageData = JSON.parse(data);
    component.version = packageData.version;

    // copy template component
    ncp(source, destination, (err) => {
      if (err) return onErr(err);
      /* COMPONENT */
      // get all files in the new component
      const files = getAllFiles(destination);
      files.forEach((file) => {
        // read content of each file and replace mcomponent names with new component name
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) return onErr(err);
          const result = replacePlaceholders(data, component);
          const filePath = file.replace(/mc-component/, `mc-${component.componentName}`);
          // save files with new component name and new component class name
          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) return onErr(err);
            if (filePath !== file) {
              fs.unlinkSync(file);
            }
          });
        });
      });
      /* TSCONFIG BASE */
      fs.readFile(`./tsconfig.base.json`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const tsconfigData = JSON.parse(data);
        const compilerOptionsPaths = {
          ...(tsconfigData.compilerOptions.paths ? tsconfigData.compilerOptions.paths : {}),
        };
        compilerOptionsPaths[`@maersk-global/mds-components-core-${component.componentName}/types`] = [
          `packages/mc-${component.componentName}/src/lib/types.ts`,
        ];
        compilerOptionsPaths[`@maersk-global/mds-components-core-${component.componentName}`] = [
          `packages/mc-${component.componentName}/src/index.ts`,
        ];
        tsconfigData.compilerOptions.paths = compilerOptionsPaths;
        fs.writeFile(`./tsconfig.base.json`, JSON.stringify(tsconfigData, null, 4), 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* STORYBOOK VITE CONFIG */
      fs.readFile(`./vite.config.mjs`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const result = data.replace(
          /\/\/%%COMPONENT_INTERNAL_VITE_ALIAS%%/,
          `"@maersk-global/mds-components-core-${component.componentName}": resolve(__dirname, "./packages/mc-${component.componentName}/src/index.ts"),\n//%%COMPONENT_INTERNAL_VITE_ALIAS%%`,
        );
        fs.writeFile(`./vite.config.mjs`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* STORYBOOK PREVIEW */
      fs.readFile(`./.storybook/preview.ts`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const result = data.replace(
          /\/\/%%COMPONENT_STORYBOOK_PREVIEW_IMPORT%%/,
          `import "@maersk-global/mds-components-core-${component.componentName}";\n//%%COMPONENT_STORYBOOK_PREVIEW_IMPORT%%`,
        );
        fs.writeFile(`./.storybook/preview.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* KITCHEN-SINK VUE */
      fs.readFile('./tools/scripts/add-new-component/kitchen-sinks/spa-vue/Component.vue', 'utf8', (err, data) => {
        const result = data.replace(/mc-component/g, `mc-${component.componentName}`);
        fs.writeFile(
          `./kitchen-sinks/spa-vue/src/app/components/${component.componentClassName}.vue`,
          result,
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      fs.readFile('./kitchen-sinks/spa-vue/src/app/views/Home.vue', 'utf8', (err, data) => {
        const result = data
          .replace(
            /\/\/%%COMPONENT_IMPORT%%/,
            `import ${component.componentClassName} from '../components/${component.componentClassName}.vue';\n//%%COMPONENT_IMPORT%%`,
          )
          .replace(
            /<!-- %%COMPONENT_HTML%% -->/,
            `<div><h6>${component.componentClassName}:</h6><${component.componentClassName} /></div><!-- %%COMPONENT_HTML%% -->`,
          );
        fs.writeFile(`./kitchen-sinks/spa-vue/src/app/views/Home.vue`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/spa-vue/cypress/e2e/app.cy.ts', 'utf8', (err, data) => {
        const result = data.replace(
          /\/\/%%INTEGRATION_TEST%%/,
          `cy.get('mc-${component.componentName}').should('contain.text', 'Test');\n//%%INTEGRATION_TEST%%`,
        );
        fs.writeFile(`./kitchen-sinks/spa-vue/cypress/e2e/app.cy.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* KITCHEN-SINK REACT */
      fs.readFile('./tools/scripts/add-new-component/kitchen-sinks/spa-react/Component.tsx', 'utf8', (err, data) => {
        const result = data
          .replace(/McComponent/g, `Mc${component.componentClassName}`)
          .replace(/Component/g, `${component.componentClassName}`)
          .replace(/mc-component/g, `mc-${component.componentName}`);
        fs.writeFile(
          `./kitchen-sinks/spa-react/src/app/components/${component.componentClassName}.tsx`,
          result,
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      fs.readFile('./kitchen-sinks/spa-react/src/app/app.tsx', 'utf8', (err, data) => {
        const result = data
          .replace(
            /\/\/%%COMPONENT_IMPORT%%/,
            `import { ${component.componentClassName} } from './components/${component.componentClassName}';\n//%%COMPONENT_IMPORT%%`,
          )
          .replace(
            /\{\/\* %%COMPONENT_HTML%% \*\/\}/,
            `<div><h6>${component.componentClassName}:</h6><${component.componentClassName} /></div>{/* %%COMPONENT_HTML%% */}`,
          );
        fs.writeFile(`./kitchen-sinks/spa-react/src/app/app.tsx`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/spa-react/cypress/e2e/app.cy.ts', 'utf8', (err, data) => {
        const result = data.replace(
          /\/\/%%INTEGRATION_TEST%%/,
          `cy.get('mc-${component.componentName}').should('contain.text', 'Test');\n//%%INTEGRATION_TEST%%`,
        );
        fs.writeFile(`./kitchen-sinks/spa-react/cypress/e2e/app.cy.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* KITCHEN-SINK VANILLA JS */
      fs.readFile('./kitchen-sinks/vanillajs/src/main.ts', 'utf8', (err, data) => {
        const result = data
          .replace(
            /\/\/%%COMPONENT_IMPORT%%/,
            `import '@maersk-global/mds-components-core-${component.componentName}';\n//%%COMPONENT_IMPORT%%`,
          )
          .replace(
            /<!-- %%COMPONENT_HTML%% -->/,
            `<div><h6>${component.componentClassName}:</h6><mc-${component.componentName}></mc-${component.componentName}></div><!-- %%COMPONENT_HTML%% -->`,
          );
        fs.writeFile(`./kitchen-sinks/vanillajs/src/main.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/vanillajs/cypress/e2e/app.cy.ts', 'utf8', (err, data) => {
        const result = data.replace(
          /\/\/%%INTEGRATION_TEST%%/,
          `cy.get('mc-${component.componentName}').should('contain.text', 'Test');\n//%%INTEGRATION_TEST%%`,
        );
        fs.writeFile(`./kitchen-sinks/vanillajs/cypress/e2e/app.cy.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* KITCHEN-SINK NEXTJS */
      fs.readFile('./tools/scripts/add-new-component/kitchen-sinks/nextjs/Component.tsx', 'utf8', (err, data) => {
        const result = data
          .replace(/McComponent/g, `Mc${component.componentClassName}`)
          .replace(/Component/g, `${component.componentClassName}`)
          .replace(/mc-component/g, `mc-${component.componentName}`);
        fs.writeFile(
          `./kitchen-sinks/nextjs/src/app/components/${component.componentClassName}.tsx`,
          result,
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      fs.readFile('./kitchen-sinks/nextjs/src/app/page.tsx', 'utf8', (err, data) => {
        const result = data
          .replace(
            /\/\/%%COMPONENT_IMPORT%%/,
            `import { ${component.componentClassName} } from './components/${component.componentClassName}';\n//%%COMPONENT_IMPORT%%`,
          )
          .replace(
            /\{\/\* %%COMPONENT_HTML%% \*\/\}/,
            `<div><h6>${component.componentClassName}:</h6><${component.componentClassName} /></div>{/* %%COMPONENT_HTML%% */}`,
          );
        fs.writeFile(`./kitchen-sinks/nextjs/src/app/page.tsx`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/nextjs/cypress/e2e/app.cy.ts', 'utf8', (err, data) => {
        const result = data.replace(
          /\/\/%%INTEGRATION_TEST%%/,
          `cy.get('mc-${component.componentName}').should('contain.text', 'Test');\n//%%INTEGRATION_TEST%%`,
        );
        fs.writeFile(`./kitchen-sinks/nextjs/cypress/e2e/app.cy.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* KITCHEN-SINK SPA ANGULAR */
      fs.readFile('./tools/scripts/add-new-component/kitchen-sinks/spa-angular/component.ts', 'utf8', (err, data) => {
        const result = data
          .replace(/mds-components-core-component/g, `mds-components-core-${component.componentName}`)
          .replace(/mc-component/g, `mc-${component.componentName}`)
          .replace(/'mds-component'/g, `'mds-${component.componentName}'`)
          .replace(/Component \{\}/g, `${component.componentClassName} {}`);
        fs.writeFile(
          `./kitchen-sinks/spa-angular/src/app/components/${component.componentName}.component.ts`,
          result,
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      fs.readFile('./kitchen-sinks/spa-angular/src/app/home/home.component.html', 'utf8', (err, data) => {
        const result = data.replace(
          /<!-- %%COMPONENT_HTML%% -->/,
          `<div><h6>${component.componentClassName}:</h6><mds-${component.componentName}></mds-${component.componentName}></div><!-- %%COMPONENT_HTML%% -->`,
        );
        fs.writeFile(`./kitchen-sinks/spa-angular/src/app/home/home.component.html`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/spa-angular/src/app/home/home.component.ts', 'utf8', (err, data) => {
        const result = data
          .replace(
            /\/\/%%COMPONENT_IMPORT%%/,
            `import { ${component.componentClassName} } from './components/${component.componentName}.component';\n//%%COMPONENT_IMPORT%%`,
          )
          .replace(
            /\/\*%%COMPONENT_IMPORT_LIST%%\*\//,
            `, ${component.componentClassName} /*%%COMPONENT_IMPORT_LIST%%*/`,
          );
        fs.writeFile(`./kitchen-sinks/spa-angular/src/app/home/home.component.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      fs.readFile('./kitchen-sinks/spa-angular/cypress/e2e/app.cy.ts', 'utf8', (err, data) => {
        const result = data.replace(
          /\/\/%%INTEGRATION_TEST%%/,
          `cy.get('mc-${component.componentName}').should('contain.text', 'Test');\n//%%INTEGRATION_TEST%%`,
        );
        fs.writeFile(`./kitchen-sinks/spa-angular/cypress/e2e/app.cy.ts`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* ESBUILD ALWAYS EXTERNAL DEPENDENCY */
      fs.readFile(`./tools/scripts/esbuild-config/general.config.cjs`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const result = data.replace(
          /\/\/%%COMPONENT_ESBUILD_ALWAYS_EXTERNAL%%/,
          `'@maersk-global/mds-components-core-${component.componentName}',\n//%%COMPONENT_ESBUILD_ALWAYS_EXTERNAL%%`,
        );
        fs.writeFile(`./tools/scripts/esbuild-config/general.config.cjs`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      /* UPDATE PROJECT FILES FOR COMPONENTS WRAPPER */
      fs.readFile(`./packages/mds-components-core/project.json`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const projectData = JSON.parse(data);
        projectData.targets['build:make-mds-core'].dependsOn = [
          ...projectData.targets['build:make-mds-core'].dependsOn,
          `mc-${component.componentName}:build`,
        ];
        fs.writeFile(
          `./packages/mds-components-core/project.json`,
          JSON.stringify(projectData, null, 4),
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      /* UPDATE PROJECT FILES FOR REACT WRAPPER */
      fs.readFile(`./packages/mds-react-wrapper/project.json`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const projectData = JSON.parse(data);
        projectData.targets.build.dependsOn = [
          ...projectData.targets.build.dependsOn,
          `mc-${component.componentName}:build`,
        ];
        fs.writeFile(
          `./packages/mds-react-wrapper/project.json`,
          JSON.stringify(projectData, null, 4),
          'utf8',
          (err) => {
            if (err) return onErr(err);
          },
        );
      });
      /* LIGHTHOUSE */
      // add component to the lighthouse config file
      fs.readFile(`./lighthouse/.lighthouserc.cjs`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const result = data.replace(/\/\/%%COMPONENT_NAME%%/, `'mc-${component.componentName}',\n//%%COMPONENT_NAME%%`);
        fs.writeFile(`./lighthouse/.lighthouserc.cjs`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
      // add component to the vite config file
      fs.readFile(`./lighthouse/vite.config.mjs`, 'utf8', (err, data) => {
        if (err) return onErr(err);
        const result = data
          .replace(
            /\/\/%%COMPONENT_NAME%%/,
            `'mc-${component.componentName}': '/packages/mc-${component.componentName}/lighthouse/index.html',\n//%%COMPONENT_NAME%%`,
          )
          .replace(
            /\/\/%%COMPONENT_ALIAS%%/,
            `'@maersk-global/mds-components-core-${component.componentName}': '/packages/mc-${component.componentName}/src/index.ts',\n//%%COMPONENT_ALIAS%%`,
          );
        fs.writeFile(`./lighthouse/vite.config.mjs`, result, 'utf8', (err) => {
          if (err) return onErr(err);
        });
      });
    });
    console.log(`mc-${component.componentName} created, v${component.version}`);
  });
});

const onErr = (err) => {
  console.log(err);
  return 1;
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join('./', dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

const replacePlaceholders = (data, component) => {
  return data
    .replace(/mc-component/g, `mc-${component.componentName}`)
    .replace(/McComponent/g, `Mc${component.componentClassName}`)
    .replace(/%%component%%/g, `${component.componentName}`)
    .replace(/%%PACKAGE_NAME%%/g, `${component.componentName}`)
    .replace(/%%PACKAGE_VERSION%%/g, `${component.version}`)
    .replace(/%%STORY_NAME%%/g, `${component.componentStoryName}`);
};
