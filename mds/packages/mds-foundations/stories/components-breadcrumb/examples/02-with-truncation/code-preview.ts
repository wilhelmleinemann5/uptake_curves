import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<nav class="mds-breadcrumb" aria-label="breadcrumb example 2">
  <ol>
    <li><a href="#home">Home</a></li>
    <li><a href="#ocean-booking">Ocean Booking</a></li>
    <li class="mds-breadcrumb__long-and-truncated">
      <a href="#data-integrations" title="Data Integrations (Leverage the power of integrated data)"
        >Data Integrations (Leverage the power of integrated data)</a
      >
    </li>
    <li>Current page</li>
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
