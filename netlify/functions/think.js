import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const CONTEXT = `
You are answering questions about Sriram Krishna's portfolio.

About Sriram:
- Software Engineer with 4+ years experience in AI, ML, and cloud-native solutions
- Currently at Quadrant Technologies: built production Agentic AI platform with Semantic Kernel + 8 MCP Plugin Agents, Azure Document Intelligence + GPT-4 compliance validation, multi-tenant AI chatbot
- Research Assistant at Seattle University: ML pipeline on neuroimaging achieving 79% AUC, IEEE publications
- Previously at Radical X (Stripe payment system, 200+ TPS), Enuit LLC (ENTRADE trading platform), TE Connectivity (BI/data analytics)
- MS Computer Science, Seattle University, June 2024
- Skills: Python, RAG, LLM Orchestration, Agentic AI, Semantic Kernel, MCP Servers, Azure, AWS, GCP, Kubernetes, Docker, React, FastAPI, Flask, PyTorch, TensorFlow
- Projects: RAG code assistant, Intelligent Research Agent, Fake News Detection, Azure AI Deployment, SageMaker ML Deployment, Prostate Carcinoma Classification, Real-time Accident Detection

Only answer questions related to Sriram's portfolio. If unrelated, say so politely.
`

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { question } = await req.json()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 16000,
      thinking: { type: 'enabled', budget_tokens: 10000 },
      system: CONTEXT,
      messages: [{ role: 'user', content: question }],
    })

    const thinkingBlock = response.content.find(b => b.type === 'thinking')
    const textBlock = response.content.find(b => b.type === 'text')

    return new Response(
      JSON.stringify({
        thinking: thinkingBlock?.thinking || null,
        answer: textBlock?.text || 'No answer generated.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/api/think' }
