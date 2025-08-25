import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewTypographySassImports } from '../../story-utils';

const sizes = ['large', 'medium', 'small', 'x-small'];
const styles = ['normal', 'medium', 'bold', 'italic', 'mediumitalic', 'bolditalic'];

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<a class="mds-text--large-normal" href="#">This is a large-normal link</a>
<a class="mds-text--medium-bold" href="#">This is a medium-bold link</a>
<a class="mds-text--medium-italic" href="#">This is a medium-italic link</a>
<a class="mds-text--small-normal" href="#">This is a small-normal link</a>
<a class="mds-text--x-small-bolditalic" href="#">This is a x-small-bolditalic link</a>`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewTypographySassImports}
${sizes
  .map((size) =>
    styles
      .map(
        (style) => `.link-${size}-${style} {
  @include mds-apply-link();
  @include mds-apply-font('text', '${size}', '${style}');
}`,
      )
      .join('\n'),
  )
  .join('\n')}`,
    language: 'html',
  },
];
