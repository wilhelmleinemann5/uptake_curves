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
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-notification appearance="warning" icon="emergency-light" heading="Caveat">
        When supplying the password input through a slot, keep the following in mind:
        <ul>
          <li>
            In order to ensure accessibility, the label must be supplied as a slot as well, as shown in the
            code-preview. If not, the label will not be connected to the input.
          </li>
          <li>
            The slotted approach exposes the input element from the shadow root, making it susceptible to global CSS
            styles. Use this method cautiously and increase specificity in global input styles to avoid unintended
            styling of the slotted input.
          </li>
          <li>
            Rather than using the'mc-input' element like how you tend to do, use the slotted input to hook into the
            'focus', 'blur', and 'input' events instead.
          </li>
        </ul>
      </mc-notification>
      <br />
      <mc-input>
        <label slot="label" for="password-input">Enter your password</label>
        <input slot="input" type="password" id="password-input" />
      </mc-input>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const Autocomplete: StoryObj = {};
