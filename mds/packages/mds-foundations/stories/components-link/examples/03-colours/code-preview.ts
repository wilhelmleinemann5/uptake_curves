import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewColorSassImports } from '../../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<a class="mds-neutral__text-color" href="#">This is using colour class mds-neutral__text-color</a>
<a class="mds-neutral--weakest__text-color" href="#">This is using colour class mds-neutral--weakest__text-color</a>
<a class="mds-neutral--weak__text-color" href="#">This is using colour class mds-neutral--weak__text-color</a>
<a class="mds-neutral--inverse__text-color" style="background: var(--mds_brand_appearance_neutral_inverse_background-color)" href="#">This is using colour class mds-neutral--inverse__text-color</a>
<a class="mds-primary__text-color" href="#">This is using colour class mds-primary__text-color</a>
<a class="mds-secondary__text-color" href="#">This is using colour class mds-secondary__text-color</a>
<a class="mds-info__text-color" href="#">This is using colour class mds-info__text-color</a>
<a class="mds-error__text-color" href="#">This is using colour class mds-error__text-color</a>
<a class="mds-warning__text-color" href="#">This is using colour class mds-warning__text-color</a>
<a class="mds-success__text-color" href="#">This is using colour class mds-success__text-color</a>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewColorSassImports}
.link-neutral-default-color {
  @include mds-apply-link();
  @include generate-color-properties('neutral', 'default', 'text');
}
.link-neutral-weakest-color {
  @include mds-apply-link();
  @include generate-color-properties('neutral', 'weakest', 'text');
}
.link-neutral-weak-color {
  @include mds-apply-link();
  @include generate-color-properties('neutral', 'weak', 'text');
}
.link-neutral-inverse-color {
  @include mds-apply-link();
  @include generate-color-properties('neutral', 'inverse', 'text');
}
.link-primary-default-color {
  @include mds-apply-link();
  @include generate-color-properties('primary', 'default', 'text');
}
.link-secondary-default-color {
  @include mds-apply-link();
  @include generate-color-properties('secondary', 'default', 'text');
}
.link-error-default-color {
  @include mds-apply-link();
  @include generate-color-properties('error', 'default', 'text');
}
.link-warning-default-color {
  @include mds-apply-link();
  @include generate-color-properties('warning', 'default', 'text');
}
.link-success-default-color {
  @include mds-apply-link();
  @include generate-color-properties('success', 'default', 'text');
}
.link-info-default-color {
  @include mds-apply-link();
  @include generate-color-properties('info', 'default', 'text');
}`,
    language: 'html',
  },
];
