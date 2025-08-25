import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Notification/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const closed = (event) => event.target.remove();
    return html`${unsafeHTML(generateThemeSelector())}<mc-notification
        appearance="success"
        heading="Heading"
        closable
        @close=${closed}
      ></mc-notification
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Closable: StoryObj = {};
