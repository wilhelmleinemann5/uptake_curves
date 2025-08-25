import { css } from 'lit';

export default css`
  * {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
  }
  :host {
    border-collapse: initial;
    border-spacing: initial;
    color: var(--mds_foundations_body_text-color);
    direction: initial;
    font-family: var(--mds_brand_typography_text_font-family), var(--mds_brand_typography_text_font-family-fallback);
    font-size: var(--mds_brand_typography_text_medium_desktop_font-size);
    font-style: var(--mds_brand_typography_text_medium_normal_font-style);
    font-weight: var(--mds_brand_typography_text_medium_normal_font-weight);
    list-style: var(--mds_foundations_list_ordered_list-style);
    text-align: initial;
    text-indent: initial;
    text-transform: initial;
    word-spacing: initial;
    box-shadow: none;
  }
  :host(.no-animation) *,
  .no-animation *,
  :host(.no-animation) *:after,
  .no-animation *:after,
  :host(.no-animation) *:before,
  .no-animation *:before {
    animation: none;
  }
  :host([disabled]) {
    cursor: not-allowed;
    opacity: var(--mds_brand_appearance_state_disabled_opacity);
  }
  :host([disabled]) * {
    pointer-events: none;
    touch-action: none;
    user-select: none;
  }
  :host(:focus),
  :host(:focus-visible),
  :host(:focus) *,
  :host(:focus-visible) * {
    outline: 0;
    box-shadow: none;
  }
`;
