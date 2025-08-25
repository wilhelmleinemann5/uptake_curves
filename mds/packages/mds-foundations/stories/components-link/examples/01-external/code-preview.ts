import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../../story-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `Please visit the 
<a class="mds-link--external" href="https://designsystem.maersk.com" target="_blank" rel="noreferrer" aria-label="Maersk Design System website - link opens in a new tab">
  Maersk Design System website 
</a> 
as an external link example.`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
.link-external {
  @include mds-apply-link-external();
}`,
    language: 'html',
  },
];
