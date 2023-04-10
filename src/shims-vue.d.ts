declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@elastic/apm-rum-vue' {
  export const ApmVuePlugin
}
