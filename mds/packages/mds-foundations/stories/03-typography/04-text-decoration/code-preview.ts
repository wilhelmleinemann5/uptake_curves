import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(isPreview, isMDSContent, `<div class="mds-underline--dotted">mds-underline--dotted</div>`),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-dotted {
  @include mds-apply-underline-dotted();
}`,
    language: 'html',
  },
];
