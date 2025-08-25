export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-file-upload";

//In the example, the file is created programmatically and added to the fileUpload component.
//In real life application, you can simply listen to the input event and save the FileList(from event.detail) in a variable/on a server.

const fileUpload = document.querySelector('mc-file-upload');
const file = new File([''], 'example.txt', { type: 'text/plain' });
const dataTransfer = new DataTransfer();
dataTransfer.items.add(file);
fileUpload.files = dataTransfer.files;

// HTML
<mc-file-upload></mc-file-upload>
  `,
    language: 'javascript',
    copy: true,
  },
];
