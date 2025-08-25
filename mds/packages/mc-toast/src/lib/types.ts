import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
import { IMcNotification } from '@maersk-global/mds-components-core-notification/types';

export type Position = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right';
export type Width = 'auto' | number;
export type ToastAppearance = 'neutral-default' | 'neutral-inverse' | 'info' | 'success' | 'warning' | 'error';

export interface McClosableComponent extends HTMLElement, IMcNotification {}

export interface IMcToast {
  /**
   * Fit of the notification showed in the toast.
   * Can be: `small`, `medium`, `large`
   * @default medium
   * @type {Fit}
   */
  fit?: Fit;
  /**
   * Appearance of the notification showed in the toast.
   * Can be: `neutral-default`, `neutral-inverse`, `info`, `success`, `warning`, `error`
   * @default neutral-default
   * @type {ToastAppearance}
   */
  appearance?: ToastAppearance;
  /**
   * Position of the toast.
   * Can be: `bottom-left`, `bottom-center`, `bottom-right`, `top-left`, `top-center`, `top-right`
   * @default top-right
   * @type {Position}
   */
  position?: Position;
  /**
   * Width style as number, the default value is 480px.
   * @default auto
   */
  width?: Width;
  /**
   * Duration of the toast in milliseconds
   * @default 5000
   * @type {number}
   */
  duration?: number;
  /**
   * Whether the toast should be initially opened.
   * @default false
   */
  open?: boolean;
  /** Opens the toast */
  show?: () => void;
  /** Hides the toast */
  hide?: () => void;
}
