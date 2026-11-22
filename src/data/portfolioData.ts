/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  THE ONLY FILE YOU NEED TO EDIT FOR TEXT CONTENT             ║
 * ║  (images live in /public – see README.md)                    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

/* ───────────── 1. BASIC INFO ───────────── */
export const SITE = {
  name: 'Jayakrishna Dontharabina', // shown in navbar, footer, hero, about
  pageTitle: 'Jayakrishna Dontharabina – Full-Stack Software Engineer', // browser tab title
  role: 'Full-Stack Software Engineer', // footer subtitle
  email: 'dontharaboinajayakrishna@gmail.com',
  // digits only, with country code, no + or spaces (e.g. 919876543210)
  phone: '919392446556',
  whatsappMessage: 'Hi Jayakrishna, I visited your portfolio and would like to get in touch.',
  available: true,
};

/* ───────────── 2. HERO (top of page) ───────────── */
export const HERO = {
  eyebrow: 'FULL-STACK SOFTWARE ENGINEER',
  headline: 'JAYAKRISHNA DONTHARABOINA', // big text, use CAPS
  roles: ['FULL-STACK ENGINEER', 'AI & SYSTEMS ARCHITECT'] as [string, string],
  tagline: 'Building enterprise web platforms, scalable micro-frontends, high-performance async APIs, and production AI/RAG systems.',
  primaryButton: 'EXPLORE MY WORK',
  secondaryButton: 'Get In Touch',
  image: '/assets/hero-red-bg.jpg', // 1920x1080, subject on the RIGHT side (~74% across)
  imageAlt: 'Portrait of Jayakrishna Dontharabina',
  imagePosition: '74% center', // CSS object-position fallback
};

/* ───────────── 3. LOADING SCREEN ───────────── */
export const LOADER = {
  statement: 'ARCHITECTING RESILIENT ENTERPRISE PLATFORMS AND PRODUCTION AI SYSTEMS',
  redWords: ['ENTERPRISE', 'PRODUCTION', 'AI'], // words highlighted in red
};

/* ───────────── 4. ABOUT ───────────── */
export const ABOUT = {
  eyebrow: 'Full-Stack Engineer · AI & Microservices · System Architecture',
  portrait: '/media/profile.webp', // 4:5 portrait photo
  portraitAlt: 'Portrait of Jayakrishna Dontharabina',
  portraitCaption: 'Full-Stack Software Engineer', // shown on the photo chip when SITE.available is false
  portraitDots: '/media/portrait-cutout.webp', // transparent cut-out used for the 3D dots portrait
  paragraphs: [
    'I am a Full-Stack Software Engineer with overall 2 + years of experience engineering enterprise web platforms using React, TypeScript, Node.js, Express.js, and FastAPI. I specialize in micro-frontend architectures, high-performance asynchronous RESTful APIs, JWT/RBAC security, and multi-database persistence.',
    'I build production-grade features merging modern web engineering with LLM-powered capabilities—including two-stage hybrid RAG pipelines and autonomous agent tool execution—alongside robust enterprise integrations with ServiceNow, Keycloak, and Microsoft Entra ID.',
  ],
  technologies: [
    'React 18',
    'TypeScript',
    'FastAPI',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'AWS OpenSearch',
    'Redis',
    'Prisma ORM',
    'TailwindCSS',
    'BullMQ',
  ],
  focus: [
    'Enterprise Web & Micro-Frontends',
    'High-Throughput Asynchronous APIs',
    'Autonomous AI Agents & RAG Pipelines',
  ],
};

/* ───────────── 4b. WHY ME (card under the About photo) ───────────── */
export const WHY_ME = {
  stats: [
    { value: '2+', label: 'Years experience' },
    { value: '15+', label: 'Production modules' },
    { value: '2', label: 'Companies' },
  ],
  points: [
    'End-to-end delivery – React/TypeScript front-ends through FastAPI & Node.js services',
    'Production AI – hybrid RAG pipelines and tool-using agents shipped in real products',
    'Enterprise-ready – ServiceNow, Keycloak & Microsoft Entra ID integrations with RBAC',
    'Performance-minded – cut external API latency by more than 80%',
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'RAG / LLMs'],
};

