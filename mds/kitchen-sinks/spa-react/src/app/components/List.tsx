import { McList } from '@maersk-global/mds-react-wrapper/components-core/mc-list';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';

export const List = () => {
  return (
    <McList>
      <McListItem label="One"></McListItem>
      <McListItem label="Two"></McListItem>
      <McListItem label="Three"></McListItem>
      <McListItem label="Four"></McListItem>
      <McListItem label="Five"></McListItem>
    </McList>
  );
};
