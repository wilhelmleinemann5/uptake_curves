import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-row-1 mds-grid-col-1 mds-grid-md-col-10 mds-grid-col-span-to-end">box</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
