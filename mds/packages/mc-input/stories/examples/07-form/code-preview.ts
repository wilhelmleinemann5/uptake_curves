export const preview = [
  {
    label: 'JavaScript/HTML/CSS',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-input";
import "@maersk-global/mds-components-core/mc-button";

const sentFormData = (form) => {
  const data = new FormData(event.target);
  let formValuesData = '';
  for (const [key, value] of data.entries()) {
    formValuesData += \`\${key}: \${value}<br />\`;
  }
  const formValues = document.getElementById('fromValues');
  formValues.innerHTML = \`<br /><br /><b>Submitted values are:</b><br />\${formValuesData}\`;
}

const submitForm = (event) => {
  event.preventDefault();
  sentFormData(event.target);
};

const submitFormOnEnter = (event) => {
  if(event.code === 'Enter'){
    sentFormData(document.getElementById('form'));
  }
};

// CSS
form {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

// HTML
<form
  id="form"
  onsubmit="submitForm()"
  onkeydown="submitFormOnEnter()"
>
  <mc-input name="name" label="Name"></mc-input>
  <mc-input name="address" label="Address"></mc-input>
  <div>
    <mc-button name="submit" type="submit" label="Submit"></mc-button>
    <mc-button appearance="neutral" label="Not a submit"></mc-button>
  </div>
</form>
<p id="fromValues"></p>`,
    language: 'javascript',
    copy: true,
  },
];
