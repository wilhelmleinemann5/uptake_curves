module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@maersk-global)|(@material)|(lit)|(@lit)|(@lit-labs)|(lit-element)|(lit-html)|(.*\\.mjs$))',
  ],
};
