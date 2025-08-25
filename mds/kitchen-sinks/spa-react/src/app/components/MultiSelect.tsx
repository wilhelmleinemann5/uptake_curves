import { McMultiSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-multi-select';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const MultiSelect = () => {
  return (
    <McMultiSelect>
      <McOption value="1">One</McOption>
      <McOption value="2">Two</McOption>
      <McOption value="3">Three</McOption>
      <McOption value="4">Four</McOption>
      <McOption value="5">Five</McOption>
    </McMultiSelect>
  );
};
