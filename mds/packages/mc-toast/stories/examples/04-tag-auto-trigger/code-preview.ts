export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-tag';
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-notification';

const onTagDismiss = (tagIndex) => {
  const mcTags = document.querySelectorAll('mc-tag');
  const mcToast = document.querySelectorAll('mc-toast');
  mcTags[tagIndex].classList.add('hidden');
  mcToast[tagIndex].show();
};

const restoreTag = (tagIndex) => {
  const mcTags = document.querySelectorAll('mc-tag');
  const mcToast = document.querySelectorAll('mc-toast');
  mcTags[tagIndex].classList.remove('hidden');
  mcToast[tagIndex].hide();
};

// CSS
.hidden {
  display: none;
}
.container {
  display: flex;
  gap: 8px;
}

// HTML

// N.B. The CSS class "mc-notification__actions" is an optional helper class to provide 
// alignment, spacing and separators between actions when passed as a slot
<div class="container">
  <mc-tag label="engineering" withaction ondismiss="onTagDismiss(0)"></mc-tag>
  <mc-tag label="ui" withaction ondismiss="onTagDismiss(1)"></mc-tag>
  <mc-tag label="ux" withaction ondismiss="onTagDismiss(2)"></mc-tag>
  <mc-tag label="visual-design" withaction ondismiss="onTagDismiss(3)"></mc-tag>
  <mc-tag label="product" withaction ondismiss="onTagDismiss(4)"></mc-tag>
</div>

<mc-toast appearance="info">
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
    <span><b>engineering</b> has been dismissed</span>
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreTag(0)" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>
<mc-toast>

<mc-toast appearance="info">
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
    <span><b>ui</b> has been dismissed</span>
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreTag(1)" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>
<mc-toast>

<mc-toast appearance="info">
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
    <span><b>ux</b> has been dismissed</span>
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreTag(2)" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>
<mc-toast>

<mc-toast appearance="info">
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
    <span><b>visual-design</b> has been dismissed</span>
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreTag(3)" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>
<mc-toast>

<mc-toast appearance="info">
  <mc-notification icon="info-circle" verticalalign="middle" actionsposition="right">
    <span><b>product</b> has been dismissed</span>
    <span slot="actions" class="mc-notification__actions">
      <mc-button class="undo" onclick="restoreTag(4)" variant="plain" appearance="neutral" padding="none" icon="arrow-anti-clockwise">Undo</mc-button>
    </span>
  </mc-notification>
</mc-toast>
<mc-toast>`,
    language: 'javascript',
    copy: true,
  },
];
