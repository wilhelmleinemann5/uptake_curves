export const argTypes = {
  variant: {
    name: 'variant',
    type: { required: false },
    defaultValue: 'full',
    description:
      'The variant of the breadcrumb can be either collapsed and show only the first item, current page and the previous page or full, meaning all items will be displayed. In the mobile viewport, the breadcrumb will always be collapsed.',
    table: {
      category: 'Style',
    },
    options: ['collapsed', 'full'],
    control: {
      type: 'select',
    },
  },
  'aria-label': {
    name: 'aria-label',
    type: { required: false },
    defaultValue: 'breadcrumb',
    description:
      'The aria-label attribute is used to define a string that labels the current element. Use it to provide a label for assistive technologies like screen readers.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'text',
    },
  },
};
