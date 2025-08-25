import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../../src/index';
import data from '../../../data';

const meta: Meta = {
  title: 'Components/Table/Examples/01-Basic',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data}></mc-table>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const SimpleTable: StoryObj = {};
