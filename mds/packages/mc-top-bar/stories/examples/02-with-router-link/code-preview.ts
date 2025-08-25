export const preview = [
  {
    label: 'Vue3',
    template: `// TopBarRouter.vue
<template>
  <mc-top-bar product="Maersk Design System" productshort="MDS">
    <router-link slot="link" to="/home">Home</router-link>
    <div slot="actions" style="display: flex; gap: 16px;">
      <router-link class="mds-neutral--weak__text-color" to="/develop">Getting started for developers</router-link>
      <router-link class="mds-neutral--weak__text-color" to="/design">Getting started for designers</router-link>  
    </div>
  </mc-top-bar>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core-top-bar';
export default {};
</script>

// router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'React',
    template: `// main.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { McTopBar } from '@maersk-global/mds-react-wrapper/components-core/mc-top-bar';

const TopBarRouter = () => {
  return (
    <McTopBar product="Maersk Design System" productshort="MDS">
      <Link slot="link" to="/home">
        Home
      </Link>
      <div slot="actions" style="display: flex; gap: 16px;">
        <Link cssClass="mds-neutral--weak__text-color" to="/develop">Getting started for developers</Link>
        <Link cssClass="mds-neutral--weak__text-color" to="/design">Getting started for designers</Link>
      </div>
    </McTopBar>
  );
};
export default TopBarRouter;

// router
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'Angular',
    template: `// app.component.html
<mc-top-bar product="Maersk Design System" productshort="MDS">
  <a slot="link" routerLink="/home">Home</a>
  <div slot="actions" style="display: flex; gap: 16px;">
    <a class="mds-neutral--weak__text-color" routerLink="/develop">Getting started for developers</a>
    <a class="mds-neutral--weak__text-color" routerLink="/design">Getting started for designers</a>  
  </div>
</mc-top-bar>

// router
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
`,
    language: 'javascript',
    copy: true,
  },
];
