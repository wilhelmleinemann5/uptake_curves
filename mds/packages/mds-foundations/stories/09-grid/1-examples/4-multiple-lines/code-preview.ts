import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-col-1 mds-grid-col-span-to-end mds-grid-row-1">row-1</div>
    <div>box</div>
    <div class="mds-grid-col-1 mds-grid-col-span-to-end mds-grid-row-3">row-3</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
