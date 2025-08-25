import { fit, eventtype } from '@maersk-global/mds-dev-utils';
import data from './data';
import columns from './columns-with-cell-renderers';

function getBorderStylePropValue(name: string, description: string, defaultValue: string): Record<string, unknown> {
  return {
    name: name,
    type: { required: false },
    defaultValue: defaultValue,
    description: description,
    table: {
      category: 'Style',
      type: { summary: 'dotted | dashed | solid | none' },
      defaultValue: { summary: defaultValue },
    },
    options: ['dotted', 'dashed', 'solid', 'none'],
    control: {
      type: 'select',
    },
  };
}

export default {
  // Data & Columns
  data: {
    name: 'data',
    type: { required: true },
    defaultValue: data,
    description: 'An array of objects containing the data to be rendered by the table',
    table: {
      category: 'Data & Columns',
    },
    control: {
      type: 'array',
    },
  },
  columns: {
    name: 'columns',
    type: { required: false },
    defaultValue: columns,
    description:
      "Find a `columns` API detail description in the <a href='/?path=/story/components-table-documentation-api--column-options'>Columns Documentation</a> story. An array of <a href='https://github.com/Maersk-Global/mds/blob/main/packages/mc-table/src/lib/types.ts#L359' target='_blank'>TableColumn</a> objects informing the table how to render columns and it's data cells. \n\nIf no columns are passed, the table will infer columns from the first row of data.",
    table: {
      category: 'Data & Columns',
    },
    control: {
      type: 'array',
    },
  },
  datakey: {
    name: 'datakey',
    type: { required: false },
    defaultValue: 'id',
    description: 'The unique data key field name.\n\nIf not supplied the table will create a key field called "id"',
    table: {
      category: 'Data & Columns',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  // Header
  headerhidden: {
    name: 'headerhidden',
    type: { required: false },
    defaultValue: false,
    description: 'Hide the table header',
    table: {
      category: 'Header',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  headersticky: {
    name: 'headersticky',
    type: { required: false },
    defaultValue: false,
    description: 'Make the header row "sticky"',
    table: {
      category: 'Header',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  // Footer
  footer: {
    name: 'footer',
    type: { required: false },
    defaultValue: false,
    description: 'Show a table footer.',
    table: {
      category: 'Footer',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  footersticky: {
    name: 'footersticky',
    type: { required: false },
    defaultValue: false,
    description: 'Make the footer row "sticky"',
    table: {
      category: 'Footer',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  // Content
  caption: {
    name: 'caption',
    type: { required: false },
    defaultValue: 'A caption to describe the table below',
    description:
      'The caption to describe the table can be passed as a property or as a slot\n\n`<div slot="caption">This is a caption</div>`',
    table: {
      category: 'Content',
      type: { summary: 'string | slot' },
    },
    control: {
      type: 'text',
    },
  },
  // Style
  fit,
  zebrastripes: {
    name: 'zebrastripes',
    type: { required: false },
    defaultValue: false,
    description: 'Zebra stripes',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  outerborderstyle: getBorderStylePropValue('outerborderstyle', 'Style applied to outer border.', 'solid'),
  verticallinestyle: getBorderStylePropValue('verticallinestyle', 'Border style applied to vertical lines.', 'none'),
  horizontallinestyle: getBorderStylePropValue(
    'horizontallinestyle',
    'Border style applied to horizontal lines.',
    'solid',
  ),
  disablerowhighlightonhover: {
    name: 'disablerowhighlightonhover',
    type: { required: false },
    defaultValue: false,
    description: 'Disable highlight a row on mouse hover',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  nowrap: {
    name: 'nowrap',
    type: { required: false },
    defaultValue: false,
    description: 'Enforces a default "nowrap" on cells',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  verticalalign: {
    name: 'verticalalign',
    type: { required: false },
    defaultValue: 'middle',
    description: 'Vertical alignment of cells',
    table: {
      category: 'Style',
      type: { summary: 'top | middle | baseline | bottom' },
      defaultValue: { summary: 'middle' },
    },
    options: ['top', 'middle', 'baseline', 'bottom'],
    control: {
      type: 'select',
    },
  },
  height: {
    name: 'height',
    type: { required: false },
    defaultValue: 'auto',
    description: 'Height\n\n The width is determined by the parent container.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  disableoverflow: {
    name: 'disableoverflow',
    type: { required: false },
    defaultValue: false,
    description: 'Disables the default overflow "hidden" of the table',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  // Column visibility
  hidecolumns: {
    name: 'hidecolumns',
    type: { required: false },
    defaultValue: [],
    description: 'Column Ids to hide.',
    table: {
      category: 'Column visibility',
      defaultValue: { summary: [] },
    },
    control: {
      type: 'array',
    },
  },
  eventHiddenColumns: eventtype(
    'hidecolumnschange',
    'Dispatched when a column is hid/shown with the current hidecolumns state as detail.',
    'Column visibility',
  ),
  // Sorting
  sortdefaultcolumnid: {
    name: 'sortdefaultcolumnid',
    type: { required: false },
    defaultValue: 'capacity',
    description:
      'Default sort column. Will default to the first column. If you wish to see it in effect in StoryBook, please set it and refresh the page.',
    table: {
      category: 'Sorting',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  sortdefaultdirection: {
    name: 'sortdefaultdirection',
    type: { required: false },
    defaultValue: 'ascending',
    description:
      'Default sort direction\n\nvalues: `ascending` `descending`. If you wish to see it in effect in StoryBook, please set it and refresh the page.',
    table: {
      category: 'Sorting',
      type: { summary: 'string' },
    },
    options: ['ascending', 'descending'],
    control: {
      type: 'select',
    },
  },
  sortdisabled: {
    name: 'sortdisabled',
    type: { required: false },
    defaultValue: false,
    description: 'Disable sorting',
    table: {
      category: 'Sorting',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  sortmanual: {
    name: 'sortmanual',
    type: { required: false },
    defaultValue: false,
    description:
      'Enables manual sorting for the table. If this is true, you will be expected to sort your data before it is passed to the table. This is useful if you are doing server-side sorting. Find an example in the <b>06-Sorting</b> under Examples.',
    table: {
      category: 'Sorting',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  sortdisableoninitialload: {
    name: 'sortdisableoninitialload',
    type: { required: false },
    defaultValue: false,
    description:
      'Disables sorting on the initial load of the table, so the data is shown in the same order as passed via. data prop. User is still able to see sorting (arrow) buttons, and manually trigger sorting on every column.',
    table: {
      category: 'Sorting',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  eventSorted: eventtype(
    'sortchange',
    'The event dispatches when `sortmanual` is enabled. Check "Manual sorting" story under examples to see how to listen to the event.',
    'Sorting',
  ),
  // Pagination
  currentpage: {
    name: 'currentpage',
    type: { required: false },
    defaultValue: 0,
    description:
      'Current page to show from the data past to the table. When less than one, all records will be displayed.',
    table: {
      category: 'Pagination',
      type: { summary: 'number' },
    },
    control: {
      type: 'number',
    },
  },
  recordsperpage: {
    name: 'recordsperpage',
    type: { required: false },
    defaultValue: 20,
    description: 'Number or records per page',
    table: {
      category: 'Pagination',
      type: { summary: 'number' },
    },
    control: {
      type: 'number',
    },
  },
  // Selection
  select: {
    name: 'select',
    type: { required: false },
    defaultValue: false,
    description: 'Show a row selector checkbox column',
    table: {
      category: 'Row selection',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  selectalllabel: {
    name: 'selectalllabel',
    type: { required: false },
    defaultValue: 'Select all rows',
    description: 'Label for "select all rows" checkbox',
    table: {
      category: 'Row selection',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  selectlabel: {
    name: 'selectlabel',
    type: { required: false },
    defaultValue: 'Select row',
    description: 'Label for "select row" checkbox',
    table: {
      category: 'Row selection',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  selected: {
    name: 'selected',
    type: { required: false },
    defaultValue: [],
    description: 'Can be used to set selected rows programatically. Pass data objects that you want to select.',
    table: {
      category: 'Row selection',
      defaultValue: { summary: [] },
    },
    control: {
      type: 'array',
    },
  },
  selectrowdisabled: {
    name: 'selectrowdisabled',
    type: { required: false },
    defaultValue: [],
    description: 'Disables the selection of disabled rows',
    table: {
      category: 'Row selection',
      defaultValue: { summary: [] },
    },
    control: {
      type: 'array',
    },
  },
  selectsticky: {
    name: 'selectsticky',
    type: { required: false },
    defaultValue: false,
    description: 'Make the row selector column "sticky"',
    table: {
      category: 'Row selection',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  eventRowSelectionChange: eventtype(
    'selectchange',
    'The event dispatches when the row is selected or deselected. Check "Row selector" story under Examples.',
    'Row selection',
  ),
  eventRowClick: eventtype('rowclick', 'The event dispatches when a row is clicked.', 'Row selection'),
  eventRowMouseEnter: eventtype('rowmouseenter', 'The event dispatches when the cursor enters a row.', 'Row selection'),
  eventRowMouseLeave: eventtype('rowmouseleave', 'The event dispatches when the cursor leaves a row.', 'Row selection'),
  eventRowSelected: eventtype('rowselected', 'The event dispatches when a row is selected.', 'Row selection'),
  eventRowDeselected: eventtype('rowdeselected', 'The event dispatches when a row is deselected.', 'Row selection'),
  // Exapansion
  expand: {
    name: 'expand',
    type: { required: false },
    defaultValue: false,
    description:
      'When true, will enable row expansion for provided slots, check the <b>07-Expansion</b> stories under Example for more.',
    table: {
      category: 'Row expansion',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  expandopened: {
    name: 'expandopened',
    type: { required: false },
    defaultValue: [],
    description: 'Can be used to set expanded rows programmatically. Pass data objects that you want to select.',
    table: {
      category: 'Row expansion',
      defaultValue: { summary: [] },
    },
    control: {
      type: 'array',
    },
  },
  expandpadding: {
    name: 'expandpadding',
    type: { required: false },
    defaultValue: 'default',
    description: 'Padding for expanded rows. `default` will apply the default padding, `none` will remove padding.',
    table: {
      category: 'Row expansion',
      defaultValue: { summary: 'default' },
    },
    options: ['default', 'none'],
    control: {
      type: 'select',
    },
  },
  expandtriggerlabel: {
    name: 'expandtriggerlabel',
    type: { required: false },
    defaultValue: 'Expand row',
    description: 'Label for "expand row" button. the label is hidden and only used for screen readers.',
    table: {
      category: 'Row expansion',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  expandsticky: {
    name: 'expandsticky',
    type: { required: false },
    defaultValue: false,
    description: 'Make the row expansion column "sticky"',
    table: {
      category: 'Row expansion',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  eventRowExpansionChange: eventtype(
    'expandchange',
    'The event dispatches when the row is expanded or collapsed. Check "Row expansion" story under Examples.',
    'Row expansion',
  ),
  eventRowExpanded: eventtype('rowexpanded', 'The event dispatches when a row is expanded.', 'Row expansion'),
  eventRowCollapsed: eventtype('rowcollapsed', 'The event dispatches when a row is collapsed.', 'Row expansion'),
  stateslotheight: {
    name: 'stateslotheight',
    type: { required: false },
    defaultValue: 'auto',
    description: 'Height of state slot in the table body',
    table: {
      category: 'Style',
      defaultValue: { summary: 'auto' },
    },
    control: {
      type: 'text',
    },
  },
  customstyles: {
    name: 'customstyles',
    type: { required: false },
    defaultValue: '',
    description: 'Custom CSS styles that can be used to customize table rows etc.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  disableroundedcorners: {
    name: 'disableroundedcorners',
    type: { required: false },
    defaultValue: false,
    description: 'Disables rounded corners',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  disableplaceholderfooters: {
    name: 'disableplaceholderfooters',
    type: { required: false },
    defaultValue: false,
    description:
      'By default table will render "placeholder" footers for the select and expand columns. You can disable them by setting the "disableplaceholderfooters" attribute to true.',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  resetscrollonpagechange: {
    name: 'resetscrollonpagechange',
    type: { required: false },
    defaultValue: false,
    description: 'Table will scroll to top left after page change.',
    table: {
      category: 'Pagination',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
  truncate: {
    name: 'truncate',
    type: { required: false },
    defaultValue: false,
    description: 'Truncate the text with ellipsis based on the width of the column when enabled.',
    table: {
      category: 'Style',
      defaultValue: { summary: 'false' },
    },
    control: {
      type: 'boolean',
    },
  },
};
