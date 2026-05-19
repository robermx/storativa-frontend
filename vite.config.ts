import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [reactRouter(), tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: Number(env.PORT) || 5174,
      open: true,
    },
  };
});
