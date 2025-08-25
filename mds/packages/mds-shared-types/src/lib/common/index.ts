// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type EventHandler = (...args: any[]) => void;
export declare type HTMLElementEventName = keyof HTMLElementEventMap;

// export declare type AppearanceNew =
//   | 'neutral-default'
//   | 'neutral-subtle'
//   | 'neutral-inverse'
//   | 'primary'
//   | 'secondary'
//   | 'info'
//   | 'success'
//   | 'warning'
//   | 'error';
// export declare type AppearanceDeprecated = 'default' | 'neutral' | 'inverse';
// export declare type Appearance = AppearanceNew | AppearanceDeprecated;
export declare type Fit = 'small' | 'medium' | 'large';
export declare type FitExtended = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
export declare type Orientation = 'horizontal' | 'vertical';
export declare type ComponentEvents = Map<HTMLElementEventName, [Element | Window, EventHandler]>;
export declare type JustifyItems = 'center' | 'left' | 'right' | 'space-between';
export declare type Variant = 'default' | 'vanity';
export type Target = '_blank' | '_parent' | '_self' | '_top' | string;
export declare type Trigger =
  | 'click'
  | 'click focus'
  | 'hover'
  | 'hover focus'
  | 'focus'
  | 'contextmenu'
  | 'manual'
  | string;
export declare type Position =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export declare type Padding = 'default' | 'none';
export type LabelPosition = 'top' | 'left';
export type IndicatorAppearance = 'success' | 'warning' | 'info' | 'error';

export type AriaRoles = 'listitem' | 'menuitem' | 'option' | 'menuitemcheckbox' | 'menuitemradio' | 'tab';
export interface IMcValidation {
  /**
   * @experimental
   * Exposes the internal validity state of the component.
   */
  readonly validity: ValidityState;
}

export type IMcListFilterType = 'startsWith' | 'contains';
