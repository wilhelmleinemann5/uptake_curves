import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';
import { wrapCSSExample } from '@maersk-global/mds-dev-utils';

export const preview = (isPreview = false, isMDSContent = false): IMcCCode[] => [
  {
    label: 'HTML',
    template: wrapCSSExample(
      isPreview,
      isMDSContent,
      `<div>
  <a href="#">Normal focus shadow</a>
</div>
<div>
  <a href="#" class="mds-link--focus-shadow-inset">Focus shadow inset</a>
</div>`
    ),
    language: 'javascript',
  },
];
