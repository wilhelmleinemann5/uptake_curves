import { css } from 'lit';

export default css`
  :host([disabled]) {
    opacity: unset;
  }
  :host([disabled]) * {
    pointer-events: unset;
  }
  :host([disabled]) ::slotted(*),
  :host([disabled]) ::part(label) {
    color: var(--mds_brand_appearance_opacity_inverse_50);
    cursor: not-allowed;
  }
  :host([disabled]) ::slotted(.legend) {
    color: var(--mds_core_label_text-color);
  }
  :host([disabled]) .checkmark,
  :host([disabled]) .track {
    opacity: var(--mds_brand_appearance_state_disabled_opacity);
    cursor: not-allowed;
  }
`;
