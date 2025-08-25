import fs from 'fs';
import util from 'util';
import { execShellCommand } from './utils/index.mjs';
import * as sass from 'sass';
import nodeSassImport from 'node-sass-import';

const createdir = util.promisify(fs.mkdir);
const ROOT_PATH = process.cwd();
const renderSass = util.promisify(sass.render);

const libs = [
  'maersk',
  'maersk.layouts',
  'maersk.components',
  'sealand',
  'sealand.layouts',
  'sealand.components',
  'hamburgsud',
];

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
  await execShellCommand(`rm -Rf ${ROOT_PATH}/dist/packages/mds-legacy`);
  await createDistDir(`${ROOT_PATH}/dist`);
  await createDistDir(`${ROOT_PATH}/dist/packages`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-legacy`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-legacy/css`);
  await createDistDir(`${ROOT_PATH}/dist/packages/mds-legacy/scss`);
};

const copyStaticAssets = async () => {
  await execShellCommand(`ncp ${ROOT_PATH}/packages/mds-legacy/scss ${ROOT_PATH}/dist/packages/mds-legacy/scss`);
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

export const build = async () => {
  await cleanUp();
  await copyStaticAssets();

  for (const lib of libs) {
    const result = await sassToCss(`./packages/mds-legacy/scss/${lib}.scss`, true);
    writeFile(`./dist/packages/mds-legacy/css/${lib}.min.css`, result);

    const resultExpanded = await sassToCss(`./packages/mds-legacy/scss/${lib}.scss`);
    writeFile(`./dist/packages/mds-legacy/css/${lib}.css`, resultExpanded);
  }
};

build();
