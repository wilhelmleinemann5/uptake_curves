import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import '@maersk-global/mds-components-core-icon';
import { codePreviewSassImports } from '../../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div>This is a <a class="mds-link--disabled" aria-disabled href="#">disabled inline link style <mc-icon aria-hidden="true" icon="square-arrow-up-right" size="16" /></a>. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
<div>
  <a aria-disabled href="#" class="mds-link--stand-alone mds-link--disabled">This is a disabled "stand-alone" link style <mc-icon aria-hidden="true" icon="square-arrow-up-right" size="16" /></a>
</div>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.link-disabled {
  @include mds-apply-link-disabled();
}`,
    language: 'html',
  },
];
