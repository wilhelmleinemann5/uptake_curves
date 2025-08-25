import { McSelectNative } from '@maersk-global/mds-react-wrapper/components-core/mc-select-native';

const options = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
  { value: 5, label: 'Five' },
];
export const SelectNative = () => {
  return <McSelectNative selectedindex={[0]} options={options}></McSelectNative>;
};
