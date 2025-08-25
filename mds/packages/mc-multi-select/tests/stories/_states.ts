export const states = [
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    accessibility: true,
  },
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    value: '1,2',
    clearbutton: true,
    accessibility: true,
  },
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    value: '1,2',
    icon: 'apple',
    clearbutton: true,
    accessibility: true,
  },
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    value: '1,2',
    icon: 'apple',
    clearbutton: true,
    accessibility: true,
    containerStyles: { display: 'flex', width: '44px' },
  },
  {
    open: false,
    label: 'Containers',
    labelposition: 'left',
    placeholder: 'Select number of containers',
    accessibility: false,
  },
  {
    open: true,
    label: 'Containers',
    placeholder: 'Select number of containers',
    value: '1,2',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    accessibility: true,
  },
  // slots
  {
    slots: [
      {
        name: 'hint',
        content: `<b slot="hint">check me!</b>`,
      },
      {
        name: 'errormessage',
        content: `<b slot="errormessage">invalid!</b>`,
      },
      {
        name: 'label',
        content: `<b slot="label">Label</b>`,
      },
    ],
    invalid: true,
    accessibility: false,
  },
  // icon
  {
    open: false,
    label: 'Containers',
    placeholder: 'Select number of containers',
    icon: 'star',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    accessibility: false,
  },
  {
    open: false,
    label: 'Containers',
    placeholder: 'Select number of containers',
    icon: 'star',
    value: '1,2',
    slots: [
      {
        name: 'default',
        content: `
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>`,
      },
    ],
    accessibility: false,
  },
];
