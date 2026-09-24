export const isAiFeatureEnabled =
  import.meta.env.VITE_AI_ENABLED === 'true' &&
  import.meta.env.VITE_DEPLOY_TARGET !== 'prod';
