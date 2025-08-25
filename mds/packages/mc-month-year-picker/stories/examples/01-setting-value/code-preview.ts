export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-month-year-picker";
import "@maersk-global/mds-components-core/mc-button";

const setValue = (value) => {
  const picker = document.querySelector('mc-month-year-picker')
  if(picker){
  picker.value = value
  }
}

// HTML
<div>
  <mc-button variant="outlined" appearance="neutral" @click="${(): void =>
    setValue({ month: 'January', year: 2023 })}" label="set month as string - January"></mc-button>
  <mc-button variant="outlined" appearance="neutral" @click="${(): void =>
    setValue({ month: 11, year: 2023 })}" label="set month as number - 11(December)"></mc-button>
  <mc-month-year-picker></mc-month-year-picker>
</div>
`,
    language: 'javascript',
    copy: true,
  },
];
