module.exports = {
  branches: ['main', { name: 'beta', prerelease: true }, { name: 'alpha', prerelease: true }],
  preset: 'conventionalcommits',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', section: 'Refactoring' },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
  },
  releaseRules: [
    { type: 'refactor', release: 'patch' },
    { breaking: true, release: 'minor' },
    { tag: 'Breaking', release: 'minor' },
  ],
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `./CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: `npx nx release version \${nextRelease.version} && VERSION=\${nextRelease.version} npx -p replace-json-property rjp ./package.json version \${nextRelease.version} && echo ::set-output name=nextVer::\${nextRelease.version}`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`packages/**/package.json`, `package.json`, `CHANGELOG.md`],
        message: 'chore(release): -v${nextRelease.version} \n\n${nextRelease.notes}',
      },
    ],
  ],
};
