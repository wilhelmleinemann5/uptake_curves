export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-button';

const hide = () =>{
  const popoverElement = document.querySelector('mc-popover');
  popoverElement.hide()
}

// CSS
.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.close-button {
  align-self: flex-end;
}
.close-button::part(button){
  padding: 0;
  width: auto;
}

// HTML
<mc-popover maxwidth="350px" open position="bottom-left">
  <mc-button slot="trigger" label="Click me"></mc-button>
  <div class="content">
    <mc-button hiddenlabel icon="times" label="close button" class="close-button" @click="hide"></mc-button>
    <h3>Available capacity</h3>
    <span>This vessel has 50% capacity left.</span>
    <mc-button label="Book"></mc-button>
  </div>
</mc-popover>`,
    language: 'javascript',
    copy: true,
  },
];
