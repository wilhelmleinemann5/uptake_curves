import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@maersk-global/community-ui-code-preview';
import { preview, template } from './code-preview';
import { getDefaultValues, renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { argTypes } from './argTypes';

export default {
  title: 'Components/Tree Navigation',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: false },
    actions: { disable: true },
    controls: { disable: false },
  },
  argTypes: { ...argTypes },
  args: {
    ...getDefaultValues(argTypes),
  },
};

export const Documentation = (args: Args, context: StoryContext) => {
  return html`${unsafeHTML(generateThemeSelector())}
    <div style="width: 252px;">${unsafeHTML(template(args))}</div>
    ${renderCodePreview(preview(args), context)} `;
};
