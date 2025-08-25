import { html } from 'lit';
import cssList from './css-class-list.json';
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
    id: 'className',
    label: 'CSS class',
    noWrap: true,
  },
  {
    id: 'packageFile',
    label: 'File',
    noWrap: true,
  },
];

const list = cssList.filter(
  (item) =>
    item.category !== 'breadcrumb' &&
    item.category !== 'container-grid' &&
    item.category !== 'gap' &&
    item.category !== 'viewport-grid' &&
    !item.className.includes('subtle') &&
    !item.className.includes('alt'),
);

export const CssClasses = () => html` <div class="mds-content">${docsGenerator(list, columns)}</div> `;
