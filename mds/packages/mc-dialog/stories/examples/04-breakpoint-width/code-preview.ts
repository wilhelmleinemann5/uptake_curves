export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-dialog';
import '@maersk-global/mds-components-core/mc-button';

const mcDialog = document.querySelector('mc-dialog')
mcDialog.width = {
  xs: '100%',
  sm: '400px',
  md: '600px',
  lg: '700px',
  xl: '800px'
};

const toggleDialog = () => {
  mcDialog.open = !mcDialog.open;
};

// HTML
<mc-button onclick="toggleDialog()">Open</mc-button>
<mc-dialog 
  heading="Caution!"
>
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
  <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined">Cancel</mc-button>
</mc-dialog>
`,
    language: 'javascript',
    copy: true,
  },
];
