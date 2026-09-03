/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEPLOY_TARGET?: 'local' | 'dev' | 'prod';
  readonly VITE_PUBLIC_ACCESS_MODE?: 'paused' | 'open';
  readonly PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
