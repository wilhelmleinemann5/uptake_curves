import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<nav class="mds-breadcrumb" aria-label="breadcrumb example 1">
  <ol>
    <li><a href="#home">Home</a></li>
    <li>
      <a href="#data-integrations" title="Data Integrations</a>
    </li>
    <li><a href="#ocean-booking">Ocean Booking</a></li>
    <li class="mds-breadcrumb__long-and-truncated">API (Leverage the power of integrated data)</li>
  </ol>
</nav>`;

export const preview = [
  {
    label: 'HTML',
    template: `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">
${template}`,
    language: 'javascript',
  } as IMcCCode,
];
