export const states = [
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    accessibility: true,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    accessibility: true,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    hiddenlabel: true,
    accessibility: true,
  },
  {
    label: 'Containers',
    suffix: 'TEU',
  },
  {
    label: 'Containers',
    prefix: '$',
  },
  // disabled
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    disabled: true,
    accessibility: false,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    disabled: true,
    accessibility: true,
  },
  // hover
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    hover: true,
    accessibility: false,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    hover: true,
    accessibility: false,
  },
  // focus
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    focus: true,
    accessibility: false,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    focus: true,
    accessibility: false,
  },
  // active
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    active: true,
    accessibility: false,
  },
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    value: '1',
    active: true,
    accessibility: false,
  },
  // error
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    invalid: true,
    errormessage: 'The number is invalid',
    accessibility: false,
  },
  // hint
  {
    label: 'Containers',
    hint: 'Enter container quantity',
    value: '1',
    accessibility: false,
  },
  // error & hint
  {
    label: 'Containers',
    placeholder: 'Number of Containers',
    invalid: true,
    errormessage: 'The number is invalid',
    hint: 'Enter container quantity',
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
];
