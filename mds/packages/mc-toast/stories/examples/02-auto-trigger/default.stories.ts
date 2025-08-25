import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcToast } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Toast/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    setTimeout(() => {
      const mcToast: IMcToast = document.getElementById('mc-toast-auto') as IMcToast;
      if (mcToast && typeof mcToast.show === 'function') {
        mcToast.show();
      }
    }, 500);
    return html`${unsafeHTML(generateThemeSelector())}
      <p>
        Toast in the bottom-center position will show automatically on page load using <b>open</b> prop. <br />
        Toast in the top-right position will show automatically after 0.5s. using <b>show()</b> method.
      </p>
      <mc-toast open position="bottom-center" appearance="success">
        <mc-notification body="Toast triggered programmatically on page load"></mc-notification>
      </mc-toast>
      <mc-toast id="mc-toast-auto" position="bottom-right" appearance="error">
        <mc-notification body="Toast triggered programmatically after 0.5s."></mc-notification>
      </mc-toast>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const AutoTrigger: StoryObj = {};
