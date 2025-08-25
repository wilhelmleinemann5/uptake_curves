import type { Fit } from '@maersk-global/mds-shared-types';
export type { Fit } from '@maersk-global/mds-shared-types';
type NotificationAppearanceNew =
  | 'neutral-default'
  | 'neutral-weak'
  | 'neutral-inverse'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
type NotificationAppearanceOld = 'neutral' | 'primary' | 'secondary' | 'neutral-subtle';
export type NotificationAppearance = NotificationAppearanceNew | NotificationAppearanceOld;
export type Target = '_blank' | '_self' | '_parent' | '_top' | string;
export type VerticalAlign = 'top' | 'middle';
export type ActionsPosition = 'bottom' | 'right';
export interface Link {
  label: string;
  url: string;
  target?: Target;
  rel?: string;
}

export interface IMcNotification {
  /**
   * Heading of the notification
   * No heading will be shown, if attribute is not supplied.
   */
  heading?: string;
  /**
   * Body can be passed as simple argument like: `body="simple text"`
   * or as a default slot: `<mc-notification><span>body text as HTML</span></mc-notification>`.
   * Use argument style for passing short body text, use named slot when you want to pass body with HTML text
   */
  body?: string;
  /**
   * Actions can be passed as a named slot: `<mc-notification><span slot="actions"><mc-button>Action</mc-button></span></mc-notification>`
   * or as an array of link objects: `[{url: "https://designsystem.maersk.com", label: "Design System"}]`.
   * If you want an action link te be opened in a new tab, you can extend just pass extend action link object like:
   * `[{url: "https://designsystem.maersk.com", label: "Design System", target: "_blank", rel: "noreferrer"}]`
   */
  actions?: Array<Link>;
  /**
   * Whether to display a close icon.
   */
  closable?: boolean;
  /**
   * Appearance of the notification.
   * Can be: `neutral-weak`, `info`, `success`, `warning`, `error`
   * @default 'neutral-weak'
   * @type {NotificationAppearance}
   */
  appearance?: NotificationAppearance;
  /**
   * Fit of the notification.
   */
  fit?: Fit;
  /**
   * Name of the icon.
   */
  icon?: string;
  /**
   * Vertical alignment of content within notification
   */
  verticalalign?: VerticalAlign;
  /**
   * Position of the actions relative to the notification's content.
   */
  actionsposition?: ActionsPosition;
  /**
   * Sets the width of the component.
   * Remember also to specify the measurement unit i.e. `px`, `%`, `vw`, `fit-content` etc.
   */
  width?: string;
  /** Closes the notification */
  handleClose?: () => void;
}
