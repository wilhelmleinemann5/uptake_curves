import { Fit } from '../common';

export interface IMcTextAndIcon {
  /**
   * Fit of the component.
   */
  fit?: Fit;
  /**
   *  Name of the icon
   */
  icon?: string;
  /**
   *  Name of the trailing icon
   */
  trailingicon?: string;
  /**
   * Can be passed as a property or as a slot.
   */
  label?: string;
  /**
   * Can be passed as a property or as a slot.
   */
  sublabel?: string;
  /**
   * If set to true or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only.
   */
  hiddenlabel?: boolean;
  /**
   * If set to true or the attribute is just presented without any value,
   * then the icon slots will not be rendered in to the DOM.
   */
  disablediconslot?: boolean;
  /**
   * If set to true or the attribute is just presented without any value,
   * then the label slot will not be rendered in to the DOM.
   */
  disabledlabelslot?: boolean;
}
