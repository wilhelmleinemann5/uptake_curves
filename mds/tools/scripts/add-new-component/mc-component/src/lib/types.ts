import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcComponent {
  /**
   * The myprop of the component.
   * @type {string}
   **/
  myprop: string;
  /**
   * The fit of the component.
   * @type {Fit}
   * @default medium
   **/
  fit?: Fit;
  /**
   * The myevent event of the component.
   **/
  myevent?: () => void;
}

export interface IMcComponentMyEventDetail {
  readonly id: number;
  readonly name: string;
}
