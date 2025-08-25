export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-dialog';
import '@maersk-global/mds-components-core/mc-button';

const toggleDialog = () => {
  const mcDialog = document.body.querySelector('mc-dialog');
  mcDialog.open = !mcDialog.open;
};

// HTML
<mc-button onclick="toggleDialog()">Open</mc-button>
<mc-dialog body="Are you sure you want to delete this item? This action cannot be undone.">
  <span slot="heading">
    Heading as HTML with custom
    <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/dialog/index.html">link</a>
  </span>
  <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
  <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined">Cancel</mc-button>
</mc-dialog>`,
    language: 'javascript',
    copy: true,
  },
];
