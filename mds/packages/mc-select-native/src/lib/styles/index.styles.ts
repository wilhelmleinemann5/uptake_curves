import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/select-native/js/design-tokens-px.css.js';
import style from './mc-select-native.scss?inline';
export const styles: CSSResultArray = [tokens as CSSResultOrNative, unsafeCSS(style)];
