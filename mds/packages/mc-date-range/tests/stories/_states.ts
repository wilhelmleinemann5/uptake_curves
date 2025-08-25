export const states = [
  { placeholder: 'Choose a date', accessibility: true, onlyMedium: false },
  { icon: 'airplane', accessibility: true, onlyMedium: true },
  { format: 'YYYY/MM/DD', accessibility: true, onlyMedium: true },
  { hiddenlabel: true, accessibility: true, onlyMedium: true },
  { labelposition: 'left', accessibility: true, onlyMedium: true },
  { legend: 'Choose vessel arrival time ', accessibility: true, onlyMedium: true },
  { fromlabel: 'From check-in date', accessibility: true, onlyMedium: true },
  { tolabel: 'To check-in date', accessibility: true, onlyMedium: true },
  { orientation: 'vertical', accessibility: false, onlyMedium: true },
  { autolayoutdisabled: true, accessibility: false, onlyMedium: true },
  {
    value: { from: '2024-08-09', to: '2024-08-10' },
    clearbutton: true,
    keepclearbuttonvisible: true,
    accessibility: false,
    onlyMedium: true,
  },
  {
    slots: [
      {
        name: 'from',
        content: `<mc-input-date slot="from">
              <span slot="label">Check-in date <a href="#">look here</a></span>
              <span slot="hint">10% discount in January!</span>
          </mc-input-date>`,
      },
      {
        name: 'to',
        invalid: true,
        content: `<mc-input-date invalid slot="to">
              <span slot="label">Check-out date</span>
              <span slot="errormessage">Check-out date must me before end of 2022</span>
          </mc-input-date>`,
      },
    ],
    onlyMedium: true,
  },
  {
    slots: [
      {
        name: 'legend',
        content: `<span slot="legend">Choose vessel arrival time <a href="#">more info here</a></span>`,
      },
    ],
    onlyMedium: true,
  },
];
