import { McSegmentedControl } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control';
import { McSegmentedControlItem } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control-item';

export const SegmentedControl = () => {
  return (
    <McSegmentedControl>
      <McSegmentedControlItem value="Apple" label="Apple"></McSegmentedControlItem>
      <McSegmentedControlItem value="Apricot" label="Apricot"></McSegmentedControlItem>
      <McSegmentedControlItem value="Artichoke" label="Artichoke"></McSegmentedControlItem>
    </McSegmentedControl>
  );
};
