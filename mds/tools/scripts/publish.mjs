/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * This script is executed on "dist/path/to/library" as "cwd" by default.
 *
 * You might need to authenticate with NPM before running this script.
 */

import { execSync, exec } from 'child_process';
import devkit from '@nx/devkit';
import fs from 'fs';
import path from 'path';

const { readCachedProjectGraph } = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function getPackage(directory) {
  const packageJson = path.resolve(directory, 'package.json');

  if (fs.existsSync(packageJson)) {
    return JSON.parse(fs.readFileSync(packageJson));
  }
  return 'No package.json file found';
}

// Executing publish script: node path/to/publish.mjs {name} --version {version} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name] = process.argv;

const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(project, `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`);

const outputPath = project.data?.targets?.release?.options?.outputPath;
invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
);

const packageJson = getPackage(outputPath);
process.chdir(outputPath);

const tag = `${packageJson.name}@${packageJson.version}`;

exec(`npm view ${tag} version`, (error, stdout, stderr) => {
  if (stderr.includes('code E404') || (!error && stdout.trim() !== packageJson.version.trim())) {
    console.info(`${tag} does not exist. Publishing...`);

    if (tag.includes('alpha')) {
      execSync(`npm publish --tag alpha`);
    } else if (tag.includes('beta')) {
      execSync(`npm publish --tag beta`);
    } else {
      execSync(`npm publish`);
    }
  } else if (error) {
    console.error('Something went wrong while checking the current version.');
    console.log(stdout);
    console.error(stderr);
  } else {
    console.info('Already up-to-date.');
  }
});
