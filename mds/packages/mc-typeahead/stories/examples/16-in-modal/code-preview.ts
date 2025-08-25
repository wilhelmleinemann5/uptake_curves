export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-select-native';
const toggleModal = () => {
  const mcModal = document.body.querySelector('mc-modal');
  mcModal.open = true;
};
const mcSelect = document.body.querySelector('mc-select-native');
mcSelect.options = ['Editor', 'Viewer'];

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal height="300px" width="50%" heading="Manage user permissions">
  <p>Please select the desired permission level for user <strong>RH001234</strong></p>
  <mc-select-native autofocus label="User role"></mc-select-native>
  <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
  <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">Save</mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
