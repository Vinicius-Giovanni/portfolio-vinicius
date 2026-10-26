import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { SmoothScroll } from '@/components/ui/SmoothScroll'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Vinícius G Pereira | Engenharia de Dados & Desenvolvimento de Software' },
      {
        name: 'description',
        content:
          'Portfólio de Vinícius G Pereira, focado em Engenharia de Dados, Desenvolvimento de Software e fundador da Cosmos. Conheça os projetos e entre em contato.',
      },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:title',
        content: 'Vinícius G Pereira | Engenharia de Dados & Desenvolvimento de Software',
      },
      {
        property: 'og:description',
        content:
          'Portfólio de Vinícius G Pereira — Engenharia de Dados, Software e fundador da Cosmos.',
      },
      { property: 'og:image', content: '/og.jpg' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: '/og.jpg' },
    ],
    links: [{ rel: 'stylesheet', href: appCss },
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