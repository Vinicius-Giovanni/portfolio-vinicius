import { createFileRoute, notFound } from '@tanstack/react-router'
import { getInsightBySlug } from '@/data/insights'
import { InsightArticle } from '@/components/insights/InsightArticle'
import { NavBar } from '@/components/ui/NavBar'

export const Route = createFileRoute('/insights/$slug')({
  loader: ({ params }) => {
    const insight = getInsightBySlug(params.slug)
    if (!insight) throw notFound()
    return { insight }
  },
  head: ({ loaderData }) => {
    const insight = loaderData?.insight
    if (!insight) return {}

    const title = `${insight.title} | Insights`
    const description = insight.hook

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: insight.title,
      datePublished: insight.date,
      ...(insight.updated ? { dateModified: insight.updated } : {}),
      author: {
        '@type': 'Person',
        name: 'Vinícius G Pereira',
      },
      description,
      keywords: insight.tags.join(', '),
    }

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(articleJsonLd),
        },
      ],
    }
  },
  component: InsightSlugPage,
})

function InsightSlugPage() {
  const { insight } = Route.useLoaderData()

  return (
    <>
      <NavBar forceVisible />
      <main className="min-h-screen bg-cream text-navy">
        <InsightArticle insight={insight} />
      </main>
    </>
  )
}
