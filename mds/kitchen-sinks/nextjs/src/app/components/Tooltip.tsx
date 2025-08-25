'use client';
import { useState, useEffect } from 'react';
import { McTooltip } from '@maersk-global/mds-react-wrapper/components-core/mc-tooltip';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Tooltip = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McTooltip>
      <McButton slot="trigger">Trigger</McButton>
      <span>The HTML content of the tooltip</span>
    </McTooltip>
  ) : null;
};
