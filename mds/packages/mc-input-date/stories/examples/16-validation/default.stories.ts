import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import { renderComponentBanner } from '@maersk-global/mds-dev-utils';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { McInputDate } from '../../../src/index';

const meta: Meta = {
  title: 'Components/Input Date/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const onInvalid = (event: Event) => {
      const target = event.target as McInputDate;
      if (target.validity.rangeOverflow) {
        target.errormessage = 'Date is overflown!';
      } else if (target.validity.rangeUnderflow) {
        target.errormessage = 'Date is underflown!';
      } else {
        target.errormessage = 'Date is invalid!';
      }
    };

    const bannerContent = html`For practical examples of validation across various frameworks, check out:
      <a href="https://github.com/Maersk-Global/mds/blob/main/kitchen-sinks/spa-vue/src/app/views/Validation.vue">Vue</a
      >,
      <a
        href="https://github.com/Maersk-Global/mds/blob/main/kitchen-sinks/spa-angular/src/app/validation/validation.component.html"
        >Angular</a
      >,
      <a href="https://github.com/Maersk-Global/mds/blob/main/kitchen-sinks/spa-react/src/app/Validation.tsx">React</a>,
      <a href="https://github.com/Maersk-Global/mds/blob/main/kitchen-sinks/vanillajs/src/validation.ts">Vanilla JS</a
      >.`;

    return html`${unsafeHTML(generateThemeSelector())} ${renderComponentBanner('', bannerContent)}
      <mc-input-date label="Birthdate" min="2024-11-02" max="2024-11-16" @invalid=${onInvalid}></mc-input-date>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Validation: StoryObj = {};
