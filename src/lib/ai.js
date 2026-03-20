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
const API_URL     = env.VITE_AI_API_URL    || '';
const API_KEY     = env.VITE_AI_API_KEY    || '';
const MODEL_DEFAULT = env.VITE_AI_MODEL_DEFAULT || 'gpt-4o-mini';

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
    throw new Error(
      'AI API not configured. Set VITE_AI_API_URL in your .env file.'
    );
  }

  const model  = MODEL_MAP[modeId] || MODEL_DEFAULT;
  const system = SYSTEM_PROMPTS[modeId] || SYSTEM_PROMPTS.normal;

  const messages = [
    { role: 'system', content: system },
    ...history,
  ];

  const response = await fetch(`${API_URL}/chat/completions`, {
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
    throw new Error(
      err?.error?.message || `API error ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) throw new Error('No response received from the model.');
  return content;
}
