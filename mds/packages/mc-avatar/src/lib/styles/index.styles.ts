import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-avatar.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/avatar/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [host as CSSResultOrNative, tokens as CSSResultOrNative, unsafeCSS(style)];
