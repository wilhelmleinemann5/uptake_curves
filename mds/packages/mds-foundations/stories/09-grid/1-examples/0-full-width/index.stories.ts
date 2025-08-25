import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { renderComponentBanner, getDefaultValues } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { argTypes } from '../../examples-arg-types';
import { hologramStyles } from '../../grid-hologram';
import { preview, example } from './code-preview';
import { templateStory } from '../../story-utils';
import { componentBanner } from '../../story-utils';

export default {
  title: 'Layout & navigation/Grid/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: false },
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};

export const FullWidth = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(hologramStyles(args))}
    <div class="wrapper">
      ${renderComponentBanner('MDS grid system', componentBanner)} ${unsafeHTML(templateStory(args, example))}
      ${renderCodePreview(preview, context)}
    </div>`;
};
