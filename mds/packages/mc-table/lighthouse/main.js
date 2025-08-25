import '../src';
import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = './';

document.querySelector('#app').innerHTML = `
<mc-table
>
</mc-table>
`;

const data = [
  {
    id: 1,
    name: 'Madrid Maersk',
    type: 'Container ship',
    built: '2017',
  },
  {
    id: 2,
    name: 'Mary Maersk',
    type: 'Container ship',
    built: '2013',
  },
  {
    id: 3,
    name: 'Gerner Maersk',
    type: 'Container ship',
    built: '2008',
  },
  {
    id: 4,
    name: 'Emma Maersk',
    type: 'Container ship',
    built: '2006',
  },
  {
    id: 5,
    name: 'Johannes Maersk',
    type: 'Container ship',
    built: '2001',
  },
  {
    id: 6,
    name: 'Svendborg Maersk',
    type: 'Container ship',
    built: '1998',
  },
  {
    id: 7,
    name: 'Tove Maersk',
    type: 'Container ship',
    built: '1992',
  },
];
const mcTable = document.querySelector('mc-table');
mcTable.data = data;
