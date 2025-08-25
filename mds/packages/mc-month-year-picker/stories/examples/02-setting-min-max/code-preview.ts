export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-month-year-picker";
import "@maersk-global/mds-components-core/mc-button";

const setMinMax = (value) => {
  const picker = document.querySelector('mc-month-year-picker')
  if(picker){
  picker.min = value.min
  picker.max = value.max
  }
}

// HTML
<div class="story" style="display: flex; flex-direction: column; gap: 1rem;">
  <mc-button variant="outlined" appearance="neutral" @click="${(): void =>
    setMinMax({
      min: { month: 'March', year: 2010 },
      max: { month: 'September', year: 2025 },
    })}" label="Set min max as string"></mc-button>
  <mc-button variant="outlined" appearance="neutral" @click="${(): void =>
    setMinMax({
      min: { month: 1, year: 2022 },
      max: { month: 4, year: 2025 },
    })}" label="Set min max as number"></mc-button>
  <span>Scroll after click to see the effect</span>
  <mc-month-year-picker></mc-month-year-picker>
</div>
`,
    language: 'javascript',
    copy: true,
  },
];
