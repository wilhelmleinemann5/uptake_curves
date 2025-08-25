import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcError {
  /**
   * Error text to be shown.
   */
  errormessage?: string;
  /**
   * Error text to be shown.
   */
  invalid?: boolean;
  /**
   * Fit of the hint.
   */
  fit?: Fit;
  /**
   * True, either The error slot is not empty, or the error prop has a value.
   */
  readonly visible?: boolean;
}
