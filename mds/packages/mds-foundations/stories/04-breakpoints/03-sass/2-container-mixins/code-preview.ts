import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

export const markup = `<section style="container-type: inline-size;">
  <div class="box">
    Adjust the size of the viewport to observe how media queries activate and change the background color according to the container size.
  </div>
</section>
`;

const css = `.box {
  border-radius: var(--mds_brand_border_medium_radius);
  min-width: var(--mds_global_breakpoint_xs_min-width);
  padding: 10px 16px;

  // default styling for the box for desktop view
  background-color: var(--mds_brand_appearance_success_weak_background-color);
  color: var(--mds_brand_appearance_success_weak_on-background-color);

  // mobile view
  @include mds-container-below('sm') {
    background-color: var(--mds_brand_appearance_neutral_weak_background-color);
    color: var(--mds_brand_appearance_neutral_weak_on-background-color);
  }

  // tablet view
  @include mds-container-below('md') {
    background-color: var(--mds_brand_appearance_info_weak_background-color);
    color: var(--mds_brand_appearance_info_weak_on-background-color);
  }
}`;

export const preview = [
  {
    label: 'SASS',
    template: css,
    language: 'html',
  } as IMcCCode,
  {
    label: 'HTML',
    template: markup,
    language: 'html',
  } as IMcCCode,
];
