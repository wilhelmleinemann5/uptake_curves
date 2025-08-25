export const states = [
  {
    label: 'Departure time',
    accessibility: false,
  },
  {
    label: 'Departure time',
    preselectcurrenttime: true,
    accessibility: true,
  },
  {
    label: 'Departure time',
    placeholder: 'HH:mm',
    accessibility: false,
  },
  {
    label: 'Departure time',
    value: '12:30',
    accessibility: true,
  },
  // error
  {
    label: 'Departure time',
    invalid: true,
    errormessage: 'The time is invalid',
    accessibility: false,
  },
  // hint
  {
    label: 'Departure time',
    hint: 'Enter the time of your departure',
    accessibility: false,
  },
  // error & hint
  {
    label: 'Departure time',
    invalid: true,
    errormessage: 'The time is invalid',
    hint: 'Enter the time of your departure',
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
