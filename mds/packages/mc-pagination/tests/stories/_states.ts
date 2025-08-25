export const states = [
  //total page + truncation
  {
    totalpages: 20,
    arialabel: '1',
    accessibility: true,
  },
  {
    totalpages: 1,
    arialabel: '2',
    accessibility: false,
  },
  //disabled truncation
  {
    totalpages: 20,
    disabledtruncation: true,
    arialabel: '3',
    accessibility: false,
  },
  //current page + prev/next button disabled
  {
    totalpages: 20,
    currentpage: 1,
    arialabel: '4',
    accessibility: false,
  },
  {
    totalpages: 20,
    currentpage: 6,
    arialabel: '5',
    accessibility: false,
  },
  {
    totalpages: 20,
    currentpage: 20,
    arialabel: '6',
    accessibility: false,
  },
  //hidden labels
  {
    totalpages: 20,
    hiddenlabels: true,
    arialabel: '7',
    accessibility: true,
  },
  //visible pages
  {
    totalpages: 20,
    visiblepages: 7,
    arialabel: '8',
    accessibility: false,
  },
  {
    totalpages: 20,
    visiblepages: 1,
    arialabel: '9',
    accessibility: false,
  },
  //labels
  {
    totalpages: 20,
    previouslabel: 'Previous test',
    nextlabel: 'Next test',
    arialabel: '10',
    accessibility: true,
  },
  // router links
  {
    totalpages: 10,
    arialabel: '11',
    accessibility: true,
    slots: [
      {
        name: 'default',
        content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<a href="#page${i}">${i}</a>`).join(''),
      },
    ],
  },
];
