import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-picker.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/picker/js/design-tokens-px.css.js';
import pickerItemTokens from '@maersk-global/mds-design-tokens/implementation/core/picker-item/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [
  host as CSSResultOrNative,
  tokens as CSSResultOrNative,
  pickerItemTokens as CSSResultOrNative,
  unsafeCSS(style),
];
