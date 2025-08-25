import type { Fit, Position, Trigger } from '@maersk-global/mds-shared-types';

/**
 * Defines different modes for the popover to be shown as a modal.
 */
export type PopoverModalMode = 'none' | 'x-small-screen';

export interface IMcPopover {
  /**
   * Determines if the popover has an arrow.
   */
  arrow?: boolean;
  /**
   * Keyboard key codes that will trigger opening/closing of the popover when the trigger element is focused.
   */
  actionkeys?: string[];
  /**
   * HTML element to attach the popover to. Can be used instead of `trigger` named slot.
   */
  customtriggerelement?: Element | null;
  /**
   * Fit of the popover.
   */
  fit?: Fit;
  /**
   * Specifies the width of the popover in CSS units i.e. `200px`. When set to `trigger` the width of the popover will be same as the trigger's.
   */
  width?: 'auto' | 'trigger' | string;
  /**
   * Specifies the maximum width of the popover in CSS units i.e. `200px`.
   */
  maxwidth?: string;
  /**
   * Specifies the maximum height of the popover in CSS units i.e. `200px`.
   */
  maxheight?: string;
  /**
   * Specifies when the popover should be shown as a modal instead.
   */
  modalmode: PopoverModalMode;
  /**
   * Whether the popover should be initialy open.
   */
  open?: boolean;
  /**
   * The placement of the popover. Note that popover will flip to the opposite position if it does not have enough space.
   */
  position?: Position;
  /**
   * Determines the events that cause the tippy to show. Multiple event names are separated by spaces i.e. `click focus`.
   */
  trigger?: Trigger;
  /**
   * Prevent popover from closing when `blur` event is dispatched. Can be useful when trapping focus.
   */
  preventcloseonblur?: boolean;
  /**
   * Content wrapper selector
   */
  contentWrapper?: HTMLElement;
  /**
   * Container selector
   */
  container?: HTMLElement;
  /**
   * Body slot container selector
   */
  bodySlotWrapper?: HTMLElement;
  /**
   * By default popover will try to adjust its height and display a scrollbar to always stay in the viewport.
   * Setting this to true disables that behaviour.
   */
  dontadjustheight: boolean;
  /**
   * Delay(in ms) after which the tooltip will open. Only supported when the trigger is set to `hover`.
   * @default 50
   */
  opendelay?: number;
  /**
   * If true, the popover will be shown on the side of the trigger element when the trigger is `contextmenu`.
   */
  contextmenuonside?: boolean;
  /**
   * Set only if two popovers or a poopver and another z-indexed panel need to overlap.
   */
  zindex?: number;
  /**
   * Shows the popover.
   */
  show?(): void;
  /**
   * Hides the popover.
   */
  hide?(): void;
}
