import { Position } from '@maersk-global/mds-shared-types';
export interface IMcInputTime {
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
   * Position on the timepicker.
   * @default 'bottom-left'
   */
  timepickerposition: Position;
}
