import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const CHUNKS = {
  experience: `
Quadrant Technologies LLC — Software Engineer, Redmond WA (May 2025 – Present)
- Multi-permit compliance validation using Azure Document Intelligence and GPT-4
- Built 4 scalable microservices (Python, Flask, REST, MCP servers), cutting processing time by 70%
- Semantic Kernel and Agentic AI orchestration
- Multi-tenant AI chatbot (Python, Streamlit, OpenAI, Azure Blob Storage) — 40% accuracy improvement
- AI-driven event city selection in Microsoft Fabric — 60% faster analysis
- Production Agentic AI platform: Semantic Kernel Orchestrator + 8 Plugin Agents via MCP servers

Seattle University — Research Assistant (June 2024 – June 2025)
- ML pipeline on ABIDE I/II neuroimaging data achieving 79% AUC
- Compiler-level optimization for ML workloads
- Selenium pipeline analyzing 10,000+ Quora interactions
- Peer-reviewed IEEE papers on ML in brain imaging

Radical X — Software Engineer, Remote NY (June 2023 – June 2024)
- High-throughput subscription/payout system with Stripe API, 200+ transactions/sec
- Full-stack with React, Node.js, Firebase

Enuit LLC — Software Engineer, Bengaluru (August 2021 – August 2022)
- 50+ features and 200+ bug fixes for ENTRADE trading platform
- Automated testing pipelines reducing downtime by 70%

TE Connectivity — Business Intelligence Analyst (February 2020 – July 2021)
- Data validation workflows improving accuracy by 75%
- Forecasting dashboards reducing overhead by 40%
`,
  projects: `
Python Code Assistant using RAG — Python, RAG, LLM, Vector Search
Intelligent Research Agent — Python, LLM, Agentic AI
Fake News Detection — Python, NLP, Scikit-learn, ML
Document Intelligence OCR — Python, Azure Document Intelligence
Scalable AI Cloud Deployment on Azure — Azure, C#, Kubernetes, CosmosDB
Real-time Accident Detection System — Python, Django, Spark, PySpark
Prostate Carcinoma Classification — Python, CLAM, VGG16, CNN, PyTorch (72% accuracy)
Amazon SageMaker ML Deployment — AWS SageMaker, Python, S3
California House Price Prediction — Python, Scikit-learn, Jupyter
Plant Care Bot — Python, LLM, Chatbot
Job Application Assistant — Python, LLM, NLP
Quora Scraping using Selenium — Python, Selenium, Data Analysis
Seattle Parking Finder — HTML, JavaScript
`,
  skills: `
AI/ML & Gen AI: ML Pipelines, Prompt Engineering, RAG, LLM Orchestration, Hugging Face, PyTorch, TensorFlow, Semantic Kernel, Agentic AI, MCP Servers
Cloud & MLOps: GCP (Vertex AI, BigQuery, GKE), AWS (S3, EC2, SageMaker), Azure (CosmosDB, Data Factory, Document Intelligence), Kubernetes, Docker, Terraform
Languages: Python, C#, Java, JavaScript, TypeScript, SQL, Bash, Swift
Frameworks: Flask, FastAPI, React, Django, Selenium, GraphQL, gRPC, Angular, .NET
Data Engineering: Airflow, Spark, Databricks, Snowflake, ETL Pipelines, PySpark
DevOps & CI/CD: Jenkins, GitHub Actions, Tekton, Fault Injection, TDD
Databases: SQL, MySQL, Redshift, Athena, CosmosDB, Firebase, PostgreSQL
`,
  about: `
Name: Sriram Krishna | Role: Software Engineer | Location: Seattle, WA
Education: MS Computer Science, Seattle University, June 2024
Email: sriramvk2908@gmail.com | LinkedIn: https://www.linkedin.com/in/sriramkrishna-dev/
4+ years experience in AI, ML, cloud-native solutions, Gen AI, LLMs, Agentic AI, MCP servers.
`,
}

