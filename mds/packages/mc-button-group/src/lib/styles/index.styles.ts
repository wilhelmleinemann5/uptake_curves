import { CSSResultArray, CSSResultOrNative, unsafeCSS } from 'lit';
import host from '@maersk-global/mds-components-utils/lib/host/host.styles.js';
import style from './mc-button-group.scss?inline';
export const styles: CSSResultArray = [host as CSSResultOrNative, unsafeCSS(style)];
