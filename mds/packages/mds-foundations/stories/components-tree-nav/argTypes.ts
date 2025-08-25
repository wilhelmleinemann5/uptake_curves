export const argTypes = {
  'aria-label': {
    name: 'aria-label',
    type: { required: false },
    defaultValue: 'side navigation',
    description:
      'The aria-label attribute is used to define a string that labels navigation. Use it to provide a label for assistive technologies like screen readers.',
    table: {
      category: 'Content',
    },
    control: {
      type: 'text',
    },
  },
};
