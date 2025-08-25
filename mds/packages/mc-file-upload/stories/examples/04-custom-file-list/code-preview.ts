export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-file-upload";
import "@maersk-global/mds-components-core/mc-table";

const mcFileUpload = document.querySelector('mc-file-upload') as HTMLElement & IMcFileUpload;
const mcTable = document.getElementById('file-upload') as HTMLElement & IMcTable;
const data: IMcFileUpload[] = [];

mcFileUpload.addEventListener('input', (event) => {
  for (const file of (event as CustomEvent).detail) {
    data.push(file);
  }
  if (mcTable) {
    mcTable.hidden = false;
    mcTable.data = data;
    mcTable.columns = [
      { id: 'name', label: 'Name' },
      { id: 'type', label: 'Type' },
      { id: 'lastModifiedDate', label: 'Last Modified' },
      { id: 'size', label: 'size', tabularFigures: true, align: 'right' },
    ];
  }
});

// HTML
<mc-file-upload hiddenfilelist multiple></mc-file-upload>
<mc-table hidden id="file-upload"></mc-table>
  `,
    language: 'javascript',
    copy: true,
  },
];
