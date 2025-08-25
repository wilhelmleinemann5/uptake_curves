export type BadgeAppearance = 'info' | 'success' | 'warning' | 'error';
export type BadgePosition = 'top' | 'bottom' | 'left' | 'right';
export type BadgeDistance = 'small' | 'medium' | 'large';
export type BadgeFit = 'small' | 'medium';
export type BadgeVariant = 'default' | 'dot';
export type BadgeDisplay = 'pinned' | 'inline';
export interface IMcBadge {
  /**
   * The appearance of the component.
   * @type {BadgeAppearance}
   **/
  appearance?: BadgeAppearance;
  /**
   * The appearance of the component.
   * @type {BadgeVariant}
   **/
  variant?: BadgeVariant;
  /**
   * The display of the badge.
   * @description Controls whether the badge is pinned to its parent or flows inline with content
   * @type {BadgeDisplay}
   **/
  display?: BadgeDisplay;
  /**
   * The position of the badge.
   * @type {BadgePosition}
   **/
  position?: BadgePosition;
  /**
   * The offset of the badge from the parent component.
   * @type {BadgeDistance}
   **/
  distance?: BadgeDistance;
  /**
   * The fit of the component.
   * @type {BadgeFit}
   * @default medium
   **/
  fit?: BadgeFit;
  /**
   * Caps the value of the badge. Will show + if value is greater than max.
   * @type {number}
   **/
  max?: number;
  /**
   * The number of notifications displayed in the badge.
   * If the value is greater than 99, the badge will display +99.
   * @type {number | string}
   **/
  label?: number | string;
}
