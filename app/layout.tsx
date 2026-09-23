import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Chintala Mahindra | Java backend engineer',
  description: 'Java backend engineer in Hyderabad building secure Spring Boot systems, distributed services and practical AI applications.',
  openGraph: {
    title: 'Chintala Mahindra | Java backend engineer',
    description: 'Secure Spring Boot systems, distributed services and practical AI applications.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#BFE6D2',
}

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chintala Mahindra',
  jobTitle: 'Java backend engineer',
  email: 'chintalamahindra163@gmail.com',
  worksFor: { '@type': 'Organization', name: 'Tata Consultancy Services' },
  address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
  sameAs: ['https://github.com/ARGOD2213'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
