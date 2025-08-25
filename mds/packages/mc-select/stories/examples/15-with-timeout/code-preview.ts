export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript/Lit
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';

const columnsWithoutTimeout = [
  { columnId: '1', name: 'Column 1' },
  { columnId: '2', name: 'Column 2' },
  { columnId: '3', name: 'Column 3' },
];

function fetchColumnsWithTimeout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { columnId: '4', name: 'Column 4' },
        { columnId: '5', name: 'Column 5' },
        { columnId: '6', name: 'Column 6' },
      ]);
    }, 1000);
  });
}

// HTML
<mc-select label="Without timeout" value="2">
  \${columnsWithoutTimeout.map(
    (column) => html\`<mc-option value="\${column.columnId}">\${column.name}</mc-option>\`
  )} </mc-select
><mc-select label="With timeout" value="5">
  \${until(
    fetchColumnsWithTimeout().then((columns) =>
      columns.map((column) => html\`<mc-option value="\${column.columnId}">\${column.name}</mc-option>\`)
    ),
    html\`<span>Loading...</span>\`
  )}
</mc-select>`,
    language: 'javascript',
    copy: true,
  },
];
