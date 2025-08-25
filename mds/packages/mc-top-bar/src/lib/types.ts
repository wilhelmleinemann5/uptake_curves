import type { Target } from '@maersk-global/mds-shared-types';
export type { Target } from '@maersk-global/mds-shared-types';
export interface IMcTopBar {
  /**
   * The product is the name of your product that will be shown next to the Maersk logo.
   * @type {string}
   * @default ''
   **/
  product?: string;
  /**
   * The product acronym is the short name of your product that will be shown in the mobile view next to the Maersk logo.
   * @type {string}
   * @default ''
   **/
  productshort?: string;
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
}
