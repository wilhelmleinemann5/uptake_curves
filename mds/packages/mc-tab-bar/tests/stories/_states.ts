export const states = [
  {
    currentindex: 4,
    slots: [
      {
        name: 'default',
        content: `  
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Tab with very long title that should stay in one line always" icon="globe"></mc-tab>
        <div slot="panel">Work page that showcases our work.</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <div slot="panel">Hobby page that shows our interests.</div>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <div slot="panel">Contact page that shows our contacts.</div>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
        <div slot="panel">Address page that shows our addresses.</div>`,
      },
    ],
    accessibility: true,
  },
  {
    currentindex: 0,
    slots: [
      {
        name: 'default',
        content: `  
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div class="panel" slot="panel">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
        <div class="panel" slot="panel">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <div class="panel" slot="panel">Hobby page that shows our interests.</div>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <div class="panel" slot="panel">Contact page that shows our contacts.</div>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
        <div class="panel" slot="panel">Address page that shows our addresses.</div>`,
      },
    ],
    containerStyles: { display: 'flex', height: '100px' },
    accessibility: false,
  },
  {
    currentindex: 0,
    slots: [
      {
        name: 'default',
        content: `  
        <!-- tab 0: -->
        <mc-tab slot="tab" icon="info-circle"><a href="#info">Info link as slot</a></mc-tab>
        <div class="panel" slot="panel">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" icon="globe"><a href="#work">Work link as slot</a></mc-tab>
        <div class="panel" slot="panel">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" icon="heart"><a href="#hobby">Hobby link as slot</a></mc-tab>
        <div class="panel" slot="panel">Hobby page that shows our interests.</div>`,
      },
    ],
    accessibility: true,
  },
];
