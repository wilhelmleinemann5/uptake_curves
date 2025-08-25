import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { minify } from 'csso';
import { minifyHTMLLiteralsPlugin } from './minify-html-plugin.cjs';

esbuild
  .build({
    format: 'esm',
    entryPoints: ['./dist/packages/mds-components-core/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'browser',
    outfile: './dist/packages/mds-components-core/index.bundle.esm.min.js',
    tsconfig: './packages/mds-components-core/tsconfig.lib.json',
    plugins: [
      sassPlugin({
        type: 'lit-css',
        transform: (source) => minify(source).css,
      }),
      minifyHTMLLiteralsPlugin(),
    ],
  })
  .then(() => {
    console.log('esbuild completed successfully.');
  })
  .catch((error) => {
    console.error('esbuild failed:', error);
  });
