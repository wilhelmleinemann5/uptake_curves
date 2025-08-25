import { McRadioGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-radio-group';
import { McRadio } from '@maersk-global/mds-react-wrapper/components-core/mc-radio';

export const RadioGroup = () => {
  return (
    <McRadioGroup legend="Please select options">
      <McRadio name="fruit" value="Apple" label="Apple" checked></McRadio>
      <McRadio name="fruit" value="Orange" label="Orange"></McRadio>
      <McRadio name="fruit" value="Banana" label="Banana"></McRadio>
      <McRadio name="fruit" value="Lemon" label="Lemon"></McRadio>
    </McRadioGroup>
  );
};
