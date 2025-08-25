export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
  import "@maersk-global/mds-components-core/mc-file-upload";
  
  // CSS
  // Here is an example of how to make the drag-and-drop area appear disabled.
  .mc-file-upload_drag-drop::part(drag-drop-area) {
    opacity: 0.5;
    pointer-events:none;
  }
  
  // HTML
  <mc-file-upload class="mc-file-upload_default">
      <span slot="intermediate"><mc-notification appearance="info" heading="Testing the banner" body="test"></<mc-notification></span>
</mc-file-upload>
  <br />
  <mc-file-upload variant="drag-drop"></mc-file-upload>
    `,
    language: 'javascript',
    copy: true,
  },
];
