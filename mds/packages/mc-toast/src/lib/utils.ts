import { isServer } from 'lit';
import { Position } from './types';

const cssText = `
  .mc-toast-container {
    padding: var(--mds_foundations_toast_padding);
    gap: var(--mds_foundations_toast_gap);
    width: var(--mds_foundations_toast_width);
    min-width: var(--mds_foundations_toast_min-width);
    max-width: var(--mds_foundations_toast_max-width);
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 50;
  }
  @media screen and (max-width: 700px) {
    .mc-toast-container {
      width: 100% !important;
    }
  }
  .mc-toast-container mc-card,
  .mc-toast-container mc-notification {
    border-radius: var(--mds_brand_border_large_radius);
    box-shadow: var(--mds_brand_appearance_shadow_high_first-layer_offset-x) var(--mds_brand_appearance_shadow_high_first-layer_offset-y) var(--mds_brand_appearance_shadow_high_first-layer_blur-radius) var(--mds_brand_appearance_shadow_high_first-layer_spread-radius) var(--mds_brand_appearance_shadow_high_first-layer_color), var(--mds_brand_appearance_shadow_high_second-layer_offset-x) var(--mds_brand_appearance_shadow_high_second-layer_offset-y) var(--mds_brand_appearance_shadow_high_second-layer_blur-radius) var(--mds_brand_appearance_shadow_high_second-layer_spread-radius) var(--mds_brand_appearance_shadow_high_second-layer_color), var(--mds_brand_appearance_shadow_high_third-layer_offset-x) var(--mds_brand_appearance_shadow_high_third-layer_offset-y) var(--mds_brand_appearance_shadow_high_third-layer_blur-radius) var(--mds_brand_appearance_shadow_high_third-layer_spread-radius) var(--mds_brand_appearance_shadow_high_third-layer_color);
  }
  .mc-toast-container mc-notification::part(notification):hover {
    box-shadow: var(--mds_brand_appearance_shadow_high_first-layer_offset-x) var(--mds_brand_appearance_shadow_high_first-layer_offset-y) var(--mds_brand_appearance_shadow_high_first-layer_blur-radius) var(--mds_brand_appearance_shadow_high_first-layer_spread-radius) var(--mds_brand_appearance_shadow_high_first-layer_color), var(--mds_brand_appearance_shadow_high_second-layer_offset-x) var(--mds_brand_appearance_shadow_high_second-layer_offset-y) var(--mds_brand_appearance_shadow_high_second-layer_blur-radius) var(--mds_brand_appearance_shadow_high_second-layer_spread-radius) var(--mds_brand_appearance_shadow_high_second-layer_color), var(--mds_brand_appearance_shadow_high_third-layer_offset-x) var(--mds_brand_appearance_shadow_high_third-layer_offset-y) var(--mds_brand_appearance_shadow_high_third-layer_blur-radius) var(--mds_brand_appearance_shadow_high_third-layer_spread-radius) var(--mds_brand_appearance_shadow_high_third-layer_color);
    transition-duration: var(--mds_foundations_toast_transition-duration);
    transition-property: var(--mds_foundations_toast_transition-properties);
    transition-timing-function: var(--mds_foundations_toast_transition-timing);
  }
  .mc-toast-container.top-left {
    top: 0;
    left: 0;
  }
  .mc-toast-container.top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .mc-toast-container.top-right {
    top: 0;
    right: 0;
  }
  .mc-toast-container.bottom-left {
    bottom: 0;
    left: 0;
  }
  .mc-toast-container.bottom-center {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .mc-toast-container.bottom-right {
    bottom: 0;
    right: 0;
  }
`;

export let styleInjected = false;

export const injectToastGlobalCss = (): void => {
  if (!isServer) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssText));
    head.appendChild(style);
    styleInjected = true;
  }
};

const createContainer = (position: Position): HTMLDivElement => {
  if (!isServer) {
    return Object.assign(document.createElement('div'), {
      className: `mc-toast-container ${position}`,
      ariaLive: 'polite',
    });
  } else {
    return Object.assign({});
  }
};

export const toastContainer = {
  'top-left': createContainer('top-left'),
  'top-center': createContainer('top-center'),
  'top-right': createContainer('top-right'),
  'bottom-left': createContainer('bottom-left'),
  'bottom-center': createContainer('bottom-center'),
  'bottom-right': createContainer('bottom-right'),
};
export const mediaQuery =
  !isServer && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
