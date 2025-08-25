'use client';
import { useState, useEffect } from 'react';
import { McSegmentedControl } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control';
import { McSegmentedControlItem } from '@maersk-global/mds-react-wrapper/components-core/mc-segmented-control-item';

export const SegmentedControl = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McSegmentedControl>
      <McSegmentedControlItem value="Apple" label="Apple"></McSegmentedControlItem>
      <McSegmentedControlItem value="Apricot" label="Apricot"></McSegmentedControlItem>
      <McSegmentedControlItem value="Artichoke" label="Artichoke"></McSegmentedControlItem>
    </McSegmentedControl>
  ) : null;
};
