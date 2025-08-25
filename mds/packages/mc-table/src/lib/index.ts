// lit-elements
import { CSSResultArray, LitElement, PropertyValues, TemplateResult, html, isServer } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
// utils
import { format } from '@maersk-global/mds-components-utils';
// styles
import { styles } from './styles/index.styles';
// tanstack
import { getCoreRowModel, getSortedRowModel, getPaginationRowModel, getExpandedRowModel } from '@tanstack/table-core';
// controller
import { flexRender, Controller, doUpdate } from './controller';
// types
import {
  AriaSort,
  ColumnSorter,
  IMcTable,
  TableBorderStyle,
  TableColumn,
  TableData,
  TableSortDirection,
  TableVerticalAlign,
  RowExpansionPadding,
  IMcTableSortChangeDetail,
  IMcTableRowClickDetail,
  SpanConfig,
} from './types';
import { Fit } from '@maersk-global/mds-shared-types';
import type {
  ColumnDef,
  SortingState,
  Header,
  Row,
  SortingFnOption,
  Cell,
  Table,
  PaginationState,
  RowSelectionState,
  ExpandedState,
  ColumnMeta,
  ColumnPinningState,
  SortDirection,
  HeaderContext,
} from '@tanstack/table-core';
import type { ColumnDefTemplate } from '@tanstack/table-core';
//mds components
import '@maersk-global/mds-components-core-checkbox';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core-icon';

export type { IMcTable } from './types';

const FALL_BACK_DATA_KEY = 'id';
const DEFAULT_DESCRIPTION_WIDTH = 320;
const ROW_SELECTOR_COLUMN_ID = 'row-selector';
const ROW_EXPANDER_COLUMN_ID = 'row-expander';
const DEFAULT_PAGINATION_PAGE_SIZE = 20;
const DEFAULT_PAGINATION_PAGE_INDEX = 0;
const ROW_SELECTOR_COLUMN_WIDTHS = {
  small: 39,
  medium: 51,
  large: 71,
};
const ROW_EXPANDER_COLUMN_WIDTHS = {
  small: 46,
  medium: 54,
  large: 70,
};
const DEFAULT_STICKY_CELL_Z_INDEX = 10;
const ELEVATED_STICKY_CELL_Z_INDEX = 11;
const STICKY_HEADER_FOOTER_Z_INDEX = 12;
const SLOT_CONTENT_Z_INDEX = 13;
const HEADER_INTERACTION_Z_INDEX = 14;
/**
 * @element `mc-table`
 *
 * @event {CustomEvent<IMcTableSortChangeDetail>} sortchange - Dispatched when sorting direction on a column changes with a column id and direction as detail.
 * @event {CustomEvent<unknown[]>} selectchange - Dispatched when a row is selected/deselected with the current selection state as detail.
 * @event {CustomEvent<unknown | undefined>} expandchange - Dispatched when a row is expanded/collapsed with the current expansion state as detail.
 * @event {CustomEvent<string | undefined>} hidecolumnschange - Dispatched when a column is hid/shown with the current hidecolumns state as detail.
 * @event {CustomEvent<IMcTableRowClickDetail>} rowclick - Dispatched when a row is clicked.
 * @event {CustomEvent<unknown>} rowmouseenter - Dispatched when the cursor enters a row.
 * @event {CustomEvent<unknown>} rowmouseleave - Dispatched when the cursor leaves a row.
 * @event {CustomEvent<unknown>} rowselected - Dispatched when a row is selected.
 * @event {CustomEvent<unknown>} rowdeselected - Dispatched when a row is deselected.
 * @event {CustomEvent<unknown>} rowexpanded - Dispatched when a row is expanded.
 * @event {CustomEvent<unknown>} rowcollapsed - Dispatched when a row is collapsed.
 *
 * @slot `{rowId}_{columnId}` - When you want to pass other mc-components or your own custom components to the table cell.
 * The first parameter in the slot name {rowId} is a row id(the component will automatically try to access an \`id\` attribute, you can change that by passing the \`datakey\` attribute), the second {columnId} is the id of the column where custom component should be rendered, i.e. 10_status, 11_status, 12_status, etc
 * @slot `caption` - Caption to describe the table.
 * @slot `{columnId}_header` - Header slot for a column with {columnId} as an \`id\` property.
 * @slot `{columnId}_footer` - Footer slot for a column with {columnId} as an \`id\` property.
 * @slot `{rowId}_expanded` - Slot for an expandable row content.
 * @slot `state` - Slot in the table body. Can be used to display state of the table, i.e. loading, empty, error, etc.
 */
export class McTable extends LitElement implements IMcTable {
  @property({ type: Array })
  public data: TableData = [];

  @property({ type: String })
  public datakey: string = FALL_BACK_DATA_KEY;

  @property({ type: Array })
  public columns: TableColumn[] = [];

  @property({ type: Boolean })
  public zebrastripes = false;

  @property({ type: Boolean })
  public truncate = false;

  @property({ type: String })
  public outerborderstyle: TableBorderStyle = 'solid';

  @property({ type: String })
  public verticallinestyle: TableBorderStyle = 'none';

  @property({ type: String })
  public horizontallinestyle: TableBorderStyle = 'solid';

  @property({ type: String })
  public fit: Fit = 'medium';

  @property({ type: Boolean })
  public disablerowhighlightonhover = false;

  @property({ type: String })
  public verticalalign?: TableVerticalAlign = 'middle';

  @property({ type: Boolean })
  public nowrap = false;

  @property({ type: Boolean })
  public disableoverflow = false;

  @property({ type: Boolean })
  public sortdisableoninitialload = false;

  @property({ type: String })
  public height = 'auto';

  @property({ type: String })
  public sortdefaultcolumnid = '';

  @property({ type: String })
  public sortdefaultdirection: TableSortDirection = 'ascending';

  @property({ type: Boolean, reflect: true })
  public sortdisabled = false;

  @property({ type: Boolean, reflect: true })
  public sortmanual = false;

  @property({ type: Number, reflect: true })
  public currentpage = DEFAULT_PAGINATION_PAGE_INDEX;

  @property({ type: Number, reflect: true })
  public recordsperpage = DEFAULT_PAGINATION_PAGE_SIZE;

  @property({ type: Boolean, reflect: true })
  public select = false;

  @property({ type: Array })
  public selected: TableData | string[] = [];

  @property({ type: String })
  public selectalllabel = 'Select all rows';

  @property({ type: String })
  public selectlabel = 'Select row';

  @property({ type: Boolean, reflect: true })
  public expand = false;

  @property({ type: String })
  public expandtriggerlabel = 'Expand row';

  @property({ type: Array })
  public expandopened: TableData = [];

  @property({ type: String })
  public caption = '';

  @property({ type: Boolean })
  public footer = false;

  @property({ type: Boolean })
  public headersticky = false;

  @property({ type: Boolean })
  public footersticky = false;

  @property({ type: Boolean })
  public selectsticky = false;

  @property({ type: Boolean })
  public expandsticky = false;

  @property({ type: Boolean })
  public headerhidden = false;

  @property({ type: Array })
  public hidecolumns: string[] = [];

  @property({ type: String })
  public expandpadding: RowExpansionPadding = 'default';

  @property({ type: String })
  public stateslotheight = 'auto';

  @property({ type: String })
  public customstyles = '';

  @property({ type: Boolean })
  public disableroundedcorners = false;

  @property({ type: Boolean })
  public disableplaceholderfooters = false;

  @property({ type: Boolean })
  public resetscrollonpagechange = false;

  @property({ type: Object })
  public selectrowdisabled: (row: any) => boolean = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

  @property({ type: Array })
  public spans: SpanConfig[] = [];

  @state()
  private computedColumns: ColumnDef<unknown, unknown>[] = [];

  @state()
  private hasCaptionSlot = false;

  @state()
  private hasStateSlot = false;

  @query('.mds-table')
  private tableWrapper!: HTMLElement;

  private cellStickyStylesCache: Map<string, Record<string, string | number | undefined>> = new Map();
  private resizeObserver: ResizeObserver | undefined;
  private hadPreviousData = true;
  private shouldDispatchSortEvent = true;
  private spanCache: Map<string, SpanConfig> = new Map();
  private skipRenderCache: Set<string> = new Set();
  private static hasShownSpanWarning = false;

