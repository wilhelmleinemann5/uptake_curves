import { IMcCCode } from '@maersk-global/community-ui-code-preview/src/lib/types';

const cells = Array.from({ length: 12 });

export const template = `<link rel="stylesheet" href="@maersk-global/mds-foundations/css/foundations.css">

<style>
  .box {
    background-color: var(--mds_brand_appearance_success_default_background-color);
    color: var(--mds_brand_appearance_success_default_on-background-color);
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="mds-container">
  <h5 style="margin: 24px 0 12px 0;">.mds-flex</h5>
  <div class="mds-flex mds-gap-200">
    <div class="box" style="width: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px;">3</div>
  </div>

  <h5 style="margin: 24px 0 12px 0;">.mds-flex .mds-flex-items-start</h5>
  <div class="mds-flex mds-flex-items-start mds-gap-200">
    <div class="box" style="width: 100px; height: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px; height: 100px;">3</div>
  </div>

  <h5 style="margin: 24px 0 12px 0;">.mds-flex .mds-flex-items-center</h5>
  <div class="mds-flex mds-flex-items-center mds-gap-200">
    <div class="box" style="width: 100px; height: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px; height: 100px;">3</div>
  </div>

  <h5 style="margin: 24px 0 12px 0;">.mds-flex .mds-flex-items-end</h5>
  <div class="mds-flex mds-flex-items-end mds-gap-200">
    <div class="box" style="width: 100px; height: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px; height: 100px;">3</div>
  </div>
 
  <h5 style="margin: 24px 0 12px 0;">.mds-flex .mds-flex-items-baseline</h5>
  <div class="mds-flex mds-flex-items-baseline mds-gap-200">
    <div class="box" style="width: 100px; height: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px; height: 100px;">3</div>
  </div>

  <h5 style="margin: 24px 0 12px 0;">.mds-flex .mds-flex-items-stretch</h5>
  <div class="mds-flex mds-flex-items-stretch mds-gap-200" style="height: 200px;">
    <div class="box" style="width: 100px;">1</div>
    <div class="box" style="width: 200px;">2</div>
    <div class="box" style="width: 100px;">3</div>
  </div>

</div>`;

export const preview = [
  {
    label: 'HTML',
    template: template,
    language: 'javascript',
  } as IMcCCode,
];
