'use client';
import { useState, useEffect } from 'react';
import { McDialog } from '@maersk-global/mds-react-wrapper/components-core/mc-dialog';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';

export const Dialog = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <>
      <McButton id="open-dialog" appearance="primary" click={() => setIsOpen(true)}>
        Dialog
      </McButton>
      <McDialog heading="Heading" open={isOpen}>
        <span className="mds-text--medium-normal" id="dialog-content">
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          <p>
            Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          </p>
        </span>
        <McButton slot="primaryAction" appearance="primary" dialogaction="ok" click={() => setIsOpen(false)}>
          OK
        </McButton>
        <McButton
          id="cancel-dialog"
          slot="secondaryAction"
          appearance="neutral"
          variant="outlined"
          dialogaction="cancel"
          click={() => setIsOpen(false)}
        >
          Cancel
        </McButton>
      </McDialog>
    </>
  ) : null;
};
