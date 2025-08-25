import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<nav class="mds-breadcrumb" aria-label="breadcrumb example 3">
  <ol>
    <li>
      <a href="#home" title="Home"><mc-icon size="20" icon="house"></mc-icon></a>
    </li>
    <li><a href="#digital-solutions">Digital Solutions</a></li>
    <li><a href="#data-integrations">Data Integrations</a></li>
    <li><a href="#ocean-booking">Ocean Booking</a></li>
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
