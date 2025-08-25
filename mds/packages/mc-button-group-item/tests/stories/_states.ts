export const states = [
  { label: 'Apple', accessibility: true },
  {
    label: 'Apple',
    accessibility: false,
    slots: [
      {
        name: 'badge',
        content: `<mc-badge display="inline" slot="badge" label="9" variant="default" position="left"></mc-badge>`,
      },
    ],
  },
];
