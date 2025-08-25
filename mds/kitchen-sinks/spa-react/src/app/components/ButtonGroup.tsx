import { McButtonGroupItem } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group-item';
import { McButtonGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group';

export const ButtonGroup = () => {
  return (
    <McButtonGroup selectiontype="single">
      <McButtonGroupItem value="Apple" label="Apple"></McButtonGroupItem>
      <McButtonGroupItem value="Apricot" label="Apricot"></McButtonGroupItem>
      <McButtonGroupItem value="Artichoke" label="Artichoke"></McButtonGroupItem>
    </McButtonGroup>
  );
};
