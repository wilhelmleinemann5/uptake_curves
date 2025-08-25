import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { minify } from 'csso';
import { minifyHTMLLiteralsPlugin } from './minify-html-plugin.cjs';

const alwaysExternal = [
  '@floating-ui/dom',
  '@lit-labs/observers',
  '@lit/react',
  '@lit/reactive-element',
  '@maersk-global/icons',
  '@maersk-global/mds-design-tokens',
  '@maersk-global/mds-foundations',
  '@tanstack',
  'animejs',
  'dayjs',
  'imask',
  'lit-element',
  'lit-html',
  'lit',
  'react-dom',
  'react',
];

esbuild
  .build({
    entryPoints: ['./dist/packages/mds-components-core/index.js'],
    external: [...alwaysExternal],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: './dist/packages/mds-components-core/index.bundle.js',
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
