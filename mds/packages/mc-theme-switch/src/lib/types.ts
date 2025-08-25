import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
export interface IMcThemeSwitch {
  /**
   * The fit of the component.
   * @type {Fit}
   * @default medium
   **/
  fit?: Fit;
  theme: ThemeOptions;
  /**
   * The change event of the component.
   **/
  change?: () => void;
}

export interface IMcThemeSwitchChangeEvent {
  readonly theme: string;
}

export type ThemeOptions = 'light' | 'dark' | 'auto';
