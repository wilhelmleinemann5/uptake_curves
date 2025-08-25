import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { currentYear, currentMonthFormat } from './dates';
import '../../../src/index';

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
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<mc-input-date
        value="${currentYear}-${currentMonthFormat}-10"
        .customize=${[
          { date: (date) => date.getDay() === 6, indicatorAppearance: 'warning' },
          { date: `${currentYear}-${currentMonthFormat}-25`, indicatorAppearance: 'success' },
          { date: `${currentYear}-${currentMonthFormat}-1`, indicatorAppearance: 'error' },
          //custom CSS color
          { date: `${currentYear}-${currentMonthFormat}-15`, indicatorAppearance: '#000000' },
        ]}
      ></mc-input-date
      >${renderCodePreview(preview, context)}`,
};

export default meta;
export const DayIndicators: StoryObj = {};
