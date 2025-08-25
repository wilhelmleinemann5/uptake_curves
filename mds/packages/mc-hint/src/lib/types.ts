import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcHint {
  /**
   * Hint text to be shown.
   */
  hint?: string;
  /**
   * Fit of the hint.
   */
  fit?: Fit;
  /**
   * True, either The hint slot is not empty, or the hint prop has a value.
   */
  readonly visible?: boolean;
}
