import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-table.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/table/js/design-tokens-px.css.js';
import buttonTokens from '@maersk-global/mds-design-tokens/implementation/core/button/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [
  host as CSSResultOrNative,
  tokens as CSSResultOrNative,
  buttonTokens as CSSResultOrNative,
  unsafeCSS(style),
];
