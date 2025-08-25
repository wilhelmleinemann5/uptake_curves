import { html } from 'lit';
import { docsGenerator } from './docs-generator';

export default {
  title: 'Themes & tokens/Documentation',
  parameters: {
    preview: { disable: true },
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
};

export const DesignTokensAndCSSVariables = () => html`
  <div class="mds-content">
    All available design tokens and CSS variables are listed and documented on our website:
    <ul>
      <li><a href="https://designsystem.maersk.com/themes/global-tokens/" target="_blank">Global tokens</a></li>
      <li><a href="https://designsystem.maersk.com/themes/density-tokens/" target="_blank">Density tokens</a></li>
      <li>
        <a href="https://designsystem.maersk.com/themes/maersk/brand-tokens/" target="_blank">Maersk tokens</a> &
        <a href="https://designsystem.maersk.com/themes/apm-terminals/brand-tokens/" target="_blank">APM Terminals</a>
      </li>
    </ul>
  </div>
`;
