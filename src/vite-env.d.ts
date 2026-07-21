declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '*.css'

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
