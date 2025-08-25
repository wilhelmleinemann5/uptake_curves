import { McPicker } from '@maersk-global/mds-react-wrapper/components-core/mc-picker';
import { McPickerItem } from '@maersk-global/mds-react-wrapper/components-core/mc-picker-item';

export const Picker = () => {
  return (
    <McPicker data-cy="mc-picker">
      <McPickerItem value="1" label="Apple"></McPickerItem>
      <McPickerItem value="2" label="Orange"></McPickerItem>
      <McPickerItem value="3" label="Banana"></McPickerItem>
      <McPickerItem value="4" label="Apricot"></McPickerItem>
      <McPickerItem value="5" label="Kiwi"></McPickerItem>
      <McPickerItem value="6" label="Passion fruit"></McPickerItem>
      <McPickerItem value="7" label="Dragon fruit"></McPickerItem>
      <McPickerItem value="8" label="Plum"></McPickerItem>
      <McPickerItem value="9" label="Avocado"></McPickerItem>
    </McPicker>
  );
};
