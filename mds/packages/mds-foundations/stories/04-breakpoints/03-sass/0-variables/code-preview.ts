import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

const css = `.box {
  min-width: $mds_breakpoint_xs_min-width;
}`;

export const preview = [
  {
    label: 'SASS',
    template: css,
    language: 'html',
  } as IMcCCode,
];
