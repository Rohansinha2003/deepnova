import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // All /api/ai/* requests are forwarded to the HuggingFace (or custom) endpoint
        '/api/ai': {
          target: env.VITE_AI_API_URL || 'https://api-inference.huggingface.co/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.VITE_AI_API_KEY;
              if (key) proxyReq.setHeader('Authorization', `Bearer ${key}`);
            });
          },
        },
      },
    },
  };
});

