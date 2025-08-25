import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import themeDesignTokens from '../../../../dist/packages/mds-design-tokens/maersk/light/json/design-tokens-flat.json';
import { html, TemplateResult } from 'lit';

const breakpointsDesignTokens = Object.fromEntries(
  Object.entries(themeDesignTokens).filter(([key]) => key.startsWith('global_breakpoint')),
);

export const hologramStyles = (args, responsiveType: 'viewport' | 'container' = args['type']): string => {
  return `
<style>
#root-inner {
  display: block;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  position: relative;
}

.wrapper  > *{
  width: 100%;
}

.mds-grid > * {
  background-color: var(--mds_brand_appearance_success_default_background-color);
  color: var(--mds_brand_appearance_success_default_on-background-color);
  text-align: center;
  padding: 12px;
  min-width: 35px;
  display: flex;
}

.mds-grid {
  position: relative;
  z-index: 1;
}

.mds-container, .mds-viewport {
  padding: 48px 0;
  position: relative;
}

.hologram {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}

.hologram > * {
  background-color: var(--mds_brand_appearance_info_default_background-color);
  opacity: 0.2;
  padding: 0;
}
${
  responsiveType === 'viewport'
    ? `@media only screen and (max-width: ${(breakpointsDesignTokens['global_breakpoint_sm_min-width'] as number) - 1}px) {
            .hologram :is(.col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
              display: none;
            }
        }

        @media only screen and (min-width: ${breakpointsDesignTokens['global_breakpoint_sm_min-width']}px) {
            .hologram :is(.col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
              display: none;
            }
        }

        @media only screen and (min-width: ${breakpointsDesignTokens['global_breakpoint_md_min-width']}px) {
            .hologram :is(.col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
              display: block;
            }
        }`
    : `@container (max-width: ${(breakpointsDesignTokens['global_breakpoint_sm_min-width'] as number) - 1}px) {
            .hologram :is(.col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
              display: none;
            }
        }

        @container (min-width: ${breakpointsDesignTokens['global_breakpoint_sm_min-width']}px) {
            .hologram :is(.col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
              display: none;
            }
        }

        @container (min-width: ${breakpointsDesignTokens['global_breakpoint_md_min-width']}px) {
            .hologram :is(.col-7, .col-8, .col-9, .col-10, .col-11, .col-12) {
            display: block;
            }
        }`
}
</style>`;
};

export const hologramMarkup = (args, breakpoint = ''): string => {
  const cells = Array.from({ length: 12 }, (_, index) => index + 1);
  if (args['grid-hologram']) {
    return `<div class="hologram mds-grid ${breakpoint ? breakpoint : ''}">
        ${cells.map((_, index) => `<div class="col-${index + 1}"></div>`).join('')}
      </div>`;
  } else {
    return '';
  }
};
