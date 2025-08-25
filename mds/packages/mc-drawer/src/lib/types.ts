import { BreakpointSizes, CustomSize } from '@maersk-global/mds-components-core-dialog/types';
import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export type Position = 'left' | 'right' | 'top' | 'bottom';
export type Dimension = 'small' | 'medium' | 'large';

/**
 * Indicates the action that was taken when the drawer was closed.
 */
export type Mcdialogaction = 'cancel' | 'click outside';

export interface IMcDrawer {
  /**
   * Opens the drawer.
   * @type {boolean}
   **/
  open?: boolean;
  /**
   * The fit of the component.
   * @type {Fit}
   * @default medium
   **/
  fit?: Exclude<Fit, 'large'>;
  /**
   * The position of the drawer.
   * @type {Position}
   * @default right
   **/
  position?: Position;
  /**
   * @deprecated use customzise instead.
   * Sets the width of the component.
   * You can also set the width for different breakpoints by passing an object with the breakpoint sizes i.e.
   * `{ xs: '100%', sm: '410px', md: '490px', lg: '530px', xl: '640px' }`.
   * Remember also to specify the measurement unit i.e. `px`, `%` or `vw`, etc.
   **/
  width?: string | BreakpointSizes;
  /**
   * @deprecated use customzise instead.
   * The height of the drawer.
   * @type {string}
   * @default 100%
   **/
  height?: string | BreakpointSizes;
  /**
   * Sets the custom size of the drawer.
    If the position is set to left or right, the width will be adjusted.
    If the position is set to top or bottom, the height will be adjusted.
    You can also set the custom size for different breakpoints by passing an object with the breakpoint sizes i.e.


    {
    xs: '100%',
    sm: '400px',
    md: '500px',
    lg: '600px',
    xl: '50%'
    }

    `,
   */
  customsize?: CustomSize;
  /**
   * The dimension of the drawer.
   * The dimension depends on the position of the drawer and are as follows:
   *
   * small:
   * - left: width: 320px, height: 100dvh
   * - right: width: 320px, height: 100dvh
   * - top: height: 320px, width: 100dvw
   * - bottom: height: 320px, width: 100dvw
   *
   * medium:
   * - left: width: 480px, height: 100dvh
   * - right: width: 480px, height: 100dvh
   * - top: height: 480px, width: 100dvw
   * - bottom: height: 480px, width: 100dvw
   *
   * large:
   * - left: width: 800px, height: 100dvh
   * - right: width: 800px, height: 100dvh
   * - top: height: 800px, width: 100dvw
   * - bottom: height: 800px, width: 100dvw
   * @type {dimension}
   * @default medium
   **/
  dimension?: Dimension;
  /**
   * Disables the sticky footer when scrolling
   * @type {boolean}
   * @default false
   **/
  disablestickyfooter?: boolean;
  /**
   * If true, the drawer will open as a non-modal drawer, allowing page interaction.
   * @type {boolean}
   * @default false
   */
  nonmodal?: boolean;
  /**
   * If true, the drawer content will have no padding.
   * @type {boolean}
   * @default false
   */
  nopadding?: boolean;
  /**
   * Disables closing the drawer when clicking outside of it.
   */
  backdropcloseactiondisabled?: boolean;
}

export interface IMcDrawerMyEventDetail {
  readonly id: number;
  readonly name: string;
}
