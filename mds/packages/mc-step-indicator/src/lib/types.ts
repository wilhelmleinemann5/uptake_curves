import type { Fit, IAutoLayout } from '@maersk-global/mds-shared-types';

export interface IMcStepIndicator extends IAutoLayout {
  /**
   * Corresponding labels of different steps in the step indicator control.
   */
  labels?: Array<string> | string;
  /**
   * Fit of the step indicator.
   */
  fit?: Fit;
  /**
   * The index number of the current `active` item. Index starts from 0.
   */
  currentindex?: number;
  /**
   * Disable auto-layout and responsiveness on small screen, and preserve original orientation.
   */
  autolayoutdisabled?: boolean;
  /**
   * Disable center alignment of first and last item
   */
  alignitemsdisabled?: boolean;
}
