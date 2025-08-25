import type { Fit } from '@maersk-global/mds-shared-types';

export interface IMcTimePickerTimeSelectedDetail {
  readonly time: string;
}

export interface IMcTimePicker {
  /**
   * Fit of the input.
   */
  fit?: Fit;

  /**
   * A numeric value that indicates the level of granularity that the hour items must meet.
   * It can range between greater than 1 and less than 23. For more details, see the examples.
   */
  hourstep?: number;

  /**
   * A numeric value that indicates the level of granularity that the minute items must meet.
   * It can range between greater than 1 and less than 59. For more details, see the examples.
   */
  minutestep?: number;

  /**
   * True, if the current local time must be preselected.
   */
  preselectcurrenttime?: boolean;

  /**
   * False, if set to true focus will be trapped inside the component.
   */
  trapfocus?: boolean;

  /**
   * ':' separated string representing the time which should be chosen.
   */
  value?: string | null;

  /**
   * True if the timeselected event shouldn't be
   * dispatched on initial load when used in a popover.
   */
  preventinitialeventdispatch?: boolean;

  /**
   * Emitted when a new time is selected
   * @returns {string}
   */
  timeselected?: () => string;

  /**
   * Show must be used, when the value was set but the time-picker wasn't visible,
   * scroll the selected values to the center.
   */
  show?(): void;
}
