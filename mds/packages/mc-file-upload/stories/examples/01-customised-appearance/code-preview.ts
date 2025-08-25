export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-file-upload";

// CSS
.mc-file-upload_default::part(button) {
  color: #40AB35;
}

// Here is an example of how to make the drag-and-drop area appear disabled.
.mc-file-upload_drag-drop::part(drag-drop-area) {
  opacity: 0.5;
  pointer-events:none;
}

// HTML
<mc-file-upload class="mc-file-upload_default"></mc-file-upload>
<br />
<mc-file-upload class="mc-file-upload_drag-drop" variant="drag-drop"></mc-file-upload>
  `,
    language: 'javascript',
    copy: true,
  },
];
