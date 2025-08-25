import {
  CellCustomizationPayload,
  Fit,
  IMcValidation,
  LabelPosition,
  Position,
  Variant,
} from '@maersk-global/mds-shared-types';
import { IMcCalendar } from '@maersk-global/mds-components-core-calendar/types';
import { IMcInput } from '@maersk-global/mds-components-core-input/types';

export interface IMcInputDateDefaults {
  calendarPosition: Position;
  fit: Fit;
  format: string;
  labelPosition: LabelPosition;
  locale: string;
  nextLabel: string;
  previouslabel: string;
  startOfWeek: number;
  variant: Variant;
  yearCap: number;
  width: string;
}

export const INPUT_DATE_DEFAULTS: IMcInputDateDefaults = {
  calendarPosition: 'bottom-left' as Position,
  fit: 'medium' as Fit,
  format: 'YYYY-MM-DD',
  labelPosition: 'top' as LabelPosition,
  locale: new Intl.NumberFormat().resolvedOptions().locale || 'en-GB',
  nextLabel: 'Next month',
  previouslabel: 'Previous month',
  startOfWeek: 1,
  variant: 'default' as Variant,
  yearCap: 20,
  width: 'auto',
};

export interface IMcInputDate extends Omit<IMcCalendar, 'value' | 'min' | 'max' | 'focus'>, IMcInput, IMcValidation {
  /** Start of the week (0 = Sunday, 1 = Monday, ...)
   *  @default 1
   */
  startofweek?: number;
  /** Date format to be used to populate input field. Check The day.js website for available formatting options
   * @default YYYY-MM-DD
   */
  format?: string;
  /**
   * A set of dates to customize.
   */
  customize?: CellCustomizationPayload[];
  /**
   * Position on the calendar.
   * @default 'bottom-left'
   */
  calendarposition?: Position;
  /**
   * How many years backwards and forwards from the current one to render in month-year picker.
   */
  yearcap?: number;
  /**
   * Whether to open the calendar on render.
   * @default false
   */
  open?: boolean;
  /**
   * Whether to use input mask on the input field. The mask will be based on the provided format YYYY-MM-DD by default.
   * @default false
   */
  usemask?: boolean;
}
