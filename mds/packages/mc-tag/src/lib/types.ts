import type { IMcTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon/types';
export type { IMcTextAndIcon } from '@maersk-global/mds-components-core-text-and-icon/types';

type TagAppearanceNew =
  | 'neutral-default'
  | 'neutral-weak'
  | 'neutral-inverse'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
type TagAppearanceOld = 'neutral' | 'primary' | 'secondary' | 'neutral-subtle';
export type TagAppearance = TagAppearanceNew | TagAppearanceOld;

export type Width = 'auto' | 'full-width';

export interface IMcTag extends IMcTextAndIcon {
  /**
   * Appearance of the tag.
   * Can be: `neutral-default`, `neutral-weak`, `neutral-inverse`, `info`, `success`, `warning`, `error`
   * @default 'neutral-weak'
   * @type {TagAppearance}
   */
  appearance?: TagAppearance;
  /**
   * Width of the button.
   */
  width?: Width;
  /**
   * `true` if it should be removable and in that case the clear button appears on the tag.
   * Clicking on clear button will dispatch `dismiss` event.
   */
  withaction?: boolean;
  /** Click on dismiss the button */
  dismiss?: () => void;
}
