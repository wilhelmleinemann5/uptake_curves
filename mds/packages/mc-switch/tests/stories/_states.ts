export const states = [
  {
    label: 'I agree to the terms',
    accessibility: true,
  },
  // disabled
  {
    label: 'I agree to the terms',
    disabled: true,
    accessibility: true,
  },
  {
    label: 'I agree to the terms',
    disabled: true,
    checked: true,
    accessibility: true,
  },
  // hover
  {
    label: 'I agree to the terms',
    hover: true,
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    hover: true,
    checked: true,
    accessibility: false,
  },
  // focus
  {
    label: 'I agree to the terms',
    focus: true,
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    focus: true,
    checked: true,
    accessibility: false,
  },
  // active
  {
    label: 'I agree to the terms',
    active: true,
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    active: true,
    checked: true,
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
];
