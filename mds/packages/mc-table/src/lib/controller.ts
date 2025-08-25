//lit
import { ReactiveController, ReactiveControllerHost } from 'lit';
//TanStack
import { createTable } from '@tanstack/table-core';
//types
import type {
  Table,
  TableOptions,
  TableOptionsResolved,
  RowData,
  TableState,
  ColumnDef,
  Updater,
} from '@tanstack/table-core';
import type { UpdateParameters } from './types';

export function doUpdate<T>(value: T, updater: Updater<unknown>): T {
  return typeof updater === 'function' ? updater(value) : (updater as T);
}

export function flexRender<TProps extends object>(
  Comp: ((props: TProps) => string) | string | undefined,
  props: TProps,
): string | number | null {
  if (!Comp) {
    return null;
  }

  return typeof Comp !== 'function' ? Comp : Comp(props);
}

export class Controller<TData extends RowData> implements ReactiveController {
  public table!: Table<TData>;
  public state: TableState;
  public tableOptions: Partial<TableOptions<RowData>>;

  public constructor(
    private host: ReactiveControllerHost,
    private options: TableOptions<TData>,
  ) {
    this.host = host;
    host.addController(this);

    const resolvedOptions: TableOptionsResolved<TData> = {
      state: {},
      onStateChange: (): void => {
        return;
      },
      onPaginationChange: (): void => {
        return;
      },
      onRowSelectionChange: (): void => {
        return;
      },
      onExpandedChange: (): void => {
        return;
      },
      renderFallbackValue: null,
      ...this.options,
    };

    this.table = createTable<TData>(resolvedOptions);
    this.state = this.table.initialState;
    this.tableOptions = {};
  }

  public hostConnected(): void {
    this.update({ state: this.state });
  }

  public update({ state, data, columns, tableOptions }: UpdateParameters): void {
    this.state = { ...this.state, ...state };
    this.tableOptions = { ...this.tableOptions, ...tableOptions };
    this.table.setOptions((prev) => ({
      ...prev,
      ...this.options,
      ...(this.tableOptions as Partial<TableOptionsResolved<TData>>),
      state: this.state,
      columns: columns ? (columns as ColumnDef<TData, unknown>[]) : this.table.options.columns,
      data: data ? (data as TData[]) : this.table.options.data,
      onStateChange: (updater): void => {
        const newState = doUpdate(this.state, updater);
        this.update({ state: newState });
        this.host.requestUpdate();
      },
    }));
    this.host.requestUpdate();
  }
}
