import { Fit, Orientation } from '@maersk-global/mds-shared-types';

export type State = 'completed' | 'current' | 'pending';
export type Appearance = 'warning' | 'error' | 'default';
export interface IMcStepIndicatorItem {
  fit?: Fit | 'x-large';
  orientation?: Orientation;
  state?: State;
  label: string;
  /**
   * Disable auto-layout and responsiveness on small screen, and preserve original orientation.
   */
  autolayoutdisabled?: boolean;
  /**
   * Disable center alignment of first and last item
   */
  alignitemsdisabled?: boolean;
  /**
   * Appearance of the step indicator item
   * @default 'default'
   */
  appearance?: Appearance;
}
