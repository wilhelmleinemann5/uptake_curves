import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div class="mds-neutral__text-color">mds-neutral__text-color</div>
<div class="mds-neutral--weakest__text-color">mds-neutral--weakest__text-color</div>
<div class="mds-neutral--weak__text-color">mds-neutral--weak__text-color</div>
<div class="mds-neutral--inverse__background-color mds-neutral--inverse__text-color">mds-neutral--inverse__text-color</div>
<div class="mds-primary__text-color">mds-primary__text-color</div>
<div class="mds-secondary__text-color">mds-secondary__text-color</div>
<div class="mds-error__text-color">mds-error__text-color</div>
<div class="mds-warning__text-color">mds-warning__text-color</div>
<div class="mds-success__text-color">mds-success__text-color</div>
<div class="mds-info__text-color">mds-info__text-color</div>`,
    ),
    language: 'html',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-neutral-default-color {
  @include mds-generate-color-properties('neutral', 'default', 'text');
}
.my-app-neutral-weakest-color {
  @include mds-generate-color-properties('neutral', 'weakest', 'text');
}
.my-app-neutral-weak-color {
  @include mds-generate-color-properties('neutral', 'weak', 'text');
}
.my-app-neutral-inverse-color {
  @include mds-generate-color-properties('neutral', 'inverse', 'text');
}
.my-app-primary-default-color {
  @include mds-generate-color-properties('primary', 'default', 'text');
}
.my-app-secondary-default-color {
  @include mds-generate-color-properties('secondary', 'default', 'text');
}
.my-app-error-default-color {
  @include mds-generate-color-properties('error', 'default', 'text');
}
.my-app-warning-default-color {
  @include mds-generate-color-properties('warning', 'default', 'text');
}
.my-app-success-default-color {
  @include mds-generate-color-properties('success', 'default', 'text');
}
.my-app-info-default-color {
  @include mds-generate-color-properties('info', 'default', 'text');
}`,
    language: 'html',
  },
];
