import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

export const gridCssClass = 'mds-grid-cols-2';
export const example = `<div>Start</div>
    <div>End</div>`;

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example, null, gridCssClass)}`,
    language: 'javascript',
  } as IMcCCode,
];
