import { mount } from 'cypress-lit';
import 'cypress-real-events/support';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import { MdsConfig } from '@maersk-global/mds-config';

MdsConfig.iconsDynamicImportPath = '../../../../node_modules/';
Cypress.Commands.add('mount', mount);
