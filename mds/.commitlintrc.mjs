import nxScopes from '@commitlint/config-nx-scopes';

const { getProjects } = nxScopes.utils;

export default {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'header-max-length': [2, 'always', 400],
    'body-max-line-length': [2, 'always', 10000],
    'footer-max-line-length': [2, 'always', 10000],
    'scope-empty': [2, 'never'],
    'scope-enum': async (ctx) => [
      2,
      'always',
      [
        ...(await getProjects(ctx)),
        'deps',
        'pipeline',
        'configs',
        'scripts',
        'rebase',
        'release',
        'storybook',
        'medalia',
      ],
    ],
  },
};
