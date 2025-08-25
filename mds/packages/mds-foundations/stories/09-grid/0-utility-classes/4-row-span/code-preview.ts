import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-col-1 mds-grid-row-span-to-end">span-to-end</div>
    <div class="mds-grid-row-span-2">span-2</div>
    <div>box</div>
    <div>box</div>
    <div>box</div>
    <div>box</div>
    <div>box</div>
    <div>box</div>
    <div>box</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
