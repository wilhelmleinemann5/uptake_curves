import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import multiChoiceDisabled from '@maersk-global/mds-components-utils/lib/host/multi-choice-fieldset-disabled.styles.js';
import style from './mc-switch.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/switch/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [
  host as CSSResultOrNative,
  multiChoiceDisabled as CSSResultOrNative,
  tokens as CSSResultOrNative,
  unsafeCSS(style),
];
