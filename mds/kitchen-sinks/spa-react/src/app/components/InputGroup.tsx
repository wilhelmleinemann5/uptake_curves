import { McInputGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-input-group';
import { McSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-select';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';
import { McInput } from '@maersk-global/mds-react-wrapper/components-core/mc-input';

export const InputGroup = () => {
  return (
    <McInputGroup>
      <McSelect hiddenlabel label="country code" placeholder="+40">
        <McOption value="+40">+40</McOption>
        <McOption value="+44">+44</McOption>
        <McOption value="+45">+45</McOption>
      </McSelect>
      <McInput hiddenlabel label="phone" placeholder="999 999 999"></McInput>
    </McInputGroup>
  );
};
