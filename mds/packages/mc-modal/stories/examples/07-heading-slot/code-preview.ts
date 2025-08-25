export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';

const toggleModal = () => {
  const mcModal = document.body.querySelector('mc-modal');
  mcModal.open = true;
};

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal dimension="small">          
  <span slot="heading">
  Heading as HTML with custom <a class="mds-neutral--weak__text-color" href="https://designsystem.maersk.com/components/modal/index.html">link</a>
  </span>
  <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
