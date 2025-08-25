export type IconSize = '16' | '20' | '24';
export interface IMcIcon {
  /**
   * Name of the icon
   */
  icon?: string;
  /**
   * Size of the icon `16`, `20` or `24`
   */
  size?: IconSize;
  /**
   * Fill color of the icon.
   * If not supplied, the default color token `--mdt-theme-icon-color`
   * will be picked up via CSS.
   */
  color?: string;
}
