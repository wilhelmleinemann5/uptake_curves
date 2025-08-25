import { html } from 'lit';

export const gridBuilderStyle = html`<style>
  .form.mds-grid {
    align-items: end;
  }
  .form p {
    margin-top: 16px;
  }
  mc-tab-bar p {
    margin-top: 16px;
  }
  mc-number-stepper {
    margin-top: 16px;
  }
  .md {
    min-width: 1025px;
  }
  .sm {
    min-width: 641px;
    max-width: 1024px;
  }
  .xs {
    min-width: 480px;
    max-width: 640px;
  }
  #grid-display-hologram {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      135deg,
      var(--mds_brand_appearance_neutral_weak_background-color) 10%,
      transparent 0,
      transparent 50%,
      var(--mds_brand_appearance_neutral_weak_background-color) 0,
      var(--mds_brand_appearance_neutral_weak_background-color) 60%,
      transparent 0,
      transparent
    );
    background-size: 7.07px 7.07px;
  }
  .grid-item-hologram,
  .grid-item {
    min-height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid transparent;
  }
  .grid-item-hologram {
    cursor: pointer;
    background-color: var(--mds_brand_appearance_neutral_weak_background-color);
    color: var(--mds_brand_appearance_neutral_weak_on-background-color);
  }
  .grid-item-hologram.hover {
    border: 1px solid var(--mds_brand_appearance_success_default_border-color);
  }
  .grid-item-hologram.active {
    background-color: var(--mds_brand_appearance_warning_weak_background-color);
  }
  .grid-item {
    background-color: var(--mds_brand_appearance_success_weak_background-color);
    color: var(--mds_brand_appearance_success_weak_on-background-color);
    position: relative;
    cursor: grab;
    overflow: hidden;
  }
  .grid-item span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .grid-item.active {
    border: 1px solid var(--mds_brand_appearance_success_default_border-color);
  }
  .settings-menu,
  .resize-button {
    position: absolute;
    display: none;
  }
  .grid-item:hover .settings-menu,
  .grid-item:hover .resize-button {
    display: block;
  }
  .settings-menu {
    right: 0;
    top: 0;
  }
  .resize-button {
    right: 0;
    bottom: 0;
    cursor: se-resize;
    width: 12px;
    height: 12px;
    line-height: 12px;
  }
</style>`;
