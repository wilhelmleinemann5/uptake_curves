import { McModal } from '@maersk-global/mds-react-wrapper/components-core/mc-modal';
import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { useState } from 'react';

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <McButton id="open-modal" appearance="primary" click={() => setIsOpen(true)}>
        Modal
      </McButton>
      <McModal heading="Heading" open={isOpen}>
        <span className="mds-text--medium-normal">
          Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          <p>
            Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim.
          </p>
        </span>
        <McButton slot="primaryAction" appearance="primary" dialogaction="ok">
          OK
        </McButton>
        <McButton slot="secondaryAction" appearance="neutral" variant="outlined" dialogaction="cancel">
          Cancel
        </McButton>
      </McModal>
    </>
  );
};
