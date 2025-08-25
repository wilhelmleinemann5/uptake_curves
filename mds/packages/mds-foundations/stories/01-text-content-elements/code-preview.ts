import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p>This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>This is another paragraph. Montes nascetur ridiculus mus mauris. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar.</p>
<hr />
<p><strong>Strong</strong> and <em>Emphasise</em>.</p>
<ol>
  <li>Apple</li>
  <li>Orange</li>
  <li>Lemon</li>
</ol>
<ul>
  <li>Apple</li>
  <li>Orange</li>
  <li>Lemon</li>
</ul>
<ol class="mds-list--horizontal">
  <li>Apple</li>
  <li>Orange</li>
  <li>Lemon</li>
</ol>
<ul class="mds-list--horizontal">
  <li>Apple</li>
  <li>Orange</li>
  <li>Lemon</li>
</ul>
<nav role="navigation" title="${isMDSContent ? 'navigation mds-content' : 'navigation mds'}">
  <ol class="mds-list--horizontal">
    <li>
      <a href="https://designsystem.maersk.com" target="_blank" rel="noreferrer">Apple</a>
    </li>
    <li>
      <a href="https://designsystem.maersk.com" target="_blank" rel="noreferrer">Orange</a>
    </li>
    <li>
      <a href="https://designsystem.maersk.com" target="_blank" rel="noreferrer">Lemon</a>
    </li>
  </ol>
</nav>
`,
    ),
    language: 'html',
  },
];
