import type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';
export type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';

export interface IMcLabel {
  /**
   * Fit of the label.
   */
  fit?: Fit;
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`.
   */
  label: string;
  hiddenlabel?: boolean;
  labelposition?: LabelPosition;
}
