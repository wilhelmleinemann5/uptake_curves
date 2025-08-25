import type { Fit } from '@maersk-global/mds-shared-types';
export type { ComponentEvents, Fit } from '@maersk-global/mds-shared-types';
export type HTMLElementEventName = keyof HTMLElementEventMap;
export type Variant = 'default' | 'stretched';
export interface IMcTabBar {
  /**
   * The index number of the current `active` item.
   * Index starts from `0`.
   */
  currentindex?: number;
  /**
   * Variant of the tab bar.
   */
  variant?: Variant;
  /**
   * Fit of the tab bar.
   */
  fit?: Fit;
  /**
   * Change of selected mc-tab.
   */
  tabchange?: (e: Event) => void;
}
