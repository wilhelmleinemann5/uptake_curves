import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div class="mds-neutral__background-color mds-neutral__on-background-color">mds-neutral__background-color</div>
<div class="mds-neutral--weakest__background-color mds-neutral--weakest__on-background-color">mds-neutral--weakest__background-color</div>
<div class="mds-neutral--weak__background-color mds-neutral--weak__on-background-color">mds-neutral--weak__background-color</div>
<div class="mds-neutral--strong__background-color mds-neutral--strong__on-background-color">mds-neutral--strong__background-color</div>
<div class="mds-neutral--strongest__background-color mds-neutral--strongest__on-background-color">mds-neutral--strongest__background-color</div>
<div class="mds-neutral--inverse__background-color mds-neutral--inverse__on-background-color">mds-neutral--inverse__background-color</div>
<div class="mds-primary__background-color mds-primary__on-background-color">mds-primary__background-color</div>
<div class="mds-primary--weak__background-color mds-primary--weak__on-background-color">mds-primary--weak__background-color</div>
<div class="mds-secondary__background-color mds-secondary__on-background-color">mds-secondary__background-color</div>
<div class="mds-secondary--weak__background-color mds-secondary--weak__on-background-color">mds-secondary--weak__background-color</div>
<div class="mds-error__background-color mds-error__on-background-color">mds-error__background-color</div>
<div class="mds-error--weak__background-color mds-error--weak__on-background-color">mds-error--weak__background-color</div>
<div class="mds-warning__background-color mds-warning__on-background-color">mds-warning__background-color</div>
<div class="mds-warning--weak__background-color mds-warning--weak__on-background-color">mds-warning--weak__background-color</div>
<div class="mds-success__background-color mds-success__on-background-color">mds-success__background-color</div>
<div class="mds-success--weak__background-color mds-success--weak__on-background-color">mds-success--weak__background-color</div>
<div class="mds-info__background-color mds-info__on-background-color">mds-info__background-color</div>
<div class="mds-info--weak__background-color mds-info--weak__on-background-color">mds-info--weak__background-color</div>`,
    ),
    language: 'html',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-neutral-default-background {
  @include mds-generate-color-properties('neutral', 'default', 'background');
}
.my-app-neutral-weakest-background {
  @include mds-generate-color-properties('neutral', 'weakest', 'background');
}
.my-app-neutral-weak-background {
  @include mds-generate-color-properties('neutral', 'weak', 'background');
}
.my-app-neutral-strong-background {
  @include mds-generate-color-properties('neutral', 'strong', 'background');
}
.my-app-neutral-strongest-background {
  @include mds-generate-color-properties('neutral', 'strongest', 'background');
}
.my-app-neutral-inverse-background {
  @include mds-generate-color-properties('neutral', 'inverse', 'background');
}
.my-app-primary-default-background {
  @include mds-generate-color-properties('primary', 'default', 'background');
}
.my-app-primary-weak-background {
  @include mds-generate-color-properties('primary', 'weak', 'background');
}
.my-app-secondary-default-background {
  @include mds-generate-color-properties('secondary', 'default', 'background');
}
.my-app-secondary-weak-background {
  @include mds-generate-color-properties('secondary', 'weak', 'background');
}
.my-app-error-default-background {
  @include mds-generate-color-properties('error', 'default', 'background');
}
.my-app-error-weak-background {
  @include mds-generate-color-properties('error', 'weak', 'background');
}
.my-app-warning-background {
  @include mds-generate-color-properties('warning', 'default', 'background');
}
.my-app-warning-weak-background {
  @include mds-generate-color-properties('warning', 'weak', 'background');
}
.my-app-success-default-background {
  @include mds-generate-color-properties('success', 'default', 'background');
}
.my-app-success-weak-background {
  @include mds-generate-color-properties('success', 'weak', 'background');
}
.my-app-info-default-background {
  @include mds-generate-color-properties('info', 'default', 'background');
}
.my-app-info-weak-background {
  @include mds-generate-color-properties('info', 'weak', 'background');
}`,
    language: 'html',
  },
];
