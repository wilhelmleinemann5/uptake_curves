import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { codePreviewImports } from './story-utils';
import { templateCode } from './story-utils';

const cells = Array.from({ length: 12 });

export const example = cells
  .map((_, item) => {
    return `<div>${item + 1}</div>${item + 1 === cells.length ? '' : '\n    '}`;
  })
  .join('');

export const preview = (args) => [
  {
    label: 'HTML',
    template: `${codePreviewImports}${templateCode(example, args)}`,
    language: 'javascript',
  } as IMcCCode,
];
