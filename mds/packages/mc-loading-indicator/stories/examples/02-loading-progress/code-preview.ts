export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-loading-indicator';
let interval = null;
let progress = 0;
let loadingIndicator = null;
function startInterval(){
  if (!interval) {
    interval = setInterval(fetchData, 200);
  }
}
function fetchData(){
  const dataProgress = getRandomNum(3,6);
  progress += dataProgress;
  if(progress >= 100){
    clearInterval(interval);
    loadingIndicator.label = \`Data fetched!\`
    return;
  }
  loadingIndicator.label = \`Fetching data... \${progress}%\`
}
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener('DOMContentLoaded', startInterval);

// HTML
<mc-loading-indicator label="Fetching data..."></mc-loading-indicator>`,
    language: 'javascript',
    copy: true,
  },
];
