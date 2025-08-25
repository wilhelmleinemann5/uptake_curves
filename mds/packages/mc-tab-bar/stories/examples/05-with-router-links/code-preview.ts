export const preview = [
  {
    label: 'Vue3',
    template: `// TabBarRouter.vue
<template>
  <mc-tab-bar :currentindex="$route && $route.params && $route.params.id ? +$route.params.id : 0">
    <mc-tab slot="tab"><router-link to="/tab-bar-router/0">Tab 1</router-link></mc-tab>
    <div slot="panel">Tab 1</div>
    <mc-tab slot="tab"><router-link to="/tab-bar-router/1">Tab 2</router-link></mc-tab>
    <div slot="panel">Tab 2</div>
    <mc-tab slot="tab"><router-link to="/tab-bar-router/2">Tab 3</router-link></mc-tab>
    <div slot="panel">Tab 3</div>
  </mc-tab-bar>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';
export default {};
</script>

// router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TabBarRouter from '../views/TabBarRouter.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tab-bar-router/:id',
    name: 'TabBarRouter',
    component: TabBarRouter,
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
    template: `// TabBarRouter.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McTab } from '@maersk-global/mds-react-wrapper/components-core/mc-tab';
import { McTabBar } from '@maersk-global/mds-react-wrapper/components-core/mc-tab-bar';

const TabBarRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  return (
    <div>
      <McTabBar currentindex={currentIndex}>
        <McTab onClick={() => setCurrentIndex(0)} slot="tab">
          <Link to="/tabbarrouter/0">
            Tab 1
          </Link>
        </McTab>
        <div slot="panel">Tab 1</div>
        <McTab onClick={() => setCurrentIndex(1)} slot="tab">
          <Link to="/tabbarrouter/1">
            Tab 2
          </Link>
        </McTab>
        <div slot="panel">Tab 2</div>
        <McTab onClick={() => setCurrentIndex(2)} slot="tab">
          <Link to="/tabbarrouter/2">
            Tab 3
          </Link>
        </McTab>
        <div slot="panel">Tab 3</div>
      </McTabBar>
    </div>
  );
};
export default TabBarRouter;

// router
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import TabBarRouter from './app/TabBarRouter';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/tabbarrouter">
          <Route path=":id" element={<TabBarRouter />} />
        </Route>
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
    template: `// tab-bar-router.component.html
<mc-tab-bar [currentindex]="currentIndex$ | async">
  <mc-tab slot="tab"><a routerLink="/tabbarrouter/0">Tab 1</a></mc-tab>
  <div slot="panel">Tab 1</div>
  <mc-tab slot="tab"><a routerLink="/tabbarrouter/1">Tab 2</a></mc-tab>
  <div slot="panel">Tab 2</div>
  <mc-tab slot="tab"><a routerLink="/tabbarrouter/2">Tab 3</a></mc-tab>
  <div slot="panel">Tab 3</div>
</mc-tab-bar>

// tab-bar-router.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab-bar-router',
  templateUrl: './tab-bar-router.component.html',
  styleUrls: ['./tab-bar-router.component.scss'],
})
export class TabBarRouterComponent implements OnInit {
  public id$: Observable<string | null> | undefined;
  public currentIndex$?: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('id')));
    this.id$.subscribe((param) => {
      this.currentIndex$?.next(param ? +param : 0);
    });
  }
}

// router
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TabBarRouterComponent } from './tab-bar-router/tab-bar-router.component';

const appRoutes: Route[] = [
  { path: 'tabbarrouter/:id', component: TabBarRouterComponent },
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
