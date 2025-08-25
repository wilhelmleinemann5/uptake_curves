export type { AriaRoles } from '@maersk-global/mds-shared-types';
import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcCheckbox {
  /**
   * Fit of the checkbox.
   */
  fit?: Fit;
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`.
   */
  label: string;
  /**
   * Hint can be passed as simple argument like: `hint="hint text"`
   * or as a named slot: `<mc-checkbox><span slot="hint">hint text as HTML</span></mc-checkbox>`.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string | null;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only.
   */
  hiddenlabel?: boolean;
  /**
   * If `true`, checkbox border is red and the errormessage can be displayed if provided.
   */
  invalid?: boolean;
  /**
   * Error message will be shown only if `invalid` attribute is set to `true`.
   * Error message can be passed as simple argument like:` errormessage="error"`
   * or as a named slot:` <mc-checkbox><span slot="errormessage">error message as HTML</span></mc-checkbox>`.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;
  /**
   * Sets checkbox in the `disabled` state.
   */
  disabled?: boolean;
  /**
   * Sets checkbox in the `checked` state.
   */
  checked?: boolean;
  /**
   * Indeterminate state gets precedence over the `checked` state and the checkbox `does not` consider to be `checked` when is in `indeterminate` state.
   * There are not many use cases for this property. The most common is when a checkbox "owns" a number of sub-options (which are also checkboxes).
   * If all of the sub-options are checked, the owning checkbox is also checked, and if they're all unchecked, the owning checkbox is unchecked.
   * If any one or more of the sub-options have a different state than the others, the owning checkbox is in the `indeterminate` state.
   */
  indeterminate?: boolean;
  /**
   * Sets the `tabindex` attribute.
   */
  tabindex?: number;
  /**
   * Pass the value for the input if it is used inside a `form` element.
   */
  value?: string;
  /**
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  /** Sets the focus to the checkbox */
  focus?: () => void;
  /** Takes focus out of the checkbox */
  blur?: () => void;
  /**
   * Click on the checkbox
   */
  click?: () => void;
  /**
   * Fires when the checkbox's checked status is changed.
   */
  change?: (event?: CustomEvent<boolean>) => void;
}
