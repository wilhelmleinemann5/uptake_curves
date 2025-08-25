import type { Fit } from '@maersk-global/mds-shared-types';
import type { ColumnDef, RowData, TableState, BuiltInSortingFn, TableOptions, Header, Row } from '@tanstack/table-core';
import { TemplateResult } from 'lit';

type Meta = {
  align?: 'center' | 'left' | 'right' | 'space-between';
};

declare module '@tanstack/table-core' {
  // Internal private interface defined for TanStack to work well with TypeScript.
  // TableColumn definition can be found below.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    noWrap?: boolean;
    align?: TableCellAlignment;
    verticalAlign?: TableCellVerticalAlign;
    tabularFigures?: boolean;
    width?: string | { min: string; max: string };
    sizeUnit?: string;
    meta?: Meta;
    header?: string;
    id?: string;
    sticky?: StickyColumn;
    footerColspan?: number;
    renderAsHeader?: boolean;
    dataType?: DataType;
    sortDisabled?: boolean;
    description?: string;
    descriptionWidth?: number;
    subDataKey?: string;
    subDataLabel?: string;
    originalWidth?: string | { min: string; max: string };
    minWidth?: string;
    maxWidth?: string;
    rowClickDisabled?: boolean;
    rowspan?: number;
    colspan?: number;
    truncate?: boolean;
  }
}

export declare type TableBorderStyle = 'dotted' | 'dashed' | 'solid' | 'none';
export declare type TableVerticalAlign = 'top' | 'middle' | 'bottom';
export declare type TableCellAlignment = 'left' | 'right' | 'center';
export declare type TableCellVerticalAlign = 'top' | 'middle' | 'bottom';
export declare type TableSortDirection = 'ascending' | 'descending';
export declare type AriaSort = 'ascending' | 'descending' | 'none' | 'other';
export declare type ColumnSorter = 'auto' | ((a: unknown, b: unknown) => number) | BuiltInSortingFn;
export declare type TableData = Array<Record<string, any>> | null; // eslint-disable-line @typescript-eslint/no-explicit-any
export declare type RowExpansionPadding = 'default' | 'none';
export declare type StickyColumn = true | false | 'left' | 'right';

export interface IMcTableSortChangeDetail {
  readonly column: string;
  readonly direction: TableSortDirection;
  readonly sortedData: unknown[];
}

export interface IMcTableRowClickDetail {
  readonly currentTarget: EventTarget | null;
  readonly rowData: unknown;
}

export interface UpdateParameters {
  state?: Partial<TableState>;
  data?: Record<string, any>[] | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  columns?: ColumnDef<RowData, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  tableOptions?: Partial<TableOptions<RowData>>;
}

