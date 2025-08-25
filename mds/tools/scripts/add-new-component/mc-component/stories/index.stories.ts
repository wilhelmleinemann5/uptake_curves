import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from 'storybook/actions';
import { argTypes } from './argTypes';
import { cssParts, slots } from './slots-css-parts';
import {
  getDefaultValues,
  generateCode,
  generateThemeSelector,
  renderExperimentalBanner,
  renderCodePreview,
} from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
// components
import '../src/index.ts';

export default {
  title: 'Experiments/%%STORY_NAME%%/Documentation',
  component: 'mc-component',
  parameters: {
    slots,
    cssParts,
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};
export const Documentation = (args: Args, context: StoryContext) => {
  const code = generateCode('mc-component', argTypes, args);
  return html`${unsafeHTML(generateThemeSelector())} ${renderExperimentalBanner()}
    <mc-component
      .fit=${args.fit}
      .myprop=${args.myprop}
      @myevent="${(event) => action('myevent')(event.detail)}"
    ></mc-component>
    ${renderCodePreview(code, context)} `;
};
