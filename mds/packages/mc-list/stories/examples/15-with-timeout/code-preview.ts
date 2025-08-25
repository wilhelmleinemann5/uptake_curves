export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript/Lit
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import "@maersk-global/mds-components-core/mc-list";
import '@maersk-global/mds-components-core/mc-list-item';

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
<mc-list type="multiple" label="Without timeout" value="2">
  \${columnsWithoutTimeout.map(
    (column) => html\`<mc-list-item value="\${column.columnId}">\${column.name}</mc-list-item>\`
  )} </mc-list
><mc-list type="multiple" label="With timeout" .value=\${'5,6'}>
  \${until(
    fetchColumnsWithTimeout().then((columns) =>
      columns.map((column) => html\`<mc-list-item value="\${column.columnId}">\${column.name}</mc-list-item>\`)
    ),
    html\`<span>Loading...</span>\`
  )}
</mc-list>`,
    language: 'javascript',
    copy: true,
  },
];
