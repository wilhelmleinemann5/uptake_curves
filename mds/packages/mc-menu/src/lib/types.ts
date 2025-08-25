import { IMcPopover } from '@maersk-global/mds-components-core-popover/types';
import type { Fit, Position, Trigger } from '@maersk-global/mds-shared-types';

export interface IMcMenu extends Partial<IMcPopover> {
  /**
   * Show or hide arrow in the triggering element. Set to false by default.
   */
  arrow?: boolean;
  /**
   * Fit of the component.
   */
  fit?: Fit;
  /**
   * Max width of pop-up.
   */
  maxwidth?: string;
  /**
   * Max height of pop-up.
   */
  maxheight?: string;
  /**
   * Show opo-up on first render. Set to false by default.
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
   * If true, the menu will be shown on the side of the trigger element when the trigger is `contextmenu`.
   */
  contextmenuonside?: boolean;
  /**
   * Set only if two menus or a menu and another z-indexed panel need to overlap.
   */
  zindex?: number;
}