export interface DataType {
  type: 'number' | 'string';
  options?: Intl.NumberFormatOptions;
  formatter?: (cellValue: any, row: Row<any>) => string; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Configuration for a cell that should span multiple rows and/or columns
 */
export interface SpanConfig {
  /**
   * The key of the cell that should span in format "{rowId}_{columnId}"
   */
  cellDataKey: string;
  /**
   * Number of rows this cell should span
   */
  rowspan?: number;
  /**
   * Number of columns this cell should span
   */
  colspan?: number;
}

export interface IMcTable {
  /**
   * An array of objects containing the data to be rendered by the table.
   * @example
    [
      {
        "id": 1,
        "name": "Madrid Maersk",
        "type": "Container ship",
        "built": "2017",
        "length": 399,
      },
      {
        "id": 2,
        "name": "Mary Maersk",
        "type": "Container ship",
        "built": "2013",
        "length": 399,
      }
    ]
   *
   * @default []
   */
  data: TableData;
  /**
   * Configuration for cells that should span multiple rows and/or columns.
   * Each object in the array specifies which cell should span and how many rows/columns.
   * @example
   * [
   *   {
   *     cellKey: "3_name", // Format: "{rowId}_{columnId}"
   *     rowspan: 2,
   *     colspan: 3
   *   }
   * ]
   */
  spans?: SpanConfig[];
  /**
   * An array of `TableColumn` configurations which informs the table how to render a column and it's data cells.
   * If no columns are passed, the table will infer columns from the first row of data
   * @example
    [
      {
        id: 'name',
        label: 'Name',
      },
       {
        id: 'capacity',
        label: 'Capacity (TEU)',
        align: 'right',
      },
    ]
   *
   */
  columns: TableColumn[];
  /**
   * Fit of the table
   * @default 'medium'
   */
  fit?: Fit;
  /**
   * Default sort column.
   * Will default to the first column.
   */
  sortdefaultcolumnid?: string;
  /**
   * Default sort direction
   * @default ascending
   */
  sortdefaultdirection?: TableSortDirection;
  /**
   * Sorting disabled
   * @default false
   */
  sortdisabled?: boolean;
  /**
   * Enables manual sorting for the table. If this is true, you will be expected to sort your data before it is passed to the table. This is useful if you are doing server-side sorting.
   * @default false
   */
  sortmanual?: boolean;
  /**
   * Current page to show from the data past to the table.
   * When zero, all records will be displayed.
   * @default 0
   */
  currentpage?: number;
  /**
   * Number or records per page
   * @default 20
   */
  recordsperpage?: number;
  /**
   * Show a row selector checkbox column
   * @default false
   */
  select?: boolean;
  /**
   * Label for "select all rows" checkbox
   * @default "Select all rows"
   */
  selectalllabel?: string;
  /**
   * Label for "select row" checkbox
   * @default "Select row"
   */
  selectlabel?: string;
  /**
   * Can be used to set selected rows programatically. Pass data objects that you want to select.
   * @example
   * <mc-table select .selected = data.filter(row => row.id !== 1 && row.id !== 4)></mc-table>
   */
  selected?: TableData | string[];
  /**
   * When true, will enable row expansion for provided slots.
   * @default false
   * @example
   * <mc-table expand>
   *  <div slot="<datakey>_expanded">Expansion content</div>
   * </mc-table>
   */
  expand?: boolean;
  /**
   * Label for "expand row" button. the label is hidden and only used for screen readers.
   * @default "Expand row"
   */
  expandtriggerlabel?: string;
  /**
   * Can be used to set expanded rows programatically. Pass data objects that you want to expand.
   * @example
   * <mc-table .expandopened = data.filter(row => row.id !== 1 && row.id !== 4)></mc-table>
   */
  expandopened?: TableData;
  /**
   * Padding for expanded rows. `default` will apply the default padding, `none` will remove padding.
   * @default "default"
   */
  expandpadding?: RowExpansionPadding;
  /**
   * The caption to describe the table can be passed as a property or as a slot.
   * @example
   * <mc-table>
   *   <div slot="caption">Caption as a slot</div>
   * </mc-table>
   */
  caption?: string;
  /**
   * Show a table footer
   * @default false
   */
  footer?: boolean;
  /**
   * Make the header row "sticky"
   * @default false
   */
  headersticky?: boolean;
  /**
   * Make the footer row "sticky"
   * @default false
   */
  footersticky?: boolean;
  /**
   * Make the row selector column "sticky"
   * @default false
   */
  selectsticky?: boolean;
  /**
   * Make the row expansion column "sticky"
   * @default false
   */
  expandsticky?: boolean;
  /**
   * Puts the table into a loading state. This state also prevents the user from performing any interactions with the table
   */
  loading?: boolean;
  /**
   * Label for the loading indicator when table is in loading state
   */
  loadinglabel?: string;
  /**
   * Column Ids to hide.
   */
  hidecolumns?: string[];
  /**
   * Height of state slot in the table body
   * @default 'auto'
   */
  stateslotheight?: string;
  /**
   * Custom styles for the table
   * @default ''
   */
  customstyles?: string;
  /**
   * Disables rounded corners
   */
  disableroundedcorners?: boolean;
  /**
   * By default table will render "placeholder" footers for the select and expand columns.
   * You can disable them by setting the "disableplaceholderfooters" attribute to true.
   */
  disableplaceholderfooters?: boolean;
  /**
   * Table will scroll to top left after page change.
   */
  resetscrollonpagechange?: boolean;
  /**
   * A function to determine if the row selection checkbox should be disabled.
   * Should return true or false.
   * @param row Record<string, unknown>
   * @returns Boolean
   */
  selectrowdisabled?: (row: Record<string, unknown>) => boolean;
  /**
   * Dispatched when sorting direction on a column changes with a column id and direction as detail
   * @example
   * <mc-table sortchange="handleTableSorted"></mc-table>
   *
   * const handleTableSorted(evt) {
   *  console.log(evt.detail.column, evt.detail.direction)
   * }
   */
  sortchange?: () => CustomEvent;
  /**
   *  Dispatched when a row is selected/deselected with the current selection state as detail.
   */
  selectchange?: () => CustomEvent;
  /**
   *  Dispatched when a row is expanded/collapsed with the current expansion state as detail.
   */
  expandchange?: () => CustomEvent;
  /**
   *  Dispatched when a column is hid/shown with the current hidecolumns state as detail.
   */
  hidecolumnschange?: () => CustomEvent;
  /**
   *  Dispatched when a row is clicked.
   */
  rowclick?: () => CustomEvent;
  /**
   * Dispatched when the cursor enters a row.
   */
  rowmouseenter?: () => CustomEvent;
  /**
   *  Dispatched when the cursor leaves a row.
   */
  rowmouseleave?: () => CustomEvent;
  /**
   *   Dispatched when a row is selected
   */
  rowselected?: () => CustomEvent;
  /**
   * Dispatched when a row is deselected
   */
  rowdeselected?: () => CustomEvent;
  /**
   * Dispatched when a row is expanded
   */
  rowexpanded?: () => CustomEvent;
  /**
   * Dispatched when a row is collapsed
   */
  rowcollapsed?: () => CustomEvent;
  /**
   * Returns the pagination page count
   * @returns {number}
   */
  getPageCount?: () => number;
  /**
   * Resets the row selection to empty state
   */
  resetRowSelection?: () => void;
  /**
   * Resets sorting to empty state
   */
  resetSorting?: () => void;
  /**
   * Returns the selected row datakeys
   * @returns {Array<number | string>}
   */
  getSelectedRowDataKeys?: () => void;
  /**
   * Returns header object for a given columnId.
   * @param {string} columnId
   * @returns {Header<unknown, unknown> | undefined}
   */
  getColumnHeader?: (columnId: string) => Header<unknown, unknown> | undefined;
  /**
   * Returns data for a column
   * @param {string} columnId
   * @returns {Array<any>}
   */
  getColumnData?: (columnId: string) => Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Returns visible rows, depending if pagination is enabled or not.
   * @returns {Array<unknown>}
   */
  getVisibleRows?: () => Array<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Interface for the details object passed to cellTemplate functions.
 * Used to render custom cell content in the table.
 */
export interface CellTemplateDetails {
  /** The raw value of the cell (e.g., status: 'On schedule') */
  value: unknown;
  /** The entire row data object containing all fields for that row */
  rowData: Record<string, unknown>;
  /** The column configuration (id, label, width, etc.) */
  column: TableColumn;
  /** Lit's html template tag function for creating HTML templates with dynamic values */
  html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
}

/**
 * Interface for the details object passed to headerTemplate functions.
 * Used to render custom header content in the table.
 */
export interface HeaderTemplateDetails {
  /** The column configuration (id, label, width, etc.) */
  column: TableColumn;
  /** Lit's html template tag function for creating HTML templates with dynamic values */
  html: (strings: TemplateStringsArray, ...values: unknown[]) => TemplateResult;
}

export type TableTemplateResult = TemplateResult;

/**
 * @type `TableColumn`
 *
 * Used by `mc-table` to define a table column
 */
export declare type TableColumn = {
  /**
   * Unique column identifier
   */
  id: string;
  /**
   * Label displayed in the table header
   */
  label?: string;
  /**
   * Cell alignment of the column ('left' | 'right' | 'center')
   * @default 'left'
   */
  align?: TableCellAlignment;
  /**
   * Cell vertical alignment of the column ('top' | 'middle' | 'bottom')
   * @default 'middle'
   */
  verticalAlign?: TableCellVerticalAlign;
  /**
   * Width of the column in px or % i.e. 100px or 10%, or an object specifying min and max widths.
   */
  width?: string | { min: string; max: string };
  /**
   * Number of rows this column should span by default
   */
  rowspan?: number;
  /**
   * Number of columns this column should span by default
   */
  colspan?: number;
  /**
   * Displays numerical digits (0–9) in the same width,
   * like in monospace typefaces
   */
  tabularFigures?: boolean;
  /**
   * Disable sorting
   * @default false
   */
  sortDisabled?: boolean;
  /**
   * If true, the column will be "nowrap"
   * @default false
   */
  noWrap?: boolean;
  /**
   * @type `ColumnSorter`
   *
   * Sorting method to use.
   *  - `auto` will try to automatically deduct the data type in a column and sort by it.
   *  - `SortingFn<unknown>` sorting will use the provided custom sorting function. The function should return the data in ascending order.
   *     @example
   *      sorter: (AValue, BValue) => {
   *        a > b ? 1 : a < b ? -1 : 0;
   *      }
   *
   *  - `alphanumeric` Sorts by mixed alphanumeric values without case-sensitivity. Slower, but more accurate if your strings contain numbers that need to be naturally sortchange.
   *  - `alphanumericCaseSensitive` Sorts by mixed alphanumeric values with case-sensitivity. Slower, but more accurate if your strings contain numbers that need to be naturally sortchange.
   *  - `text` Sorts by text/string values without case-sensitivity. Faster, but less accurate if your strings contain numbers that need to be naturally sortchange.
   *  - `textCaseSensitive` Sorts by text/string values with case-sensitivity. Faster, but less accurate if your strings contain numbers that need to be naturally sortchange.
   *  - `datetime` Sorts by time, use this if your values are Date objects.
   *  - `basic` Sorts using a basic/standard a > b ? -1 : b < a ? 1 : 0 comparison. This is the fastest sorting function, but may not be the most accurate
   * @default 'auto'
   */
  sorter?: ColumnSorter;
  /**
   * Whether the column is "sticky". Available options are true, false, 'left', 'right'. If the value is true, the column will be sticky to the left.
   */
  sticky?: StickyColumn;
  /**
   * If a column has other columns, it will be treated as a "parent" and group the "children" columns.
   */
  columns?: TableColumn[];
  /**
   * Sets a colspan for the column footer.
   */
  footerColspan?: number;
  /**
   * Render a cell as a header. Useful for vertical headers / footers
   * @default false
   */
  renderAsHeader?: boolean;
  /**
   * @type `DataType`
   * Used to specify the data type of the column.
   * When using `number` of `date` types mc-table will style the columns and apply value formatting.
   */
  dataType?: DataType;
  /**
   * A description for the column. Will be rendered as a tooltip on header hover.
   */
  description?: string;
  /**
   * Max width of the column description in px.
   */
  descriptionWidth?: number;
  /**
   * A property to get the sub data from the data object i.e. vesselType. It is recommended to use `subDataKey` together with `subDataLabel`, but not necessary.
   */
  subDataKey?: string;
  /**
   * A label of the sub data. Will be displayed as a sub header. It is recommended to use `subDataLabel` together with `subDataKey`, but not necessary.
   */
  subDataLabel?: string;
  /**
   * Disables rowclick event from being dispatched in the column.
   */
  rowClickDisabled?: boolean;
  /**
   * Custom header render function for the column.
   */
  headerTemplate?: string | ((details: HeaderTemplateDetails) => TemplateResult);
  /**
   * Custom cell render function for the column.
   */
  cellTemplate?: string | ((details: CellTemplateDetails) => TemplateResult);
  /**
   * Truncate the text with ellipsis based on the width of the column when enabled.
   * @default false
   */
  truncate?: boolean;
  /**
   * Disables sorting on the first column during the initial load.
   * @default false
   */
  sortdisableoninitialload?: boolean;
};
