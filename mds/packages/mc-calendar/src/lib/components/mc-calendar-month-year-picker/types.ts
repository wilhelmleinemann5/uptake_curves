export type { MonthYearPickerValue } from '@maersk-global/mds-shared-types';
import type { MonthYearPickerValue } from '@maersk-global/mds-shared-types';
import type { Dayjs } from 'dayjs';
export interface IMcCalendarMonthYearPicker {
  /**
   * Initial value of the picker
   */
  value?: MonthYearPickerValue;
  /**
   * Define minimal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  min?: Dayjs | string | null;
  /**
   * Define maximal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  max?: Dayjs | string | null;
  /**
   * Locale to render the month/day names in.
   * By default the component will use the users browser language.
   * Defaults to `en-GB` if fetching browser languge fails.
   */
  locale?: string;
  /**
   * How many years backwards and forwards from the current one to render in month-year picker.
   */
  yearcap?: number;
  /**
   * Show the component.
   */
  show?(value: MonthYearPickerValue): void;
  /**
   * Hide the component.
   */
  hide?(): void;
}
