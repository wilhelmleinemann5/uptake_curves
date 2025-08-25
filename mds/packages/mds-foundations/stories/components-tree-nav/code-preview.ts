import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = (args?: Record<string, string>): string => {
  return `<nav class="mds-tree-nav" role="navigation" aria-label="${args ? args['aria-label'] : 'side navigation'}">
  <ul>
    <li>
      <details open>
          <summary>Item 1 (level 1)</summary>
          <ul>
            <li>
              <details>
                <summary>Sub Item 1 (level 2)</summary>
                <ul>
                  <li>
                    <details>
                      <summary>Item 1.1.1 (level 3)</summary>
                      <ul>
                        <li>
                          <details>
                            <summary>Item 1.1.1.1 (level 4)</summary>
                            <ul>
                              <li>
                                <a href="#">Item 1.1.1.1.1 (level 5)</a>
                              </li>
                              <li>
                                <a href="#">Item 1.1.1.1.2</a>
                              </li>
                              <li>
                                <a href="#">Item 1.1.1.1.3</a>
                              </li>
                            </ul>
                          </details>
                        </li>
                        <li>
                          <a href="#">Item 1.1.1.2</a>
                        </li>
                        <li>
                          <a href="#">Item 1.1.1.3</a>
                        </li>
                      </ul>
                    </details>
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
};

export const preview = (args?: Record<string, string>) => [
  {
    label: 'HTML',
    template: `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

${template(args)}`,
    language: 'javascript',
  } as IMcCCode,
];
