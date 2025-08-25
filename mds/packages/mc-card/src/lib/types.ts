import { Fit, Orientation } from '@maersk-global/mds-shared-types';
export type { Fit, Orientation } from '@maersk-global/mds-shared-types';
export type Target = '_blank' | '_parent' | '_self' | '_top' | string;
export type CardVariant = 'bordered' | 'borderless';
export type ContentAlignment = 'top' | 'middle' | 'bottom';
export type ImageScaleStrength = 'light' | 'medium' | 'prominent' | 'none';

export interface IMcCard {
  /**
   * Card variant
   */
  variant?: CardVariant;
  /**
   * Card orientation
   */
  orientation?: Orientation;
  /**
   * Fit
   */
  fit?: Fit;
  /**
   * Heading
   */
  heading?: string;
  /**
   * Sub heading
   */
  subheading?: string;
  /**
   * Body
   */
  body?: string;
  /**
   * Footer
   */
  footer?: string;
  /**
   * How content (heading, subheading, body and footer) is aligned
   */
  contentalignment?: ContentAlignment;
  /**
   * Padding around all of the card's content.
   */
  padding?: string;
  /**
   * Image URL
   */
  image?: string;
  /**
   * For vertical cards, this is the height of the image as a percentage of the card width, defaults to a 16:9 ratio (height = 56.25%)
   *
   * For horizontal cards, this is the width of the image as a percentage of the card width, defaults to 33%.
   */
  imagepercent?: number;
  /**
   * Strength of the scale effect on the image
   * @default medium
   */
  imagescalestrength?: ImageScaleStrength;
  /**
   * The background colour to display "under" the image as a fallback. Defaults to rgba(247,247,247,1)
   */
  imagebackgroundcolor?: string;
  /**
   * Passing a href value will render the card as a HTML anchor element.
   */
  href?: string;
  /**
   * The relationship of the linked URL as space-separated <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types" target="_blank">link types</a>
   */
  rel?: string;
  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe).
   */
  target?: Target;
  /**
   * If true, the card is will get clickable href style and can hook onto the click event.
   * @default false
   * @type boolean
   * @since 2.84.0
   */
  clickable?: boolean;
}
