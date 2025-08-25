<template>
  <div class="mds-layout">
    <mc-top-bar product="SPA Vue" productshort="Vue">
      <router-link slot="link" to="/home">Home</router-link>
    </mc-top-bar>
    <mc-side-bar>
      <nav role="navigation">
        <ol>
          <li>
            <router-link to="/form">Form</router-link>
          </li>
          <li>
            <router-link to="/grid">Grid</router-link>
          </li>
          <li><router-link to="/content">Content</router-link></li>
          <li><router-link to="/table">Table</router-link></li>
          <li><router-link to="/table-nested">Table Nested</router-link></li>
          <li><router-link to="table-dynamic-cell-renderer">Table Dynamic Cell Renderer</router-link></li>
          <li>
            <router-link to="/typeahead">Typeahead</router-link>
          </li>
          <li>
            <router-link to="/typeahead-multiselect">Typeahead Multiselect</router-link>
          </li>
          <li>
            <router-link to="/select">Select</router-link>
          </li>
          <li>
            <router-link to="/validation">Validation</router-link>
          </li>
          <li>
            <router-link to="/tab-bar-router/1">Tab Bar with Router</router-link>
          </li>
          <li>
            <router-link to="/pagination-router/1">Pagination with Router</router-link>
          </li>
          <li>
            <router-link to="/menu-router/1">Menu with Router</router-link>
          </li>
          <li>
            <router-link to="/button-group-router/1">Button group with Router</router-link>
          </li>
          <li>
            <router-link to="/segmented-control-router/1">Segmented control with Router</router-link>
          </li>
          <li>
            <router-link to="/memory">Memory</router-link>
          </li>
          <li>
            <router-link to="/modal-open-input-on-focus">Modal Open Input on Focus</router-link>
          </li>
        </ol>
      </nav>
    </mc-side-bar>
    <div class="mds-page mds-container">
      <router-view />
      <footer>SPA VUE code examples</footer>
    </div>
  </div>
</template>
