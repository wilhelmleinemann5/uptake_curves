import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div class="mds-grid-xs-col-1 mds-grid-sm-col-1 mds-grid-sm-col-span-2">Start</div>
    <div class="mds-grid-xs-col-2 mds-grid-sm-col-2-reverse mds-grid-sm-col-span-2">End</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
