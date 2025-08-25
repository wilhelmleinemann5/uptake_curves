import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import style from './mc-textarea.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/textarea/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [tokens as CSSResultOrNative, unsafeCSS(style)];
