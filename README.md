# DeepNova AI

DeepNova AI is a polished, modern React application designed to showcase an AI-first experience through an animated landing page, an interactive search interface, and a clean marketing website structure.

## Overview

This project combines a strong visual identity with a practical AI assistant experience. The homepage includes:

- A neural-inspired animated hero section
- A multi-mode AI search experience for normal, summarize, translate, code, and reasoning workflows
- A responsive, professional marketing layout for services and company information
- Clear call-to-action sections for engagement and conversion

## Tech Stack

- React
- Vite
- React Router
- Lucide React
- Vanta.js for animated background effects

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available locally at the Vite development URL shown in the terminal.

## Build

```bash
npm run build
```

## AI Configuration

The search experience can be connected to an OpenAI-compatible API endpoint.

Set the following environment variables if you want live AI responses:

```bash
VITE_AI_API_URL=
VITE_AI_API_KEY=
VITE_AI_MODEL_DEFAULT=
VITE_AI_MODEL_NORMAL=
VITE_AI_MODEL_SUMMARIZE=
VITE_AI_MODEL_TRANSLATE=
VITE_AI_MODEL_CODE=
VITE_AI_MODEL_REASONING=
```

If no endpoint is configured, the app gracefully shows a helpful fallback preview so the experience remains usable.

## Deployment

The project is ready for deployment on platforms such as Vercel or Netlify.

Typical deployment steps:

```bash
npm run build
```

Then publish the generated build output through your hosting platform of choice.

## Project Structure

```
src/
  components/   # Page sections, navigation, hero, CTA, and shared UI
  data/         # Content data for services and sections
  lib/          # AI helper utilities
```

## License

This project is intended for internal and client-facing demonstration purposes.
