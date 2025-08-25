const generalConfig = require('./general.config.cjs');
const fs = require('fs');
const path = require('path');

/** @type {import('esbuild').BuildOptions}  */
module.exports = {
  ...generalConfig,
  bundle: false,
  plugins: [
    ...generalConfig.plugins,
    {
      name: 'add-js-extension',
      setup(build) {
        build.onLoad({ filter: /.*/ }, (args) => {
          let contents = fs.readFileSync(args.path, 'utf8');
          contents = contents.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
            if (p1.startsWith('.') && args.path.endsWith('.ts')) {
              const fullPath = path.resolve(path.dirname(args.path), p1);
              if (fs.existsSync(fullPath)) {
                // it's a directory
                return `from '${p1}/index.js'`;
              } else {
                // it's a file
                return `from '${p1}.js'`;
              }
            }

            return match;
          });
          return { contents, loader: 'default' };
        });
      },
    },
  ],
};
