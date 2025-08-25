import '@maersk-global/community-ui-code-preview';

let layout: Element | null = null;
let layoutWrapper: Element | null = null;
let sideBar: Element | null = null;
let topBar: IMcTopBar | null = null;
let main: Element | null = null;
let grid: Element | null = null;
let footer: Element | null = null;
let toggleGridButton: IMcSwitch | null = null;
let showFullWidthGrid = false; //mds-full-width
let toggleSidebarButton: IMcSwitch | null = null;
let showSideBar = true;
let toggleFooterButton: IMcSwitch | null = null;
let showFooter = true;
let toggleStickyFooterButton: IMcSwitch | null = null;
let showStickyFooter = false;
let notification: Element | null = null;
let codePreview: IMcCCodePreview | null = null;

const code = [{ label: 'HTML/JS', template: '', language: 'javascript' }];

export const initLayout = () => {
  layout = document.getElementById('layout');
  buildLayout();
};

const toggleGridType = () => {
  showFullWidthGrid = !showFullWidthGrid;
  if (grid) {
    if (showFullWidthGrid) {
      grid.classList.add('mds-full-width');
    } else {
      grid.classList.remove('mds-full-width');
    }
  }
  updateCodePreview();
};

const toggleSidebarVisibility = () => {
  showSideBar = !showSideBar;
  if (showSideBar) {
    createSideBar();
  } else {
    removeSideBar();
  }
  updateCodePreview();
};

const toggleFooterVisibility = () => {
  showFooter = !showFooter;
  if (showFooter) {
    createFooter();
    toggleStickyFooterButton?.removeAttribute('disabled');
  } else {
    removeFooter();
    toggleStickyFooterButton?.setAttribute('disabled', 'true');
  }
  updateCodePreview();
};

const toggleStickyFooterVisibility = () => {
  showStickyFooter = !showStickyFooter;
  if (footer && main && layoutWrapper) {
    removeFooter();
    createFooter();
  }
  updateCodePreview();
};

