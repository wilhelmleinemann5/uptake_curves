export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JS
import "@maersk-global/mds-components-core-badge";
import "@maersk-global/mds-foundations/css/foundations.css";

// HTML - with tree navigation
<nav class="mds-tree-nav" role="navigation" aria-label="side navigation">
  <ul>
    <li>
      <details open>
        <summary>
          Item 1 (level 1) <mc-badge slot="badge" position="left" variant="dot" display="inline"></mc-badge>
        </summary>
        <ul>
          <li>
            <a href="#">Sub Item 3</a>
          </li>
          <li>
            <a href="#" class="mds-tree-nav__active" aria-current="page"
              >Sub Item 2 <mc-badge slot="badge" position="right" display="inline" label="3"></mc-badge
            ></a>
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
      <a href="#" class="mds-tree-nav__external"
        >External link
        <mc-badge slot="badge" appearance="info" position="left" display="inline" label="New"></mc-badge
      ></a>
    </li>
  </ul>
</nav>`,
    language: 'html',
    copy: true,
  },
];
