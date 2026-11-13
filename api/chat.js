/**
 * /api/chat — server-side proxy to your hosted model.
 * Keeps the API token off the browser. Configure in Vercel → Environment Variables:
 *   AI_API_URL   e.g. https://xxxx.endpoints.huggingface.cloud/v1   (OpenAI-compatible base URL)
 *   AI_API_KEY   your Hugging Face token (or whatever your host requires)
 *   AI_MODEL     optional, defaults to 2003Rohansinha/Qwen2.5-Coder-1.5B-Python-OCI-LoRA
 */
const DEFAULT_MODEL = '2003Rohansinha/Qwen2.5-Coder-1.5B-Python-OCI-LoRA';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const base = (process.env.AI_API_URL || '').trim().replace(/\/+$/, '');
  if (!base) {
    return res.status(503).json({ error: { message: 'AI_API_URL is not set on the server.' } });
  }

  const { messages, temperature, max_tokens } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50
      || JSON.stringify(messages).length > 60000) {
    return res.status(400).json({ error: { message: 'Invalid messages.' } });
  }

  const url = base.endsWith('/chat/completions') ? base : `${base}/chat/completions`;
  const key = (process.env.AI_API_KEY || '').trim();

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        model: (process.env.AI_MODEL || DEFAULT_MODEL).trim(),
        messages,
        temperature: typeof temperature === 'number' ? Math.min(Math.max(temperature, 0), 1.5) : 0.7,
        max_tokens: Math.min(Number(max_tokens) || 1024, 2048),
      }),
    });
    const text = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(502).json({ error: { message: `Could not reach the model server: ${err.message}` } });
  }
}
