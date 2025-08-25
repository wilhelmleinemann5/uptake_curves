import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div class="mds-headline--x-large">mds-headline--x-large</div>
<div class="mds-headline--large">mds-headline--large</div>
<div class="mds-headline--medium">mds-headline--medium</div>
<div class="mds-headline--small">mds-headline--small</div>
<div class="mds-headline--x-small">mds-headline--x-small</div>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-headline-x-large {
  @include mds-apply-font('headline', 'x-large');
}
.my-app-headline-large {
  @include mds-apply-font('headline', 'large');
}
.my-app-headline-medium {
  @include mds-apply-font('headline', 'medium');
}
.my-app-headline-small {
  @include mds-apply-font('headline', 'small');
}
.my-app-headline-x-small {
  @include mds-apply-font('headline', 'x-small');
}`,
    language: 'html',
  },
];
