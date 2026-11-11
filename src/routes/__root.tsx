import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import appCss from '../styles.css?url'
import { ROLE } from '@/data/site'
import { PROFILE } from '@/data/cv'

const title = `Vinícius G Pereira | ${ROLE} · BI, Automação e Engenharia de Dados`
const description =
  'Portfólio de Vinícius G Pereira, analista de dados em logística de grande escala. Cases com resultados auditáveis em BI, automação RPA e engenharia de dados.'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vinícius Giovanni Pereira Barbosa',
  jobTitle: ROLE,
  sameAs: [PROFILE.linkedinUrl, PROFILE.githubUrl],
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: '/og.png' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: '/og.png' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'preload',
        href: '/assets/vinicius-hero.avif',
        as: 'image',
        type: 'image/avif',
        fetchPriority: 'high',
      },
      {
        rel: 'preload',
        href: '/assets/vinicius-hero.webp',
        as: 'image',
        type: 'image/webp',
        fetchPriority: 'high',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="bg-cream text-navy">
        <SmoothScroll />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
