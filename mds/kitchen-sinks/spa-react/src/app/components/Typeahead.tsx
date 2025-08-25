import { McTypeahead } from '@maersk-global/mds-react-wrapper/components-core/mc-typeahead';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

export const Typeahead = () => {
  return (
    <McTypeahead>
      <McOption value="One">One</McOption>
      <McOption value="Two">Two</McOption>
      <McOption value="Three" disabled>
        Three
      </McOption>
      <McOption value="Four">Four</McOption>
      <McOption value="Five">Five</McOption>
    </McTypeahead>
  );
};
