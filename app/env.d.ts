declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // añade aquí otras variables que uses...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}