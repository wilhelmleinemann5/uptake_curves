export const states = [
  {
    label: 'Info',
    icon: 'info-circle',
  },
  {
    label: 'Info',
    trailingicon: 'info-circle',
    active: true,
  },
  {
    label: 'Info',
    slots: [
      {
        name: 'prefix',
        content: `<span slot="prefix">&#10003;</span>`,
      },
    ],
  },
  {
    label: 'Price',
    slots: [
      {
        name: 'suffix',
        content: `<span slot="suffix">$</span>`,
      },
    ],
  },
  {
    slots: [
      {
        name: 'default',
        content: `<a href="#test">Link as slot</a>`,
      },
    ],
  },
];
