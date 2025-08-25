import { IMcLoadingIndicator } from '@maersk-global/mds-components-core-loading-indicator/types';

export interface IMcProgressIndicator extends IMcLoadingIndicator {
  /**
   * The current value of the progress indicator.
   * @type {number}
   * @default 0
   **/
  value?: number;

  /**
   * The maximum value of the progress indicator.
   * @type {number}
   * @default 100
   **/
  max?: number;
}
