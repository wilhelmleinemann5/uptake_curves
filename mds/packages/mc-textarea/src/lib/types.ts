import type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';
export type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';
export interface IMcTextarea {
  /**
   * The autofocus global attribute is a Boolean attribute indicating that an element should be focused on page load, or when the <dialog> that it is part of is displayed.
   */
  autofocus?: boolean;
  /**
   * Number of columns.
   */
  cols?: number;
  /**
   * Sets textarea to `disabled` state.
   */
  disabled?: boolean;
  /**
   * Error message will be shown only if `invalid` attribute is set to `true`.
   * Error message can be passed as simple argument like: `errormessage="error"`
   * or as a named slot: `<mc-textarea><span slot="errormessage">error message as HTML</span></mc-textarea>`.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;
  /**
   * Fit of the checkbox.
   */
  fit?: Fit;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only.
   */
  hiddenlabel?: boolean;
  /**
   * Hint can be passed as simple argument like: `hint="hint text"`
   * or as a named slot: `<mc-textarea><span slot="hint">hint text as HTML</span></mc-textarea>`.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string;
  /**
   * Sets id for the input field.
   */
  id?: string;
  /**
   * If `true`, checkbox border is red and the `errormessage` can be displayed if provided.
   */
  invalid?: boolean;
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`.
   */
  label: string;
  /**
   * Position od the label and text alignment within label.
   */
  labelposition: LabelPosition;
  /**
   * Setting this property will activate a character counter and limit the number of characters that can be entered in the textarea.
   */
  maxlength?: number;
  /**
   * Minimum number of characters required in the textarea.
   */
  minlength?: number;
  /**
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  /**
   * The `placeholder` attribute specifies a short hint that describes the expected value of a field
   * (e.g. a sample value or a short description of the expected format).
   */
  placeholder?: string;
  /**
   * Sets textarea to `readonly` state.
   */
  readonly?: boolean;
  /**
   * Sets textarea to `required` state.
   */
  required?: boolean;
  /**
   * The height of the textarea will depend on the number of rows.
   */
  rows?: number;
  /**
   * Pass the value for the input if it is used inside a form element.
   */
  value?: string | null;
  /**
   * The width of the inner input container in percentage.
   */
  width?: string;
  /** Focuses the textarea */
  focus?: () => void;
  /**
   * Takes the focus out of the textarea.
   */
  blur?: () => void;
  /**
   * Sets `arealabel` of the textarea.
   */
  setAriaLabel?: () => void;
  /**
   * Input in the mc-textarea.
   */
  input?: (value: string, event: InputEvent) => void;
}