/* ───────────── 5. SOCIAL LINKS (footer) ───────────── */
export const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Jayakrishna0511' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jayakrishna-dontharaboina-769813290/' },
] as const;

/* ───────────── 6. TECHNICAL SKILLS (6 cards look best) ───────────── */
export const SKILL_CARDS: { name: string; category: string; level: string }[] = [
  {
    name: 'Frontend & Micro-Frontends',
    category: 'React 18 · TypeScript · Redux Toolkit · Webpack Module Federation · Tailwind',
    level: 'Advanced',
  },
  {
    name: 'Backend & Microservices',
    category: 'FastAPI · Python · Node.js · Express.js · Pydantic · HTTPX · Async REST APIs',
    level: 'Advanced',
  },
  {
    name: 'AI Engineering & RAG',
    category: 'pgvector · SentenceTransformers · RRF · Cross-Encoder · Claude & Gemini APIs',
    level: 'Advanced',
  },
  {
    name: 'Database Persistence',
    category: 'PostgreSQL · MongoDB · Prisma ORM · Redis · AWS OpenSearch · MySQL',
    level: 'Advanced',
  },
  {
    name: 'Security & Identity',
    category: 'JWT · OAuth 2.0 · Keycloak · RBAC Engines · Microsoft Entra ID · PII Masking',
    level: 'Proficient',
  },
  {
    name: 'Enterprise Integrations',
    category: 'ServiceNow (ITSM / CMDB / ITIL v4) · Jira API · BullMQ · AWS RDS',
    level: 'Proficient',
  },
];

/* ───────────── 6b. TECH STACK STRIP (logos under the skills) ─────────────
 * Use names with a built-in logo: React, JavaScript, Python, FastAPI, PostgreSQL,
 * Supabase, SQLite, Three.js, GSAP. Any other name still shows as a lettered badge. */
export const TECH_STACK: string[] = [
  'JavaScript',
  'React',
  'TypeScript',
  'Node.js',
  'Express.js',
  'FastAPI',
  'Python',
  'MongoDB',
  'PostgreSQL',
  'HTML',
  'CSS',
  'Tailwind',
  'Bootstrap',
  'Claude',
  'AI',
  'Redis',
  'AWS',
];

/* ───────────── 7. PROJECTS ─────────────
 * Thumbnails: put project-<n>-1.jpg, -2.jpg, -3.jpg in /public/assets/thumbnails/
 * (card cycles through 1-3). Set poster to the "-1.jpg" file.
 * Add liveUrl / repoUrl to show "View Live" / "View Code" buttons.
 * 6 or 9 projects fill the 3D grid best. */
