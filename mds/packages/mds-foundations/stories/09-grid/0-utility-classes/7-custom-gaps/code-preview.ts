import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from '../../story-utils';
import { templateCode } from '../../story-utils';

const cells = Array.from({ length: 12 });
export const gridCssClasses = 'mds-gap-50 mds-xs-gap-1600';
export const example = cells
  .map((_, item) => {
    return `  <div>${item + 1}</div>${item + 1 === cells.length ? '' : '\n    '}`;
  })
  .join('');

export const preview = [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example, null, gridCssClasses)}`,
    language: 'javascript',
  } as IMcCCode,
];
