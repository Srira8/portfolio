/* ============================================================
   PORTFOLIO DATA — single source of truth
   All components import from here. No hardcoded text in JSX.
   ============================================================ */

// ── Personal Info ────────────────────────────────────────────
export const personal = {
  name: 'Sriram Krishna',
  initials: 'SK',
  role: 'Software Engineer',
  tagline: 'Building scalable AI, ML, and cloud-native solutions that move fast and hold up under pressure.',
  location: 'Seattle, WA',
  email: 'sriramvk2908@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sriramkrishna-dev/',
  github: [
    { label: 'Srira8', url: 'https://github.com/Srira8' },
    { label: 'Sriram29v', url: 'https://github.com/Sriram29v' },
  ],
  resume: '/resume.pdf',
}

// ── Education ────────────────────────────────────────────────
export const education = {
  degree: 'MS Computer Science',
  school: 'Seattle University',
  graduated: 'June 2024',
}

// ── Summary ──────────────────────────────────────────────────
export const summary = [
  'Software Engineer with 4+ years of experience delivering scalable AI, ML, and cloud-native solutions across startups, research labs, and enterprise environments.',
  'Skilled in Python, cloud platforms (AWS, Azure, GCP), and MLOps practices. Deep expertise in Generative AI, LLM orchestration, RAG pipelines, and building fault-tolerant APIs that perform under real-world load.',
  'At Quadrant Technologies, architected and shipped a production Agentic AI platform — a Semantic Kernel Orchestrator dynamically coordinating 8 specialized Plugin Agents via MCP (Model Context Protocol) servers, with GPT-4 handling LLM-powered intent analysis, automated meeting scheduling, and human-in-the-loop escalation. Built for real enterprise workloads: event-driven, fully orchestrated, and operating without manual intervention.',
]

// ── Stats ────────────────────────────────────────────────────
export const stats = [
  { value: '79%', label: 'AUC on neuroimaging ML pipeline' },
  { value: '200+', label: 'Transactions per second (Stripe)' },
  { value: '70%', label: 'Processing time reduction' },
  { value: '75%', label: 'Data accuracy improvement' },
]

// ── Skills ───────────────────────────────────────────────────
export const skills = [
  {
    category: 'AI / ML & Gen AI',
    tags: [
      'ML Pipelines', 'Prompt Engineering', 'RAG', 'LLM Orchestration',
      'Hugging Face', 'PyTorch', 'TensorFlow', 'Semantic Kernel', 'Agentic AI',
    ],
  },
  {
    category: 'Cloud & MLOps',
    tags: [
      'GCP (Vertex AI, BigQuery, GKE)', 'AWS (S3, EC2, SageMaker)',
      'Azure (CosmosDB, Data Factory, Document Intelligence)',
      'Kubernetes', 'Docker', 'Terraform',
    ],
  },
  {
    category: 'Languages',
    tags: ['Python', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'Swift'],
  },
  {
    category: 'Frameworks',
    tags: ['Flask', 'FastAPI', 'React', 'Django', 'Selenium', 'GraphQL', 'gRPC', 'Angular', '.NET'],
  },
  {
    category: 'Data Engineering',
    tags: ['Airflow', 'Spark', 'Databricks', 'Snowflake', 'ETL Pipelines', 'PySpark'],
  },
  {
    category: 'DevOps & CI/CD',
    tags: ['Jenkins', 'GitHub Actions', 'Tekton', 'Fault Injection', 'TDD'],
  },
  {
    category: 'Databases',
    tags: ['SQL', 'MySQL', 'Redshift', 'Athena', 'CosmosDB', 'Firebase', 'PostgreSQL'],
  },
]

