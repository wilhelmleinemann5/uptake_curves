export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-side-bar";
import "@maersk-global/mds-components-core-card";
// CSS
<style>
  nav {
    flex-grow: 1;
  }
</style>
// HTML
<mc-side-bar>
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
  <mc-card 
    heading="Supply Chain and Logistics"
    subheading="Integrated logistics"
    variant="borderless">
    We focus on solving your supply chain needs from end to end, taking the complexity out of container shipping for you.
  </mc-card>
</mc-side-bar>`,
    language: 'javascript',
    copy: true,
  },
];
