import './styles.css';
import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';

import { createApp } from 'vue';
import App from './app/App.vue';
import router from './app/router';
import store from './app/store';

import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = process.env.NODE_ENV === 'development' ? '/node_modules/' : '/assets/node_modules/';

const app = createApp(App);

app.use(store).use(router).mount('#root');
