export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-modal';
import '@maersk-global/mds-components-core/mc-button';

const mcModal = document.querySelector('mc-modal');

mcModal.width = {
  sm: '100%',
  md: '400px',
  lg: '500px',
  xl: '600px',
};
mcModal.height = {
  sm: '100%',
  md: '400px',
  lg: '500px',
  xl: '600px',
};

const toggleModal = () => {
  const modal = document.querySelector('mc-modal');
  if (modal) {
    modal.open = !modal.open;
  }
};

// HTML
<mc-modal>
  <span slot="heading">Responsive modal</span>
  <div>This modal has responsive width and height based on breakpoints.</div>
  <mc-button slot="footer" dialogaction="close">Close</mc-button>
</mc-modal>
<mc-button onclick="toggleModal()">Open modal</mc-button>
`,
    language: 'javascript',
    copy: true,
  },
];
