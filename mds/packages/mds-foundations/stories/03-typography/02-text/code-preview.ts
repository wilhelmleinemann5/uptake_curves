import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';
import { codePreviewSassImports } from '../story-utils';

const sizes = ['large', 'medium', 'small', 'x-small'];
const styles = ['normal', 'medium', 'bold', 'italic', 'mediumitalic', 'bolditalic'];

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `${sizes
        .map((size) =>
          styles.map((style) => `<div class="mds-text--${size}-${style}">mds-text--${size}-${style}</div>`).join('\n'),
        )
        .join('\n')}
`,
    ),
    language: 'javascript',
  },
  {
    label: 'SASS',
    template: `${codePreviewSassImports}
${sizes
  .map((size) =>
    styles
      .map(
        (style) => `.my-app-text-${size}-${style} {
  @include mds-apply-font('text', '${size}', '${style}');
}`,
      )
      .join('\n'),
  )
  .join('\n')}`,
    language: 'html',
  },
];
