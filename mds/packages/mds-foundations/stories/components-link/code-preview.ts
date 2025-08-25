import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from './story-utils';

export const preview = (isPreview = false, isMDSContent = false, appearance = 'default'): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<h4>Inline link style</h4>
<p>Lorem ipsum dolor sit amet, <a href="#"${appearance !== 'default' ? ` class="${appearance}"` : ''}>this is an inline link</a>, sed do eiusmod tempor incididunt ut <a href="#"${appearance !== 'default' ? ` class="${appearance}"` : ''}>another inline link</a> labore et dolore magna aliqua.</p>
<h4 style="margin-top: 24px;">Stand-alone link style</h4>
<a href="#" class="mds-link--stand-alone${appearance !== 'default' ? ` ${appearance}` : ''}">This is a stand-alone link</a>
<a href="#" class="mds-link--stand-alone${appearance !== 'default' ? ` ${appearance}` : ''}">Another stand-alone link</a>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.link-inline {
  @include mds-apply-link();
}
.inline-link-stand-alone {
  @include mds-apply-link-stand-alone();
}`,
    language: 'html',
  },
];
