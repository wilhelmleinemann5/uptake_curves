export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-input';
const mcInput = document.querySelector('mc-input');
mcInput.addEventListener('trailingiconclick', togglePassword);

const togglePassword = () => {
  const mcInput = document.querySelector('mc-input');
  if (!mcInput) return;
  if (mcInput.type === 'password') {
    mcInput.trailingicon = 'eye-slash';
    mcInput.type = 'text';
    mcInput.trailingiconlabel = 'Hide password';
  } else {
    mcInput.trailingicon = 'eye';
    mcInput.type = 'password';
    mcInput.trailingiconlabel = 'Show password';
  }
};

// HTML
<mc-input
  label="Password"
  placeholder="Insert strong password phrase"
  trailingicon="eye"
  trailingiconlabel="Show password"
  clearbutton
  clickabletrailingicon
  name="password"
  type="password"
>
</mc-input>`,
    language: 'javascript',
    copy: true,
  },
];
