import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import inputDisabled from '@maersk-global/mds-components-utils/lib/host/input-disabled.styles.js';
import style from './mc-select.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/select/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [
  host as CSSResultOrNative,
  inputDisabled as CSSResultOrNative,
  tokens as CSSResultOrNative,
  unsafeCSS(style),
];
