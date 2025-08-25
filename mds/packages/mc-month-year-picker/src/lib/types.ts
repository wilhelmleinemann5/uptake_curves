import type { Fit, MonthYearPickerValue } from '@maersk-global/mds-shared-types';
export type { Fit, MonthYearPickerValue } from '@maersk-global/mds-shared-types';

export interface Month {
  name: string;
  number: number;
  disabled: boolean;
}

export interface Year {
  number: number;
  disabled: boolean;
}

export interface IMcMonthYearSelectedDetail {
  readonly value: MonthYearPickerValue;
}

export interface IMcMonthYearPicker {
  /**
   * Fit of the month-year-picker.
   */
  fit?: Fit;
  /**
   * How many years backwards and forwards from the current one to render.
   */
  yearcap?: number;
  /**
   * Month and year of the picker. Month is accepted as string and zero indexed number.
   */
  value?: MonthYearPickerValue;
  /**
   * True if the monthyearselected event shouldn't be
   * dispatched on initial load when used in a popover.
   */
  preventinitialeventdispatch?: boolean;
  /**
   * Define minimal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  min?: MonthYearPickerValue;
  /**
   * Define maximal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  max?: MonthYearPickerValue;
  /**
   * Locale to render the month/day names in.
   * By default the component will use the users browser language.
   * Defaults to `en-GB` if fetching browser languge fails.
   */
  locale?: string;
  /**
   * Show must be used, when the value was set but the month-year-picker wasn't visible,
   * scroll the selected values to the center.
   */
  show?(): void;
  /**
   * Focus the month-year-picker.
   */
  focus?(): void;
  /**
   * Hide the month-year-picker.
   */
  hide?(): void;
  /**
   * Emitted when a new month or year is selected
   * @returns {{month: number, year: number}}
   */
  monthyearselected?: () => { month: number; year: number };
}
