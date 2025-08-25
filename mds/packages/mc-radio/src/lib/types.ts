import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcRadio {
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
   * Fit of the radio.
   */
  fit?: Fit;
  /**
   * Sets radio in the `disabled` state.
   */
  disabled?: boolean;
  /**
   * Sets radio in the `checked` state.
   */
  checked?: boolean;
  /**
   * Sets the `tabindex` attribute.
   */
  tabindex?: number;
  /**
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  /**
   * Pass the value for the input if it is used inside a `form` element.
   */
  value?: string;
  /**
   * Sets the focus to the radio.
   */
  focus?: () => void;
  /**
   * Clicks the radio.
   */
  click?: () => void;
  /**
   * Sets focus out
   */
  blur?: () => void;
  /**
   * Change the radio.
   */
  change?: (event?: CustomEvent<boolean>) => void;
  /**
   * Handler that is called when the radio checked state changes.
   * It is used to update the state of the radio when it is clicked.
   */
  changeHandler?: (event?: CustomEvent<boolean>) => void;
}
