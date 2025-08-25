import { fit, zindex } from '@maersk-global/mds-dev-utils';
import {
  arrow,
  position,
  trigger,
  maxwidth,
  open,
  maxheight,
  contextmenuonside,
} from '@maersk-global/mds-components-core-popover/stories/argTypes';

export default {
  trigger: trigger('menu'),
  fit,
  position: position('menu', 'bottom-left'),
  maxwidth: maxwidth('menu'),
  maxheight: maxheight('menu'),
  arrow,
  zindex: zindex('Set only set if two menus or a menu and another z-indexed panel need to overlap.'),
  open: open('menu'),
  contextmenuonside: contextmenuonside('menu'),
};
