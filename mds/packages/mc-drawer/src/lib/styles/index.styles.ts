/* eslint-disable-next-line @nx/dependency-checks */
import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-drawer.scss?inline';
import drawerTokens from '@maersk-global/mds-design-tokens/implementation/core/drawer/js/design-tokens-px.css.js';
export const styles: CSSResultArray = [unsafeCSS(style), host as CSSResultOrNative, drawerTokens as CSSResultOrNative];
