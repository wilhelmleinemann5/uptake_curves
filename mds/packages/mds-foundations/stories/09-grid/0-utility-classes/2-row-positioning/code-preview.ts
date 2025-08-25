import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const example = `<div>row-1</div>
    <div class="mds-grid-row-2">row-2</div>
    <div class="mds-grid-row-3 mds-grid-xs-row-1">row-3, xs-row-1</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example)}`,
    language: 'javascript',
  } as IMcCCode,
];
