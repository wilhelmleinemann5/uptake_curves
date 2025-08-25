import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const template = (args?: Record<string, string>): string => {
  return `<nav class="mds-breadcrumb${args && args['variant'] === 'collapsed' ? ` mds-breadcrumb__collapsed` : ''}" aria-label="${args ? args['aria-label'] : 'breadcrumb'}">
  <ol>
    <li><a href="#home">Home</a></li>
    <li><a href="#digital-solutions">Digital Solutions</a></li>
    <li><a href="#data-integrations">Data Integrations</a></li>
    <li><a href="#ocean-booking">Ocean Booking</a></li>
    <li>Current page</li>
  </ol>
</nav>
`;
};

export const preview = (args?: Record<string, string>) => [
  {
    label: 'HTML',
    template: `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

${template(args)}`,
    language: 'javascript',
  } as IMcCCode,
];
