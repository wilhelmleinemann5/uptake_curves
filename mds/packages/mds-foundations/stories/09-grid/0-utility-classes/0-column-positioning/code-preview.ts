import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-xs-col-1 mds-grid-sm-col-3">box</div>
    <div class="mds-grid-xs-col-2 mds-grid-sm-col-5">box</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
