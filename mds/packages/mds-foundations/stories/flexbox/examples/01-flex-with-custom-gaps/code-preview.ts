import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

const cells = Array.from({ length: 12 });

export const template = `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

<style>
  .box {
    background-color: var(--mds_brand_appearance_success_default_background-color);
    color: var(--mds_brand_appearance_success_default_on-background-color);
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="mds-container">
  <div class="mds-flex mds-gap-50 mds-xs-gap-1600">
  ${cells
    .map((_, item) => {
      const randomWidth = Math.floor(Math.random() * 26) * 10 + 50;
      return `  <div class="box" style="width: ${randomWidth}px">${item + 1}</div>${item + 1 === cells.length ? '' : '\n  '}`;
    })
    .join('')}
  </div>
</div>`;

export const preview = [
  {
    label: 'HTML',
    template: template,
    language: 'javascript',
  } as IMcCCode,
];
