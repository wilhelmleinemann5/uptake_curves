export const states = [
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-select hiddenlabel label="country code" placeholder="+40">
            <mc-option value="+40">+40</mc-option>
            <mc-option value="+44">+44</mc-option>
            <mc-option value="+45">+45</mc-option>
          </mc-select>
          <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>`,
      },
    ],
    accessibility: true,
  },
  {
    slots: [
      {
        name: 'default',
        content: `
          <mc-select hiddenlabel label="country code" placeholder="+40">
            <mc-option value="+40">+40</mc-option>
            <mc-option value="+44">+44</mc-option>
            <mc-option value="+45">+45</mc-option>
          </mc-select>
          <mc-input hiddenlabel label="phone" placeholder="999 999 999"></mc-input>`,
      },
    ],
    hiddenlegend: true,
    disableinnerborder: true,
    accessibility: true,
  },
];
