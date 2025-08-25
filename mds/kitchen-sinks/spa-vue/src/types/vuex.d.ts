declare module 'vuex' {
  export * from 'vuex/types/index.d.ts';
  export * from 'vuex/types/helpers.d.ts';
  export * from 'vuex/types/logger.d.ts';
  export * from 'vuex/types/vue.d.ts';
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}

