import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div class="mds-neutral__background-color mds-neutral__on-background-color">mds-neutral__on-background-color</div>
<div class="mds-neutral--weakest__background-color mds-neutral--weakest__on-background-color">mds-neutral--weakest__on-background-color</div>
<div class="mds-neutral--weak__background-color mds-neutral--weak__on-background-color">mds-neutral--weak__on-background-color</div>
<div class="mds-neutral--strong__background-color mds-neutral--strong__on-background-color">mds-neutral--strong__on-background-color</div>
<div class="mds-neutral--strongest__background-color mds-neutral--strongest__on-background-color">mds-neutral--strongest__on-background-color</div>
<div class="mds-neutral--inverse__background-color mds-neutral--inverse__on-background-color">mds-neutral--inverse__on-background-color</div>
<div class="mds-primary__background-color mds-primary__on-background-color">mds-primary__on-background-color</div>
<div class="mds-primary--weak__background-color mds-primary--weak__on-background-color">mds-primary--weak__on-background-color</div>
<div class="mds-secondary__background-color mds-secondary__on-background-color">mds-secondary__on-background-color</div>
<div class="mds-secondary--weak__background-color mds-secondary--weak__on-background-color">mds-secondary--weak__on-background-color</div>
<div class="mds-error__background-color mds-error__on-background-color">mds-error__on-background-color</div>
<div class="mds-error--weak__background-color mds-error--weak__on-background-color">mds-error--weak__on-background-color</div>
<div class="mds-warning__background-color mds-warning__on-background-color">mds-warning__on-background-color</div>
<div class="mds-warning--weak__background-color mds-warning--weak__on-background-color">mds-warning--weak__on-background-color</div>
<div class="mds-success__background-color mds-success__on-background-color">mds-success__on-background-color</div>
<div class="mds-success--weak__background-color mds-success--weak__on-background-color">mds-success--weak__on-background-color</div>
<div class="mds-info__background-color mds-info__on-background-color">mds-info__on-background-color</div>
<div class="mds-info--weak__background-color mds-info--weak__on-background-color">mds-info--weak__on-background-color</div>`,
    ),
    language: 'html',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.my-app-neutral-default-on-background {
  @include mds-generate-color-properties('neutral', 'default', 'on-background');
}
.my-app-neutral-weakest-on-background {
  @include mds-generate-color-properties('neutral', 'weakest', 'on-background');
}
.my-app-neutral-weak-on-background {
  @include mds-generate-color-properties('neutral', 'weak', 'on-background');
}
.my-app-neutral-strong-on-background {
  @include mds-generate-color-properties('neutral', 'strong', 'on-background');
}
.my-app-neutral-strongest-on-background {
  @include mds-generate-color-properties('neutral', 'strongest', 'on-background');
}
.my-app-neutral-inverse-on-background {
  @include mds-generate-color-properties('neutral', 'inverse', 'on-background');
}
.my-app-primary-default-on-background {
  @include mds-generate-color-properties('primary', 'default', 'on-background');
}
.my-app-primary-weak-on-background {
  @include mds-generate-color-properties('primary', 'weak', 'on-background');
}
.my-app-secondary-default-on-background {
  @include mds-generate-color-properties('secondary', 'default', 'on-background');
}
.my-app-secondary-weak-on-background {
  @include mds-generate-color-properties('secondary', 'weak', 'on-background');
}
.my-app-error-default-on-background {
  @include mds-generate-color-properties('error', 'default', 'on-background');
}
.my-app-error-weak-on-background {
  @include mds-generate-color-properties('error', 'weak', 'on-background');
}
.my-app-warning-on-background {
  @include mds-generate-color-properties('warning', 'default', 'on-background');
}
.my-app-warning-weak-on-background {
  @include mds-generate-color-properties('warning', 'weak', 'on-background');
}
.my-app-success-default-on-background {
  @include mds-generate-color-properties('success', 'default', 'on-background');
}
.my-app-success-weak-on-background {
  @include mds-generate-color-properties('success', 'weak', 'on-background');
}
.my-app-info-default-on-background {
  @include mds-generate-color-properties('info', 'default', 'on-background');
}
.my-app-info-weak-on-background {
  @include mds-generate-color-properties('info', 'weak', 'on-background');
}`,
    language: 'html',
  },
];
