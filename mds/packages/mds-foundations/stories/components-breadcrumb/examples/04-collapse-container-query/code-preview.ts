import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = `
<style>
.container {
  max-width: var(--mds_global_breakpoint_xs_max-width);
}
@media only screen and (min-width: 641px) {
  .container {
    max-width: none; 
  }
}
</style>

<div class="container">
  <nav class="mds-breadcrumb" aria-label="breadcrumb example 4">
    <ol>
      <li>
        <a href="#home" title="Home">Home</a>
      </li>
      <li><a href="#digital-solutions">Digital Solutions</a></li>
      <li><a href="#data-integrations">Data Integrations</a></li>
      <li><a href="#ocean-booking">API</a></li>
      <li><a href="#ocean-booking">Booking</a></li>
      <li><a href="#ocean-booking">Ocean Booking</a></li>
      <li>Current page</li>
    </ol>
  </nav>
</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">
${template}`,
    language: 'javascript',
  } as IMcCCode,
];
