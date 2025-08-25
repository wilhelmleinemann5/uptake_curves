export const preview = [
  {
    label: 'Vue3',
    template: `// PaginationRouter.vue
<template>
  <mc-pagination
    totalpages="20"
    visiblepages="10"
    currentindex="$route && $route.params && $route.params.id ? +$route.params.id : 1"
  >
    <router-link
      :to="'/pagination-router/' + page"
      v-for="page in Array.from({ length: 20 }, (_, i) => i + 1)"
      :key="page"
      >{{ page }}</router-link
    >
  </mc-pagination>
</template>

<script lang="ts">
import '@maersk-global/mds-components-core/mc-pagination';
export default {};
</script>

/// router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PaginationRouter from '../views/PaginationRouter.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/pagination-router/:id',
    name: 'PaginationRouter',
    component: PaginationRouter,
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
    template: `// PaginationRouter.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { McPagination } from '@maersk-global/mds-react-wrapper/components-core/mc-pagination';

const PaginationRouter = () => {
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState<number>(id ? +id : 0);
  const pages = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div>
      <McPagination totalpages="20" currentpage={currentIndex} visiblepages="10">
        {pages.map((page, i) => (
          <Link key={i} onClick={() => setCurrentIndex(page)} to={\`/paginationrouter/\${page}\`}>
            {page}
          </Link>
        ))}
      </McPagination>
    </div>
  );
};

export default PaginationRouter;

// router
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import PaginationRouter from './app/PaginationRouter';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/paginationrouter">
          <Route path=":id" element={<PaginationRouter />} />
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
    template: `// pagination-router.component.html
<mc-pagination [totalpages]="20" [currentpage]="currentIndex$ | async" [visiblepages]="10">
  <a [routerLink]="['/paginationrouter/' + page]" *ngFor="let page of pages; index as i">{{ page }}</a>
</mc-pagination>

// pagination-router.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pagination-router',
  templateUrl: './pagination-router.component.html',
  styleUrls: ['./pagination-router.component.scss'],
})
export class PaginationRouterComponent implements OnInit {
  public id$: Observable<string | null> | undefined;
  public currentIndex$?: BehaviorSubject<number> = new BehaviorSubject(0);
  public pages = Array.from({ length: 20 }, (_, i) => i + 1);

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
import { PaginationRouterComponent } from './pagination-router/pagination-router.component';

const appRoutes: Route[] = [
  { path: 'paginationrouter/:id', component: PaginationRouterComponent },
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
