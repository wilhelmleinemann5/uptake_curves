import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

type Column = {
  columnId: string;
  name: string;
};

function fetchColumnsWithTimeout(): Promise<Column[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { columnId: '4', name: 'Column 4' },
        { columnId: '5', name: 'Column 5' },
        { columnId: '6', name: 'Column 6' },
      ]);
    }, 1000);
  });
}

const meta: Meta = {
  title: 'Components/Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const columnsWithoutTimeout: Column[] = [
      { columnId: '1', name: 'Column 1' },
      { columnId: '2', name: 'Column 2' },
      { columnId: '3', name: 'Column 3' },
    ];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-multi-select label="Without timeout" value="2">
        ${columnsWithoutTimeout.map(
          (column) => html`<mc-option value="${column.columnId}">${column.name}</mc-option>`,
        )} </mc-multi-select
      ><mc-multi-select label="With timeout" value="5">
        ${until(
          fetchColumnsWithTimeout().then((columns) =>
            columns.map((column) => html`<mc-option value="${column.columnId}">${column.name}</mc-option>`),
          ),
          html`<span>Loading...</span>`,
        )}
      </mc-multi-select>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithTimeout: StoryObj = {};
