'use client';
import { useState, useEffect } from 'react';
import { McDrawer } from '@maersk-global/mds-react-wrapper/components-core/mc-drawer';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Drawer = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <>
      <McButton id="open-drawer" appearance="primary" click={() => setIsOpen(true)}>
        Drawer
      </McButton>
      <McDrawer heading="Heading" open={isOpen}>
        <span className="mds-text--medium-normal">
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          <p>
            Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          </p>
        </span>
        <McButton slot="footer" appearance="primary" dialogaction="ok">
          OK
        </McButton>
        <McButton
          id="cancel-drawer"
          slot="secondaryAction"
          appearance="neutral"
          variant="outlined"
          dialogaction="cancel"
        >
          Cancel
        </McButton>
      </McDrawer>
    </>
  ) : null;
};
