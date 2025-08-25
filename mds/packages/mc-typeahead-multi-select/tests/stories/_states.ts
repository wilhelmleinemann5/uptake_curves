export const states = [
  {
    label: 'Containers',
    placeholder: 'Select number of containers',
    selecteddata: [{ label: 'One', value: 'One' }],
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
  {
    label: 'Containers',
    placeholder: 'Select number of containers',
    selecteddata: [
      { label: 'One', value: 'One' },
      { label: 'Two', value: 'Two' },
    ],
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="One">One</mc-option>
          <mc-option value="Two">Two</mc-option>
          <mc-option value="Three">Three</mc-option>`,
      },
    ],
    accessibility: false,
  },
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
    accessibility: false,
  },
];
