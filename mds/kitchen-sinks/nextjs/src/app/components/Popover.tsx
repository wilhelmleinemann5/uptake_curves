'use client';
import { useState, useEffect } from 'react';
import { McPopover } from '@maersk-global/mds-react-wrapper/components-core/mc-popover';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Popover = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <McPopover>
      <McButton slot="trigger">Popover</McButton>
      <div>
        <h1>Available capacity</h1>
        <span>This vessel has 50% capacity left.</span>
        <McButton label="Book"></McButton>
      </div>
    </McPopover>
  ) : null;
};