// ── Projects ─────────────────────────────────────────────────
export const projects = [
  {
    type: 'Cloud / AI',
    title: 'Scalable AI Cloud Deployment on Azure',
    description:
      'Cloud-native AI platform with Kubernetes-managed REST APIs and OAuth 2.0 auth. Automated AI model training via cloud orchestration pipelines and integrated CosmosDB for hierarchical model access.',
    tech: ['Azure', 'C#', 'SQL', 'Kubernetes', 'CosmosDB', 'OAuth 2.0'],
  },
  {
    type: 'Gen AI / RAG',
    title: 'Python Code Assistant using RAG',
    description:
      'Retrieval-Augmented Generation system that answers Python coding questions by retrieving relevant documentation and code snippets before generating responses.',
    tech: ['Python', 'RAG', 'LLM', 'Vector Search'],
    github: 'https://github.com/Srira8/Python_code_assitant_using_RAG',
  },
  {
    type: 'AI Agent',
    title: 'Intelligent Research Agent',
    description:
      'Autonomous research agent that intelligently gathers, synthesizes, and presents information on user-defined topics using LLM-powered reasoning.',
    tech: ['Python', 'LLM', 'Agentic AI'],
    github: 'https://github.com/Srira8/Intelligent-and-Research-Agent',
  },
  {
    type: 'AI / NLP',
    title: 'Fake News Detection',
    description:
      'NLP-based machine learning model for classifying news articles as real or fake using text features and supervised learning techniques.',
    tech: ['Python', 'NLP', 'Scikit-learn', 'ML'],
    github: 'https://github.com/Srira8/FakeNews-Detection',
  },
  {
    type: 'Azure / OCR',
    title: 'Document Intelligence OCR',
    description:
      'Python-based OCR pipeline using Azure Document Intelligence to extract and process structured data from unstructured documents.',
    tech: ['Python', 'Azure Document Intelligence', 'OCR'],
    github: 'https://github.com/Srira8/document-intelligence-ocr',
  },
  {
    type: 'Real-time Systems',
    title: 'Real-time Accident Detection System',
    description:
      'Django-based hospital coordination platform for emergency detection. Telemetry processed with Spark/PySpark and automated alerting for rapid emergency response.',
    tech: ['Python', 'Django', 'Spark', 'PySpark'],
  },
  {
    type: 'ML / Research',
    title: 'Prostate Carcinoma Classification',
    description:
      'Histopathology image processing and patch extraction pipeline achieving 72% accuracy classifying benign/malignant tissue using Gleason score grading.',
    tech: ['Python', 'CLAM', 'VGG16', 'CNN', 'PyTorch'],
  },
  {
    type: 'MLOps',
    title: 'Amazon SageMaker ML Deployment',
    description:
      'End-to-end supervised ML deployment with model registry and real-time endpoints. SageMaker Pipelines for CI/CD, drift monitoring, and automated retraining.',
    tech: ['AWS SageMaker', 'Python', 'S3', 'CloudWatch'],
    github: 'https://github.com/Srira8/ML-model-on-Amazon-SageMaker',
  },
  {
    type: 'ML / Data Science',
    title: 'California House Price Prediction',
    description:
      'Machine learning model predicting California housing prices using regression techniques on the California Housing dataset with feature engineering and model evaluation.',
    tech: ['Python', 'Scikit-learn', 'Jupyter', 'Pandas', 'NumPy'],
    github: 'https://github.com/Srira8/House_Prediction_California',
  },
  {
    type: 'AI / Chatbot',
    title: 'Plant Care Bot',
    description:
      'Conversational AI chatbot that provides plant care advice, watering schedules, and diagnosis for common plant issues using LLM-powered responses.',
    tech: ['Python', 'LLM', 'Chatbot'],
    github: 'https://github.com/Sriram29v/Plant_care_Bot',
  },
  {
    type: 'AI / Productivity',
    title: 'Job Application Assistant',
    description:
      'AI-powered assistant that helps users tailor resumes, craft cover letters, and prepare for interviews based on job descriptions.',
    tech: ['Python', 'LLM', 'NLP'],
    github: 'https://github.com/Srira8/Job-Application-Assistant',
  },
  {
    type: 'Automation',
    title: 'Quora Scraping using Selenium',
    description:
      'Automated Selenium pipeline for scraping and analyzing 10,000+ Quora interactions. Data used in peer-reviewed research on online Q&A behavior.',
    tech: ['Python', 'Selenium', 'Jupyter', 'Data Analysis'],
    github: 'https://github.com/Srira8/Quora-Scraping-using-Selenium',
  },
  {
    type: 'Web / Civic Tech',
    title: 'Seattle Parking Finder',
    description:
      'Web app for finding available parking spots across Seattle using location data and real-time availability information.',
    tech: ['HTML', 'JavaScript', 'CSS'],
    github: 'https://github.com/Srira8/Seattle-parking-finder',
  },
]

// ── Experience ───────────────────────────────────────────────
export const experience = [
  {
    role: 'Software Engineer',
    company: 'Quadrant Technologies LLC',
    location: 'Redmond, WA',
    period: 'May 2025 – Present',
    bullets: [
      'Built multi-permit compliance validation system using Azure Document Intelligence and GPT-4, automating pass/fail assessment across SWPPP, asbestos, and other permit types.',
      'Developed 4 scalable microservices (Python, Flask, REST, MCP servers) cutting processing time by 70%, coordinated with Semantic Kernel and Agentic AI.',
      'Built multi-tenant AI chatbot using Python, Streamlit, OpenAI, and Azure Blob Storage — improved response accuracy by 40%.',
      'Designed AI-driven event city selection system in Microsoft Fabric, cutting analysis time by 60%.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Seattle University',
    location: 'Seattle, WA',
    period: 'June 2024 – June 2025',
    bullets: [
      'Built ML pipeline on ABIDE I/II neuroimaging data achieving 79% AUC for diagnostic classification.',
      'Implemented compiler-level optimization for ML workloads, predictive caching, and runtime data transformation.',
      'Developed Selenium pipeline analyzing 10,000+ Quora interactions.',
      'Authored peer-reviewed IEEE papers on ML applications in brain imaging.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Radical X',
    location: 'Remote, NY',
    period: 'June 2023 – June 2024',
    bullets: [
      'Built high-throughput subscription and payout system with Stripe API handling 200+ transactions/sec.',
      'Delivered full-stack features using React, Node.js, and Firebase.',
      'Led Agile sprints and optimized performance under sustained high load.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Enuit LLC',
    location: 'Bengaluru, India',
    period: 'August 2021 – August 2022',
    bullets: [
      'Shipped 50+ features and resolved 200+ bug fixes for the ENTRADE trading platform serving global energy markets.',
      'Built automated testing pipelines reducing system downtime by 70%.',
      'Practiced TDD, fault injection, and regression testing across a complex financial codebase.',
    ],
  },
  {
    role: 'Business Intelligence Analyst',
    company: 'TE Connectivity',
    location: 'Bengaluru, India',
    period: 'February 2020 – July 2021',
    bullets: [
      'Designed data validation workflows across Athena, Redshift, and DBeaver — improving accuracy by 75%.',
      'Built forecasting dashboards that reduced operational overhead by 40%.',
    ],
  },
]
