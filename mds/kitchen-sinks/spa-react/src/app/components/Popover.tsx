import { McPopover } from '@maersk-global/mds-react-wrapper/components-core/mc-popover';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Popover = () => {
  return (
    <McPopover>
      <McButton slot="trigger">Popover</McButton>
      <div>
        <h1>Available capacity</h1>
        <span>This vessel has 50% capacity left.</span>
        <McButton label="Book"></McButton>
      </div>
    </McPopover>
  );
};
