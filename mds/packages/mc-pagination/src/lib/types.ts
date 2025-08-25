export interface EllipsisVisibility {
  left: boolean;
  right: boolean;
}
export type NavButtonType = 'prev' | 'next';
import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcPagination {
  /**
   * Number of total pages.
   */
  totalpages: number;
  /**
   * Number of the selected page.
   */
  currentpage?: number;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then the `previous` and `next` label will not appear,
   * but will be used as `aria-label` only
   */
  hiddenlabels?: boolean;
  /**
   * Maximum number of visible pages to be displayed.
   * If the `disabledtruncation` is set to `false` the dots used to truncate the pages will also be counted.
   * When set to `0` only navigation buttons will be displayed.
   */
  visiblepages?: number;
  /**
   * Label for the `previous` button.
   * The value will also be used as aria-label on the button.
   */
  previouslabel?: string;
  /**
   * Label for the `next` button.
   * The value will also be used as aria-label on the button.
   */
  nextlabel?: string;
  /**
   * The `aria-label` for the pagination wrapper
   */
  arialabel?: string;
  /**
   * Fit of the pagination.
   */
  fit?: Fit;
  /**
   * If set to `true` or the attribute is just presented without any value,
   * then three dots will not be used to truncate the pages and first and last page navigation will not be visible.
   */
  disabledtruncation?: boolean;
  /** Page number changed */
  pagechange?: (page: number) => void;
}
