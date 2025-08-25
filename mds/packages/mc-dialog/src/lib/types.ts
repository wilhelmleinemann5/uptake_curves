import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export type Dimension = 'small' | 'medium' | 'large';
/**
 * Indicates the action that was taken when the dialog was closed.
 */
export type McDialogAction = 'ok' | 'cancel';
export type DialogAction = 'close' | 'cancel' | 'click outside' | 'ok' | string;
export type CustomSize = string | BreakpointSizes;
export interface BreakpointSizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface IMcDialog {
  /**
   * The fit of the dialog.
   * @type {Fit}
   * @default medium
   **/
  fit?: Exclude<Fit, 'large'>;
  /**
   * dimension of the dialog.
   */
  dimension?: Dimension;
  /**
   * Should only be set if two dialogs are supposed to be shown on top of each other.
   */
  zindex?: number;
  /**
   * Sets the width of the component.
   * You can also set the width for different breakpoints by passing an object with the breakpoint sizes i.e.
   * `{ xs: '100%', sm: '400px', md: '500px', lg: '600px', xl: '700px' }`.
   * Remember also to specify the measurement unit i.e. `px`, `%` or `vw`, etc.
   */
  width?: string | BreakpointSizes;
  /**
   * 	Heading for the dialog
   */
  heading?: string;
  /**
   * 	Body text for the dialog
   */
  body?: string;
  /**
   * If true, the dialog is will open, otherwise it will close.
   */
  open?: boolean;
  /**
   * If true, the dialog will open as a non-modal dialog, allowing page interaction.
   * @type {boolean}
   * @default false
   */
  nonmodal?: boolean;
  /**
   * If true, the dialog content will have no padding.
   * @type {boolean}
   * @default false
   */
  nopadding?: boolean;
}
