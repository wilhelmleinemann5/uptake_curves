const mdsPageHeroTemplate = `
<div id="headerDefault" class="p-page__hero">
  <div class="p-page__hero__wrapper">
    <div class="p-page__hero__content">
      <div class="p-page__hero__table">
        <div class="p-page__hero__cell">
          <div class="p-page__hero__col--1">
            <div class="p-page__hero__copy">
              <div class="heading ">
                <h1 class="mds-font--display-4" id="heading">
                  Lorem ipsum
                </h1>
              </div>
              <div class="mds-rich-text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus tempora, velit molestias suscipit.
                </p>
              </div>
              <div class="p-page__hero__buttons">
                <div class="button-group">
                  <mc-button trailingicon="arrow-down-right">Go</mc-button>
                  <mc-button variant="secondary">No thanks</mc-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`.replace(/\n\s*\n/g, '\n');
const mdsPageHeroBackgroundTemplate = `
<div id="headerWithBackground" class="p-page__hero">
  <div class="p-page__hero__wrapper">
    <div class="background background--loaded" aria-hidden="true">
      <picture class="cover">
        <source srcset="./images/mds-components/large-background.jpg" media="(min-width: 1000px)" />
        <source srcset="./images/mds-components/medium-background.jpg" media="(min-width: 700px)" />
        <source srcset="./images/mds-components/small-background.jpg" />
        <img src="./images/mds-components/large-background.jpg" class="cover" />
      </picture>
    </div>
    <div class="p-page__hero__content">
      <div class="p-page__hero__table">
        <div class="p-page__hero__cell">
          <div class="p-page__hero__col--1">
            <div class="p-page__hero__copy">
              <div class="heading ">
                <h1 class="mds-font--display-4" id="heading" style="color: #ffffff">
                  Lorem ipsum header
                </h1>
              </div>
              <div class="mds-rich-text" style="color: #ffffff">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus tempora, velit molestias suscipit.
                </p>
              </div>
              <div class="p-page__hero__buttons">
                <div class="button-group">
                  <mc-button trailingicon="arrow-down-right" variant="secondary">Go</mc-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`.replace(/\n\s*\n/g, '\n');
const mdsPageHeroCenterAlignTemplate = `
<div id="" class="p-page__hero p-page__hero--centered">
  <div class="p-page__hero__wrapper">
    <div class="p-page__hero__content">
      <div class="p-page__hero__table">
        <div class="p-page__hero__cell">
          <div class="p-page__hero__col--1">
            <div class="p-page__hero__copy">
              <div class="heading ">
                <h1 class="mds-font--display-4">
                  Center aligned
                </h1>
              </div>
              <div class="mds-rich-text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus tempora, velit molestias suscipit. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Ducimus tempora, velit
                  molestias suscipit. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ducimus tempora, velit molestias suscipit.
                </p>
              </div>
              <div class="p-page__hero__buttons">
                <div class="button-group">
                  <mc-button>Action 1</mc-button>
                  <mc-button variant="secondary">Action 2</mc-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`.replace(/\n\s*\n/g, '\n');
const mdsPageHeroRightAlignTemplate = `
<div id="" class="p-page__hero p-page__hero--right">
  <div class="p-page__hero__wrapper">
    <div class="p-page__hero__content">
      <div class="p-page__hero__table">
        <div class="p-page__hero__cell">
          <div class="p-page__hero__col--1">
            <div class="p-page__hero__copy">
              <div class="heading ">
                <h1 class="mds-font--display-4">
                  Right aligned
                </h1>
              </div>
              <div class="mds-rich-text">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus tempora, velit molestias suscipit. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Ducimus tempora, velit
                  molestias suscipit. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ducimus tempora, velit molestias suscipit.
                </p>
              </div>
              <div class="p-page__hero__buttons">
                <div class="button-group">
                    <mc-button>Action 1</mc-button>
                    <mc-button variant="secondary">Action 2</mc-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`.replace(/\n\s*\n/g, '\n');

export const defaultPreview = [
  {
    tab: 'HTML',
    template: mdsPageHeroTemplate,
    language: 'html',
    copy: true,
  },
];
export const backgroundPreview = [
  {
    tab: 'HTML',
    template: mdsPageHeroBackgroundTemplate,
    language: 'html',
    copy: true,
  },
];
export const centerAlignPreview = [
  {
    tab: 'HTML',
    template: mdsPageHeroCenterAlignTemplate,
    language: 'html',
    copy: true,
  },
];
export const rightAlignPreview = [
  {
    tab: 'HTML',
    template: mdsPageHeroRightAlignTemplate,
    language: 'html',
    copy: true,
  },
];
