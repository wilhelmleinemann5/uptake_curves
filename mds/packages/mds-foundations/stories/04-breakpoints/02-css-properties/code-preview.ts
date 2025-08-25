import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

const css = `.box {
  min-width: var(--mds_global_breakpoint_sm_min-width);
  padding: 0;
}

@media only screen and (min-width: 641px) {
  .box {
    background-color: var(--mds_brand_appearance_info_weak_background-color); 
    color: var(--mds_brand_appearance_info_weak_on-background-color); 
  }
}`;

export const preview = [
  {
    label: 'CSS',
    template: css,
    language: 'html',
  } as IMcCCode,
];
