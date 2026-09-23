'use client'
import { useState } from 'react'
import { site } from '@/lib/site'

const stack = [
  { title: 'Backend', items: 'Java 21, Spring Boot 3, REST APIs, JPA / Hibernate, microservices' },
  { title: 'Distributed', items: 'Apache Kafka, Redis, AWS, Docker, CI/CD' },
  { title: 'AI applications', items: 'Spring AI, RAG, embeddings, vector search, pgvector' },
]
const experience = [
  'Spring Boot 3 microservices on Java 21',
  'REST APIs and Spring Data JPA over PostgreSQL and SQL Server',
  'JWT authentication and RBAC across employee, HR and admin endpoints',
  'Kafka for asynchronous events, Redis for caching',
  'Spring AI for document and policy Q&A with application-level access control',
  'Production debugging and Agile enhancements',
]
const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
function CopyButton({ value, label }: { value: string; label: string }) {
  const [done,setDone]=useState(false)
  return <button type="button" className="btn btn-small" aria-label={`Copy ${label}`} onClick={async()=>{try{await navigator.clipboard.writeText(value);setDone(true);setTimeout(()=>setDone(false),1600)}catch{}}}>{done?'Copied':'Copy'}</button>
}
const intents=['Job opportunity','Freelance project','Just saying hi'] as const
function Contact(){
 const [intent,setIntent]=useState<(typeof intents)[number]>(intents[0])
 const subject=`${intent} for Chintala Mahindra`
 return <><h2>Let’s build something useful</h2><p className="lede">Open to Java backend roles, AI-enabled backend projects and selected freelance work. Email is the fastest way to reach me.</p>
 <div className="chips" role="group" aria-label="What is this about?">{intents.map(x=><button key={x} type="button" className="pill" aria-pressed={intent===x} onClick={()=>setIntent(x)}>{x}</button>)}</div>
 <ul className="rows"><li className="row"><a href={mailto(subject)}><span className="rlabel">Email</span><span className="rvalue">{site.email}</span></a><CopyButton value={site.email} label="email address"/></li>
 {site.github&&<li className="row"><a href={site.github} target="_blank" rel="noopener noreferrer"><span className="rlabel">GitHub</span><span className="rvalue">Open profile</span></a></li>}</ul>
 <p className="meta">Based in {site.location}</p></>
}
export function PanelBody({i,onGo}:{i:number;onGo:(n:number)=>void}){
 switch(i){
 case 0:return <><h1>{site.name}</h1><p className="lede">{site.role}. I build secure Spring Boot systems, distributed backend services and practical AI applications.</p><div className="actions"><a className="btn btn-primary" href={mailto('Opportunity for Chintala Mahindra')}>Email Mahindra</a><button type="button" className="btn" onClick={()=>onGo(1)}>Enter the room</button></div><p className="meta">Scroll to move through the room.</p></>
 case 1:return <><h2>Backend first, AI where it fits</h2><p>Java backend engineering is the centre of my work: APIs, persistence, security, messaging, caching and cloud delivery. AI sits on top of that foundation through practical patterns such as retrieval, embeddings and controlled LLM access.</p><p className="meta">Software engineer at Tata Consultancy Services, {site.location}.</p></>
 case 2:return <><h2>Tata Consultancy Services</h2><p className="sub">Software Engineer, Java backend. Aug 2024 to present.</p><p>Enterprise HRMS and finance microservices in Hyderabad.</p><ul className="list">{experience.map(x=><li key={x}>{x}</li>)}</ul></>
 case 3:return <><h2>Selected work</h2>{site.projects.map(p=><article key={p.name} className="project"><h3>{p.name}</h3><p className="sub">{p.kind}</p><p>{p.desc}</p><ul className="tags">{p.tags.map(t=><li key={t}>{t}</li>)}</ul></article>)}</>
 case 4:return <><h2>What is on the shelf</h2>{stack.map(g=><div key={g.title} className="group"><h3>{g.title}</h3><p>{g.items}</p></div>)}<p className="meta">In my AI work the model never decides authorization. The application controls what context reaches it.</p></>
 default:return <Contact/>
 }
}
