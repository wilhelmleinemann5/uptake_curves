const files = [
  { name: 'apple.svg' },
  { name: 'orange.png' },
  { name: 'banana.jpeg' },
  { name: 'peach.svg' },
  {
    name: 'very-long-file-namevery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-namvery-long-file-nam.svg',
  },
];
const legend = 'Fruits';
const errormessage = 'Choosing a fruit is required';
const hint = 'svg, png, jpeg, svg';

export const states = [
  { files, accessibility: true },
  { files, legend, accessibility: true },
  { files, legend, hiddenlegend: true, accessibility: true },
  { files, legend, invalid: true, errormessage, accessibility: true },
  { variant: 'drag-drop', files, legend, invalid: true, errormessage, accessibility: true },
  { files, legend, hint, errormessage, invalid: true, accessibility: true },
  { files, accessibility: false, hiddenfilelist: true },
  { files, icon: 'star', trailingicon: 'star', accessibility: true },
];
