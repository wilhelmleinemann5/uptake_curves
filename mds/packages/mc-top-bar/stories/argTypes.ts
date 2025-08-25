import { href, rel, target } from '@maersk-global/mds-dev-utils';
export const argTypes = {
  product: {
    name: 'product',
    type: { required: false },
    defaultValue: '',
    description: 'The product is the name of your product that will be shown next to the Maersk logo.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  productshort: {
    name: 'productshort',
    type: { required: false },
    defaultValue: '',
    description:
      'The product short name is the name of your product that will be shown in the mobile view next to the Maersk logo.',
    table: {
      category: 'Content',
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
  href: href('logo'),
  rel,
  target,
  // TO DO: add skip to the main content on keyboard navigation
};
