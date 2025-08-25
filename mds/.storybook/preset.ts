import { loadCsf } from 'storybook/internal/csf-tools';
import { serverRequire } from 'storybook/internal/common';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';

import { compileToCSF, vite as viteDynamicStoriesPlugin, STORIES_REGEX } from './tools/dynamic-stories';

const dynamicIndexer: any = {
  test: STORIES_REGEX,
  createIndex: async (fileName, opts) => {
    delete require.cache[fileName];
    const config = await serverRequire(fileName);
    const compiled = await compileToCSF(config);
    const indexed = await loadCsf(compiled, {
      ...opts,
      fileName,
    }).parse();
    return indexed.indexInputs;
  },
};

export const experimental_indexers: any[] = [dynamicIndexer];

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
export const viteFinal = async (config) =>
  mergeConfig(config, {
    plugins: [nxViteTsPaths(), viteDynamicStoriesPlugin({})],
  });
