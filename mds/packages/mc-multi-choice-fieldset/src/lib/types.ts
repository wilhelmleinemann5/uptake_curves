import type { Fit, Orientation, IAutoLayout } from '@maersk-global/mds-shared-types';
export type { Fit, Orientation } from '@maersk-global/mds-shared-types';
export type Value = string | number | boolean | Array<string | unknown>;

export type McMultiChoiceFieldsetChangeDetail = Value | undefined;

export interface IMCMultiChoiceFieldset extends IAutoLayout {
  /**
   * Fit of the fieldset.
   */
  fit?: Fit;
  /**
   * Fieldset legend has to be passed as a property. Legend is required.
   */
  legend?: string;
  /**
   * Hint can be passed as simple argument like: `hint="hint text"` or as a named slot.
   * Use argument style for passing short hints, use named slot when you want to pass hint with HTML text.
   */
  hint?: string;
  /**
   * Orientation of the fieldset.
   */
  orientation?: Orientation;
  /**
   * Error message will be shown only if invalid attribute is set to `true`.
   * Error message can be passed as simple argument like: `errormessage="error"` or as a named slot.
   * Use argument style for passing short messages, use named slot when you want to pass error message with HTML text.
   */
  errormessage?: string;
  /**
   * If `true`, puts the fieldset into the `invalid` state.
   * `Errormessage` can be displayed if provided.
   */
  invalid?: boolean;
  /**
   * Selected element of the fieldset.
   */
  value?: Value;
  /**
   *  Hides the fieldset legend and uses the `legend` property text as an `aria-label` for the hidden legend.
   */
  hiddenlegend?: boolean;
  /** Change on the button */
  change?: (selectedValues: string[] | number) => void;
}
