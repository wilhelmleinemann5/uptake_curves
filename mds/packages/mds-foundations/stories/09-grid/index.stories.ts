import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { renderComponentBanner, renderCodePreview } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import { preview, example } from './code-preview';
import { getDefaultValues } from '@maersk-global/mds-dev-utils';
import { argTypes } from './argTypes';
import { hologramStyles } from './grid-hologram';
import { componentBanner, templateStory } from './story-utils';

export default {
  title: 'Layout & navigation/Grid',
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

export const Documentation = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(hologramStyles(args))}
    <div class="wrapper">
      ${renderComponentBanner('MDS grid system', componentBanner)}
      <div>${unsafeHTML(templateStory(args, example))}</div>
      ${renderCodePreview(preview(args), context)}
    </div>`;
};
