/**
 * Global Custom Elements Manifest configuration for MDS components
 * This config can be used by all packages to ensure consistent metadata generation
 */

export default {
  // Only analyze source files, exclude tests, stories, and build outputs
  globs: [
    'src/**/*.ts',
    '!src/**/*.stories.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/tests/**/*',
    '!src/**/stories/**/*',
  ],

  // Exclude specific files/patterns
  exclude: [
    'dist/**/*',
    'node_modules/**/*',
    'coverage/**/*',
    '**/*.d.ts',
    'src/index.ts', // Often just re-exports, not component definitions

    // Test and story files
    'stories/**/*',
    'tests/**/*',
    '**/*.stories.ts',
    '**/*.spec.ts',
    '**/*.test.ts',

    // Styles and types file as they are already included in the component metadata
    '**/styles/*',
    // '**/types.ts',
  ],

  // Enable Lit element support
  litelement: true,

  // Output configuration
  outdir: '.', // Will be overridden by individual packages

  // Include package.json information
  packagejson: false, // We handle this manually since we use custom output directories

  // Development mode (set to false for production builds)
  dev: false,

  // Watch mode (set to false for build scripts)
  watch: false,

  // Include dependencies information
  dependencies: false,

  // Quiet mode (reduce logging)
  quiet: false,

  // Additional options for better metadata extraction
  features: [
    // Component identification
    'element-name',
    'class-name',
    'superclass',
    // Component API
    'members',
    'methods',
    'fields',
    'attributes',

    // Web Component specifics
    'events',
    'slots',
    'css-custom-properties',
    'css-parts',

    // Documentation
    'jsdoc',
    'parameters',
    'return-type',
    'types',

    // Additional metadata
    'static-methods',
    'static-fields',
  ],
};
