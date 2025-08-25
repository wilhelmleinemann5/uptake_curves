export type { JustifyItems, Target, Width } from '@maersk-global/mds-shared-types';
import type { Padding, JustifyItems, Target, Width } from '@maersk-global/mds-shared-types';
import type { IMcTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon/types';
export type { IMcTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon/types';
export type ButtonVariants = 'filled' | 'outlined' | 'plain';
export type ButtonAppearance = 'neutral' | 'inverse' | 'primary' | 'secondary' | 'error';
export type ButtonPadding = Padding | 'compact';
export type ButtonBorder = 'default' | 'none';
export type Type = 'button' | 'submit' | 'reset' | 'menu';
export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
export type AriaSelected = 'true' | 'false';

export interface IMcButton extends IMcTextAndIcon {
  /**
   * Variant of the button.
   */
  variant?: ButtonVariants;
  /**
   * Appearance of the button.
   */
  appearance?: ButtonAppearance;
  /**
   * Padding of the button.
   */
  padding?: ButtonPadding;
  /**
   * Border style of the button.
   * default: Default border style
   * none: No border
   */
  border?: ButtonBorder;
  /**
   * Allows to position items inside the button like label text & icon.
   * Specially useful when using width="full-width".
   */
  justifyitems?: JustifyItems;
  /**
   * width style depends on the text length,
   * full-width style will adjust to the parent container width.
   */
  width?: Width;
  /**
   * Sets button in the `disabled` state, which will disable any user interaction with the button.
   */
  disabled?: boolean;
  /**
   * Sets button in the `active` state.
   */
  active?: boolean;
  /**
   * Sets the button type.
   */
  type?: Type;
  /**
   * Sets the button nae=me.
   */
  name?: string;
  /**
   * Sets button in the indeterminate state.
   */
  loading?: boolean;
  /**
   * 	Should only be used if for the sake of accessibility the `aria-label` is differnt that the label which appears on the button,
   *  so that for instance the screen reader can provide more details than what's being visually displayed as a label on the button component.
   */
  arialabel?: string;
  /**
   * Sets the `aria-current` on the inner button in cases like pagination where the button is repeated in a list and at the same time,
   * the currently active item needs to be specified.
   */
  ariacurrent?: AriaCurrent;
  /**
   * Sets the `aria-selected` on the inner button in cases like tab where the button is repeated in a list and at the same time,
   * the currently selected item needs to be specified.
   */
  ariaselected?: AriaSelected;
  /**
   * Sets the `role` on the inner button in cases like tab-bar where of every button is 'tab',
   */
  ariarole?: string;
  /**
   * Passing a href value will render the button as a HTML anchor element.
   */
  href?: string;
  /**
   * The relationship of the linked URL as space-separated link types.
   */
  rel?: string;
  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or <iframe>).
   */
  target?: Target;
  /* slotted content*/
  slot?: string;
  dialogaction?: string;
  /**
   * @deprecated The modal now handles the focus trap internally. Use `autofocus` if you want to focus an element when the modal is opened.
   */
  focusstartanchor?: boolean;
  /**
   * @deprecated The modal now handles the focus trap internally.
   */
  focusendanchor?: boolean;
  /** Sets the focus to the button */
  focus?: (options?: FocusOptions) => void;
  /** Takes focus out of the button */
  blur?: () => void;
  /** Click on the button */
  click?: () => void;
}
