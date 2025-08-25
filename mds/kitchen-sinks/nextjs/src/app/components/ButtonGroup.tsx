'use client';
import { useState, useEffect } from 'react';
import { McButtonGroup } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group';
import { McButtonGroupItem } from '@maersk-global/mds-react-wrapper/components-core/mc-button-group-item';

export const ButtonGroup = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McButtonGroup selectiontype="single">
      <McButtonGroupItem value="Apple" label="Apple"></McButtonGroupItem>
      <McButtonGroupItem value="Apricot" label="Apricot"></McButtonGroupItem>
      <McButtonGroupItem value="Artichoke" label="Artichoke"></McButtonGroupItem>
    </McButtonGroup>
  ) : null;
};
