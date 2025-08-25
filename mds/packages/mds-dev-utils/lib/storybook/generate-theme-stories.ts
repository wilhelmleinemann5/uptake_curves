import { themes } from '../themes';
import { StoryConfig, StoryConfigs } from './types';
import { toTitleCase } from './generate-state';

export const generateThemeStories = (content: string, titleSufix?: string, script = ''): StoryConfigs => {
  const stories: StoryConfigs = {};
  themes.forEach((theme) => {
    const themeName = theme.storybookName === 'MaerskDark' ? 'dark' : 'light';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const themeBasePath = (process.env as any).NODE_ENV === 'development' ? '../dist/packages/' : '/packages/';

    stories[`${theme.storybookName}${titleSufix ? toTitleCase(titleSufix) : ''}`] = `() => { 
        ${script} 
        return '<link rel="stylesheet" href="${themeBasePath}mds-foundations/css/foundations.css"><link rel="stylesheet" href="${themeBasePath}mds-design-tokens/maersk/${themeName}/css/design-tokens-px.css"><div id="story-content">${content}</div>';
      }` as StoryConfig;
  });

  return stories;
};
