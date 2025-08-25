export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-input';

let popover;
let triggerContainer;
let trigger;
document.addEventListener('DOMContentLoaded', () => {
  popover = document.querySelector('mc-popover')
  triggerContainer = document.querySelector('#trigger-input');
  trigger = triggerContainer.shadowRoot.querySelector('input');
  popover.customtriggerelement = trigger
})

// CSS
.wrapper {
  display: flex; 
  justify-content: center;
  adjust-items: center; 
  margin-top: 200px;
}

.content-wrapper {
  padding: 16px; 
  display: flex; 
  flex-direction: column; 
  gap: 0.5em;
}

// HTML
<div class="wrapper">
  <mc-input id="trigger-input" label="Vesel capacity"></mc-input>
  <mc-popover >
    <div class="content-wrapper">
      <h3>Available capacity</h3>
      <span>This vessel has 50% capacity left.</span>
      <mc-button label="Book"></mc-button>
    </div>
  </mc-popover>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
