export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core-popover';
import '@maersk-global/mds-components-core-button';
import '@maersk-global/mds-components-core-textarea';

// CSS
.wrapper {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
.chat-box {
  padding: 16px;
  width: 400px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// HTML
<div class="wrapper">
  <mc-popover trigger="manual" open position="bottom-right">
    <div slot="trigger"></div>
    <div class="chat-box">
      <h5>Contact Us</h5>
      <p>Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.</p>
      <div class="form">
        <mc-textarea label="Type your message" hiddenlabel placeholder="Write a message" icon="comment">
        </mc-textarea>
        <mc-button icon="envelope"> Send </mc-button>
      </div>
    </div>
  </mc-popover>
</div>`,
    language: 'javascript',
    copy: true,
  },
];
