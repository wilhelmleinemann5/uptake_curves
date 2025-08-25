export const argTypes = {
  'grid-hologram': {
    name: 'grid-hologram',
    type: { required: false },
    defaultValue: true,
    description:
      'The grid-hologram is a transparent overlay that shows the grid columns which helps you visualize the MDS grid layout and useful for debugging and understanding the grid in our Storybook. The grid-hologram is not intended for production and therefore is not reflected in the code preview.',
    table: {
      category: 'Story',
    },
    control: {
      type: 'boolean',
    },
  },
};
