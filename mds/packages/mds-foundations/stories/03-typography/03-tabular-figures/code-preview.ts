import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<h4>Text proportional (default) vs monospaced</h4>
<div>1234567890<div>
<div class="mds-tabular-figures">1234567890</div>
<div class="mds-tabular-figures mds-numeric">1234567890</div>
<hr />
<h4>Headline proportional (default) vs monospaced</h4>
<div class="mds-headline--x-small">1234567890<div>
<div class="mds-headline--x-small mds-tabular-figures">1234567890<div>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-numeric {
  @include mds-apply-numeric();
}
.my-app-tabular-figures {
  @include mds-apply-tabular-figures();
}`,
    language: 'html',
  },
];
