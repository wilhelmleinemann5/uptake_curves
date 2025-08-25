import { icon } from '@maersk-global/mds-dev-utils';

export default {
  icon: icon('icon', '', 'heart'),
  size: {
    name: 'size',
    type: { required: false },
    defaultValue: '20',
    table: {
      category: 'Style',
      type: { summary: '16 | 20 | 24' },
      defaultValue: { summary: '20' },
    },
    options: ['16', '20', '24'],
    control: {
      type: 'select',
    },
  },
  color: {
    name: 'color',
    type: { required: false },
    defaultValue: '',
    description:
      'Fill color of the icon. If not supplied, the default color token `--mds_core_icon_color` will be picked up.',
    table: {
      category: 'Style',
      type: { summary: 'string' },
    },
    control: {
      type: 'color',
    },
  },
  iconsDynamicImportPath: {
    name: 'iconsDynamicImportPath',
    type: { required: false },
    defaultValue: '',
    description:
      'For optimization purposes, we\'ve introduced a dynamic import of icons (we use `import()` function). Please read more about MDS <a href="https://designsystem.maersk.com/get-started/developers/components/configuration/index.html" target="_blank">configuration class</a>, applying all these is required in order to get the dynamic import of icons working with i.e. `Vite` bundler.',
    table: {
      category: 'Configuration',
    },
    control: {
      type: null,
    },
  },
  title: {
    name: 'title',
    type: { required: false },
    defaultValue: '',
    description: 'The screen-reader accessible title of the icon. If not supplied, the icon name will be used.',
    table: {
      category: 'Configuration',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
};
