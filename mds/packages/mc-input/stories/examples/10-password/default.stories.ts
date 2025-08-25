import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const togglePassword = () => {
      const mcInput = document.querySelector('mc-input');
      if (!mcInput) return;
      if (mcInput.type === 'password') {
        mcInput.trailingicon = 'eye-slash';
        mcInput.type = 'text';
        mcInput.trailingiconlabel = 'Hide password';
      } else {
        mcInput.trailingicon = 'eye';
        mcInput.type = 'password';
        mcInput.trailingiconlabel = 'Show password';
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}<mc-input
        label="Password"
        placeholder="Insert strong password phrase"
        trailingicon="eye"
        trailingiconlabel="Show password"
        clickabletrailingicon
        clearbutton
        name="password"
        type="password"
        @trailingiconclick=${togglePassword}
      >
      </mc-input>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Password: StoryObj = {};
