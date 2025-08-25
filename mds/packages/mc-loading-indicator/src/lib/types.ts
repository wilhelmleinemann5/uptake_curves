import type { Fit, Orientation } from '@maersk-global/mds-shared-types';
export type { Fit, Orientation } from '@maersk-global/mds-shared-types';
type VariantNew = 'bar' | 'ring';
type VariantOld = 'spinner';
export type Variant = VariantNew | VariantOld;
type LoadingIndicatorAppearanceNew = 'primary' | 'neutral-inverse';
type LoadingIndicatorAppearanceOld = 'default' | 'inverse';
export type LoadingIndicatorAppearance = LoadingIndicatorAppearanceNew | LoadingIndicatorAppearanceOld;

export interface IMcLoadingIndicator {
  /**
   * Label has to be passed as a property.
   * It is required attribute as it will be used as `aria-label`
   */
  label: string;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the label will not appear, but will be used as `aria-label` only
   */
  hiddenlabel?: boolean;
  /**
   * Variant of the loading indicator
   * Can be: `bar`, `ring`
   * @default 'ring'
   */
  variant?: Variant;
  /**
   * Fit of the loading indicator.
   */
  fit?: Fit;
  /**
   * Appearance of the loading indicator.
   * Can be: `primary`, `neutral-inverse`
   * @default 'primary'
   * @type {LoadingIndicatorAppearance}
   */
  appearance?: LoadingIndicatorAppearance;
  /**
   * Orientation of the loading indicator.
   * Can be: `horizontal`, `vertical`
   * @default 'vertical'
   */
  orientation?: Orientation;
}
