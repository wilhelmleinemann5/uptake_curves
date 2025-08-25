import type { Fit, LabelPosition, Mask } from '@maersk-global/mds-shared-types';
export type { Fit, LabelPosition, Mask } from '@maersk-global/mds-shared-types';
export type InputType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'file'
  | 'password'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'number'
  | 'color';
export type InputMode =
  | 'verbatim'
  | 'latin'
  | 'latin-name'
  | 'latin-prose'
  | 'full-width-latin'
  | 'kana'
  | 'kana-name'
  | 'katakana'
  | 'numeric'
  | 'tel'
  | 'email'
  | 'url';

export type Min = number | string | undefined;
export type Max = number | string | undefined;
export type Step = number | string | undefined;
export type Size = number | null;
export type Prefix = string | null;
export type Suffix = string | null;
export type Variant = 'default' | 'vanity';
export type AffixType = 'prefix' | 'suffix';

export interface IMcInput extends Partial<HTMLElement> {
  /**
   * The initial value of the input.
   */
  // TDOD: Fix any type, i.e. use generic type like the mc-select's base
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  /**
   * Gets the value of the element interpreted as number, only if the input type is number.
   */
  readonly valueAsNumber?: number;
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as aria-label.
   */
  label: string;
  /**
   * Position od the label and text alignment within label.
   */
  labelposition: LabelPosition;
  /**
   * Type of the input.
   */
  type?: InputType;
  /**
   * The `placeholder` attribute specifies a short hint that describes the expected value of a field
   * (e.g. a sample value or a short description of the expected format).
   */
  placeholder?: string;
  /**
   * Name of the icon.
   */
  icon?: string;
  /**
   * Name of the trailing icon.
   */
  trailingicon?: string;
  /**
   * If set to `true`, the trailingicon will be clickable.
   * The iconclick event will be emitted on trailingicon click.
   * @example
   * <mc-input trailingicon="icon" clickabletrailingicon @iconclick="${(event) => console.log(event.detail)}"></mc-input>
   */
  clickabletrailingicon?: boolean;
  /**
   * Set the title of the trailing icon to help users understand the action.
   * @example
   * <mc-input trailingicon="eye" trailingiconlabel="Show password"></mc-input>
   */
  trailingiconlabel?: string;
  /**
   * Sets the input in the `disabled` state.
   */
  disabled?: boolean;
  /**
   * Sets the input in the `required` state.
   */
  required?: boolean;
  /**
   * Minimum number of characters required in the textarea.
   */
  minlength?: number;
  /**
   * Setting this property will activate a character counter and limit the number of characters that can be entered in the textarea.
   */
  maxlength?: number;
  /**
   * Specifies a regular expression the input value should match.
   */
  pattern?: string;
  /**
   * Minimum value of the input.
   */
  min?: Min;
  /**
   * Maximum value of the input.
   */
  max?: Max;
  /**
   * Step of the input.
   */
  step?: Step;
  /**
   * Size of the input.
   */
  size?: Size;
  /**
   * The prefix can have maximum 3 characters.
   * You can either render prefix or an icon on the same side of the input.
   */
  prefix?: Prefix;
  /**
   * The suffix can have maximum 3 characters.
   * You can either render suffix or an icon on the same side of the input.
   */
  suffix?: Suffix;
  /**
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  /**
   * `Inputmode` attribute of the input.
   * This allows a browser to display an appropriate virtual keyboard.
   */
  inputmode?: InputMode;
  /**
   * Sets input in the `readonly` state.
   */
  readonly?: boolean;
  /**
   * The HTML autocomplete attribute lets web developers specify
   * what if any permission the user agent has to provide automated assistance in filling out form field values.
   */
  autocomplete?: string;
  /**
   * Controls whether and how text input is automatically capitalized as it is entered/edited by the user.
   */
  autocapitalize?: string;
  /**
   * The autofocus global attribute is a Boolean attribute indicating that an element should be focused on page load, or when the <dialog> that it is part of is displayed.
   */
  autofocus?: boolean;
  /**
   * Hint can be passed as simple argument like: `hint="hint text"`
   * or as a named slot: `<mc-input><span slot="hint">hint text as HTML</span></mc-input>`.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string;
  /**
   * Variant of the input
   */
  variant?: Variant;
  /**
   * Fit of the input.
   */
  fit?: Fit;
  /**
   * Sets input in the invalid state.
   */
  invalid?: boolean;
  /**
   * Sets id for the input field.
   */
  id?: string;
  /**
   * Error message will be shown only if `invalid` attribute is set to `true`.
   * Error message can be passed as simple argument like: `errormessage="error"`
   * or as a named slot: `<mc-input><span slot="errormessage">error message as HTML</span></mc-input>`.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only.
   */
  hiddenlabel?: boolean;
  /**
   * The width of the inner input container in percentage.
   */
  width?: string;
  /**
   * Whether to display a clear button.
   */
  clearbutton?: boolean;
  /**
   * Keep clearbutton visible at all times (not only during input focus)',
   */
  keepclearbuttonvisible?: boolean;
  /**
   * Sets input in the `loading` state.
   */
  loading?: boolean;
  /**
   * Sets aria label attribute of the mc-input.
   */
  setAriaLabel?: () => void;
  /**
   * The mask property must be a string or a RegExp.
   * When using a string mask pattern, the following special characters can be used for defining a mask:
   * 0 - any digit
   * a - any letter
   * * - any character
   * [] - optional input
   * {} - fixed part of a mask
   *
   * If a definition character should be treated as fixed it should be escaped by "\\" (E.g. \\0).
   *
   * You can also pass a mask as an object with a mask property.
   * This does not have any benefit at the moment, but it will be used in the future to pass mask configuration.
   *
   * @example
   * <mc-input name="creditCardNumber" label="Credit card number" id="creditCardNumber"></mc-input>
   */
  mask?: Mask | string;
  /**
   * Internal protected input element in the mc-input.
   */
  inputElement?: HTMLInputElement | null;
  /* event handlers */
  /**
   * Sets focus to the mc-input.
   */
  focus?: () => void;
  /**
   * Sets focus out of the mc-input.
   */
  blur?: () => void;
  /**
   * Clicks the mc-input.
   */
  click?: () => void;
  /**
   * Input in the mc-input.
   */
  input?: (event: InputEvent) => void;
  /**
   * Listens to the keydown event on the mc-input.
   * This is useful for handling custom keyboard shortcuts or actions.
   * @example
   * <mc-input @keydown="${(event) => console.log(event.key)}"></mc-input>
   * @param event - The keyboard event that triggered the action.
   * @returns void
   */
  keydown?: (event?: KeyboardEvent) => void;
  /**
   * Custom event emitted on clear button click (sends the whole option item as detail).
   */
  clearbuttonclick?: () => void;
  focused?: boolean;
  tabindex?: number;
}
