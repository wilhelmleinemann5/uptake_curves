import type { FitExtended } from '@maersk-global/mds-shared-types';
export type { FitExtended } from '@maersk-global/mds-shared-types';

export type AvatarAppearance = 'color-1' | 'color-2' | 'color-3' | 'color-4';
export interface IMcAvatar {
  /**
   * Appearance that sets different background-color and color on avatar.
   */
  appearance?: AvatarAppearance;
  /**
   * Fit of the avatar.
   */
  fit?: FitExtended;
  /**
   * Hides tooltip when set
   */
  hiddentooltip?: boolean;
  /**
   * Avatar image src, if not provided default avatar image will be rendered
   */
  imagesrc?: string;
  /**
   * Info added as description to the tooltip, if tooltip is hidden, the info will be displayed as hidden on screen description, which is still available for screen readers
   */
  info: string | undefined;
  /**
   * Initials displayed instead of image
   */
  initials?: string;
}
