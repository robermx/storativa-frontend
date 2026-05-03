import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Carga el archivo .env basado en el directorio actual y el modo
  // El tercer parámetro '' carga todas las variables sin necesidad del prefijo VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [reactRouter(), tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: Number(env.PORT) || 5174,
      host: '0.0.0.0', // Recomendado para entornos de desarrollo en VPS
      allowedHosts: ['dev.storativa.com'], // Manteniendo la configuración que funcionó antes
    },
  };
});
