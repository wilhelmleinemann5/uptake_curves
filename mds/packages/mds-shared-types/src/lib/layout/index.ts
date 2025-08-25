import { Orientation } from '../common';

export declare type Viewport = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export declare interface IAutoLayout {
  /**
   * To preserve the orientation on `small` screens (max-width: 640px), 'autolayoutdisabled' must be set to `true` in cases where the component cannot fit the layout with the current orientation..
   */
  orientation?: Orientation;

  /**
   * By default, on `small` screens (max-width: 640px), the component's `orientation` is switched to vertical,
   * regardless of the set orientation. However, setting `disabledautolayout` to `true`
   * prevents this and preserves the current `orientation` setting.
   */
  autolayoutdisabled?: boolean;
}
