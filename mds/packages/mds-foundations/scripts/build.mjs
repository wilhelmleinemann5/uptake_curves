import fs from 'fs';
import util from 'util';
import {
  execShellCommand,
  generateBreakpointSassVariables,
  generateGapUtilityClasses,
  buildCssClassList,
  buildSassMixinList,
} from './utils/index.mjs';
import * as sass from 'sass';
import nodeSassImport from 'node-sass-import';

const createdir = util.promisify(fs.mkdir);
const ROOT_PATH = process.cwd();
const renderSass = util.promisify(sass.render);

const createDistDir = async (path) => {
  let dir;
  try {
    dir = await createdir(path);
  } catch (err) {
    return err;
  }
  return dir;
};

const cleanUp = async () => {
  await execShellCommand(`rm -Rf ${ROOT_PATH}/dist/packages/mds-foundations`);
  await createDistDir(`${ROOT_PATH}/dist`);
  await createDistDir(`${ROOT_PATH}/dist/packages`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-foundations`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-foundations/css`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-foundations/scss`);
};

const copyStaticAssets = async () => {
  await execShellCommand(
    `ncp ${ROOT_PATH}/packages/mds-foundations/scss ${ROOT_PATH}/dist/packages/mds-foundations/scss`,
  );
};

const sassToCss = async (sassFile, compress) => {
  const result = await renderSass({
    file: sassFile,
    importer: nodeSassImport,
    outputStyle: compress ? 'compressed' : 'expanded',
  });
  return result.css.toString();
};

const writeFile = (path, data) => {
  return fs.writeFile(path, data, (err) => {
    if (!err) {
      console.log(`${path} saved`);
    } else {
      console.log(err);
    }
  });
};

const buildFoundations = async () => {
  const result = await sassToCss(`./packages/mds-foundations/scss/index.scss`, true);
  writeFile(`./dist/packages/mds-foundations/css/foundations.min.css`, result);

  const resultExpanded = await sassToCss(`./packages/mds-foundations/scss/index.scss`);
  writeFile(`./dist/packages/mds-foundations/css/foundations.css`, resultExpanded);
};

const buildParts = async (parts) => {
  for (let i = 0; i < parts.length; i++) {
    let result = await sassToCss(`./packages/mds-foundations/scss/${parts[i]}.scss`, true);
    writeFile(`./dist/packages/mds-foundations/css/${parts[i]}.min.css`, result);

    let resultExpanded = await sassToCss(`./packages/mds-foundations/scss/${parts[i]}.scss`);
    writeFile(`./dist/packages/mds-foundations/css/${parts[i]}.css`, resultExpanded);
  }
};

export const build = async () => {
  await cleanUp();
  generateBreakpointSassVariables();
  generateGapUtilityClasses();
  await copyStaticAssets();

  await buildFoundations();
  await buildParts([
    '_base-grid',
    '_breadcrumb',
    '_color',
    '_container-grid',
    '_content',
    '_flex',
    '_gap',
    '_horizontal-rule',
    '_layout',
    '_link',
    '_list',
    '_normalize',
    '_reset',
    '_slot',
    '_svg',
    '_table',
    '_tree-nav',
    '_typography',
    '_viewport-grid',
  ]);
  buildCssClassList();
  buildSassMixinList();
};

build();
