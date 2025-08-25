import { McStepIndicator, McSelectNative, McModal } from '@maersk-global/mds-components-core';

import countries from './countries';

let steps: any = [];
let stepIndicator: McStepIndicator;
let nationality: McSelectNative;
let dialog: McModal;
let form: HTMLFormElement;
let summary: HTMLElement;
let skills: McSelectNative;

export const initFormStepOne = () => {
  // form
  form = document.getElementById('info') as HTMLFormElement;
  form.onsubmit = submit;

  // step indicator
  stepIndicator = document.getElementById('step-indicator') as McStepIndicator;
  stepIndicator.labels = ['Personal', 'Interests', 'Work'];
  steps = [
    document.getElementById(stepIndicator.labels[0]),
    document.getElementById(stepIndicator.labels[1]),
    document.getElementById(stepIndicator.labels[2]),
  ];
  // select
  nationality = document.getElementById('country') as McSelectNative;
  nationality.options = countries;
  skills = document.getElementById('skills') as McSelectNative;
  skills.options = ['Javascript', 'React', 'Angular', 'VueJS', 'Go'];
  // modal
  dialog = document.body.querySelector('mc-modal') as McModal;
  // summary
  summary = document.getElementById('summary') as HTMLElement;
};

export const goToStep = (currentindex: number) => {
  stepIndicator.currentindex = currentindex;
  console.log(form);
  for (const [index, step] of steps.entries()) {
    if (step) {
      if (index === currentindex) {
        step.classList.remove('hide');
      } else {
        step.classList.add('hide');
      }
    }
  }
};

export const submit = () => {
  alert('Form submitted');
};

export const toggleModal = () => {
  dialog.open = !dialog.open;
};

export const getFormData = () => {
  toggleModal();
  const formData = new FormData(form);
  const summaryHtml = `<p>Name: ${formData.get('name')}</p>
  <p>Country name: ${formData.get('country')}</p>
  <p>Birthday: ${formData.get('birthday')}</p>
  <p>Gender: ${formData.get('gender')}</p>
  <p>Hobbies: ${formData.get('hobbies')}</p>
  <p>Comments: ${formData.get('comments')}</p>
  <p>Is Employed? ${formData.get('employed')}</p>
  <p>Skills: ${formData.get('skills')}</p>
  <p>Company: ${formData.get('company')}</p>
  <p>Agreed to the terms? ${formData.get('terms')}</p>`;
  summary.innerHTML = summaryHtml;
};

// we use type="module" tag on js, so we need to add function to window,
// so that we can call it directly from HTML i.e. button on click
(window as any).initFormStepOne = initFormStepOne;
(window as any).goToStep = goToStep;
(window as any).getFormData = getFormData;
(window as any).toggleModal = toggleModal;
