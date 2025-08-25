import { vanilla } from './vanilla';
import { angular } from './angular';
import { vue2 } from './vue2';
import { vue3 } from './vue3';
import { react } from './react';
import { lit } from './lit';
import data from '../../../data';

export const preview = [
  {
    label: 'Vanilla',
    template: vanilla(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: angular(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Vue.js@2',
    template: vue2(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Vue.js@3',
    template: vue3(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: react(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Lit',
    template: lit(),
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
export const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'length',
    label: 'Length (m)',
  },
  {
    id: 'status',
    label: 'Status',
  }
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
