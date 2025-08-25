/* eslint-disable-next-line @nx/dependency-checks */
import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-progress-indicator.scss?inline';
export const styles: CSSResultArray = [unsafeCSS(style), host as CSSResultOrNative];
