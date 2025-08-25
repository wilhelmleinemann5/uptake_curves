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

// CSS
.container {
  display: flex;
  flex-grow: 1;
}
.image {
  width: 50%;
  background-color: #fffff;
  display: flex;
  justify-content: center;
  border-radius: 6px 0 0 6px;
}
.image img {
  width: 90%;
}
.content {
  width: 50%;
  padding: 0 20px 40px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

// HTML
<mc-button onclick="toggleModal()">Open</mc-button>
<mc-modal padding="none">
  <div class="container">
    <div class="image">
      <img src="src-to-your-img" />
    </div>
    <div class="content">
      <h3>About v2-alpha</h3>
      <p>The Maersk Design System has released its v2-alpha with official support for three brand themes (Maersk Light, Maersk Dark, APMT Light and AMPT Dark High Contrast).</p>
      <p>It also includes a Figma component rebuild, CSS parts customisation, enhanced CSS foundations and more. We need your help to try out the new release and provide feedback as we move into 2023.</p>
      <mc-button fit="small" appearance="neutral"href="https://designsystem-v2.maersk.com" target="_blank">Read all about the release</mc-button>
    </div>
  </div>
</mc-modal>`,
    language: 'javascript',
    copy: true,
  },
];