  private _afterFirstUdpdate = false;
  private _sort: SortingState = [];
  private _pagination: PaginationState = {
    pageIndex: +this.currentpage || DEFAULT_PAGINATION_PAGE_INDEX,
    pageSize: +this.recordsperpage || DEFAULT_PAGINATION_PAGE_SIZE,
  };
  private _rowSelection: RowSelectionState = {};
  private _expanded: ExpandedState = {};
  private _pinnedColumns: ColumnPinningState = {};
  //holds state of row ids that have content in the slot.
  private _expandable: Map<string, boolean> = new Map();
  private _captionID = Math.random().toString(36).substring(2, 9);
  private controller = new Controller(this, {
    data: this.data || [],
    columns: this.computedColumns,
    enableSorting: !this.sortdisabled,
    enableSortingRemoval: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enableRowSelection: (rowData: Row<Record<string, any>>): boolean => this.enableRowSelection(rowData),
    enableHiding: true,
    manualSorting: this.sortmanual,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: this.sortmanual ? undefined : getSortedRowModel(),
    getExpandedRowModel: this.expand ? getExpandedRowModel() : undefined,
    getRowId: (rowData: unknown): string => rowData[this.datakey]?.toString(),
    getRowCanExpand: (rowData: Row<Record<string, any>>): boolean => this._expandable.has(rowData.id.toString()), // eslint-disable-line @typescript-eslint/no-explicit-any
    state: {
      sorting: this._sort,
      pagination: this._pagination,
      rowSelection: this._rowSelection,
      expanded: this._expanded,
      columnPinning: this._pinnedColumns,
    },
    onSortingChange: (sorting): void => {
      const newSort = doUpdate(this._sort, sorting);
      this._sort = newSort;

      // Clear span caches when sorting changes
      this.spanCache.clear();
      this.skipRenderCache.clear();

      this.controller.update({
        state: { sorting: newSort },
      });
      if (!isServer && this._afterFirstUdpdate && this.shouldDispatchSortEvent) {
        this.dispatchEvent(
          new CustomEvent<IMcTableSortChangeDetail>('sortchange', {
            detail: {
              column: newSort[0]?.id,
              direction: newSort[0]?.desc ? 'descending' : 'ascending',
              sortedData: this.controller.table.getSortedRowModel().flatRows.map((row) => row.original),
            },
          }),
        );
      }
    },
    onRowSelectionChange: (selection): void => {
      const oldSelection = { ...this._rowSelection };
      const newSelection = doUpdate(this._rowSelection, selection);
      this._rowSelection = newSelection;
      this.controller.update({ state: { rowSelection: newSelection } });

      if (!isServer) {
        this.dispatchSelectedOrExpandedEvents(oldSelection, newSelection, 'selection');
        if (!this.selected?.length && !this._afterFirstUdpdate) return;
        this.dispatchEvent(
          new CustomEvent<unknown[]>('selectchange', {
            detail: this.controller.table.getSelectedRowModel().flatRows.map((row) => row.original),
          }),
        );
      }
    },
    onExpandedChange: (expansion): void => {
      let oldExpansion: Record<string, boolean>;
      if (this._expanded === true) {
        oldExpansion = Object.fromEntries(this.controller.table.getRowModel().rows.map((row) => [row.id, true]));
      } else {
        oldExpansion = { ...this._expanded };
      }
      const newExpansion = doUpdate(this._expanded, expansion);
      this._expanded = newExpansion;
      this.controller.update({ state: { expanded: newExpansion } });

      if (!isServer) {
        this.dispatchSelectedOrExpandedEvents(oldExpansion, newExpansion, 'expansion');
        if (!this.expandopened?.length && !this._afterFirstUdpdate) return;
        this.dispatchEvent(
          new CustomEvent<unknown | undefined>('expandchange', {
            detail: this.controller.table
              .getExpandedRowModel()
              .flatRows.filter((row) => Object.keys(this._expanded).includes(row.id))
              .map((row) => row.original),
          }),
        );
      }
    },
    onPaginationChange: (pagination): void => {
      const currentPagination = this._pagination;
      const newPagination = doUpdate(this._pagination, pagination);
      this._pagination = newPagination;
      this.controller.update({ state: { pagination: newPagination } });

      if (!isServer) {
        //if the pagination is the default one and it's the first update, don't dispatch the event. This is to avoid double event dispatch on initial render.
        if (
          !this._afterFirstUdpdate &&
          currentPagination.pageIndex === DEFAULT_PAGINATION_PAGE_INDEX &&
          currentPagination.pageSize === DEFAULT_PAGINATION_PAGE_SIZE
        ) {
          return;
        }

        this.dispatchEvent(
          new CustomEvent<unknown | undefined>('pagechange', {
            detail: this.getVisibleRows(),
          }),
        );
      }

      if (this.resetscrollonpagechange) {
        this.tableWrapper?.scrollTo({ top: 0, left: 0 });
      }
    },
  });

  private dispatchSelectedOrExpandedEvents(
    oldState: RowSelectionState | Record<string, boolean>,
    newState: RowSelectionState | ExpandedState,
    eventType: 'selection' | 'expansion',
  ): void {
    const newStateObj =
      newState === true
        ? Object.fromEntries(this.controller.table.getRowModel().rows.map((row) => [row.id, true]))
        : newState;

    const validRowIds = new Set(this.controller.table.getRowModel().rows.map((row) => row.id));

    Object.keys({ ...oldState, ...newStateObj }).forEach((rowId) => {
      if (!validRowIds.has(rowId)) {
        return;
      }

      const row = this.controller.table.getRow(rowId);
      if (!oldState[rowId] && newStateObj[rowId]) {
        this.dispatchCustomEvent(this, `row${eventType === 'selection' ? 'selected' : 'expanded'}`, row.original);
      } else if (oldState[rowId] && !newStateObj[rowId]) {
        this.dispatchCustomEvent(this, `row${eventType === 'selection' ? 'deselected' : 'collapsed'}`, row.original);
      }
    });
  }

  private get isPagiantionEnabled(): boolean {
    return this.recordsperpage > 0;
  }

  public static get styles(): CSSResultArray {
    return [styles];
  }

  public render(): TemplateResult {
    const hasRowspans = this.spans.some((span) => span.rowspan) || this.columns.some((col) => col.rowspan);

    const wrapperClasses = {
      'mds-table': true,
      'mds-table--zebra-stripes-with-expand': this.zebrastripes && this.expand,
      'mds-table--zebra-stripes': this.zebrastripes && !this.expand,
      [`mds-table--outer-border-${this.outerborderstyle}`]: true,
      [`mds-table--vertical-lines-${this.verticallinestyle}`]: true,
      [`mds-table--horizontal-lines-${this.horizontallinestyle}`]: true,
      [`mds-table--${this.fit}`]: true,
      'mds-table--disable-row-highlight-on-hover': this.disablerowhighlightonhover,
      [`mds-table--vertical-align-${this.verticalalign}`]: true,
      'mds-table--nowrap': this.nowrap,
      'mds-table--scrollable': !this.disableoverflow,
      'mds-table--footer': this.footer,
      'mds-table--header-sticky': this.headersticky,
      'mds-table--footer-sticky': this.footersticky,
      'mds-table--header-hidden': this.headerhidden,
      'mds-table--header-none': this.headerhidden,
      'mds-table--outer-border-corners-square': this.disableroundedcorners,
      'mds-table--rowspan': hasRowspans,
    };
    const wrapperStyles = {
      height: this.height,
    };

    return html`
      ${this.renderCustomStyles()} ${this.renderCaption()}
      <div data-cy="table-wrapper" class=${classMap(wrapperClasses)} style=${styleMap(wrapperStyles)}>
        <table aria-describedby="${ifDefined(this.getCaptionId())}">
          ${this.renderTableHead()} ${this.renderTableBody()}${this.renderTfoot()}
        </table>
      </div>
    `;
  }

  private renderCustomStyles(): TemplateResult | undefined {
    if (this.customstyles) {
      return html`<style>
        ${this.customstyles}
      </style>`;
    }
  }

  private renderCaption(): TemplateResult {
    const captionClassInfo = {
      'mds-table-caption': true,
      [`mds-table-caption--${this.fit}`]: true,
      hidden: !this.hasCaption(),
    };
    return html`<div class=${classMap(captionClassInfo)} id="${ifDefined(this.getCaptionId())}">
      <slot name="caption" @slotchange="${this.onCaptionSlotChange}">${this.caption}</slot>
    </div>`;
  }

  protected getCaptionId(): string | undefined {
    if (this.hasCaption()) {
      return this._captionID;
    }
    return undefined;
  }

  private onCaptionSlotChange(): void {
    const slot = this.shadowRoot?.querySelector('slot[name="caption"]') as HTMLSlotElement;
    this.hasCaptionSlot = slot?.assignedElements()?.length > 0;
  }

  private hasCaption(): boolean {
    return this.hasCaptionSlot || this.caption?.length > 0;
  }

  private renderTableHead(): TemplateResult {
    if (this.headerhidden) {
      return html``;
    }

    const { table } = this.controller;
    return html`
      <thead>
        ${table.getHeaderGroups().map(({ headers }) => this.renderHeaderRow(headers))}
      </thead>
    `;
  }

  private renderHeaderRow(headers: Header<unknown, unknown>[]): TemplateResult {
    return html`
      <tr>
        ${headers.map((header) =>
          header.isPlaceholder ? this.renderPlaceholderHeaderCell(header) : this.renderHeaderCell(header),
        )}
      </tr>
    `;
  }

