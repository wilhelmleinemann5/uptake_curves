export const states = [
  {
    label: 'Button',
    accessibility: false,
  },
  {
    label: 'Button',
    icon: 'star',
    accessibility: true,
  },
  {
    label: 'Button',
    trailingicon: 'star',
    accessibility: false,
  },
  {
    slots: [
      {
        name: 'default',
        content: `Label as slot`,
      },
      {
        name: 'icon',
        content: `<span slot="icon"><mc-icon icon="star"></mc-icon></span>`,
      },
      {
        name: 'trailingicon',
        content: `<span slot="trailingicon"><mc-icon icon="star"></mc-icon></span>`,
      },
    ],
  },
];
