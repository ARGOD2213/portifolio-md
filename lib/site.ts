export const site = {
  name: 'Chintala Mahindra',
  role: 'Java backend engineer',
  location: 'Hyderabad, India',
  email: 'chintalamahindra163@gmail.com',
  phone: '',
  linkedin: '',
  github: 'https://github.com/ARGOD2213',
  resume: '',
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '',
  projects: [
    {
      name: 'Digital Library',
      kind: 'Secure Spring Boot application',
      desc: 'A backend-first digital library platform with role-based workflows, file storage, caching and cloud deployment.',
      tags: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Redis', 'JWT / RBAC', 'AWS'],
      github: '',
      live: '',
    },
    {
      name: 'PolicyDocs',
      kind: 'Secure RAG document service',
      desc: 'A Spring Boot + Spring AI document service for policy-document ingestion, semantic retrieval and grounded Q&A.',
      tags: ['Spring AI', 'pgvector', 'RAG', 'Redis', 'JWT / RBAC', 'AWS'],
      github: '',
      live: '',
    },
  ],
} as const
