import { IAutoLayout, IMcValidation } from '@maersk-global/mds-shared-types';
import { IMcInputDate } from '@maersk-global/mds-components-core-input-date/types';

export const DATE_RANGE_DEFAULTS = {
  fromLabel: 'From',
  toLabel: 'To',
};

/**
 * Represents the value's structure in the date range component.
 */
export interface IDateRangeValue {
  /**
   * The beginning date.
   */
  from?: string | null;

  /**
   * The ending date.
   */
  to?: string | null;
}

export interface IMcDateRange
  extends Omit<IMcInputDate, 'activedate' | 'label' | 'type' | 'value'>,
    IAutoLayout,
    IMcValidation {
  /**
   * Whether to display a clear button.
   */
  clearbutton?: boolean;

  /**
   * Keep clearbutton visiable at all times (not only during input focus)',
   */
  keepclearbuttonvisible?: boolean;

  /**
   * The label associated with the 'from' date input.
   * It can also be supplied using the 'label' slot on
   * the mc-input-date passed as 'from' slot.
   */
  fromlabel?: string | null;

  /**
   * Fieldset legend can be passed as a slot, or property.
   */
  legend?: string | null;

  /**
   * The label associated with the 'to' date input.
   * It can also be supplied using the 'label' slot on
   * the mc-input-date passed as 'to' slot.
   */
  tolabel?: string | null;

  /**
   * The value, where "to" and "from" stand in for the beginning and ending dates.
   */
  value?: IDateRangeValue | null;
}
