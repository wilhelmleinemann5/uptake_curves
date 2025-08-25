export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';
const toggleModal = () => {
  const mcModal = document.body.querySelector('mc-modal');
  mcModal.open = true;
};
const goBack = () => {
  console.log('go back button clicked');
  toggleModal();
};

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal
  heading="Heading">
  <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. </p>
  <mc-checkbox slot="footer" label="Lorem ipsum?"></div>
  <mc-button slot="primaryAction" appearance="primary">Save your changes</mc-button>
  <mc-button slot="secondaryAction" onclick="goBack()" appearance="neutral" variant="outlined">Go back</mc-button>
  <mc-button slot="secondaryAction" dialogaction="cancel" appearance="neutral" variant="outlined">Cancel</mc-button>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
