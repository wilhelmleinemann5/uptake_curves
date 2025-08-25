import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-foundations/css/foundations.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import './style.css';
import '@maersk-global/mds-components-core';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = process.env.NODE_ENV === 'development' ? '/node_modules/' : '/assets/node_modules/';

export * from './content';
export * from './form';
export * from './validation';
