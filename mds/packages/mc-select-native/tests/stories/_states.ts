export const states = [
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    accessibility: true,
  },
  {
    label: 'Number',
    labelposition: 'left',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    accessibility: false,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    accessibility: true,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    hiddenlabel: true,
    accessibility: true,
  },
  // width
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    width: '50',
    accessibility: false,
  },
  // long option
  {
    label: 'Number',
    options: ['verylongoptionverylongoptionverylongoptionverylongoptionverylong', 'Two'],
    width: '20',
    selectedindex: [0],
    accessibility: false,
  },
  // disabled
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    disabled: true,
    accessibility: false,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    disabled: true,
    accessibility: false,
  },
  // hover
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    hover: true,
    accessibility: false,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    hover: true,
    accessibility: false,
  },
  // focus
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    focus: true,
    accessibility: false,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    focus: true,
    accessibility: false,
  },
  // active
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    active: true,
    accessibility: false,
  },
  {
    label: 'Number',
    options: ['One', 'Two'],
    value: 'One',
    active: true,
    accessibility: false,
  },
  // error
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    accessibility: false,
  },
  // hint
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    hint: 'Use your maersk.com username',
    accessibility: false,
  },
  // error & hint
  {
    label: 'Number',
    options: ['One', 'Two'],
    placeholder: 'Select a number',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    hint: 'Use your maersk.com username',
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
