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
    clearbutton: true,
    value: '1',
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
    clearbutton: true,
    icon: 'apple',
    value: '1',
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
    clearbutton: true,
    icon: 'apple',
    value: '1',
    slots: [
      {
        name: 'default',
        content: `
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>`,
      },
    ],
    containerStyles: { width: '50px' },
    accessibility: true,
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
    value: '2',
    slots: [
      {
        name: 'default',
        content: `
            <mc-option value="1">One</mc-option>
            <mc-option value="2" selected>Two</mc-option>
            <mc-option value="3">Three</mc-option>`,
      },
    ],
    accessibility: true,
  },
  {
    open: false,
    label: 'Long text',
    value: '2',
    slots: [
      {
        name: 'default',
        content: `
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two-Two</mc-option>
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
          <mc-option value="1"><strong>1</strong>&nbsp;One</mc-option>
          <mc-option value="2"><strong>2</strong>&nbsp;Two</mc-option>
          <mc-option value="3"><strong>3</strong>&nbsp;Three</mc-option>`,
      },
    ],
    accessibility: false,
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
    value: '1',
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
    open: true,
    label: 'Containers',
    placeholder: '',
    optionswidth: 'auto',
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
];
