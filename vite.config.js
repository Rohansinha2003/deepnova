import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Parse the AI base URL so the proxy target is just the origin
  // and the path (e.g. /v1) is preserved in the rewrite rule.
  const rawAiUrl = env.VITE_AI_API_URL || 'https://api-inference.huggingface.co/v1';
  let aiOrigin, aiBasePath;
  try {
    const parsed = new URL(rawAiUrl);
    aiOrigin   = parsed.origin;                              // e.g. https://api-inference.huggingface.co
    aiBasePath = parsed.pathname.replace(/\/$/, '');        // e.g. /v1
  } catch {
    aiOrigin   = rawAiUrl;
    aiBasePath = '';
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/ai': {
          target: aiOrigin,
          changeOrigin: true,
          // Rewrite /api/ai/... → {aiBasePath}/...  (e.g. /v1/chat/completions)
          rewrite: (path) => path.replace(/^\/api\/ai/, aiBasePath),
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
