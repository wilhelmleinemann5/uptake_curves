import { McLoadingIndicator, McTag } from '@maersk-global/mds-components-core';

let hobbyPanel: HTMLElement;
let loadingIndicator: McLoadingIndicator;

const tags = ['ui', 'visual-design', 'engineering', 'product'];

export const initContent = () => {
  // step indicator
  loadingIndicator = document.getElementById('loadingIndicator') as McLoadingIndicator;
  // modal
  hobbyPanel = document.getElementById('hobbyPanelContent') as HTMLElement;
  // tags
  // tagsContainer = document.getElementById('tagsContainer') as HTMLElement;
  for (const tagName of tags) {
    const tag = document.getElementById(tagName) as McTag;
    tag.addEventListener('dismiss', (e: Event) => {
      onTagDismiss(e);
    });
  }
};

const fetchData = async () => {
  try {
    const response = await fetch('/api/?type=all-meat&paras=3&start-with-lorem=1', {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
    return response.json();
  } catch (err) {
    return 'sorry, there are no results for your search';
  }
};

const onTagDismiss = (e: Event) => {
  if (e) {
    const tag = e.target as HTMLElement;
    tag.classList.add('hide');
  }
};

export const onTabChange = async (event: CustomEvent) => {
  const currentindex = event.detail;
  if (currentindex === 2) {
    loadingIndicator.classList.remove('hide');
    console.log('A', hobbyPanel.innerHTML.toString());
    hobbyPanel.innerHTML = '';

    const data = await fetchData();
    loadingIndicator.classList.add('hide');
    for (const item of data) {
      hobbyPanel.innerHTML += `<p>${item}</p>`;
    }
  }
};

// we use type="module" tag on js, so we need to add function to window,
// so that we can call it directly from HTML i.e. button on click
(window as any).initContent = initContent;
(window as any).onTabChange = onTabChange;
(window as any).onTagDismiss = onTagDismiss;
