'use client';
import { useState, useEffect } from 'react';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';

export const ListItem = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McListItem icon="star" label="Test"></McListItem> : null;
};