const buildLayout = () => {
  layoutWrapper = document.createElement('div');
  layoutWrapper.classList.add('mds-layout');

  // side bar
  createSideBar();

  // top bar
  topBar = document.createElement('mc-top-bar');
  topBar.product = 'Maersk Design System';
  topBar.productshort = 'MDS';
  topBar.innerHTML = `
  <div slot="actions">
    <mc-menu trigger="click">
      <mc-button
        slot="trigger"
        icon="cog"
        variant="plain"
        appearance="neutral"
        fit="small"
        hiddenlabel>Menu
      </mc-button>
      <mc-list>
        <mc-list-item label="One"></mc-list-item>
        <mc-list-item label="Two"></mc-list-item>
        <mc-list-item label="Three"></mc-list-item>
        <mc-list-item label="Four"></mc-list-item>
        <mc-list-item label="Five"></mc-list-item>
      </mc-list>
    </mc-menu>
    <mc-avatar
      info="info"
      initials="JD"
      hiddentooltip
      fit="small"
      appearance="color-3">
    </mc-avatar>
  </div>`;
  layoutWrapper.appendChild(topBar);

  // main
  main = document.createElement('main');
  main.classList.add('mds-page', 'mds-container');
  main.id = 'main-content';
  layoutWrapper.appendChild(main);

  // grid
  grid = document.createElement('div');
  grid.classList.add('mds-grid');
  main.appendChild(grid);

  // add button to toggle grid type
  toggleGridButton = document.createElement('mc-switch');
  toggleGridButton.label = 'Content in full-width';
  toggleGridButton.fit = 'small';
  toggleGridButton.checked = showFullWidthGrid;
  toggleGridButton.addEventListener('change', toggleGridType);
  toggleGridButton.classList.add(
    'mds-grid-md-col-1',
    'mds-grid-md-col-span-3',
    'mds-grid-sm-col-1',
    'mds-grid-sm-col-span-3',
    'mds-grid-xs-col-1',
  );
  grid.appendChild(toggleGridButton);

  // add button to toggle sidebar
  toggleSidebarButton = document.createElement('mc-switch') as IMcSwitch;
  toggleSidebarButton.label = 'Sidebar';
  toggleSidebarButton.fit = 'small';
  toggleSidebarButton.checked = showSideBar;
  toggleSidebarButton.addEventListener('change', toggleSidebarVisibility);
  toggleSidebarButton.classList.add(
    'mds-grid-md-col-4',
    'mds-grid-md-col-span-3',
    'mds-grid-sm-col-4',
    'mds-grid-sm-col-span-3',
    'mds-grid-xs-col-2',
  );
  grid.appendChild(toggleSidebarButton);

  // add button to toggle footer
  toggleFooterButton = document.createElement('mc-switch');
  toggleFooterButton.label = 'Footer';
  toggleFooterButton.fit = 'small';
  toggleFooterButton.checked = showFooter;
  toggleFooterButton.addEventListener('change', toggleFooterVisibility);
  toggleFooterButton.classList.add(
    'mds-grid-md-col-7',
    'mds-grid-md-col-span-3',
    'mds-grid-sm-col-1',
    'mds-grid-sm-col-span-3',
    'mds-grid-xs-col-1',
  );
  grid.appendChild(toggleFooterButton);

  // add button to toggle sticky footer
  if (showFooter) {
    toggleStickyFooterButton = document.createElement('mc-switch');
    toggleStickyFooterButton.label = 'Sticky footer';
    toggleStickyFooterButton.fit = 'small';
    toggleStickyFooterButton.checked = showStickyFooter;
    toggleStickyFooterButton.addEventListener('change', toggleStickyFooterVisibility);
    toggleStickyFooterButton.classList.add(
      'mds-grid-md-col-10',
      'mds-grid-md-col-span-3',
      'mds-grid-sm-col-4',
      'mds-grid-sm-col-span-3',
      'mds-grid-xs-col-2',
    );
    grid.appendChild(toggleStickyFooterButton);
  }

  Array.from({ length: 49 }, (_, i) => {
    const cell = document.createElement('div');
    if (i === 0) {
      cell.classList.add(
        'cell',
        'cell-with-nested-grid',
        'mds-grid-md-col-span-12',
        'mds-grid-sm-col-span-6',
        'mds-grid-xs-col-span-2',
      );
      cell.innerHTML = `
        <div class="mds-grid">
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">3</div>
            <div class="cell">4</div>
            <div class="cell">5</div>
            <div class="cell">6</div>
            <div class="cell">7</div>
            <div class="cell">8</div>
            <div class="cell">9</div>
            <div class="cell">10</div>
            <div class="cell">11</div>
            <div class="cell">12</div>
        </div>`;
    } else {
      cell.textContent = `${i + 1}`;
      cell.classList.add('cell');
    }
    grid.appendChild(cell);
  });

  createFooter();

  layout?.appendChild(layoutWrapper);

  // code preview
  codePreview = document.createElement('mc-c-code-preview');
  codePreview.fit = 'small';
  updateCodePreview();
  codePreview.classList.add('mds-grid-md-col-span-12', 'mds-grid-sm-col-span-6', 'mds-grid-xs-col-span-2');
  grid.appendChild(codePreview);
};

