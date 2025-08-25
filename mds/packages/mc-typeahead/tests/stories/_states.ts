export const states = [
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="One">One</mc-option>
          <mc-option value="Two">Two</mc-option>
          <mc-option value="Three">Three</mc-option>`,
      },
    ],
    accessibility: true,
  },
];
