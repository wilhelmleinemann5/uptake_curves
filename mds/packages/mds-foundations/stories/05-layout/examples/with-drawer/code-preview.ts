export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `
// JavaScript
function openDrawer(nonmodal) {
  const drawer = document.querySelector('#drawer');
  if (drawer) {
    drawer.nonmodal = nonmodal;
    drawer.open = true;
  }
}

const buttons = document.querySelectorAll('mc-button');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const nonmodal = event.target.textContent.includes('non-modal');
    openDrawer(nonmodal);
  });
});

// HTML
<body class="mds">
  <div class="mds-layout">
    <a href="#main-content" class="mds-skip-to">Skip to content</a>
    <mc-top-bar product="Maersk Design System" productshort="MDS"></mc-top-bar>
    <mc-side-bar>
      <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
        <ul>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 2</a>
          </li>
        </ul>
      </nav>
    </mc-side-bar>

    <mc-drawer id="drawer">Drawer example</mc-drawer>

    <main id="main-content" class="mds-page mds-container">
      <div class="mds-grid mds-grid-cols-2">
          <mc-button width="full-width">Open drawer</mc-button>
          <mc-button width="full-width">Open non-modal drawer</mc-button>
        </div>
    </main>
  </div>
</body>`,
    language: 'html',
    copy: true,
  },
];