  private renderPlaceholderHeaderCell(header: Header<unknown, unknown>): TemplateResult {
    const { sticky } = header.column.columnDef.meta || {};
    const styles = this.getCellStyles(
      {},
      header,
      sticky,
      this.headersticky
        ? STICKY_HEADER_FOOTER_Z_INDEX
        : sticky
          ? STICKY_HEADER_FOOTER_Z_INDEX
          : DEFAULT_STICKY_CELL_Z_INDEX,
    );

    return html`<th style=${styleMap(styles)}></th>`;
  }

  private renderHeaderCell(header: Header<unknown, unknown>): TemplateResult {
    if (header.id === ROW_SELECTOR_COLUMN_ID) {
      return this.renderHeaderRowSelector(this.controller.table, header);
    }
    if (header.id === ROW_EXPANDER_COLUMN_ID) {
      return this.renderHeaderExpandColumn(this.controller.table, header);
    }
    const { noWrap, sticky, description, sizeUnit, originalWidth } = header?.column?.columnDef?.meta || {};
    const ariaSort: AriaSort = ({ asc: 'ascending', desc: 'descending' }[header.column.getIsSorted() as string] ??
      'none') as AriaSort;
    const widthValue = this.getCellWidthValue(sizeUnit, originalWidth, header, 'header');

    const defaultStyles = {
      width: widthValue,
      verticalAlign: header.column.columnDef.meta?.verticalAlign || 'top',
    };

    const styles = this.getCellStyles(
      defaultStyles,
      header,
      sticky,
      this.hasSlot(`${header.id}_header`)
        ? SLOT_CONTENT_Z_INDEX
        : this.headersticky
          ? STICKY_HEADER_FOOTER_Z_INDEX
          : sticky
            ? STICKY_HEADER_FOOTER_Z_INDEX
            : DEFAULT_STICKY_CELL_Z_INDEX,
    );

    const alignmentClass = this.getAlignmentClass(header?.column?.columnDef?.meta);

    const classes = {
      [`${alignmentClass}`]: true,
      [`${this.fit}`]: true,
      'mds-table__cell--nowrap': noWrap || false,
      'mds-table__header-cell--sortable': header.column.getCanSort(),
      'mds-underline--dotted': (description && description.length > 0) || false,
    };

    const contentWrapperClasses = {
      'header-content-wrapper': true,
      [`items-${header?.column?.columnDef?.meta?.align}`]: true,
    };

    return html`
      <th
        class=${classMap(classes)}
        style=${styleMap(styles)}
        colspan=${header.colSpan}
        data-cy="${`header-` + header.id}"
        data-sticky="${ifDefined(sticky)}"
        aria-sort=${ariaSort as AriaSort}
        data-header-id=${header.id}
        @click=${() => this.handleHeaderCellClicked(header)}
        @mouseenter=${() => this.handleHeaderCellMouseenter(header)}
        @mouseleave=${() => this.handleHeaderCellMouseleave(header)}
      >
        <div class=${classMap(contentWrapperClasses)}>${this.renderThContent(header)}</div>
      </th>
    `;
  }

  private handleHeaderCellMouseenter(header: Header<unknown, unknown>): void {
    if (isServer || !this.shadowRoot || !this.hasSlot(`${header.id}_header`)) {
      return;
    }
    const cellElement = this.shadowRoot.querySelector(`[data-header-id="${header.column.id}"]`) as HTMLElement;
    if (cellElement) {
      cellElement.style.zIndex = HEADER_INTERACTION_Z_INDEX.toString();
    }
  }

  private handleHeaderCellMouseleave(header: Header<unknown, unknown>): void {
    if (isServer || !this.shadowRoot) {
      return;
    }
    const cellElement = this.shadowRoot.querySelector(`[data-header-id="${header.column.id}"]`) as HTMLElement;
    if (!cellElement) {
      return;
    }

    setTimeout(() => {
      const { sticky } = header?.column?.columnDef?.meta || {};
      cellElement.style.zIndex = (
        this.hasSlot(`${header.id}_header`)
          ? SLOT_CONTENT_Z_INDEX
          : this.headersticky
            ? STICKY_HEADER_FOOTER_Z_INDEX
            : sticky
              ? STICKY_HEADER_FOOTER_Z_INDEX
              : DEFAULT_STICKY_CELL_Z_INDEX
      ).toString();
    }, 50);
  }

  private handleHeaderCellClicked(header: Header<unknown, unknown>): void {
    if (!header.column.getCanSort()) {
      return;
    }
    this.shouldDispatchSortEvent = true;
    header.column.toggleSorting();
  }

  private renderThContent(header: Header<unknown, unknown>): TemplateResult {
    const { description, descriptionWidth, subDataLabel } = header?.column?.columnDef?.meta || {};
    const renderContent = (): TemplateResult => {
      if (header.column.getCanSort()) {
        return this.renderSortButton(header);
      }

      const headerSlotName = `${header.id}_header`;
      const hasHeaderSlot = this.hasSlot(headerSlotName);
      const headerContent = hasHeaderSlot
        ? html`<slot name="${headerSlotName}"></slot>`
        : html`${flexRender(header.column.columnDef.header, header.getContext())}`;

      return html`<div slot="trigger">
        ${headerContent}
        <span class="mds-table__subtext">${subDataLabel}</span>
      </div>`;
    };

    if (description && description.length > 0) {
      return html`
        <mc-tooltip fitcontent trigger="hover" width="${descriptionWidth || DEFAULT_DESCRIPTION_WIDTH}">
          ${renderContent()}
          <div class="header-description">${description}</div>
        </mc-tooltip>
      `;
    }

    return renderContent();
  }

  private renderHeaderRowSelector(table: Table<unknown>, header: Header<unknown, unknown>): TemplateResult {
    if (!this.select) {
      return html``;
    }

    const classes = {
      'mds-table__column--row-selector': true,
    };

    const styles = this.getCellStyles(
      { top: 0 },
      header,
      this.selectsticky,
      this.headersticky ? STICKY_HEADER_FOOTER_Z_INDEX : DEFAULT_STICKY_CELL_Z_INDEX,
    );

    const isAllRowsDisabled = this.areAllRowsDisabled();

    return html`
      <th
        class="${classMap(classes)}"
        style="${styleMap(styles)}"
        id="${ROW_SELECTOR_COLUMN_ID}"
        data-cy="header-${ROW_SELECTOR_COLUMN_ID}"
        data-sticky="${this.selectsticky ? 'left' : 'false'}"
      >
        <mc-checkbox
          hiddenlabel
          fit="${this.fit}"
          .label="${this.selectalllabel}"
          .checked="${table.getIsAllPageRowsSelected()}"
          .indeterminate="${table.getIsSomePageRowsSelected()}"
          ?disabled="${isAllRowsDisabled}"
          @change="${() => this.handleSelectionToggleAll(table)}"
        ></mc-checkbox>
      </th>
    `;
  }

  private renderHeaderExpandColumn(table: Table<unknown>, header: Header<unknown, unknown>): TemplateResult {
    if (!this.expand) {
      return html``;
    }

    if (!table.getCanSomeRowsExpand()) {
      return html``;
    }

    const classes = {
      'mds-table__column--row-expander': true,
    };

    const styles = this.getCellStyles(
      { top: 0 },
      header,
      this.expandsticky,
      this.headersticky ? STICKY_HEADER_FOOTER_Z_INDEX : DEFAULT_STICKY_CELL_Z_INDEX,
    );

    return html`<th
      id="${ROW_EXPANDER_COLUMN_ID}"
      data-cy="header-${ROW_EXPANDER_COLUMN_ID}"
      data-sticky="${this.expandsticky ? 'left' : 'false'}"
      class="${classMap(classes)}"
      style="${styleMap(styles)}"
    ></th>`;
  }

  private renderTableBody(): TemplateResult {
    const { table } = this.controller;

    return html`
      ${!this.hasStateSlot
        ? html` <tbody>
              ${this.renderBodyRows(table)}
            </tbody>
            <slot aria-hidden="true" name="state" @slotchange="${this.handleStateSlotChange}"></slot>`
        : html`
            <tbody>
              <tr>
                <td
                  class="state-slot-wrapper"
                  data-cy="state-slot-wrapper"
                  style="${styleMap({ height: this.stateslotheight })}"
                  colspan="${this.controller.table.getFlatHeaders().length}"
                >
                  <slot name="state" @slotchange="${this.handleStateSlotChange}"></slot>
                </td>
              </tr>
            </tbody>
          `}
    `;
  }

  private renderBodyRows(table: Table<unknown>): TemplateResult {
    if (this.hasStateSlot) {
      return html``;
    }

    return html`${repeat(
      table.getRowModel().rows,
      (row) => row.id,
      (row) => this.renderBodyRow(row),
    )}`;
  }

  private handleStateSlotChange(): void {
    const slot = this.shadowRoot?.querySelector('slot[name="state"]') as HTMLSlotElement;
    this.hasStateSlot = slot?.assignedElements()?.length > 0;
  }