export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  videoUrl?: string;
  embedUrl?: string;
  driveUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  kind?: 'video' | 'software';
  poster?: string;
  description?: string;
  tags?: string[];
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'opscan-velis-platform',
    kind: 'software',
    title: 'Opscan – Velis Platform (Full-Stack Module)',
    subtitle: 'Micro-frontend operations dashboard & remote task scheduling engine',
    category: 'Full-Stack / MFE',
    poster: '/assets/thumbnails/project-1-1.jpg',
    description:
      'Developed a micro-frontend (MFE) operations dashboard with React 18, TypeScript, and Webpack Module Federation. Built RESTful APIs with Node.js and Express for Linux/Windows remote task scheduling, secured with JWT authentication, custom RBAC, multi-tier (L1/L2) change approvals, dual-database persistence (MongoDB & PostgreSQL via Prisma), and real-time AWS OpenSearch log streaming.',
    tags: ['React 18', 'TypeScript', 'Node.js', 'Express.js', 'Webpack MFE', 'MongoDB', 'PostgreSQL', 'AWS OpenSearch', 'RBAC'],
    liveUrl: 'https://dev.velis.aifalabs.com',
    repoUrl: 'https://dev.velis.aifalabs.com',
  },
  {
    id: 'servicenow-itsm-cmdb-integration',
    kind: 'software',
    title: 'ServiceNow ITSM & CMDB Integration Service',
    subtitle: 'Enterprise ticket lifecycle automation & CMDB CI synchronization',
    category: 'Enterprise Integration',
    poster: '/assets/thumbnails/project-2-1.jpg',
    description:
      'Architected and developed an enterprise ServiceNow ITSM and CMDB integration service using FastAPI and React/TypeScript, automating ticket lifecycle management and asset synchronization. Engineered automated CMDB discovery reducing external API latency by over 80%, dual-association asset architecture, and an ITIL v4 state machine for Change Request progression.',
    tags: ['FastAPI', 'Python', 'React', 'TypeScript', 'ServiceNow Table API', 'CMDB', 'ITIL v4', 'Pydantic', 'HTTPX'],
    liveUrl: 'https://dev.velis.aifalabs.com',
    repoUrl: 'https://dev.velis.aifalabs.com',
  },
  {
    id: 'automated-user-onboarding',
    kind: 'software',
    title: 'Automated User Onboarding – (workflow)',
    subtitle: 'Azure Tenant ID identification & Microsoft Entra ID access provisioning',
    category: 'Identity & Security',
    poster: '/assets/thumbnails/project-3-1.jpg',
    description:
      'Developed an automated onboarding workflow that uses the Azure Tenant ID to identify an organization’s Microsoft Entra ID environment and provision user access, reducing manual intervention and improving onboarding efficiency.',
    tags: ['Microsoft Azure', 'Microsoft Entra ID', 'Workflow Automation', 'Access Provisioning', 'OAuth 2.0'],
    liveUrl: 'https://dev.velis.aifalabs.com',
    repoUrl: 'https://dev.velis.aifalabs.com',
  },
  {
    id: 'aifa-360-ai-assistant',
    kind: 'software',
    title: 'AIFA 360 – Employee Management & Asset Request/Tracking Platform (AI Assistant Module)',
    subtitle: 'Two-stage hybrid RAG pipeline & autonomous agent with human-in-the-loop',
    category: 'AI & LLM',
    poster: '/assets/thumbnails/project-4-1.jpg',
    description:
      'Built a two-stage RAG pipeline combining dense vector search (all-MiniLM-L6-v2 on pgvector) and PostgreSQL full-text search (TSVECTOR) via Reciprocal Rank Fusion, refined by a cross-encoder reranker. Engineered an autonomous agent loop (Gemini / Claude Haiku) with dynamic tool execution, code-level security guardrails, and real-time SSE token and voice streaming.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL (pgvector)', 'SentenceTransformers', 'Claude / Gemini', 'SSE'],
    liveUrl: 'https://dev.velis.aifalabs.com',
    repoUrl: 'https://dev.velis.aifalabs.com',
  },
  {
    id: 'employee-management-system',
    kind: 'software',
    title: 'Employee Management System',
    subtitle: 'Full-stack employee records platform with RBAC & AWS RDS PostgreSQL',
    category: 'Full-Stack Web',
    poster: '/assets/thumbnails/project-5-1.jpg',
    description:
      'Contributed as part of a team to a full-stack employee management application (React, Node.js, Express.js, PostgreSQL on AWS RDS) supporting CRUD operations, JWT authentication, and role-based access control for secure administration of employee records. Developed REST APIs and optimized database queries on AWS RDS.',
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL (AWS RDS)', 'JWT', 'RESTful APIs', 'Bootstrap', 'CSS'],
    liveUrl: 'https://dev.velis.aifalabs.com',
    repoUrl: 'https://dev.velis.aifalabs.com',
  },
];

