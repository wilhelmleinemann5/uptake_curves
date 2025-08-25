export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-popover';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-icon';

let popoverElement = null;
window.addEventListener('DOMContentLoaded', (event) => {
    popoverElement = document.querySelector('mc-popover');
});
const show = () =>{
  if(popoverElement.open === true){
    popoverElement.hide()
  }else{
    popoverElement.show()
  }
}

// CSS
.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

// HTML
<mc-button label="Open/close popover" @click="show"></mc-button>
<mc-popover maxwidth="350px" trigger="manual" arrow position="bottom-left">
  <mc-icon slot="trigger" icon="info-circle"></mc-icon>
  <div class="content">
    <h3>Available capacity</h3>
    <span>This vessel has 50% capacity left.</span>
    <mc-button label="Book"></mc-button>
  </div>
</mc-popover>`,
    language: 'javascript',
    copy: true,
  },
];
