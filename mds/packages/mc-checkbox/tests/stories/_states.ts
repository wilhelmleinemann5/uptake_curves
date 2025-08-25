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
  {
    label: 'I agree to the terms',
    disabled: true,
    indeterminate: true,
    accessibility: false,
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
  {
    label: 'I agree to the terms',
    hover: true,
    indeterminate: true,
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
  {
    label: 'I agree to the terms',
    focus: true,
    indeterminate: true,
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
  {
    label: 'I agree to the terms',
    active: true,
    indeterminate: true,
    accessibility: false,
  },
  // error
  {
    label: 'I agree to the terms',
    invalid: true,
    errormessage: 'invalid!',
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    invalid: true,
    checked: true,
    errormessage: 'invalid!',
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    invalid: true,
    indeterminate: true,
    errormessage: 'invalid!',
    accessibility: false,
  },
  // hint
  {
    label: 'I agree to the terms',
    hint: 'check me!',
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    checked: true,
    hint: 'check me!',
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    indeterminate: true,
    hint: 'check me!',
    accessibility: false,
  },
  // error & hint
  {
    label: 'I agree to the terms',
    hint: 'check me!',
    errormessage: 'invalid!',
    invalid: true,
    accessibility: true,
  },
  {
    label: 'I agree to the terms',
    checked: true,
    hint: 'check me!',
    errormessage: 'invalid!',
    invalid: true,
    accessibility: false,
  },
  {
    label: 'I agree to the terms',
    indeterminate: true,
    hint: 'check me!',
    errormessage: 'invalid!',
    invalid: true,
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
