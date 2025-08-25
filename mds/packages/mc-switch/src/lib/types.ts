import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcSwitch {
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`.
   */
  label: string;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only.
   */
  hiddenlabel?: boolean;
  /**
   * Pass the value for the input if it is used inside a `form` element.
   */
  value?: string;
  /**
   * Sets switch in the `checked` state.
   */
  checked?: boolean;
  /**
   * Fit of the switch.
   */
  fit?: Fit;
  /**
   * Sets select in the `disabled` state.
   */
  disabled?: boolean;
  /**
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  handleClick?: () => void;
  /** Sets the focus to the switch */
  focus?: () => void;
  /** Takes focus out of the switch */
  blur?: () => void;
  /**
   * Click on the switch
   */
  click?: () => void;
  /**
   * Change the switch.
   */
  change?: (event?: CustomEvent<boolean>) => void;
}
