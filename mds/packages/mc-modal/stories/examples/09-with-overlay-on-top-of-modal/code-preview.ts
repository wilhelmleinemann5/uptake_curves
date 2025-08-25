export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-dialog';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-loading-indicator';
const toggleModal = () => {
  const mcModal = document.body.querySelector('mc-modal');
  mcModal.open = true;
};
const triggerLoading = () => {
  const loader = document.body.querySelector('mc-dialog');
  loader.open = true;
  setTimeout(() => {
    loader.open = false;
  }
  , 3000);
};

// CSS
mc-dialog::part(dialog) {
  background-color: transparent;
  box-shadow: none;
  transition: none;
}

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal zindex="0" heading="Heading">
  <mc-button onclick="triggerLoading()" appearance="neutral" variant="outlined">Trigger loading overlay</mc-button>
  <mc-button slot="primaryAction" dialogaction="ok" appearance="primary">Save your changes</mc-button>
  <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined"
    >Cancel</mc-button
  >
</mc-modal>
<mc-dialog zindex="1">
  <mc-loading-indicator></mc-loading-indicator>
</mc-dialog>`,
    language: 'javascript',
    copy: true,
  },
];
