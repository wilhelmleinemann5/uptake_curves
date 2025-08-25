import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';

export const template = (breakpoint: string = '') => `<div class="mds-container ${breakpoint ? breakpoint : ''}">
  <div class="mds-grid">
    <div class="mds-grid-col-1 mds-grid-col-span-2 mds-grid-md-col-span-3 mds-grid-row-1 mds-grid-row-span-3" >box</div>
    <div class="mds-grid-col-3 mds-grid-xs-col-1 mds-grid-md-col-4 mds-grid-col-span-to-end">box</div>
    <div class="mds-grid-col-3 mds-grid-xs-col-1 mds-grid-md-col-4 mds-grid-col-span-to-end">box</div>
    <div class="mds-grid-col-3 mds-grid-xs-col-1 mds-grid-md-col-4 mds-grid-col-span-2 mds-grid-sm-col-span-2">box</div>
    <div class="mds-grid-col-2-reverse mds-grid-col-span-2">box</div>
  </div>
</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${template()}`,
    language: 'javascript',
  } as IMcCCode,
];
