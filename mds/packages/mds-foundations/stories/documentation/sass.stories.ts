import { html } from 'lit';
import sassList from './sass-mixins-list.json';
import { docsGenerator } from './docs-generator';

export default {
  title: 'Themes & tokens/Documentation',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

const columns = [
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'mixin',
    label: 'SASS mixin',
    noWrap: true,
  },
  {
    id: 'packageFile',
    label: 'File',
    noWrap: true,
  },
];

const list = sassList.filter(
  (item) =>
    item.category !== 'gap' &&
    item.category !== 'grid' &&
    item.category !== 'media' &&
    item.category !== 'table' &&
    item.mixin.includes('mds-'),
);

export const SassMixins = () => html` <div class="mds-content">${docsGenerator(list, columns)}</div> `;
