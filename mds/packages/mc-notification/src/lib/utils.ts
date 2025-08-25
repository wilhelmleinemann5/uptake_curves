import { isServer } from 'lit';

const cssText = `
.mc-notification__actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--mds_core_notification_action-link_margin-right);
}
.mc-notification__actions > * {
  align-items: center;
  display: flex;
  position: relative;
}
.mc-notification__actions > *::after {
  @include mds-apply-font('text', 'medium', 'normal');
  content: '•';
  position: absolute;
  right: var(--mds_core_notification_action-link_separator_right);
}
.mc-notification__actions > *:last-child::after {
  display: none;
}
`;

export let styleInjected = false;

export const injectNotificationGlobalCss = (): void => {
  if (!isServer) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssText));
    head.appendChild(style);
    styleInjected = true;
  }
};
