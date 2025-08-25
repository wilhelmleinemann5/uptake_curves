export const states = [
  {
    label: 'Departure date',
    accessibility: false,
  },
  {
    label: 'Departure date',
    placeholder: 'Please select a date',
    accessibility: true,
  },
  {
    label: 'Departure date',
    value: '2022-10-05',
    accessibility: true,
  },
  // error
  {
    label: 'Departure date',
    invalid: true,
    errormessage: 'The date is invalid',
    accessibility: false,
  },
  // hint
  {
    label: 'Departure date',
    hint: 'Enter the date of your departure',
    accessibility: false,
  },
  // error & hint
  {
    label: 'Departure date',
    invalid: true,
    errormessage: 'The date is invalid',
    hint: 'Enter the date of your departure',
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
  //clearbutton
  {
    label: 'Departure date',
    clearbutton: true,
    keepclearbuttonvisible: true,
    value: '1',
  },
];
