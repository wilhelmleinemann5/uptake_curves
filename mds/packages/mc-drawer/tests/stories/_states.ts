export const states = (
  fit: string,
  dimension: string,
  heading: string,
  body: string,
  position: string,
  headingAsSlot: boolean,
  bodyAsSlot: boolean,
  width: string | undefined,
  height: string | undefined,
  nonmodal: boolean,
  nopadding: boolean,
  disablestickyfooter: boolean,
) => [
  {
    open: true,
    heading,
    body,
    position,
    width,
    height,
    ...(nonmodal && { nonmodal }),
    ...(nopadding && { nopadding }),
    ...(disablestickyfooter && { disablestickyfooter }),
    slots: [
      {
        name: 'default',
        content: `
          ${headingAsSlot ? '<span slot="heading">Heading as slot</span>' : ''}
          ${bodyAsSlot ? '<span>Body as slot</span>' : ''}
          <mc-button slot="footer" appearance="primary" variant="filled" appearance="alt" fit="${fit}">Save</mc-button>`,
      },
    ],
    dimension,
    accessibility: true,
  },
];
