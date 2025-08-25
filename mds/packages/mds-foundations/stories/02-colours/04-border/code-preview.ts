import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div class="mds-neutral__border-color">mds-neutral__border-color</div>
<div class="mds-neutral--weak__border-color">mds-neutral--weak__border-color</div>
<div class="mds-neutral--inverse__border-color">mds-neutral--inverse__border-color</div>
<div class="mds-primary__border-color">mds-primary__border-color</div>
<div class="mds-primary--weak__border-color">mds-primary--weak__border-color</div>
<div class="mds-secondary__border-color">mds-secondary__border-color</div>
<div class="mds-secondary--weak__border-color">mds-secondary--weak__border-color</div>
<div class="mds-error__border-color">mds-error__border-color</div>
<div class="mds-error--weak__border-color">mds-error--weak__border-color</div>
<div class="mds-warning__border-color">mds-warning__border-color</div>
<div class="mds-warning--weak__border-color">mds-warning--weak__border-color</div>
<div class="mds-success__border-color">mds-success__border-color</div>
<div class="mds-success--weak__border-color">mds-success--weak__border-color</div>
<div class="mds-info__border-color">mds-info__border-color</div>
<div class="mds-info--weak__border-color">mds-info--weak__border-color</div>`,
    ),
    language: 'html',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-neutral-default-border {
  @include mds-generate-color-properties('neutral', 'default', 'border');
}
.my-app-neutral-weakest-border {
  @include mds-generate-color-properties('neutral', 'weakest', 'border');
}
.my-app-neutral-weak-border {
  @include mds-generate-color-properties('neutral', 'weak', 'border');
}
.my-app-neutral-strong-border {
  @include mds-generate-color-properties('neutral', 'strong', 'border');
}
.my-app-neutral-strongest-border {
  @include mds-generate-color-properties('neutral', 'strongest', 'border');
}
.my-app-neutral-inverse-border {
  @include mds-generate-color-properties('neutral', 'inverse', 'border');
}
.my-app-primary-default-border {
  @include mds-generate-color-properties('primary', 'default', 'border');
}
.my-app-primary-weak-border {
  @include mds-generate-color-properties('primary', 'weak', 'border');
}
.my-app-secondary-default-border {
  @include mds-generate-color-properties('secondary', 'default', 'border');
}
.my-app-secondary-weak-border {
  @include mds-generate-color-properties('secondary', 'weak', 'border');
}
.my-app-error-default-border {
  @include mds-generate-color-properties('error', 'default', 'border');
}
.my-app-error-weak-border {
  @include mds-generate-color-properties('error', 'weak', 'border');
}
.my-app-warning-border {
  @include mds-generate-color-properties('warning', 'default', 'border');
}
.my-app-warning-weak-border {
  @include mds-generate-color-properties('warning', 'weak', 'border');
}
.my-app-success-default-border {
  @include mds-generate-color-properties('success', 'default', 'border');
}
.my-app-success-weak-border {
  @include mds-generate-color-properties('success', 'weak', 'border');
}
.my-app-info-default-border {
  @include mds-generate-color-properties('info', 'default', 'border');
}
.my-app-info-weak-border {
  @include mds-generate-color-properties('info', 'weak', 'border');
}`,
    language: 'html',
  },
];
