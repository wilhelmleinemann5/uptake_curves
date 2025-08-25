import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcInputGroup {
  /**
   * The fit of the component.
   * @type {Fit}
   * @default medium
   **/
  fit?: Fit;
  /**
   * The legend of the component.
   * Can be passed as a simple string or as a slot for HTML content.
   * Required attribute used for accessibility as the fieldset legend.
   * @type {string}
   * @default 'Legend'
   */
  legend: string;

  /**
   * Determines whether the legend is visually hidden.
   * @type {boolean}
   * @default false
   */
  hiddenlegend?: boolean;

  /**
   * Determines whether the inner border is disabled.
   * @type {boolean}
   * @default false
   */
  disableinnerborder?: boolean;
}
