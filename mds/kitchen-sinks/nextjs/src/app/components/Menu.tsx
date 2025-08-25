'use client';
import { useState, useEffect } from 'react';
import { McMenu } from '@maersk-global/mds-react-wrapper/components-core/mc-menu';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McList } from '@maersk-global/mds-react-wrapper/components-core/mc-list';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';

export const Menu = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McMenu>
      <McButton slot="trigger" icon="bars-horizontal" variant="outlined" appearance="neutral">
        Menu
      </McButton>
      <McList>
        <McListItem label="One"></McListItem>
        <McListItem label="Two"></McListItem>
        <McListItem label="Three"></McListItem>
        <McListItem label="Four"></McListItem>
        <McListItem label="Five"></McListItem>
      </McList>
    </McMenu>
  ) : null;
};
