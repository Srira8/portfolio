# Sriram Krishna — Personal Portfolio

A personal portfolio website built with **React + Vite**, deployed on **Netlify**, featuring an AI-powered chat assistant backed by the **Anthropic Claude API**.

🔗 **Live site:** [regal-bombolone-897727.netlify.app](https://regal-bombolone-897727.netlify.app)

---

## Features

- **Hero** — Full-viewport intro with name, role, tagline, and CTA buttons
- **About** — Summary, education, and key metrics (79% AUC, 200+ TPS, 70% time reduction)
- **Skills** — Grouped skill cards across 7 categories (AI/ML, Cloud, Languages, Frameworks, etc.)
- **Projects** — Card grid featuring Azure, SageMaker, Django, and ML research projects
- **Experience** — Vertical timeline across 5 roles (Quadrant Technologies, Seattle University, Radical X, Enuit, TE Connectivity)
- **Contact** — Links to Email, LinkedIn, and GitHub profiles
- **AI Chat Widget** — Floating chat assistant powered by Claude (Haiku) that answers questions about Sriram's experience, skills, and projects using RAG over portfolio data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS Modules |
| Fonts | DM Sans + DM Serif Display (Google Fonts) |
| Serverless API | Netlify Functions |
| AI / LLM | Anthropic Claude API (claude-haiku-4-5) |
| Deployment | Netlify (auto-deploys from GitHub) |
| Version Control | GitHub |

---

## Project Structure

```
portfolio/
├── netlify/
│   └── functions/
│       └── chat.js          # Serverless function — Claude API proxy
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Projects/
│   │   ├── Experience/
│   │   ├── Contact/
│   │   └── Chat/            # AI chat widget
│   ├── data/
│   │   └── portfolioData.js # Single source of truth for all content
│   ├── styles/
│   │   └── global.css       # CSS variables, fonts, shared utilities
│   └── App.jsx
├── netlify.toml
└── package.json
```

---

## Local Development

### Prerequisites
- Node.js 18+
- Netlify CLI (`npm install -g netlify-cli`)
- Anthropic API key

### Setup

```bash
# Install dependencies
npm install

# Create .env file in project root
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env

# Start local dev server with Netlify Functions
netlify dev
```

Open `http://localhost:8888` — the chat widget requires `netlify dev` (not `npm run dev`) to work locally.

### Build

```bash
npm run build
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key for the Claude chat function |

Set this in Netlify: **Project configuration → Environment variables**

---

## AI Chat Assistant

The chat widget uses a **RAG (Retrieval-Augmented Generation)** pattern:

1. User sends a message via the floating chat button
2. The frontend sends the conversation to `/api/chat` (Netlify Function)
3. The function injects Sriram's full portfolio data as a system prompt context
4. Claude (Haiku) generates a response grounded in that context
5. The API key is never exposed to the client

---

## Deployment

The site auto-deploys to Netlify on every push to the `main` branch.

```bash
git add .
git commit -m "your message"
git push
```

---

## Author

**Sriram Krishna** — Software Engineer, Seattle WA
[sriramvk2908@gmail.com](mailto:sriramvk2908@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sriramkrishna-dev/) · [GitHub](https://github.com/Srira8)
