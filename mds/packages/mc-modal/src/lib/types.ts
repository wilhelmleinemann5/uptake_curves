import { BreakpointSizes } from '@maersk-global/mds-components-core-dialog/types';
import type { Padding } from '@maersk-global/mds-shared-types';
export type { Padding } from '@maersk-global/mds-shared-types';
export type Dimension = 'small' | 'medium' | 'large';
export type Fit = 'small' | 'medium';
/**
 * Indicates the action that was taken when the dialog was closed.
 */
export type McModalAction = 'ok' | 'cancel';

export interface IMcModal {
  /**
   * dimension of the modal.
   */
  dimension?: Dimension;
  /**
   * Fit of the modal.
   */
  fit?: Fit;
  /**
   * This attribute should be added only if clicking on the backdrop (scrim) must not close the modal.
   */
  backdropcloseactiondisabled?: boolean;
  /**
   * This attribute should be added only if pressing the `Escape` must not close the modal.
   */
  escapecloseactiondisabled?: boolean;
  /**
   * This attribute should be added only if you want to disable default close button.
   */
  hiddenclose?: boolean;
  /**
   * Padding of the content and title in modal.
   */
  padding?: Padding;
  /**
   * Should only be set if two modal are supposed to be shown on top of each other.
   */
  zindex?: number;
  /**
   * Sets the width of the component, otherwise the width of the currently chosen size preset will be used.
   * Remember also to specify the measurement unit i.e. `px`, `%` or `vw`, etc.
   */
  width?: string | BreakpointSizes;
  /**
   * Sets the height of the component, otherwise the height of the currently chosen size preset will be used.
   * Remember also to specify the measurement unit i.e. `px`, `%` or `vw`, etc.
   */
  height?: string | BreakpointSizes;
  /**
   * Whether the modal should be open.
   */
  open?: boolean;
}
