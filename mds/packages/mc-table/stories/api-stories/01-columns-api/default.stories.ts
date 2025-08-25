import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { TableColumn } from '../../../src/lib/types';
import '../../../src/lib/index';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { preview } from './code-examples';
import '@maersk-global/community-ui-code-preview';

const columns: TableColumn[] = [
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type' },
  { id: 'available', label: 'Available' },
  { id: 'default', label: 'Default' },
  { id: 'description', label: 'Description', width: '60%' },
];

const data = [
  {
    id: 1,
    name: 'id',
    type: 'string',
    default: '-',
    available: '-',
    description: 'Unique column identifier, id of the field to be mapped in the data.',
  },
  {
    id: 2,
    name: 'label',
    type: 'string',
    default: '-',
    available: '-',
    description: 'Label displayed in the table header.',
  },
  {
    id: 3,
    name: 'align',
    type: 'TableCellAlignment',
    default: 'left',
    available: 'left | center | right',
    description: 'Aligns the cell content.',
  },
  {
    id: 4,
    name: 'verticalAlign',
    type: 'TableCellVerticalAlignment',
    default: 'middle',
    available: 'top | middle | bottom',
    description: 'Aligns the cell content vertically.',
  },
  {
    id: 5,
    name: 'width',
    type: 'string | { min: string; max: string }',
    default: '-',
    available: 'px | % | { min: string; max: string }',
    description: `Width of the column in px, %, or an object specifying a range with min and max values (e.g., { min: 100, max: 300 }).<br /> See the <a href="/?path=/story/components-table-examples-02-layout-styling--custom-column-width">Custom column width (fixed width)</a> story for implementation details around fixed width and <a href="/?path=/story/components-table-examples-02-layout-styling--max-min-column-width">Min-Max column width</a> story for implementation details around the object.`,
  },
  {
    id: 6,
    name: 'noWrap',
    type: 'boolean',
    default: 'false',
    available: 'true | false',
    description: `Disables wrapping for the cell content.<br /> See the <a href="/?path=/story/components-table-examples-02-layout-styling--no-wrap">No wrap</a> story for implementation details.`,
  },
  {
    id: 7,
    name: 'tabularFigures',
    type: 'boolean',
    default: 'false',
    available: 'true | false',
    description: `Enables tabular figures for the cell content. <br /> Displays numerical digits (0–9) with monospace typefaces - each digit has the same width.<br /> See the <a href="/?path=/story/components-table-examples-05-data-formatting--tabular-figures">Tabular figures</a> story for implementation details.`,
  },
  {
    id: 8,
    name: 'sortDisabled',
    type: 'boolean',
    default: 'false',
    available: 'true | false',
    description: `Disables sorting for the specific column.<br /> See the <a href="/?path=/story/components-table-examples-06-sorting--disable-sorting">Disable sorting</a> story for implementation details.`,
  },
  {
    id: 9,
    name: 'sorter',
    type: 'ColumnSorter',
    default: 'auto',
    available:
      'auto | alphanumeric | alphanumericCaseSensitive | text | textCaseSensitive | datetime | basic | SortingFn<unknown>',
    description: `Sorting method to use.<br /> - <b>auto</b> will try to automatically deduct the data type in a column and sort by it.<br /> - <b>alphanumeric</b> Sorts by mixed alphanumeric values without case-sensitivity. Slower, but more accurate if your strings contain numbers that need to be naturally sortchange.<br /> - <b>alphanumericCaseSensitive</b> Sorts by mixed alphanumeric values with case-sensitivity. Slower, but more accurate if your strings contain numbers that need to be naturally sortchange.<br /> - <b>text</b> Sorts by text/string values without case-sensitivity. Faster, but less accurate if your strings contain numbers that need to be naturally sortchange.<br /> - <b>textCaseSensitive</b> Sorts by text/string values with case-sensitivity. Faster, but less accurate if your strings contain numbers that need to be naturally sortchange.<br /> - <b>datetime</b> Sorts by time, use this if your values are Date objects.<br /> - <b>basic</b> Sorts using a basic/standard a > b ? -1 : b < a ? 1 : 0 comparison. This is the fastest sorting function, but may not be the most accurate.<br /> - <b>SortingFn<unknown></b> sorting will use the provided custom sorting function. The function should return the data in ascending order. Example:<br /> <code> sorter: (a, b) => {<br /> &nbsp;&nbsp;a > b ? 1 : a < b ? -1 : 0;<br /> } </code><br /> See the <a href="/?path=/story/components-table-examples-06-sorting--custom-sorting">Custom sorting</a> & <a href="/?path=/story/components-table-examples-06-sorting--manual-sorting">Manual sorting</a> stories for implementation details.`,
  },
  {
    id: 10,
    name: 'sticky',
    type: 'boolean',
    default: 'false',
    available: "true | false | 'left' | 'right'",
    description: `Whether the column is "sticky". Available options are true, 'left', 'right'. If the value is true, the column will be sticky to the left.<br /> See the <a href="/?path=/story/components-table-examples-02-layout-styling--sticky-column">Sticky column</a> story for implementation details.`,
  },
  {
    id: 11,
    name: 'columns',
    type: 'TableColumn[]',
    default: '-',
    available: '-',
    description: `Nested columns. If a column has other columns, it will be treated as a "parent" and group the "children" columns. <br /> See the <a href="/?path=/story/components-table-examples-03-header--header-groups">Header groups</a> story for implementation details.`,
  },
  {
    id: 12,
    name: 'footerColspan',
    type: 'number',
    default: '-',
    available: '-',
    description: `Colspan for the footer cell. <br /> See the <a href="/?path=/story/components-table-examples-04-footer--footer-colspan">Footer colspan</a> story for implementation details.`,
  },
  {
    id: 13,
    name: 'description',
    type: 'string',
    default: '-',
    available: '-',
    description: `A description for the column. Will be rendered as a tooltip on header hover.`,
  },
  {
    id: 14,
    name: 'descriptionWidth',
    type: 'number',
    default: '350',
    available: '-',
    description: `Max width of the column description in px.`,
  },
  {
    id: 15,
    name: 'subDataKey',
    type: 'string',
    default: '',
    available: '-',
    description:
      'A key to get the sub data from the data object i.e. vesselType. It is recommended to use `subDataKey` together with `subDataLabel`, but not necessary.',
  },
  {
    id: 16,
    name: 'subDataLabel',
    type: 'string',
    default: '',
    available: '-',
    description:
      'A label of the sub data. Will be displayed as a sub header. It is recommended to use `subDataLabel` together with `subDataKey`, but not necessary',
  },
  {
    id: 17,
    name: 'rowClickDisabled',
    type: 'boolean',
    default: 'false',
    available: 'true | false',
    description: `Disables row click event from being dispatched when clicking in this column. See the <a href="/?path=/story/components-table-examples-99-advanced--disable-row-click-event">Disable row click event</a> story for implementation details.`,
  },
  {
    id: 18,
    name: 'headerTemplate',
    type: 'string | ((details: HeaderTemplateDetails) => TemplateResult)',
    default: '-',
    available: '-',
    description: `Custom template for the column header. Can be a string or a function that returns a Lit template. The function receives a details object with the following properties:
    <ul>
      <li><code>column</code>: The column configuration (TableColumn)</li>
      <li><code>html</code>: The Lit html template tag function</li>
    </ul>
    See the <a href="/?path=/story/components-table-examples-11-custom-renderers--header-and-cell-templates">Custom renderers</a> story for implementation details.`,
  },
  {
    id: 19,
    name: 'cellTemplate',
    type: 'string | ((details: CellTemplateDetails) => TemplateResult)',
    default: '-',
    available: '-',
    description: `Custom template for the column cells. Can be a string or a function that returns a Lit template. The function receives a details object with the following properties:
    <ul>
      <li><code>value</code>: The raw cell value</li>
      <li><code>rowData</code>: The entire row data object</li>
      <li><code>column</code>: The column configuration (TableColumn)</li>
      <li><code>html</code>: The Lit html template tag function</li>
    </ul>
    See the <a href="/?path=/story/components-table-examples-11-custom-renderers--header-and-cell-templates">Custom renderers</a> story for implementation details.`,
  },
];

const meta: Meta = {
  title: 'Components/Table/Documentation API',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <p>
        The table below documents the column options that can be passed to the table. <br />See
        <a href="/?path=/story/components-table--binding-data-columns">Binding data & columns</a> for how to apply
        column options and bind data to the table.
      </p>
      <br />
      <mc-table sortdisabled verticalalign="top" .data=${data} .columns=${columns as TableColumn[]}>
        ${data.map((row) => html` <div slot="${row.id}_description">${unsafeHTML(row.description)}</div> `)}
      </mc-table>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const ColumnOptions: StoryObj = {};