  private renderBodyRow(row: Row<unknown>): TemplateResult {
    const isSelected = row.getIsSelected();
    const classes = {
      'mds_table__row--selected': isSelected,
      [`row-${row.id}`]: true,
    };
    return html`
      <tr
        class="${classMap(classes)}"
        data-cy="${row.id}"
        @click=${(e: MouseEvent): void => {
          this.handleRowClick(e, row);
        }}
        @mouseenter=${(): void => {
          this.dispatchEvent(
            new CustomEvent<unknown>('rowmouseenter', {
              detail: row.original,
            }),
          );
        }}
        @mouseleave=${(): void => {
          this.dispatchEvent(
            new CustomEvent<unknown>('rowmouseleave', {
              detail: row.original,
            }),
          );
        }}
      >
        ${repeat(
          row.getVisibleCells(),
          (cell: Cell<unknown, unknown>) => cell.id,
          (cell) => this.renderBodyCell(cell),
        )}
      </tr>
      ${this.renderExpandedRow(row)}
    `;
  }

  private handleSpans(cell: Cell<unknown, unknown>): { rowspan?: number; colspan?: number; shouldRender: boolean } {
    const cellDataKey = `${cell.row.original[this.datakey]}_${cell.column.id}`;

    // Check if this cell should be skipped (it's covered by a span from above/left)
    if (this.skipRenderCache.has(cellDataKey)) {
      return { shouldRender: false };
    }

    // First check for cell-level spans from spans array
    const spanConfig = this.spans.find((config) => config.cellDataKey === cellDataKey);

    // Then check for column-level spans
    const columnSpans = cell.column.columnDef.meta;

    // Use spans array config or fall back to column config
    const finalSpans = {
      rowspan: spanConfig?.rowspan || columnSpans?.rowspan,
      colspan: spanConfig?.colspan || columnSpans?.colspan,
    };

    if ((finalSpans.rowspan || finalSpans.colspan) && !McTable.hasShownSpanWarning) {
      console.warn('[mc-table] Using rowspan or colspan is an experimental feature and may change in future versions.');
      McTable.hasShownSpanWarning = true;
    }

    if (finalSpans.rowspan || finalSpans.colspan) {
      // Store span information for this cell
      this.spanCache.set(cellDataKey, { cellDataKey, ...finalSpans });

      if (finalSpans.rowspan && finalSpans.rowspan > 1) {
        // Calculate which cells should be skipped due to rowspan
        const [rowId] = cellDataKey.split('_');
        const currentRowIndex = this.controller.table
          .getRowModel()
          .rows.findIndex((row) => String(row.original[this.datakey]) === rowId);
        const allRows = this.controller.table.getRowModel().rows;

        // Mark cells below this one to be skipped
        for (let i = 1; i < finalSpans.rowspan && currentRowIndex + i < allRows.length; i++) {
          const nextRow = allRows[currentRowIndex + i];
          if (nextRow) {
            // For each column that this cell spans
            const colSpan = finalSpans.colspan || 1;
            const columnIndex = this.controller.table.getAllColumns().findIndex((col) => col.id === cell.column.id);
            const visibleColumns = this.controller.table.getAllColumns();

            for (let c = 0; c < colSpan; c++) {
              const targetColumn = c === 0 ? cell.column : visibleColumns[columnIndex + c];
              if (targetColumn) {
                const skipCellKey = `${nextRow.original[this.datakey]}_${targetColumn.id}`;
                this.skipRenderCache.add(skipCellKey);
              }
            }
          }
        }
      }

      if (finalSpans.colspan && finalSpans.colspan > 1) {
        // Calculate which cells should be skipped due to colspan
        const columnIndex = this.controller.table.getAllColumns().findIndex((col) => col.id === cell.column.id);
        const visibleColumns = this.controller.table.getAllColumns();

        // Mark cells to the right to be skipped
        for (let i = 1; i < finalSpans.colspan; i++) {
          const nextColumn = visibleColumns[columnIndex + i];
          if (nextColumn) {
            const skipCellKey = `${cell.row.original[this.datakey]}_${nextColumn.id}`;
            this.skipRenderCache.add(skipCellKey);
          }
        }
      }

      return {
        rowspan: finalSpans.rowspan,
        colspan: finalSpans.colspan,
        shouldRender: true,
      };
    }

    return { shouldRender: true };
  }

  private renderBodyCell(cell: Cell<unknown, unknown>): TemplateResult {
    if (cell.column.id === ROW_SELECTOR_COLUMN_ID) {
      return this.renderBodyRowSelector(cell);
    }
    if (cell.column.id === ROW_EXPANDER_COLUMN_ID) {
      return this.renderBodyExpansionToggle(cell);
    }

    // Handle spans
    const { rowspan, colspan, shouldRender } = this.handleSpans(cell);
    if (!shouldRender) {
      return html``;
    }

    const { meta } = cell.column.columnDef || {};
    const { noWrap, sticky, renderAsHeader, dataType, subDataKey, originalWidth, sizeUnit } = meta || {};

    const widthValue = this.getCellWidthValue(sizeUnit, originalWidth, cell, 'cell');

    const defaultStyles = {
      width: widthValue,
      minWidth: typeof originalWidth === 'string' ? originalWidth : originalWidth?.min,
      maxWidth: typeof originalWidth === 'string' ? originalWidth : originalWidth?.max,
    };

    const renderSubData = (propertyName: string | undefined): TemplateResult => {
      if (propertyName) {
        const original = cell.row.original as Record<string, unknown>;
        return html`<div class="mds-table__subtext" data-cy="sub-data-property">${original[propertyName]}</div>`;
      }
      return html``;
    };

    const classes = {
      [`${this.getAlignmentClass(meta)}`]: true,
      [`${this.getVerticalAlignmentClass(meta)}`]: true,
      'mds-table__cell--nowrap': noWrap || dataType?.type === 'number' || false,
      'mds-table__cell--tabular-figures': this.shouldApplyTabularFiguresClass(meta),
      'cell-sticky': sticky || false,
    };

    const slotName = `${cell.row.original[this.datakey]}_${cell.column.id}`;
    const hasSlot = this.hasSlot(slotName);

    const styles = this.getCellStyles(defaultStyles, cell, sticky, hasSlot ? SLOT_CONTENT_Z_INDEX : undefined);

    return renderAsHeader
      ? html`<th
          @click="${(): void => {
            this.cellClicked(cell);
          }}"
          data-header-id="${cell.column.id}"
          data-id="${cell.id}"
          style="${styleMap(styles)}"
          scope="row"
          class=${classMap(classes)}
          rowspan=${ifDefined(rowspan)}
          colspan=${ifDefined(colspan)}
        >
          ${this.renderBodyCellSlot(cell)}${renderSubData(subDataKey)}
        </th>`
      : html`<td
          @click="${(): void => {
            this.cellClicked(cell);
          }}"
          data-header-id="${cell.column.id}"
          data-id="${cell.id}"
          style="${styleMap(styles)}"
          class=${classMap(classes)}
          rowspan=${ifDefined(rowspan)}
          colspan=${ifDefined(colspan)}
        >
          ${this.renderBodyCellSlot(cell)}${renderSubData(subDataKey)}
        </td>`;
  }

  private cellClicked(cell: Cell<unknown, unknown>): void {
    //if the cell is sticky, set its z-index to 11 and the rest of the cell indexes to 10.
    //This helps with popovers being rendered "under" the sticky cells due to z-index stacking context.
    if (cell.column.columnDef.meta?.sticky) {
      const cells = this.shadowRoot?.querySelectorAll(`[data-header-id="${cell?.column?.id}"]`);
      cells?.forEach((cell) => {
        (cell as HTMLElement).style.zIndex = DEFAULT_STICKY_CELL_Z_INDEX.toString();
      });
      const cellElement = this.shadowRoot?.querySelector(`[data-id="${cell?.id}"]`);
      if (cellElement) {
        (cellElement as HTMLElement).style.zIndex = ELEVATED_STICKY_CELL_Z_INDEX.toString();
      }
    }
  }

  private renderBodyCellSlot(cell: Cell<unknown, unknown>): TemplateResult {
    const slotName = `${cell.row.original[this.datakey]}_${cell.column.id}`;
    const hasSlot = this.hasSlot(slotName);

    if (hasSlot) {
      return html`<slot name=${slotName}></slot>`;
    }

    const value = flexRender(cell.column.columnDef.cell, cell.getContext());

    // Handle null, undefined and empty string
    if (value === null || value === undefined || value === '') {
      return html``;
    }

    // Handle template result objects
    if (typeof value === 'object' && value !== null) {
      return value as TemplateResult;
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return html`${String(value)}`;
    }

    // Handle numbers and strings
    return html`${this.formatCellValue(String(value), cell)}`;
  }

  private formatCellValue(value: string, cell: Cell<unknown, unknown>): string {
    const { dataType } = cell.column.columnDef.meta || {};
    if (!dataType) {
      return value;
    }

    const { formatter } = dataType || {};

    if (formatter) {
      return formatter(value, cell.row);
    }

    return format(value, dataType);
  }

