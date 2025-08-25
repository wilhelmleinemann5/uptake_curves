import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `<nav class="mds-tree-nav" role="navigation" aria-label="side navigation with icons">
  <ul>
    <li>
      <details open>
          <summary><mc-icon icon="star" size="20"></mc-icon>Item 1</summary>
          <ul>
            <li>
              <details>
                <summary><mc-icon icon="heart" size="20"></mc-icon>Sub Item 1</summary>
                <ul>
                  <li>
                    <a href="#"><mc-icon icon="bell" size="20"></mc-icon>Sub sub Item 1</a>
                  </li>
                  <li>
                    <a href="#"><mc-icon icon="apple" size="20"></mc-icon>Sub sub Item 2</a>
                  </li>
                  <li>
                    <a href="#"><mc-icon icon="clock" size="20"></mc-icon>Sub sub Item 3</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a href="#" class="mds-tree-nav__active" aria-current="page"><mc-icon icon="box" size="20"></mc-icon>Sub Item 2</a>
            </li>
            <li>
              <a href="#"><mc-icon icon="camera" size="20"></mc-icon>Sub Item 3</a>
            </li>
          </ul>
        </details>
    </li>
    <li>
      <a href="#"><mc-icon icon="clock" size="20"></mc-icon>Item 2</a>
    </li>
    <li class="mds-tree-nav--separator"></li>
    <li>
      <a href="#" class="mds-tree-nav__external"><mc-icon icon="cog" size="20"></mc-icon>External link</a>
    </li>
  </ul>
</nav>`;

export const preview = () => [
  {
    label: 'HTML',
    template: `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

${template}`,
    language: 'javascript',
  } as IMcCCode,
];
