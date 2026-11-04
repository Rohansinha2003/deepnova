/**
 * ai.js — DeepNova AI helper
 *
 * Uses an OpenAI-compatible Chat Completions endpoint.
 * Fill in the .env variables to activate.
 *
 * Env variables (all in .env):
 *   VITE_AI_API_URL          — Base URL  e.g. http://localhost:11434/v1
 *   VITE_AI_API_KEY          — API key   (leave empty for local models)
 *   VITE_AI_MODEL_DEFAULT    — Fallback model name
 *   VITE_AI_MODEL_NORMAL     — Model override for "Normal" mode
 *   VITE_AI_MODEL_SUMMARIZE  — Model override for "Summarize" mode
 *   VITE_AI_MODEL_TRANSLATE  — Model override for "Translate" mode
 *   VITE_AI_MODEL_CODE       — Model override for "Code" mode
 *   VITE_AI_MODEL_REASONING  — Model override for "Reasoning" mode
 */

const env = import.meta.env;

// ── Config ───────────────────────────────────────────────────
const API_URL     = (env.VITE_AI_API_URL || '').trim();
const API_KEY     = (env.VITE_AI_API_KEY || '').trim();
const MODEL_DEFAULT = env.VITE_AI_MODEL_DEFAULT || 'gpt-4o-mini';

function getChatCompletionsUrl() {
  if (!API_URL) return '';
  const normalized = API_URL.replace(/\/+$/, '');

  if (normalized.endsWith('/chat/completions')) return normalized;
  if (normalized.endsWith('/v1')) return `${normalized}/chat/completions`;
  if (normalized.includes('/v1/')) return `${normalized}/chat/completions`;
  return `${normalized}/chat/completions`;
}

/** Model selected per mode — falls back to the default if not set */
const MODEL_MAP = {
  normal:    env.VITE_AI_MODEL_NORMAL    || MODEL_DEFAULT,
  summarize: env.VITE_AI_MODEL_SUMMARIZE || MODEL_DEFAULT,
  translate: env.VITE_AI_MODEL_TRANSLATE || MODEL_DEFAULT,
  code:      env.VITE_AI_MODEL_CODE      || MODEL_DEFAULT,
  reasoning: env.VITE_AI_MODEL_REASONING || MODEL_DEFAULT,
};

// ── System prompts per mode ───────────────────────────────────
const SYSTEM_PROMPTS = {
  normal: `You are a helpful, concise assistant built by DeepNova AI.
Answer the user's question clearly and accurately.
Use markdown formatting where it improves readability.`,

  summarize: `You are a professional summarisation assistant built by DeepNova AI.
When given text or a topic, produce a crisp, structured summary.
Use bullet points for key takeaways. Be concise — no filler.`,

  translate: `You are an expert multilingual translator built by DeepNova AI.
Translate the user's text to the specified target language,
preserving tone, nuance, and formatting. If no language is specified, ask.`,

  code: `You are an expert software engineer and coding assistant built by DeepNova AI.
When asked to write, explain, or debug code:
- Provide clean, idiomatic code with brief inline comments.
- Wrap all code in the appropriate markdown code block with a language tag.
- After the code, give a short explanation of how it works.`,

  reasoning: `You are a step-by-step logical reasoning assistant built by DeepNova AI.
When presented with a problem or question:
- Break it into clear steps labelled Step 1, Step 2, etc.
- Show your working at each step.
- State your conclusion explicitly at the end.
Prioritise structured, rigorous thinking over speed.`,
};

function buildFallbackResponse(modeId, history) {
  const latestUser = history.filter(item => item.role === 'user').slice(-1)[0]?.content?.trim() || 'your request';
  const cleanText = latestUser.length > 140 ? `${latestUser.slice(0, 137)}...` : latestUser;

  switch (modeId) {
    case 'summarize':
      return `AI search is not configured yet. Summary preview for “${cleanText}”\n\n- Main idea: the request is about extracting the key points.\n- Focus: keep the explanation concise and structured.\n- Outcome: this fallback response shows how the summary experience will look once the live model is connected.`;
    case 'translate':
      return `AI search is not configured yet. Translation preview for “${cleanText}”\n\nThis fallback response demonstrates the translate mode. Add a real AI endpoint to receive actual translations for your text.`;
    case 'code':
      return [
        `AI search is not configured yet. Code helper preview for “${cleanText}”`,
        '',
        '```js',
        '// Example fallback response',
        'function help(query) {',
        '  return `Working on: ${query}`;',
        '}',
        '```',
        '',
        'Connect a live model to get real code suggestions and debugging help.',
      ].join('\n');
    case 'reasoning':
      return `AI search is not configured yet. Reasoning preview for “${cleanText}”\n\nStep 1: Identify the problem.\nStep 2: Break it into smaller parts.\nStep 3: Compare options and choose the clearest path.\n\nA live model can provide a fuller, more detailed reasoning answer.`;
    default:
      return `AI search is not configured yet. Here is a helpful preview for “${cleanText}”.\n\nThe live AI endpoint is not configured right now, so this preview shows the search experience in action while you connect a real model.`;
  }
}

// ── Core call function ────────────────────────────────────────
/**
 * Call the AI model for a given mode.
 *
 * @param {string}       modeId   - One of: normal | summarize | translate | code | reasoning
 * @param {Array}        history  - [{role:'user'|'assistant', content: string}, ...]
 * @param {AbortSignal}  signal   - AbortController signal for unmount cleanup
 * @returns {Promise<string>}      - The assistant's reply text
 */
export async function callAI(modeId, history, signal) {
  if (!API_URL) {
    return buildFallbackResponse(modeId, history);
  }

  const model  = MODEL_MAP[modeId] || MODEL_DEFAULT;
  const system = SYSTEM_PROMPTS[modeId] || SYSTEM_PROMPTS.normal;

  const messages = [
    { role: 'system', content: system },
    ...history,
  ];

  try {
    const chatUrl = getChatCompletionsUrl();
    if (!chatUrl) {
      return buildFallbackResponse(modeId, history);
    }

    const response = await fetch(chatUrl, {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: modeId === 'reasoning' ? 1 : 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const code = response.status;
      const msg  = err?.error?.message || '';

      const hints = {
        401: 'Invalid or expired API key (check VITE_AI_API_KEY).',
        403: 'API key not permitted for this model/endpoint.',
        404: `Endpoint or model not found (check VITE_AI_API_URL and model "${model}").`,
        429: 'Rate limit or quota exceeded on the AI provider.',
      };
      console.error('AI API error', code, err);
      throw new Error(`AI API ${code}: ${msg || hints[code] || response.statusText}${msg && hints[code] ? ` — ${hints[code]}` : ''}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) throw new Error('No response received from the model.');
    return content;
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    console.error('AI request failed', error);
    throw error instanceof TypeError
      ? new Error('Could not reach the AI endpoint (network/CORS error or wrong VITE_AI_API_URL).')
      : error;
  }
}