  private renderBodyRowSelector(cell: Cell<unknown, unknown>): TemplateResult {
    if (!this.select) {
      return html``;
    }

    const { row } = cell;

    const isDisabled = !row.getCanSelect();
    const isSelected = row.getIsSelected();

    const classes = {
      'mds-table__column--row-selector': true,
    };

    const styles = this.getCellStyles({}, cell, this.selectsticky);

    return html`
      <td class="${classMap(classes)}" style="${styleMap(styles)}" data-header-id="${cell.column.id}">
        <mc-checkbox
          hiddenlabel
          fit="${this.fit}"
          .label="${this.selectlabel}"
          ?checked="${isSelected}"
          ?disabled="${isDisabled}"
          @change="${(): void => row.toggleSelected(!isSelected)}"
        ></mc-checkbox>
      </td>
    `;
  }

  private renderBodyExpansionToggle(cell: Cell<unknown, unknown>): TemplateResult {
    if (!this.expand || this._expandable.size < 0) {
      return html``;
    }
    const { row } = cell;

    const classes = {
      'mds-table__column--row-expander': true,
    };

    const styles = this.getCellStyles({}, cell, this.expandsticky);

    if (row.getCanExpand()) {
      const buttonClasses = {
        'mds-table__expanded-row__trigger': true,
        'mds-table__expanded-row__trigger--expanded': row.getIsExpanded(),
      };
      return html`<td class=${classMap(classes)} style="${styleMap(styles)}" data-header-id="${cell.column.id}">
        <mc-button
          aria-expanded="${ifDefined(this.expand ? (row.getIsExpanded() ? 'true' : 'false') : undefined)}"
          aria-controls="${ifDefined(this.expand ? `expanded_${row.id}` : undefined)}"
          class="${classMap(buttonClasses)}"
          hiddenlabel
          disablediconslot
          disabledlabelslot
          variant="plain"
          padding="none"
          .label="${this.expandtriggerlabel}"
          @click="${(): void => row.toggleExpanded(!row.getIsExpanded())}"
          icon="chevron-down"
        ></mc-button>
      </td>`;
    }

    if (this.controller.table.getCanSomeRowsExpand()) {
      return html`<td class=${classMap(classes)} style="${styleMap(styles)}"></td>`;
    }

    return html``;
  }

  private renderExpandedRow(row: Row<unknown>): TemplateResult {
    if (!this.expand) {
      return html``;
    }
    const isExpanded = row.getIsExpanded();
    const classes = {
      'mds-table__expanded-row': true,
      'mds-table__expanded-row--hidden': !isExpanded,
      'mds-table__expanded-row--visible': isExpanded,
      'mds-table__expanded-row--no-padding': this.expandpadding === 'none',
    };

    return html` <tr id="${`expanded_${row.id}`}" data-cy="${`${row.id}_expanded_row`}" class="${classMap(classes)}">
      <td colspan=${this.controller.table.getAllColumns().length}>
        <slot .name="${row.id}_expanded" @slotchange="${(): void => this.handleExpandedRowSlotChange(row)}"></slot>
      </td>
    </tr>`;
  }

  private renderSortButton(header: Header<unknown, unknown>): TemplateResult {
    const sort = header.column.getIsSorted();
    const { meta, header: colHeader } = header.column.columnDef;
    const { type } = meta?.dataType || {};
    const { subDataLabel } = meta || {};
    const verticalAlign = meta?.verticalAlign || 'top';

    const icon = this.getSortButtonIcon(sort);
    const alignmentClasses = {
      [`items-${meta?.align ? meta.align : type === 'number' ? 'right' : 'left'}`]: true,
    };

    const sortButtonClasses = {
      ...alignmentClasses,
      'sort-button': true,
    };

    const sortButtonTextClasses = {
      ...alignmentClasses,
      'sort-button__text': true,
    };

    const sortButtonTextStyles = {
      'align-items': verticalAlign === 'middle' ? 'center' : verticalAlign === 'bottom' ? 'flex-end' : 'flex-start',
    };

    return html`
      <button slot="trigger" data-cy="sort-button" class="${classMap(sortButtonClasses)}">
        <div class="${classMap(sortButtonTextClasses)}" style="${styleMap(sortButtonTextStyles)}">
          <slot name="${header.id}_header"> ${colHeader}</slot><mc-icon icon="${icon}"></mc-icon>
        </div>
        ${subDataLabel ? html`<div class="mds-table__subtext" data-cy="sub-data-label">${subDataLabel}</div>` : html``}
      </button>
    `;
  }

  private getSortButtonIcon(sort: false | SortDirection): string {
    if (sort === 'asc') {
      return 'arrow-up';
    }

    if (sort === 'desc') {
      return 'arrow-down';
    }

    return 'arrows-down-up';
  }

  private renderTfoot(): TemplateResult {
    if (!this.footer) {
      return html``;
    }

    return html`
      <tfoot>
        ${this.renderTfootRow()}
      </tfoot>
    `;
  }

  private renderTfootRow(): TemplateResult {
    const { table } = this.controller;
    const footerGroups = table.getFooterGroups();
    const deepestFooterRow = footerGroups[0];
    const cellRenderer = this.getTfootCellRenderer();

    return html`
      <tr>
        ${deepestFooterRow.headers.map(cellRenderer)}
      </tr>
    `;
  }

  /**
   * Returns a rendering function for a table footer cell.
   * It encapsulates the colspan state to skip rendering of the cells falling within a colspan.
   */
  private getTfootCellRenderer(): (header: Header<unknown, unknown> | undefined) => TemplateResult {
    // Start with no cells to skip.
    let remainingSkip = 0;
    const utilityColumnsCount = (this.select ? 1 : 0) + (this.expand ? 1 : 0);
    const firstColumnWithColspan = this.columns.find((col) => col.footerColspan);

    return (header: Header<unknown, unknown> | undefined): TemplateResult => {
      if (!header) {
        return html`<td></td>`;
      }
      if (header.id === ROW_SELECTOR_COLUMN_ID) {
        return this.renderTfootPlaceholderCell(ROW_SELECTOR_COLUMN_ID, header);
      }
      if (header.id === ROW_EXPANDER_COLUMN_ID) {
        return this.renderTfootPlaceholderCell(ROW_EXPANDER_COLUMN_ID, header);
      }
      const { column } = header;
      const { id } = column;
      const { footerColspan, noWrap, sticky } = column.columnDef.meta || {};

      // If there are remaining cells to skip (due to a colspan), decrement the count and return an empty template.
      if (remainingSkip > 0) {
        remainingSkip--;
        return html``;
      }

      let colspan = footerColspan || 1;
      // If this cell has a colspan, update the remaining cells to skip.
      if (footerColspan) {
        remainingSkip = footerColspan - 1;
        //if it's first column with footerColspan, add utility columns count to colspan when disableplaceholderfooters is true
        if (this.disableplaceholderfooters && firstColumnWithColspan?.id === column.id) {
          colspan += utilityColumnsCount;
        }
      }

      const styles = this.getCellStyles(
        {},
        header,
        sticky,
        sticky ? STICKY_HEADER_FOOTER_Z_INDEX : DEFAULT_STICKY_CELL_Z_INDEX,
      );

      const { meta } = column.columnDef || {};
      return html`
        <td
          .id="${id}_footer_cell"
          colspan="${colspan || 1}"
          style="${styleMap(styles)}"
          class=${classMap({
            [`${this.getAlignmentClass(meta)}`]: true,
            'mds-table__cell--nowrap': noWrap || false,
            'mds-table__cell--tabular-figures': this.shouldApplyTabularFiguresClass(meta),
          })}
        >
          <slot .name="${id}_footer"></slot>
        </td>
      `;
    };
  }

  private renderTfootPlaceholderCell(
    type: typeof ROW_SELECTOR_COLUMN_ID | typeof ROW_EXPANDER_COLUMN_ID,
    header: Header<unknown, unknown>,
  ): TemplateResult {
    if (!type || this.disableplaceholderfooters) {
      return html``;
    }
    const types = {
      [ROW_SELECTOR_COLUMN_ID]: { condition: this.select, cssClass: 'mds-table__column--row-selector' },
      [ROW_EXPANDER_COLUMN_ID]: { condition: this.expand, cssClass: 'mds-table__column--row-expander' },
    };

    const { condition, cssClass } = types[type as keyof typeof types];

    if (!condition) {
      return html``;
    }

    const styles = this.getCellStyles(
      {},
      header,
      type === ROW_SELECTOR_COLUMN_ID ? this.selectsticky : this.expandsticky,
      this.footersticky ? STICKY_HEADER_FOOTER_Z_INDEX : DEFAULT_STICKY_CELL_Z_INDEX,
    );

    return html` <td style="${styleMap(styles)}" class="${cssClass}" data-header-id="${type}">&nbsp;</td>`;
  }

