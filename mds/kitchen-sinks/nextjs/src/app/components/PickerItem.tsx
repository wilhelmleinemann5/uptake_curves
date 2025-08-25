'use client';
import { useState, useEffect } from 'react';
import { McPickerItem } from '@maersk-global/mds-react-wrapper/components-core/mc-picker-item';

export const PickerItem = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? <McPickerItem label="Test" data-cy="mc-picker-item"></McPickerItem> : null;
};
