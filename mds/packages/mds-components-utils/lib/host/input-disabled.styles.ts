import { css } from 'lit';

export default css`
  :host([disabled]) {
    cursor: unset;
    opacity: unset;
  }

  :host([disabled]) * {
    pointer-events: unset;
    touch-action: unset;
    user-select: unset;
  }

  :host([disabled]) .inner,
  :host([disabled]) .slot {
    cursor: not-allowed;
    opacity: var(--mds_brand_appearance_state_disabled_opacity);
  }
  :host([disabled]) .inner *,
  :host([disabled]) .slot slot {
    pointer-events: none;
    touch-action: none;
    user-select: none;
  }
`;
