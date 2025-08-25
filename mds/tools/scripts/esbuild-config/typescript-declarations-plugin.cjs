const ts = require('typescript');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

function typescriptDeclarationsPlugin() {
  return {
    name: 'typescript-declarations',
    setup(build) {
      build.onEnd((result) => {
        if (result.errors.length > 0) return;
        const entryPointDir = path.dirname(build.initialOptions.entryPoints[0]);
        const rootDir = path.resolve(entryPointDir, '../');
        const distDir = build.initialOptions.outdir;
        const componentName = path.basename(distDir);
        const isComponent = componentName.startsWith('mds-components-core-');
        const typesOutDir = `${componentName}-types`;
        const tscTypesOutDir = isComponent ? `--outDir ../../dist/packages/${typesOutDir}` : '';

        execSync(`rimraf ${distDir}/src`);

        // Create the type declaration of the barrel file
        const barrelFileTypeDeclaration = "export * from './src';";
        const barrelFilePath = path.join(distDir, 'index.d.ts');
        fs.writeFileSync(barrelFilePath, barrelFileTypeDeclaration);

        // Create the type declaration of the component types
        const componentTypesTypeDeclaration = "export * from './src/lib/types';";
        const componentTypesFilePath = path.join(distDir, 'types.d.ts');
        fs.writeFileSync(componentTypesFilePath, componentTypesTypeDeclaration);

        execSync(
          `tsc --project ${path.join(
            rootDir,
            'tsconfig.lib.json',
          )} ${tscTypesOutDir} --declaration --declarationMap --emitDeclarationOnly`,
          {
            cwd: rootDir,
          },
        );

        // Move the generated type declarations from mc-component-name into mds-components-core-component-name
        if (isComponent) {
          const sourceDir = path.join(
            'dist',
            'packages',
            typesOutDir,
            'packages',
            componentName.replace('mds-components-core-', 'mc-'),
          );
          const targetDir = path.join('dist', 'packages', componentName);

          fs.copySync(sourceDir, targetDir);
          fs.removeSync(path.join('dist', 'packages', typesOutDir));
        }
      });
    },
  };
}

module.exports = typescriptDeclarationsPlugin;