  protected firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    this._afterFirstUdpdate = true;
    this.initializeResizeObserver();
  }

  protected willUpdate(_changedProperties: PropertyValues<this>): void {
    super.willUpdate(_changedProperties);

    // Clear caches when data or spans change
    if (_changedProperties.has('data') || _changedProperties.has('spans')) {
      this.spanCache.clear();
      this.skipRenderCache.clear();
    }

    const propertyHandlers: Record<string, () => void> = {
      data: () => {
        this.hadPreviousData = true;
        if (_changedProperties.get('data')?.length === 0) {
          this.hadPreviousData = false;
        }
        this.handleDataChanged();
      },
      columns: () => this.handleColumnsChanged(),
      sortdisabled: () => this.controller.update({ tableOptions: { enableSorting: !this.sortdisabled } }),
      sortmanual: () =>
        this.controller.update({
          tableOptions: {
            manualSorting: this.sortmanual,
          },
        }),
      currentpage: () => {
        this.controller.update({
          tableOptions: { getPaginationRowModel: this.currentpage < 1 ? undefined : getPaginationRowModel() },
        });
        this.controller.table.setPagination(() => ({
          pageIndex: +this.currentpage - 1,
          pageSize: +this.recordsperpage,
        }));
      },
      recordsperpage: () =>
        this.controller.table.setPagination(() => ({
          pageIndex: +this.currentpage - 1,
          pageSize: +this.recordsperpage,
        })),
      select: () => {
        this.handleColumnsChanged();
        this.requestUpdate();
      },
      expand: () => this.handleColumnsChanged(),
      selected: () => {
        if (this.selected[0] === '') {
          this.controller.table.setRowSelection({});
        } else {
          this.controller.table.setRowSelection(this.reduceArrayIntoBoolObject(this.selected, this.datakey));
        }
      },
      expandopened: () =>
        this.controller.table.setExpanded(this.reduceArrayIntoBoolObject(this.expandopened, this.datakey)),
      sortdefaultdirection: () => this.setDefaultSortingState(),
      sortdefaultcolumnid: () => this.setDefaultSortingState(),
      hidecolumns: () => {
        const toHide = this.reduceArrayIntoBoolObject(this.hidecolumns, '', false);
        this.controller.table.setColumnVisibility(toHide);
        if (!isServer && this._afterFirstUdpdate) {
          this.dispatchEvent(new CustomEvent('hidecolumnschange', { detail: this.hidecolumns }));
        }
      },
    };

    _changedProperties.forEach((_, propName) => {
      const handler = propertyHandlers[propName.toString()];
      if (handler) {
        handler();
      }
    });
  }

  protected handleColumnsChanged(): void {
    if (!this.columns?.length) {
      return;
    }
    this.cellStickyStylesCache = new Map();
    const columnsToCompute = this.getColumnsToCompute(this.columns);
    this.computedColumns = this.createComputedColumns(columnsToCompute);

    let leftPinned: string[] = [];
    let rightPinned: string[] = [];
    if (this.computedColumns.some((col) => col.enablePinning)) {
      leftPinned = this.getPinnedColumns('left');
      rightPinned = this.getPinnedColumns('right');
    }

    this.controller.update({
      state: {
        sorting: this._sort,
        columnPinning: { left: leftPinned, right: rightPinned },
      },
      tableOptions: {
        sortDescFirst: this.sortdefaultdirection === 'descending' ? true : false,
      },
      columns: this.computedColumns,
    });
  }

  private getColumnsToCompute(originalColumns?: TableColumn[]): TableColumn[] {
    let additionalColumns: TableColumn[] = [];
    if (this.select) {
      additionalColumns = [
        ...additionalColumns,
        {
          id: ROW_SELECTOR_COLUMN_ID,
          label: ROW_SELECTOR_COLUMN_ID,
          sortDisabled: true,
          width: `${ROW_SELECTOR_COLUMN_WIDTHS[this.fit as keyof typeof ROW_SELECTOR_COLUMN_WIDTHS]}px`,
          sticky: this.selectsticky ? 'left' : undefined,
        },
      ];
    }
    if (this.expand) {
      additionalColumns = [
        ...additionalColumns,
        {
          id: ROW_EXPANDER_COLUMN_ID,
          label: ROW_EXPANDER_COLUMN_ID,
          sortDisabled: true,
          width: `${ROW_EXPANDER_COLUMN_WIDTHS[this.fit as keyof typeof ROW_EXPANDER_COLUMN_WIDTHS]}px`,
          sticky: this.expandsticky ? 'left' : undefined,
        },
      ];
    }
    return [...additionalColumns, ...(originalColumns || [])];
  }

  private getPinnedColumns(sticky: 'left' | 'right'): string[] {
    return this.computedColumns
      .filter((col) => col.enablePinning && col.meta?.sticky === sticky)
      .map((col) => col.id) as string[];
  }

  private handleExpandedRowSlotChange(row: Row<unknown>): void {
    const expandedSlot = this.shadowRoot?.querySelector(`slot[name="${row.id}_expanded"]`) as HTMLSlotElement;
    if (expandedSlot?.assignedElements().length > 0) {
      this._expandable.set(row.id, true);
    } else {
      this._expandable.delete(row.id);
    }
    this.requestUpdate();
  }

  protected handleDataChanged(): void {
    if (this.cellStickyStylesCache?.size > 0) {
      this.cellStickyStylesCache.clear();
    }

    const columnsLength = this.columns?.length;
    if (!columnsLength) {
      this.computedColumns = this.createComputedColumnsFromData();
    }

    let leftPinned: string[] = [];
    if (!columnsLength) {
      if ((this.select && this.selectsticky) || (this.expand && this.expandsticky)) {
        leftPinned = this.getPinnedColumns('left');
      }
    }

    this.setDefaultSortingState();

    this.controller.update({
      data: this.data || [],
      columns: this.computedColumns,
      state: {
        columnPinning: {
          left: columnsLength ? this.controller.table.getState()?.columnPinning?.left || [] : leftPinned,
          right: this.controller.table.getState()?.columnPinning?.right || [],
        },
      },
    });
  }

  protected handleRowClick(e: MouseEvent, row: Row<unknown>): void {
    const isSelectOrExpandTrigger = e.composedPath().some((el: EventTarget) => {
      if (el instanceof HTMLElement) {
        return (
          el.classList.contains('mds-table__column--row-selector') ||
          el.classList.contains('mds-table__column--row-expander')
        );
      }
      return false;
    });

    if (isSelectOrExpandTrigger) {
      return;
    }

    // Find the clicked cell element
    const cellElement = e.composedPath().find((el: EventTarget) => {
      if (el instanceof HTMLElement) {
        return el.tagName.toLowerCase() === 'td' || el.tagName.toLowerCase() === 'th';
      }
      return false;
    }) as HTMLElement;

    if (cellElement) {
      const headerId = cellElement.getAttribute('data-header-id');
      const clickedCell = row.getAllCells().find((cell) => cell.column.id === headerId);
      if (clickedCell?.column.columnDef.meta?.rowClickDisabled) {
        return;
      }
    }

    if (this.dispatchEvent) {
      this.dispatchEvent(
        new CustomEvent<IMcTableRowClickDetail>('rowclick', {
          detail: {
            currentTarget: e.currentTarget,
            rowData: row.original,
          },
        }),
      );
    }
  }

  protected createComputedColumns(columns: TableColumn[]): ColumnDef<unknown, unknown>[] {
    if (!columns) {
      this.columns = [];
    }

    const computedColumns = columns.map((column) => {
      if (!column.id) {
        console.warn(`Please ensure this column has an "id" property: ${JSON.stringify(column)}`);
      }

      let computedColumn: ColumnDef<unknown, unknown> = this.createComputedColumn(column);

      if (column.columns) {
        computedColumn = {
          ...computedColumn,
          columns: this.createComputedColumns(column.columns),
        };
      }

      return computedColumn;
    });

    return computedColumns;
  }

  protected createComputedColumn(column: TableColumn): ColumnDef<unknown, unknown> & { header?: unknown } {
    const {
      id,
      label,
      width,
      sortDisabled,
      sorter,
      sticky,
      headerTemplate,
      cellTemplate,
      rowspan,
      colspan,
      truncate,
      ...meta
    } = column;
    const computedWidth = width && typeof width === 'string' ? width : '';
    const { value: widthValue, unit: sizeUnit } = this.getWidthValues(computedWidth);
    const enableSorting = !sortDisabled && !this.sortdisabled && !column.columns;
    const sortingFn = this.getColumnSorter(sorter || 'auto');
    const enablePinning = sticky ? true : false;
    const stickyDirection =
      sticky === true ? 'left' : sticky === 'right' ? 'right' : sticky === 'left' ? 'left' : undefined;

    return {
      header: headerTemplate
        ? typeof headerTemplate === 'string'
          ? headerTemplate
          : (headerTemplate({
              column: this.columns.find((col) => col.id === id),
              html,
            }) as unknown as ColumnDefTemplate<HeaderContext<unknown, unknown>>)
        : label,
      cell: cellTemplate
        ? typeof cellTemplate === 'string'
          ? cellTemplate
          : (context) =>
              cellTemplate({
                value: context.getValue(),
                rowData: context.row.original as Record<string, unknown>,
                column,
                html,
              })
        : (context) => context.getValue(),
      accessorKey: id,
      id,
      size: this.calculateColumnSize(widthValue, sizeUnit),
      enableSorting,
      sortingFn,
      enablePinning,
      meta: {
        sizeUnit: width ? sizeUnit : undefined,
        originalWidth: width,
        sticky: stickyDirection,
        rowspan,
        colspan,
        truncate,
        minWidth: typeof width === 'string' ? width : width?.min,
        maxWidth: typeof width === 'string' ? width : width?.max,
        ...meta,
      },
    };
  }

  protected getWidthValues(width: string): { value: number | undefined; unit: string | undefined } {
    const value = parseFloat(width);

    if (isNaN(value)) {
      return {
        value: undefined,
        unit: undefined,
      };
    } else {
      const unit = width.slice(String(value).length).trim() || undefined;
      return {
        value,
        unit,
      };
    }
  }

  protected getColumnSorter(sorter: ColumnSorter): SortingFnOption<unknown> {
    if (typeof sorter === 'function') {
      //Wrap the supplied custom sorter function and provide only the values for cells. By default user would get information about the whole row and tanstack context.
      return (a: Row<unknown>, b: Row<unknown>, columnId: string): number => {
        return sorter(a.getValue(columnId), b.getValue(columnId));
      };
    }
    return sorter;
  }

  protected calculateColumnSize(widthValue: number | undefined, sizeUnit: string | undefined): number | undefined {
    if (sizeUnit === '%' && widthValue) {
      const totalSize = this.controller.table.getTotalSize();
      const percentage = widthValue / 100;
      return totalSize * percentage;
    }

    return widthValue;
  }

  protected createComputedColumnsFromData(): ColumnDef<unknown, unknown>[] {
    if (!this.data?.length) {
      return [];
    }

    let computedColumns: ColumnDef<unknown, unknown>[] | [] = [];
    const commonColumnsToCompute = this.getColumnsToCompute();
    const computedCommonColumns = this.createComputedColumns(commonColumnsToCompute);
    computedColumns = [...computedCommonColumns];

    const firstRow = this.data[0];

    for (const key in firstRow) {
      computedColumns = [
        ...computedColumns,
        {
          header: key,
          accessorKey: key,
          id: key,
          size: undefined,
          enableSorting: !this.sortdisabled,
        },
      ];
    }
    return computedColumns;
  }

  protected setDefaultSortingState(): void {
    const isAnySortingApplied = this.controller.table.getState()?.sorting?.length ? true : false;
    //if there are no columns, they will be created from data with sorting enabled
    const isAnyColumnSortable = this.columns?.length ? this.columns?.some((col) => !col.sortDisabled) : true;
    const hasData = this.data?.length > 0;

    if (this.sortdisabled || isAnySortingApplied || !isAnyColumnSortable || !hasData || this.sortdisableoninitialload) {
      return;
    }

    const defaultSortColumn =
      this.columns.find((col) => {
        return col.id === this.sortdefaultcolumnid;
      }) || this.columns[0];

    if (defaultSortColumn?.sortDisabled) {
      return;
    }

    const fallbackId = (this.columns && this.columns[0]?.id?.toString()) || Object.keys(this.data[0])[0];

    if (!this.hadPreviousData && this.sortmanual) {
      //table should not dispatch initial sortchange event if the data was not loaded yet and sortmanual is true
      this.shouldDispatchSortEvent = false;
    }

    this.controller.table.setSorting([
      {
        id: this.sortdefaultcolumnid ? this.sortdefaultcolumnid : fallbackId,
        desc: this.sortdefaultdirection === 'descending',
      },
    ]);
  }

  private reduceArrayIntoBoolObject(
    rows: Array<Record<string, string | number | boolean> | string> | null,
    dataKey = '',
    value = true,
  ): Record<string, boolean> {
    if (!Array.isArray(rows)) {
      rows = [];
    }

    return rows.reduce<Record<string, boolean>>((acc, item) => {
      let key;
      if (typeof item === 'string') {
        key = item;
      } else if (typeof item === 'object') {
        key = String(item[dataKey]);
      } else {
        throw new Error('Unsupported item type in array');
      }

      acc[key] = value;
      return acc;
    }, {});
  }

  private getAlignmentClass(meta: ColumnMeta<unknown, unknown> = {}): string {
    if (meta.align) {
      return `mds-table__cell--text-${meta.align}`;
    }

    if (meta.dataType?.type === 'number') {
      return 'mds-table__cell--text-right';
    }

    return 'mds-table__cell--text-left';
  }

  private getVerticalAlignmentClass(meta: ColumnMeta<unknown, unknown> = {}): string {
    if (meta.verticalAlign) {
      return `mds-table__cell--content-${meta.verticalAlign}`;
    }
    return '';
  }

  private shouldApplyTabularFiguresClass(meta: ColumnMeta<unknown, unknown> = {}): boolean {
    const { tabularFigures, dataType } = meta;

    if (tabularFigures === true || (tabularFigures !== false && dataType?.type === 'number')) {
      return true;
    }

    return false;
  }

  private getStickyStyles(
    cell: Cell<unknown, unknown> | Header<unknown, unknown>,
    customZIndex: number | undefined = undefined,
  ): Record<string, string | number | undefined> {
    const cachedStyles = this.cellStickyStylesCache.get(cell.id);
    if (cachedStyles) {
      return cachedStyles as Record<string, string | number | undefined>;
    }

    const { column } = cell;
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');
    //use boxShadow to simulate the border of the sticky column because border behaves strange in the sticky context
    const styles = {
      boxShadow: isLastLeftPinnedColumn
        ? 'inset calc(0px - var(--mds_core_table_sticky-column_border-width)) 0px 0px 0px var(--mds_foundations_table_border-color)'
        : isFirstRightPinnedColumn
          ? 'inset var(--mds_core_table_sticky-column_border-width) 0px 0px 0px var(--mds_foundations_table_border-color)'
          : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: 'sticky',
      zIndex: customZIndex || DEFAULT_STICKY_CELL_Z_INDEX,
    };
    this.cellStickyStylesCache.set(cell.id, styles);

    return styles;
  }

  private getCellStyles(
    defaultStyles: Record<string, string | number | undefined>,
    cell: Cell<unknown, unknown> | Header<unknown, unknown>,
    isSticky: boolean | 'left' | 'right' | undefined,
    customZIndex: number | undefined = undefined,
  ): Record<string, string | number | undefined> {
    const styles = { ...defaultStyles };

    // Ensure max-width is strictly enforced
    if (styles.maxWidth) {
      styles.width = styles.maxWidth;
      styles.overflow = 'hidden';
    }

    if (isSticky) {
      Object.assign(styles, this.getStickyStyles(cell, customZIndex));
    }

    return styles;
  }

  private applyStickyHeadersTopOffset(): void {
    // Only apply sticky header top offset when headers are actually sticky
    if (!this.headersticky) {
      return;
    }

    const headerRows = this.tableWrapper.querySelectorAll('thead tr');
    let accumulatedHeight = 0;

    headerRows.forEach((row: HTMLElement) => {
      const cells = row.querySelectorAll('th, td');
      cells.forEach((cell: HTMLElement) => {
        cell.style.top = `${accumulatedHeight}px`;
      });
      accumulatedHeight += row.offsetHeight;
    });
  }

  private updateCellStylesOnResize(): void {
    const cells = this.tableWrapper.querySelectorAll('tbody td');

    cells.forEach((cell: HTMLElement) => {
      const columnId = cell.getAttribute('data-header-id');
      const columnMeta = this.computedColumns.find((col) => col.id === columnId)?.meta;

      if (columnMeta?.truncate) {
        this.setupCellTruncation(cell);
      }
    });
  }

  private setupCellTruncation(cell: HTMLElement): void {
    const columnWidth = cell.offsetWidth;
    if (!columnWidth) return;

    // Check if tooltip already exists or already processed
    if (cell.querySelector('mc-tooltip')) {
      return;
    }

    // Get the original content
    const originalContent = cell.textContent?.trim() || '';
    if (!originalContent) return;

    // Get computed styles once for reuse
    const cellStyle = window.getComputedStyle(cell);

    // Calculate available space
    const paddingLeft = parseFloat(cellStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(cellStyle.paddingRight) || 0;
    const borderLeft = parseFloat(cellStyle.borderLeftWidth) || 0;
    const borderRight = parseFloat(cellStyle.borderRightWidth) || 0;
    const actualAvailableWidth = columnWidth - paddingLeft - paddingRight - borderLeft - borderRight - 2;

    // Measure content width efficiently
    const contentWidth = this.measureContentWidth(originalContent, cellStyle);
    // const contentWidth = cell.offsetWidth;
    const isOverflowing = contentWidth > actualAvailableWidth;

    // Apply truncation styles
    this.applyCellTruncationStyles(cell, columnWidth);

    // Check if visually truncated after applying styles
    const isVisuallyTruncated = this.isContentActuallyTruncated(cell);

    // Setup tooltip based on truncation
    if (isOverflowing || isVisuallyTruncated) {
      this.setupCellTooltip(cell, columnWidth, originalContent);
    }
  }

  private applyCellTruncationStyles(cell: HTMLElement, maxWidth: number): void {
    cell.style.textOverflow = 'ellipsis';
    cell.style.overflow = 'hidden';
    cell.style.whiteSpace = 'nowrap';
    cell.style.maxWidth = `${maxWidth}px`;
  }

  private setupCellTooltip(cell: HTMLElement, columnWidth: number, originalContent: string): void {
    if (!originalContent) return;

    // Create tooltip structure
    const tooltip = this.createTooltipElement(originalContent, columnWidth, cell);

    // Replace cell content with tooltip
    cell.innerHTML = '';
    cell.appendChild(tooltip);
  }

  private createTooltipElement(content: string, columnWidth: number, cell: HTMLElement): HTMLElement {
    const tooltip = document.createElement('mc-tooltip');

    // Set tooltip attributes for proper behavior
    tooltip.setAttribute('trigger', 'hover');
    tooltip.setAttribute('fitcontent', '');

    // Create tip content (full text) - this goes in the default slot
    const tooltipContent = document.createElement('div');
    tooltipContent.textContent = content;
    tooltipContent.style.whiteSpace = 'normal';
    tooltipContent.style.wordWrap = 'break-word';
    tooltipContent.style.maxWidth = '300px'; // Prevent extremely wide tooltips

    // Calculate the actual available space for the trigger to show ellipsis
    const cellStyle = window.getComputedStyle(cell);
    const paddingLeft = parseFloat(cellStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(cellStyle.paddingRight) || 0;
    const borderLeft = parseFloat(cellStyle.borderLeftWidth) || 0;
    const borderRight = parseFloat(cellStyle.borderRightWidth) || 0;
    const actualAvailableWidth = columnWidth - paddingLeft - paddingRight - borderLeft - borderRight - 4; // Small buffer

    // Create trigger element (truncated content)
    const trigger = document.createElement('div');
    trigger.slot = 'trigger';
    trigger.textContent = content;
    trigger.style.textOverflow = 'ellipsis';
    trigger.style.overflow = 'hidden';
    trigger.style.whiteSpace = 'nowrap';
    trigger.style.maxWidth = `${actualAvailableWidth}px`; // Use calculated available width
    trigger.style.display = 'block';
    trigger.style.width = '100%';
    trigger.style.boxSizing = 'border-box';
    trigger.title = ''; // Remove browser's default tooltip

    // Add content first, then trigger
    tooltip.appendChild(tooltipContent);
    tooltip.appendChild(trigger);

    return tooltip;
  }

  private isContentActuallyTruncated(cell: HTMLElement): boolean {
    const scrollDiff = cell.scrollWidth - cell.clientWidth;
    return scrollDiff > 0.5; // Account for sub-pixel differences
  }

  private measureContentWidth(content: string, cellStyle: CSSStyleDeclaration): number {
    // Use Canvas API for efficient text measurement - universally supported in modern browsers
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set font properties for accurate measurement
    const fontSize = cellStyle.fontSize || '14px';
    const fontFamily = cellStyle.fontFamily || 'Arial';
    const fontWeight = cellStyle.fontWeight || 'normal';

    context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

    // Measure the text width
    const metrics = context.measureText(content);
    return Math.ceil(metrics.width);
  }

  private initializeResizeObserver(): void {
    this.updateCellStylesOnResize();

    let resizeTimeout: number | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        // Clear previous timeout to debounce rapid resize events
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }

        resizeTimeout = window.setTimeout(() => {
          this.applyStickyHeadersTopOffset();
          this.updateCellStylesOnResize();
        }, 100); // 100ms debounce
      });

      if (this.tableWrapper) {
        this.resizeObserver.observe(this.tableWrapper);
      }
    } else {
      console.warn('ResizeObserver is not supported in this environment.');
    }
  }

  private enableRowSelection(rowData: Row<Record<string, unknown>>): boolean {
    if (!this.select) {
      return false;
    }
    if (rowData.original?.selectDisabled) {
      return false;
    }
    if (typeof this.selectrowdisabled === 'function') {
      return this.select && !this.selectrowdisabled(rowData.original);
    }
    return this.select;
  }

  private areAllRowsDisabled(): boolean {
    if (!this.select) {
      return false;
    }
    
    const rows = this.controller.table.getPrePaginationRowModel().rows;
    if (rows.length === 0) {
      return false;
    }
    
    return rows.every((row) => !row.getCanSelect());
  }

  private getDisabledRowsSelection() {
    const disabledRowsSelection: Record<string, boolean> = {};
    this.controller.table.getRowModel().rows.forEach((row) => {
      if (this.selectrowdisabled?.(row.original) || row.original?.selectDisabled) {
        disabledRowsSelection[row.id] = this.selected.some(
          (item) => (typeof item === 'string' ? item : String(item[this.datakey])) === String(row.id),
        );
      }
    });
    return disabledRowsSelection;
  }

  private handleSelectionToggleAll(table: Table<unknown>) {
    const disabledRowsSelection = this.getDisabledRowsSelection();
    const isAllSelected = table.getIsAllPageRowsSelected();

    const newSelection = {
      ...disabledRowsSelection,
      ...Object.fromEntries(
        this.controller.table
          .getRowModel()
          .rows.filter((row) => !this.selectrowdisabled?.(row.original) && !row.original?.selectDisabled)
          .map((row) => [row.id, !isAllSelected]),
      ),
    };

    this.controller.table.setRowSelection(newSelection);
  }

  private getCellWidthValue(
    sizeUnit: string,
    originalWidth,
    cell: Cell<unknown, unknown> | Header<unknown, unknown>,
    cellType = 'header',
  ): string {
    let widthValue;

    if (cellType === 'header') {
      widthValue = sizeUnit ? `${(cell as Header<unknown, unknown>).getSize()}px` : 'auto';
    } else if (cellType === 'cell') {
      widthValue = sizeUnit ? `${(cell as Cell<unknown, unknown>).column.getSize()}px` : 'auto';
    }
    if (sizeUnit === '%') {
      widthValue = originalWidth || 'auto';
    }
    return widthValue;
  }

  private dispatchCustomEvent(element: HTMLElement, eventName: string, detail: unknown): void {
    element.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  private hasSlot(name: string): boolean {
    if (isServer) {
      return false;
    }
    return !!this.querySelector(`[slot="${name}"]`);
  }

  //public functions
  /**
   * Returns the pagination page count
   * @returns {number}
   */
  public getPageCount(): number {
    const controllerPageCount = this.controller.table.getPageCount();
    if (controllerPageCount) {
      return controllerPageCount;
    }
    return Math.ceil(this.data?.length / this.recordsperpage);
  }
  /**
   * Returns visible rows, depending if pagination is enabled or not.
   * @returns {Array<any>}
   */
  public getVisibleRows(): Array<Record<string, string | number | boolean | object>> {
    const paginationRows = this.controller.table.getPaginationRowModel()?.rows || undefined;
    const prePaginationRows = this.controller.table.getPrePaginationRowModel()?.rows || undefined;

    if (this.isPagiantionEnabled) {
      if (!paginationRows?.length) {
        return this.data?.slice(0, this.recordsperpage) || [];
      }
      return this.controller.table.getPaginationRowModel().rows.map((row) => row.original);
    }

    if (!prePaginationRows?.length) {
      return this.data || [];
    }
    return this.controller.table.getPrePaginationRowModel().rows.map((row) => row.original);
  }
  /**
   * Resets the row selection to empty state
   */
  public resetRowSelection(): void {
    this.controller.table.resetRowSelection();
  }
  /**
   * Resets sorting to empty state
   */
  public resetSorting(): void {
    this.controller.table.resetSorting();
  }
  /**
   * Returns the selected row datakeys
   * @returns {Array<number | string>}
   */
  public getSelectedRowDataKeys(): string[] {
    return this.controller.table.getSelectedRowModel().flatRows.map((row) => row.id);
  }
  /**
   * Returns header information
   * @param {string} columnId
   * @returns {Header<unknown, unknown> | undefined}
   */
  public getColumnHeader(columnId: string): Header<unknown, unknown> | undefined {
    return this.controller.table.getFlatHeaders().find((header) => header.id === columnId);
  }

  /**
   * Returns data for a column
   * @param {string} columnId
   * @returns {Array<Record<string, string | number | boolean | object>>}
   */
  public getColumnData(columnId: string): Array<Record<string, string | number | boolean | object>> {
    return this.controller.table.getSortedRowModel().rows.map((row) => row.getValue(columnId));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mc-table': McTable;
  }
}

customElements.get('mc-table') || customElements.define('mc-table', McTable);
