import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

export default {
  title: 'Utility components/Error/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-error invalid
        >Error message as HTML with custom
        <a class="mds-error__text-color" href="https://designsystem.maersk.com/components/button/index.html"
          >link</a
        ></mc-error
      >
      ${renderCodePreview(preview, context)} `;
  },
};
export const Slot: StoryObj = {};
