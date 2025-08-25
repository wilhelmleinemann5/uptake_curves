import { DynamicConfig, StoryConfig } from '@maersk-global/mds-dev-utils/src/lib/storybook/types';

const prepareStory = (story: StoryConfig) => {
  return story;
};

export interface CompileOptions {}

export const compileToCSF = async (config: DynamicConfig, options?: CompileOptions) => {
  const { baseCsf } = config;
  const stories = await config.stories();

  let code = baseCsf;
  Object.entries(stories).forEach(([key, story]) => {
    code += `export const ${key} = ${prepareStory(story)};\n`;
  });

  return code;
};