// Sidebar
const createSideBar = () => {
  // side bar
  if (layoutWrapper) {
    sideBar = document.createElement('mc-side-bar');
    sideBar.innerHTML = `
    <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
      <ul>
        <li>
          <details open>
              <summary>Item 1</summary>
              <ul>
                <li>
                  <details>
                    <summary>Sub Item 1</summary>
                    <ul>
                      <li>
                        <a href="#">Item 1.1.1</a>
                      </li>
                      <li>
                        <a href="#">Item 1.1.2</a>
                      </li>
                      <li>
                        <a href="#">Item 1.1.3</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <a href="#" class="mds-tree-nav__active" aria-current="page">Sub Item 2</a>
                </li>
                <li>
                  <a href="#">Sub Item 3</a>
                </li>
              </ul>
            </details>
        </li>
        <li>
          <a href="#">Item 2</a>
        </li>
        <li class="mds-tree-nav--separator"></li>
        <li>
          <a href="#" class="mds-tree-nav__external">External link</a>
        </li>
      </ul>
    </nav>`;
    layoutWrapper.appendChild(sideBar);
    layoutWrapper.classList.remove('mds-layout-no-side-bar');
  }
};
const removeSideBar = () => {
  if (sideBar && layoutWrapper) {
    sideBar.remove();
    layoutWrapper.classList.add('mds-layout-no-side-bar');
  }
};

// Footer
const createFooter = () => {
  footer = document.createElement('footer');
  footer.textContent = 'Footer';
  footer.id = 'footer';
  if (showFooter && main && layoutWrapper) {
    if (showStickyFooter) {
      footer.classList.add('mds-footer');
      layoutWrapper.appendChild(footer);
    } else {
      main.appendChild(footer);
    }
  }
};
const removeFooter = () => {
  if (footer) {
    footer.remove();
  }
};

// Code Preview
const generateCodePreview = () => {
  return `import "@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css";
import "@maersk-global/mds-foundations/css/foundations.css";
import "@maersk-global/mds-components-core-top-bar";${showSideBar ? '\nimport "@maersk-global/mds-components-core-side-bar";' : ''}

<body class="mds">
  <a href="#main-content" class="mds-skip-to">Skip to content</a>
  <a href="#footer" class="mds-skip-to">Skip to footer</a>
  <div class="mds-layout${showSideBar ? '' : ' mds-layout-no-side-bar'}">
    <mc-top-bar product="Maersk Design System" productshort="MDS"></mc-top-bar>${
      showSideBar
        ? `\n    <mc-side-bar>
      <nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
        <ul>
          <li>
            <details open>
                <summary>Item 1</summary>
                <ul>
                  <li>
                    <details>
                      <summary>Sub Item 1</summary>
                      <ul>
                        <li>
                          <a href="#">Item 1.1.1</a>
                        </li>
                        <li>
                          <a href="#">Item 1.1.2</a>
                        </li>
                        <li>
                          <a href="#">Item 1.1.3</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <a href="#" class="mds-tree-nav__active" aria-current="page">Sub Item 2</a>
                  </li>
                  <li>
                    <a href="#">Sub Item 3</a>
                  </li>
                </ul>
              </details>
          </li>
          <li>
            <a href="#">Item 2</a>
          </li>
          <li class="mds-tree-nav--separator"></li>
          <li>
            <a href="#" class="mds-tree-nav__external">External link</a>
          </li>
        </ul>
      </nav>
    </mc-side-bar>`
        : ''
    }
    <main id="main-content" class="mds-page mds-container">
      <div class="mds-grid${showFullWidthGrid ? ' mds-full-width' : ''}">
        <div class="cell">1</div>
        <div class="cell">2</div>
        <div class="cell">3</div>
        <div class="cell">4</div>
        <div class="cell">5</div>
        <div class="cell">6</div>
        <div class="cell">7</div>
        <div class="cell">8</div>
        <div class="cell">9</div>
        <div class="cell">10</div>
        <div class="cell">11</div>
        <div class="cell">12</div>
      </div>${showFooter && !showStickyFooter ? '\n      <footer id="footer">Footer</footer>' : ''}
    </main>${showFooter && showStickyFooter ? '\n    <footer id="footer" class="mds-footer">Footer</footer>' : ''}
  </div>
</body>`;
};
const updateCodePreview = () => {
  if (codePreview) {
    codePreview.code = [{ label: 'HTML/JS', template: generateCodePreview(), language: 'javascript' }];
  }
};
