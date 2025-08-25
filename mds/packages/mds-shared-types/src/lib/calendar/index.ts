import { Dayjs as DateTime } from 'dayjs/esm/index.js';
import { IndicatorAppearance } from '../common';

/* Shared types between Calendar and InputDate */
export declare interface CellCustomizationPayload {
  date: CellCustomizationDate;
  customClasses?: Array<string> | string;
  disabled?: boolean;
  indicatorAppearance?: IndicatorAppearance;
}
export declare interface DateRange {
  from: string | DateTime;
  to: string | DateTime;
}
export declare type CellCustomizationDate = DateRange | Date | string | ((date: Date) => boolean);

export interface MonthYearPickerValue {
  month: string | number | null | undefined;
  year: number | null | undefined;
}
