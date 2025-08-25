import type { Dayjs } from 'dayjs';

export interface IMcCalendarDateSelectedDetail {
  date: string | Dayjs;
}

export interface Weekday {
  long: string;
  narrow: string;
}

export interface CalendarCell {
  displayValue: string;
  enabled: boolean;
  compareValue: Dayjs;
  isInAdjacentMonth: boolean;
  rawValue: Dayjs;
  isToday: boolean;
  customClasses?: Array<string>;
  indicatorStyle?: string;
  visible: boolean;
}

export interface DateCustomizations {
  enabled: boolean;
  customClasses: Array<string>;
  indicatorAppearance?: IndicatorAppearance;
}

export interface Week {
  number: number;
  cells: CalendarCell[];
}
import { CellCustomizationPayload, IndicatorAppearance } from '@maersk-global/mds-shared-types/index';

export interface IMcCalendar {
  /**
   * Specifies which year and month to display. Can be used to switch between months/years without selecting a date.
   * If left blank, today's month and year is used by default.
   */
  activedate: string | null;
  /**
   * Locale to render the month/day names in.
   * By default the component will use the users browser language.
   * Defaults to `en-GB` if fetching browser languge fails.
   */
  locale?: string;
  /**
   * Format for displaying weekday names in the calendar header.
   * @default 'short'
   */
  dayperiod?: 'long' | 'short' | 'narrow';
  /**
   * Selected date value, defaults to current date (ISO format YYYY-MM-DD)
   */
  value?: string;
  /**
   * 	An aria-label to use for the previous month navigation button.
   *  @default 'Previous month'
   */
  previouslabel?: string;
  /**
   * 	An aria-label to use for the next month navigation button.
   *  @default 'Next month'
   */
  nextlabel?: string;
  /**
   * A set of dates to customize. Use to display day indicators or
   * disable selectable days within selectable date range if min and max are specified.
   * Check the Storybook examples for more details.
   */
  customize?: CellCustomizationPayload[];
  /**
   * Define minimal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  min?: Dayjs | string | null;
  /**
   * Define maximal selectable date, unlimited if empty (ISO format YYYY-MM-DD)
   */
  max?: Dayjs | string | null;
  /**
   * Start of the week (0 = Sunday, 1 = Monday, ...)
   */
  startofweek?: number;
  /**
   * Whether to render days from the previous and next month.
   */
  showadjacentmonthdays?: boolean;
  /**
   * Whether to render week numbers.
   */
  showweeknumbers?: boolean;
  /**
   * Whether to disable shadow.
   */
  noshadow?: boolean;
  /**
   * Whether to disable borders.
   */
  noborder?: boolean;
  /**
   * How many years backwards and forwards from the current one to render in month-year picker.
   */
  yearcap?: number;
  /**
   * Emitted when the date was selected
   * @returns {Dayjs}
   */
  dateselected?: (e: CustomEvent<IMcCalendarDateSelectedDetail>) => void;
  /**
   * Selects a date in the calendar
   * @param { Date | dayjs | string} date
   * @param {boolean} emitEvent True by default. Whether to emit a Custom `dateselected` event with the date attribute as payload.
   */
  selectDate?(date: Dayjs | Date | string, emitEvent?: boolean): void;
  /**
   * Focuses the calendar programmatically.
   */
  focus(): void;
}
