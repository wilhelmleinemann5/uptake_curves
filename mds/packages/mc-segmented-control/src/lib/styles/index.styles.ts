import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-segmented-control.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/segmented-control/js/design-tokens-px.css.js';
import listItemTokens from '@maersk-global/mds-design-tokens/implementation/core/list-item/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [
  host as CSSResultOrNative,
  tokens as CSSResultOrNative,
  listItemTokens as CSSResultOrNative,
  unsafeCSS(style),
];
