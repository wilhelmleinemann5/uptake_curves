import { McSwitchGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-switch-group';
import { McSwitch } from '@maersk-global/mds-react-wrapper/components-core/mc-switch';

export const SwitchGroup = () => {
  return (
    <McSwitchGroup legend="Please select options">
      <McSwitch name="fruit" value="Apple" label="Apple" checked></McSwitch>
      <McSwitch name="fruit" value="Orange" label="Orange"></McSwitch>
      <McSwitch name="fruit" value="Banana" label="Banana"></McSwitch>
      <McSwitch name="fruit" value="Lemon" label="Lemon"></McSwitch>
    </McSwitchGroup>
  );
};