const TOOLS = [
  {
    name: 'search_experience',
    description: "Search Sriram's work experience by company, role, or technology. Use this for questions about his jobs, responsibilities, and achievements.",
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'What to search for in experience' } },
      required: ['query'],
    },
  },
  {
    name: 'search_projects',
    description: "Search Sriram's GitHub projects by name or technology stack.",
    input_schema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Project name or technology' } },
      required: ['query'],
    },
  },
  {
    name: 'get_skills',
    description: "Get Sriram's technical skills. Optionally filter by category like AI/ML, Cloud, Languages, Frameworks, etc.",
    input_schema: {
      type: 'object',
      properties: { category: { type: 'string', description: 'Skill category or "all"' } },
      required: ['category'],
    },
  },
  {
    name: 'get_about',
    description: 'Get general information about Sriram including contact details and summary.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
]

function executeTool(name, input) {
  switch (name) {
    case 'search_experience': {
      const words = input.query.toLowerCase().split(' ').filter(w => w.length > 2)
      const lines = CHUNKS.experience.split('\n').filter(l => l.trim())
      const hits = lines.filter(l => words.some(w => l.toLowerCase().includes(w)))
      return hits.length ? hits.join('\n') : CHUNKS.experience
    }
    case 'search_projects': {
      const words = input.query.toLowerCase().split(' ').filter(w => w.length > 2)
      const lines = CHUNKS.projects.split('\n').filter(l => l.trim())
      const hits = lines.filter(l => words.some(w => l.toLowerCase().includes(w)))
      return hits.length ? hits.join('\n') : CHUNKS.projects
    }
    case 'get_skills': {
      if (input.category === 'all') return CHUNKS.skills
      const hits = CHUNKS.skills.split('\n').filter(l =>
        l.toLowerCase().includes(input.category.toLowerCase())
      )
      return hits.length ? hits.join('\n') : CHUNKS.skills
    }
    case 'get_about':
      return CHUNKS.about
    default:
      return 'Tool not found'
  }
}

const AGENT_LABELS = {
  search_experience: 'Experience Agent',
  search_projects: 'Projects Agent',
  get_skills: 'Skills Agent',
  get_about: 'About Agent',
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { question } = await req.json()
    const steps = []
    const messages = [{ role: 'user', content: question }]

    steps.push({
      agent: 'Orchestrator',
      status: 'thinking',
      message: 'Analyzing your question and routing to specialist agents...',
    })

    let response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `You are an orchestrator agent on Sriram Krishna's portfolio website.
Your job is to use the available tools to retrieve relevant information about Sriram and answer the user's question.
Always call at least one tool before answering. Only answer questions related to Sriram's portfolio, skills, experience, and projects.
If the question is completely unrelated to his portfolio, politely say you can only answer portfolio-related questions.
Be concise and professional in your final answer.`,
      tools: TOOLS,
      messages,
    })

    while (response.stop_reason === 'tool_use') {
      const toolUses = response.content.filter(b => b.type === 'tool_use')
      const toolResults = []

      for (const toolUse of toolUses) {
        const agentName = AGENT_LABELS[toolUse.name] || 'Specialist Agent'
        const queryLabel = toolUse.input.query || toolUse.input.category || 'general info'
        steps.push({ agent: agentName, status: 'working', message: `Searching: "${queryLabel}"` })
        const result = executeTool(toolUse.name, toolUse.input)
        steps.push({ agent: agentName, status: 'done', message: 'Returned relevant context' })
        toolResults.push({ type: 'tool_result', tool_use_id: toolUse.id, content: result })
      }

      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: toolResults })

      response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are an orchestrator agent on Sriram Krishna's portfolio website.
Your job is to use the available tools to retrieve relevant information about Sriram and answer the user's question.
Always call at least one tool before answering. Only answer questions related to Sriram's portfolio, skills, experience, and projects.
If the question is completely unrelated to his portfolio, politely say you can only answer portfolio-related questions.
Be concise and professional in your final answer.`,
        tools: TOOLS,
        messages,
      })
    }

    const answer = response.content.find(b => b.type === 'text')?.text || 'No answer generated.'
    steps.push({ agent: 'Synthesis Agent', status: 'done', message: 'Composing final answer...' })

    return new Response(JSON.stringify({ steps, answer }), {
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

export const config = { path: '/api/multi-agent' }
