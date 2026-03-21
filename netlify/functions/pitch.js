import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SRIRAM_PROFILE = `
Name: Sriram Krishna
Role: Software Engineer | Location: Seattle, WA
Education: MS Computer Science, Seattle University, June 2024
Total Experience: 4+ years

Work History:
- Quadrant Technologies LLC (May 2025–Present): Built production Agentic AI platform with Semantic Kernel + 8 MCP Plugin Agents. Azure Document Intelligence + GPT-4 compliance validation. 4 microservices cutting processing 70%. Multi-tenant AI chatbot improving accuracy 40%.
- Seattle University Research Assistant (Jun 2024–Jun 2025): ML pipeline on neuroimaging data, 79% AUC. Compiler optimization. IEEE publications.
- Radical X Software Engineer (Jun 2023–Jun 2024): Stripe payment system 200+ TPS. React/Node.js/Firebase full-stack.
- Enuit LLC Software Engineer (Aug 2021–Aug 2022): 50+ features for ENTRADE trading platform. 70% downtime reduction via automated testing.
- TE Connectivity BI Analyst (Feb 2020–Jul 2021): 75% accuracy improvement in data validation. Forecasting dashboards.

Key Projects: RAG-based code assistant, Intelligent Research Agent, Fake News Detection, Azure AI Cloud Deployment, SageMaker ML Deployment, Prostate Carcinoma Classification (72% accuracy), Real-time Accident Detection System.

Core Skills:
- AI/ML: RAG, LLM Orchestration, Prompt Engineering, Agentic AI, Semantic Kernel, MCP Servers, PyTorch, TensorFlow, Hugging Face
- Cloud: AWS (SageMaker, S3, EC2), Azure (CosmosDB, Document Intelligence, Data Factory), GCP (Vertex AI, BigQuery)
- MLOps: Kubernetes, Docker, Terraform, Airflow, Databricks, Snowflake
- Languages: Python, C#, JavaScript, TypeScript, SQL, Java, Bash
- Frameworks: Flask, FastAPI, React, Django, .NET, gRPC, GraphQL
- Databases: PostgreSQL, CosmosDB, Redshift, Firebase, Athena
`

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { company, role, description } = await req.json()

    if (!company || !role) {
      return new Response(JSON.stringify({ error: 'Company and role are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `You are a professional career coach helping craft personalized hiring pitches.
Given a job description and a candidate's profile, write a compelling, specific pitch for why the candidate is an excellent fit.
Be concrete — reference specific skills, projects, and achievements from the profile that match the role.
Keep it to 3-4 tight paragraphs. Professional but not robotic. No generic filler phrases.`,
      messages: [
        {
          role: 'user',
          content: `Write a personalized pitch for why Sriram Krishna is a great fit for the following role:

Company: ${company}
Role: ${role}
${description ? `Job Description / Context: ${description}` : ''}

Here is Sriram's full profile:
${SRIRAM_PROFILE}

Write the pitch as if presenting Sriram to a hiring manager at ${company}.`,
        },
      ],
    })

    const pitch = response.content.find(b => b.type === 'text')?.text || 'Could not generate pitch.'

    return new Response(JSON.stringify({ pitch }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/api/pitch' }
