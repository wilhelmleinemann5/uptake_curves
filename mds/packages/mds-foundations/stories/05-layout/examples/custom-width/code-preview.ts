export const preview = [
  {
    label: 'HTML & CSS',
    template: `//CSS
@media only screen and (min-width: 1025px) {
  .mds .mds-layout .mds-page > .mds-grid {
    margin: 24px auto;
    max-width: 1100px;
  }
}    
  
// HTML
<body class="mds">
  <div class="mds-layout">
    <a href="#main-content" class="mds-skip-to">Skip to content</a>
    <a href="#footer" class="mds-skip-to">Skip to footer</a>
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
    <main id="main-content" class="mds-page mds-container">
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
      </div>
    </main>
  </div>
</body>`,
    language: 'html',
    copy: true,
  },
];
