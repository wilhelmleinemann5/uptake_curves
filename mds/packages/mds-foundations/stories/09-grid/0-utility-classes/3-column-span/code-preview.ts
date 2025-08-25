import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-col-2 mds-grid-col-span-to-end">span-to-end</div>
    <div class="mds-grid-col-1-reverse mds-grid-col-span-to-start">span-to-start</div>
    <div class="mds-grid-col-1 mds-grid-col-span-2">span-2</div>
    <div class="mds-grid-col-2-reverse mds-grid-col-span-2">span-2</div>
    <div class="mds-grid-sm-col-span-4 mds-grid-md-col-span-9">box</div>
    <div class="mds-grid-sm-col-span-2 mds-grid-md-col-span-3">box</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
