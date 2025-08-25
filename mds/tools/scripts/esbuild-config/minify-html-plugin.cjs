const { minifyHTMLLiterals } = require('minify-html-literals');
const { readFile } = require('node:fs/promises');

/*
 * Copied from: https://github.com/bennypowers/lit-css due to a bug in
 * their latest version and reported security vulnerabilities.
 * This esbuild plugin minifies html in tagged template literals.
 * Pairs well with `lit-html`, `FAST`, `hybrids`, `htm`, etc.
 */
module.exports = {
  minifyHTMLLiteralsPlugin: function (options) {
    const { filter = /\.[jt]s$/, ...minifyOptions } = options ?? {};
    return {
      name: 'minifyHTMLLiterals',
      setup(build) {
        const cache = new Map();

        build.onLoad({ filter }, async ({ path }) => {
          const loader = path.match(/c?tsx?$/) ? 'ts' : 'js';
          const input = await readFile(path, 'utf8');
          const cached = cache.get(path);
          if (cached?.source === input) return cached.output;
          else {
            const result = minifyHTMLLiterals(input, minifyOptions) ?? undefined;
            const contents = result && `${result.code}\n//# sourceMappingURL=${result.map?.toUrl()}`;
            const output = result && { contents, loader };
            cache.set(path, { input, output });
            return output;
          }
        });
      },
    };
  },
};
