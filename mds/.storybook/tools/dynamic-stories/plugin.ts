import { createUnplugin } from 'unplugin';
import { serverRequire } from 'storybook/internal/common';
import { compileToCSF, CompileOptions } from './compile';

export const STORIES_REGEX = /\.(vr|accessibility).spec\.[tj]s?/;

const logger = console;

export const dynamicStoriesPlugin = createUnplugin<CompileOptions>((options) => {
  return {
    name: 'dynamic-stories',
    enforce: 'pre',
    loadInclude(id) {
      return STORIES_REGEX.test(id);
    },
    async load(fileName) {
      delete require.cache[fileName];
      const config = await serverRequire(fileName);
      const result = await compileToCSF(config, options);
      return result;
    },
  };
});

export const { esbuild } = dynamicStoriesPlugin;
export const { webpack } = dynamicStoriesPlugin;
export const { rollup } = dynamicStoriesPlugin;
export const { vite } = dynamicStoriesPlugin;
