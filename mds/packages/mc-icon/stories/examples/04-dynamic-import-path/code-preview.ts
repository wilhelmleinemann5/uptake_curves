export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = '/node_modules/';
if (import.meta.env.PROD) {
  MdsConfig.iconsDynamicImportPath = './';
}
`,
    language: 'javascript',
    copy: true,
  },
];