/* ───────────── 8. SERVICES & PRICING ───────────── */
export const SERVICES_PRICING = [
  {
    id: 'service-1',
    title: 'Full-Stack Web Applications (React & Node.js/FastAPI)',
    priceLabel: 'Starts from',
    price: '₹25,000',
    featured: true,
  },
  {
    id: 'service-2',
    title: 'AI Assistants, RAG Pipelines & Agentic Tools',
    priceLabel: 'Starts from',
    price: '₹30,000',
    featured: true,
  },
  {
    id: 'service-3',
    title: 'Enterprise Microservices & Async API Architecture',
    priceLabel: 'Starts from',
    price: '₹20,000',
    featured: false,
  },
  {
    id: 'service-4',
    title: 'ServiceNow & Third-Party System Integrations',
    priceLabel: 'From – to',
    price: '₹20,000 – ₹45,000',
    featured: false,
  },
  {
    id: 'service-5',
    title: 'Database Architecture & Auth/RBAC Security Hardening',
    priceLabel: 'From – to',
    price: '₹15,000 – ₹35,000',
    featured: false,
  },
] as const;

/* ───────────── 9. HEADLINE NUMBERS (under hero) ───────────── */
export const CLIENT_STATS = [
  { id: 'stat-1', value: 15, suffix: '+', label: 'Production Modules & Projects' },
  { id: 'stat-2', value: 80, suffix: '%', label: 'External API Latency Reduction' },
  { id: 'stat-3', value: 100, suffix: '%', label: 'Audit Compliance & RBAC Precision' },
] as const;

/* Derived – do not edit */
export const WHATSAPP_URL = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/* ───────────── 10. PROFESSIONAL EXPERIENCE ───────────── */
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'aifa-labs',
    role: 'Software Engineer-1',
    company: 'Aifa Labs Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Sep 2025 – Present',
    current: true,
    summary: 'Delivering production features across enterprise web platforms, asynchronous microservices, and AI-driven automation.',
    highlights: [
      'Architected an enterprise ServiceNow ITSM & CMDB integration service with FastAPI and React/TypeScript, reducing p90 external API latency by >80%.',
      'Developed a micro-frontend (MFE) operations dashboard for Opscan – Velis Platform with React 18, TypeScript, and Webpack Module Federation.',
      'Built an intelligent AI assistant for AIFA 360 using a two-stage hybrid RAG pipeline (pgvector + FTS fused with RRF, cross-encoder reranking) and an autonomous agent loop with human-in-the-loop approvals.',
      'Designed a decoupled dual-database persistence layer (MongoDB and PostgreSQL via Prisma) using the Repository Pattern.',
      'Implemented policy-driven multi-tier (L1/L2) change-approvals with JWT authentication and custom RBAC before production execution.',
      'Delivered real-time log aggregation and stdout/stderr streaming across distributed servers via AWS OpenSearch.',
      'Engineered automated onboarding workflows provisioning user access through Azure Tenant IDs and Microsoft Entra ID.',
    ],
    technologies: ['React 18', 'TypeScript', 'FastAPI', 'Python', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Prisma ORM', 'AWS OpenSearch', 'pgvector', 'TailwindCSS'],
  },
  {
    id: 'flying-fox-labs',
    role: 'Software Developer',
    company: 'Flying Fox Labs Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Oct 2024 – Mar 2025',
    current: false,
    summary: 'Contributed as part of a team to full-stack employee management applications, REST API development, and database query optimization.',
    highlights: [
      'Contributed to a full-stack employee management application (React, Node.js, Express.js, PostgreSQL on AWS RDS) supporting CRUD operations, JWT authentication, and RBAC.',
      'Developed and refined responsive user interface components in React using Bootstrap and CSS, improving usability across the application.',
      'Implemented application functionalities and integrated them with existing REST APIs in cross-functional collaboration.',
      'Identified and fixed bugs in the existing codebase, enhancing reliability and system stability.',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL (AWS RDS)', 'JWT', 'RESTful APIs', 'Bootstrap', 'CSS'],
  },
];

