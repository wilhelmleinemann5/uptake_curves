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

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal height="300px" width="50%" heading="Manage user permissions">
  <p>Please select the desired permission level for user <strong>RH001234</strong></p>
  <mc-select autofocus label="User role">
    <mc-option value="1">User with read access</mc-option>
    <mc-option value="2">User with write access</mc-option>
    <mc-option value="3">User with edit access</mc-option>
    <mc-option value="4">User with delete access</mc-option>
    <mc-option value="5">Editor</mc-option>
    <mc-option value="6">Privileged editor</mc-option>
    <mc-option value="7">Administrator</mc-option>
    <mc-option value="8">Manager</mc-option>
    <mc-option value="9">Privileged manager</mc-option>
    <mc-option value="10">Tester</mc-option>
    <mc-option value="11">Privileged tester</mc-option>
    <mc-option value="10">Supervisor</mc-option>
    <mc-option value="11">Privileged supervisor</mc-option>
  </mc-select>
  <mc-button slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">Cancel</mc-button>
  <mc-button slot="primaryAction" appearance="primary" dialogaction="ok">Save</mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
