export const states = [
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    accessibility: true,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    accessibility: true,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    labelposition: 'left',
    accessibility: false,
  }, // 5 rows
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    rows: 5,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    rows: 5,
    accessibility: false,
  },
  // max length
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    maxlength: 100,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    maxlength: 100,
    accessibility: false,
  },
  // hidden label
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hiddenlabel: true,
    accessibility: true,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    hiddenlabel: true,
    accessibility: false,
  },
  // disabled
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    disabled: true,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    disabled: true,
    accessibility: true,
  },
  // hover
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hover: true,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    hover: true,
    accessibility: false,
  },
  // focus
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    focus: true,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    focus: true,
    accessibility: false,
  },
  // active
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    active: true,
    accessibility: false,
  },
  {
    label: 'Explanation',
    value: 'This is short explanation',
    active: true,
    accessibility: false,
  },
  // error
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    accessibility: false,
  },
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    maxlength: 100,
    accessibility: false,
  },
  // hint
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hint: 'Use your maersk.com username',
    accessibility: false,
  },
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hint: 'Use your maersk.com username',
    maxlength: 100,
    accessibility: false,
  },
  // hint & error
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hint: 'Use your maersk.com username',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    accessibility: true,
  },
  {
    label: 'Explanation',
    placeholder: 'Write short explanation',
    hint: 'Use your maersk.com username',
    invalid: true,
    errormessage: 'The username is not a Mearsk.com user',
    maxlength: 100,
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
