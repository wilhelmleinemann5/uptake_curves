import type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';
export type { Fit, LabelPosition } from '@maersk-global/mds-shared-types';
export interface SelectOption {
  value: string | number;
  label: string;
}
export type McSelectNativeOptions = Array<number | string | SelectOption>;
export type Variant = 'default' | 'vanity' | 'multiple';
export interface IMcSelectNativeChangeDetail {
  readonly selectedOptions: McSelectNativeOptions;
  readonly selectedIndex: number[];
  /**
   * @deprecated Use `selectedIndex` instead.
   */
  readonly selectedindex: number[];
}
export interface IMcSelectNative {
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
   * Name is required if the component is used inside a `form` element.
   */
  name?: string;
  /**
   * The initial value of the input.
   */
  value?: McSelectNativeOptions | null | undefined;
  /**
   * Fit of the select.
   */
  fit?: Fit;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only
   */
  hiddenlabel?: boolean;
  /**
   * Options are required.
   * They can be passed as an array: `["One", "Two"]` or as an array of objects:
   * `[{value: 1, label: "One"}, {value: 2, label: "Two"}]`
   */
  options?: McSelectNativeOptions | string;
  /**
   * The `placeholder` attribute specifies a short hint that describes the expected value of a field
   * (e.g. a sample value or a short description of the expected format)
   */
  placeholder?: string;
  /**
   * Hint can be passed as simple argument like: `hint="hint text"`
   * or as a named slot: `<mc-select-native><span slot="hint">hint text as HTML</span></mc-select-native>`.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string;
  /**
   * Variant of the select.
   */
  variant?: Variant;
  /**
   * Sets select in the `disabled` state.
   */
  disabled?: boolean;
  /**
   * Sets id for the input field.
   */
  id?: string;
  /**
   * Sets select in the `invalid` state.
   */
  invalid?: boolean;
  /**
   * Sets select in the `required` state.
   */
  required?: boolean;
  /**
   * Error message will be shown only if `invalid` attribute is set to `true`.
   * Error message can be passed as simple argument like: `errormessage="error"` or as a named slot: `<mc-select-native><span slot="errormessage">error message as HTML</span></mc-select-native>`.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;
  /**
   * Specifies the selected indexes.
   * If supplied, then the value array will be disregarded.
   */
  selectedindex?: number[];
  /**
   * The width of the inner input container in percentage.
   */
  width?: string;
  /**
   * Focuses the mc-select-native.
   */
  focus?: () => void;
  /**
   * Takes the focus out of the mc-select-native.
   */
  blur?: () => void;
  /**
   * Change the selected value of the mc-select-native.
   */
  change?: (props: unknown) => void;
}
