import type { Fit } from '@maersk-global/mds-shared-types';
export type { ComponentEvents, Fit } from '@maersk-global/mds-shared-types';
export type TooltipPosition =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';
export type TooltipWidth = 'auto' | number;
type TooltipAppearanceNew = 'neutral-default' | 'neutral-inverse';
type TooltipAppearanceOld = 'default' | 'inverse';
export type TooltipAppearance = TooltipAppearanceNew | TooltipAppearanceOld;
export type EventHandler = () => void;
export type HTMLElementEventName = keyof HTMLElementEventMap;

export interface IMcTooltip {
  /**
   * Specifies the position of the tooltip in regards to the target element.
   */
  position?: TooltipPosition;
  /**
   * Appearance of the tooltip.
   * Can be: `neutral-default`, `neutral-inverse`
   * @default 'neutral-default'
   * @type {TooltipAppearance}
   */
  appearance?: TooltipAppearance;
  /**
   * Fit of the tooltip.
   */
  fit?: Fit;
  /**
   * The max width of the tooltip in pixels.
   */
  width?: TooltipWidth;
  /**
   * Sets the tooltip in the `open` state.
   */
  open?: boolean;
  /**
   * Delay(in ms) after which the tooltip will open. Only supported when the trigger is set to `hover`.
   * @default 50
   */
  opendelay?: number;
  /**
   * Set only if two tooltips or a tooltip and another z-indexed panel need to overlap.
   */
  zindex?: number;
}
