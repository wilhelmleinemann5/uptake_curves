import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import style from './mc-label.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/label/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [tokens as CSSResultOrNative, unsafeCSS(style)];
