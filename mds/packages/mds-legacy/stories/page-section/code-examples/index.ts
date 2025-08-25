const mdsPageSectionTemplate = `
<div class="p-page__section">
  <div class="p-page__section__outer">
    <div class="p-page__section__inner p-page__section__inner--xl">
      <p>
        <small>xl padding</small>
      </p>
      <p>
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
        tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
        enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
      </p>
      <p>
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
        imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
        ultricies nisi. Nam eget dui. Etiam rhoncus.
      </p>
      <p>
        Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
        libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
        vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
        tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
        Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
        leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
      </p>
    </div>
  </div>
</div>
`.replace(/\n\s*\n/g, '\n');
const mdsPageSectionBackgroundTemplate = `
<div class="p-page__section">
  <div class="background background--loaded" aria-hidden="true">
    <picture class="cover">
      <source srcset="./images/mds-components/large-background.jpg" media="(min-width: 1000px)" />
      <source srcset="./images/mds-components/medium-background.jpg" media="(min-width: 700px)" />
      <source srcset="./images/mds-components/small-background.jpg" />
      <img src="./images/mds-components/large-background.jpg" class="cover" />
    </picture>
  </div>
  <div class="p-page__section__outer">
    <div class="p-page__section__inner p-page__section__inner--medium">
      <p>
        <small>theme--light--alt, medium padding</small>
      </p>
      <p>
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
        tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
        enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
      </p>
      <p>
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
        imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
        ultricies nisi. Nam eget dui. Etiam rhoncus.
      </p>
      <p>
        Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
        libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
        vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
        tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
        Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
        leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
      </p>
    </div>
  </div>
</div>
`.replace(/\n\s*\n/g, '\n');

export const defaultPreview = [
  {
    tab: 'HTML',
    template: mdsPageSectionTemplate,
    language: 'html',
    copy: true,
  },
];
export const backgroundPreview = [
  {
    tab: 'HTML',
    template: mdsPageSectionBackgroundTemplate,
    language: 'html',
    copy: true,
  },
];
