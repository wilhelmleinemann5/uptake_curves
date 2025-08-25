import '@maersk-global/fonts/maeu/fonts.css';
import '../packages/mds-foundations/scss/index.scss';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-loading-indicator';
import '@maersk-global/mds-components-core-text-and-icon';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-label';
import '@maersk-global/mds-components-core-hint';
import '@maersk-global/mds-components-core-error';
import '@maersk-global/mds-components-core-card';
import '@maersk-global/mds-components-core-tag';
import '@maersk-global/mds-components-core-checkbox';
import '@maersk-global/mds-components-core-radio';
import '@maersk-global/mds-components-core-switch';
import '@maersk-global/mds-components-core-multi-choice-fieldset';
import '@maersk-global/mds-components-core-checkbox-group';
import '@maersk-global/mds-components-core-radio-group';
import '@maersk-global/mds-components-core-switch-group';
import '@maersk-global/mds-components-core-list-item';
import '@maersk-global/mds-components-core-option';
import '@maersk-global/mds-components-core-list';
import '@maersk-global/mds-components-core-button-group-item';
import '@maersk-global/mds-components-core-button-group';
import '@maersk-global/mds-components-core-segmented-control-item';
import '@maersk-global/mds-components-core-segmented-control';
import '@maersk-global/mds-components-core-notification';
import '@maersk-global/mds-components-core-toast';
import '@maersk-global/mds-components-core-pagination';
import '@maersk-global/mds-components-core-tab';
import '@maersk-global/mds-components-core-tab-bar';
import '@maersk-global/mds-components-core-modal';
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-picker-item';
import '@maersk-global/mds-components-core-picker';
import '@maersk-global/mds-components-core-time-picker';
import '@maersk-global/mds-components-core-month-year-picker';
import '@maersk-global/mds-components-core-calendar';
import '@maersk-global/mds-components-core-menu';
import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core-avatar';
import '@maersk-global/mds-components-core-input';
import '@maersk-global/mds-components-core-number-stepper';
import '@maersk-global/mds-components-core-textarea';
import '@maersk-global/mds-components-core-select-native';
import '@maersk-global/mds-components-core-input-date';
import '@maersk-global/mds-components-core-input-time';
import '@maersk-global/mds-components-core-date-range';
import '@maersk-global/mds-components-core-file-upload';
import '@maersk-global/mds-components-core-select';
import '@maersk-global/mds-components-core-multi-select';
import '@maersk-global/mds-components-core-typeahead';
import '@maersk-global/mds-components-core-table';
import '@maersk-global/mds-components-core-step-indicator-item';
import '@maersk-global/mds-components-core-step-indicator';
import '@maersk-global/mds-components-core-dialog';
import '@maersk-global/mds-components-core-link-button';
import '@maersk-global/mds-components-core-drawer';
import '@maersk-global/mds-components-core-top-bar';
import '@maersk-global/mds-components-core-side-bar';
import '@maersk-global/mds-components-core-theme-switch';
import '@maersk-global/mds-components-core-progress-indicator';
import '@maersk-global/mds-components-core-badge';
import '@maersk-global/mds-components-core-typeahead-multi-select';
import "@maersk-global/mds-components-core-input-group";
//%%COMPONENT_STORYBOOK_PREVIEW_IMPORT%%

import { MdsConfig } from '../packages/mds-config';
import './public/preview.css';

MdsConfig.iconsDynamicImportPath =
  import.meta.env.MODE === 'development' || import.meta.env.STORYBOOK_MODE === 'vr' ? '/' : './';

let selectedBrand = 'maersk';
let selectedTheme = 'light';

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('mdsdocsbrand') && urlParams.has('mdsdocstheme')) {
  selectedBrand = urlParams.get('mdsdocsbrand') || 'maersk';
  selectedTheme = urlParams.get('mdsdocstheme') || 'light';
} else if (typeof localStorage !== 'undefined') {
  selectedBrand = localStorage.getItem('mds-sb-selected-brand') || 'maersk';
  selectedTheme = localStorage.getItem('mds-sb-selected-theme') || 'light';
}

const url = `mds-design-tokens/${selectedBrand}/${selectedTheme}/css/design-tokens-px.css`;

// Check if running in browser and path starts with "/main"
const isMainPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/main');

const themeUrl = isMainPath
  ? `/main/assets/packages/${url}`
  : `${import.meta.env.MODE === 'development' ? '../dist/packages/' : import.meta.env.VITE_FEAT_BRANCH ? `/${import.meta.env.VITE_FEAT_BRANCH}/assets/packages/` : '/assets/packages/'}${url}`;

const newLink = document.createElement('link');
newLink.rel = 'stylesheet';
newLink.href = themeUrl;
newLink.id = 'theme-stylesheet';
document.head.appendChild(newLink);

// Storybook parameters
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  options: {
    panelPosition: 'right',
    bottomPanelHeight: 500,
    rightPanelWidth: 500,
    storySort: {
      method: 'alphabetical',
      order: [
        'Welcome',
        'Components',
        'Themes & tokens',
        ['About', 'Documentation', 'Text Content Elements', 'Colours', 'Typography'],
        'Layout & navigation',
        'Experiments',
        'Utility Components',
      ],
      locales: '',
    },
  },
  viewport: {
    viewports: {
      ['x-small']: {
        name: 'x-small',
        styles: {
          width: '640px',
          height: '801px',
        },
      },
      small: {
        name: 'small',
        styles: {
          width: '1024px',
          height: '801px',
        },
      },
      medium: {
        name: 'medium',
        styles: {
          width: '1440px',
          height: '801px',
        },
      },
      large: {
        name: 'large',
        styles: {
          width: '1920px',
          height: '801px',
        },
      },
      'x-large': {
        name: 'x-large',
        styles: {
          width: '2000px',
          height: '801px',
        },
      },
    },
  },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: 'var(--mds_brand_appearance_neutral_default_background-color)',
      },
      {
        name: 'weakest',
        value: 'var(--mds_brand_appearance_neutral_weakest_background-color)',
      },
    ],
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'aria-hidden-focus',
          selector: '#theme-selector',
          enabled: false,
        },
      ],
    },
  },
};
