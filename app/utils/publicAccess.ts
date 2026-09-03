export const isPublicAccessPaused =
  import.meta.env.VITE_DEPLOY_TARGET === 'prod' &&
  import.meta.env.VITE_PUBLIC_ACCESS_MODE !== 'open';
