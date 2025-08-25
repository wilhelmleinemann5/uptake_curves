import { html } from 'lit';

export const docsGenerator = (list, columns) => {
  return html`<mc-table .data=${list} .columns=${columns}></mc-table>`;
};
