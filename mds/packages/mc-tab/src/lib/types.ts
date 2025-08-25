import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcTab {
  /**
   * Sets tab button in the `disabled` state, which will disable any user interaction with the tab button.
   */
  disabled?: boolean;
  /**
   * Id of the tab.
   * @default 'tab'
   */
  id?: string;
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`.
   */
  label?: string;
  /**
   * Name of the icon.
   */
  icon?: string;
  /**
   * Name of the railing icon.
   */
  trailingicon?: string;
  /**
   * Fit of the tab.
   * @default 'medium'
   */
  fit?: Fit;
  /**
   * Sets tab to `active` state.
   * @default false
   */
  active?: boolean;
  /**
   * Sets `tabindex` of the tab.
   */
  tabindex?: number;
  /**
   * Gets the index of the tab when sitting in a tab-bar.
   * Used to orchestrate the focus keyboard navigation.
   */
  index?: number;
  /**
   * Slot name of the tab.
   */
  slot?: string;
}
