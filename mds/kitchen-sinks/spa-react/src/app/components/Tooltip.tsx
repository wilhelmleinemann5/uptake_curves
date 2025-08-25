import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McTooltip } from '@maersk-global/mds-react-wrapper/components-core/mc-tooltip';

export const Tooltip = () => {
  return (
    <McTooltip>
      <McButton slot="trigger">Trigger</McButton>
      <span>The HTML content of the tooltip</span>
    </McTooltip>
  );
};
