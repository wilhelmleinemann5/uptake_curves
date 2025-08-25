import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { currentYear, currentMonthFormat } from './dates';
const customStyles = `
.available { 
  background-color: green;
}

.weekday {
  color: green;
}
`;
const customize = [
  { date: '2024-07-12', customClasses: 'holiday friday' },
  { date: (date: Date) => date.getDay() === 0, customClasses: ['holiday', 'weekend'] },
];
const meta: Meta = {
  title: 'Components/Calendar/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html` ${unsafeHTML(generateThemeSelector())}<mc-calendar
        value="${currentYear}-${currentMonthFormat}-10"
        .customstyles="${customStyles}"
        .customize=${customize}
      ></mc-calendar>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const StyleUsingCustomStyles: StoryObj = {};
