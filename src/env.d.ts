interface ImportMetaEnv {
  readonly VITE_APP_ROOT: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_I18N_LOCALE: string;
  readonly VITE_APP_I18N_FALLBACK_LOCALE: string;
  readonly VITE_APP_PUBLIC_PATH: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ROOT_API: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}