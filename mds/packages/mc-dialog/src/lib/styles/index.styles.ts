/* eslint-disable-next-line @nx/dependency-checks */
import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-dialog.scss?inline';
import baseStyle from './base.scss?inline';
import tokens from '@maersk-global/mds-design-tokens/implementation/core/dialog/js/design-tokens-px.css.js';

export const baseStyles: CSSResultArray = [unsafeCSS(baseStyle), tokens as CSSResultOrNative];
export const styles: CSSResultArray = [unsafeCSS(style), host as CSSResultOrNative];
