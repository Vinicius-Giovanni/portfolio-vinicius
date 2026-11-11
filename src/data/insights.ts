import type { Evidence } from './evidence'

export type Territory = {
  id: string
  label: string
  description: string
  visible: boolean
}

export const TERRITORIES: Territory[] = [
  {
    id: 'data-intelligence',
    label: 'Data & Intelligence',
    description: 'Análise de dados, arquitetura e pipelines de inteligência',
    visible: true,
  },
  {
    id: 'operations-productivity',
    label: 'Operations & Productivity',
    description: 'Otimização de processos operacionais e produtividade',
    visible: true,
  },
  {
    id: 'ai-emerging-tech',
    label: 'AI & Emerging Technologies',
    description: 'Aplicações práticas de inteligência artificial e novas tecnologias',
    visible: true,
  },
  {
    id: 'finance-performance',
    label: 'Finance & Performance',
    description: 'Gestão financeira, redução de custos e métricas de retorno',
    visible: true,
  },
  {
    id: 'strategy-management',
    label: 'Strategy & Management',
    description: 'Decisões estratégicas, gestão e alinhamento organizacional',
    visible: true,
  },
  {
    id: 'innovation-business-models',
    label: 'Innovation & Business Models',
    description: 'Novos modelos de negócio e inovação aplicada',
    visible: false,
  },
  {
    id: 'market-competitiveness',
    label: 'Market & Competitiveness',
    description: 'Competitividade e inteligência de mercado',
    visible: false,
  },
]

export type Format = {
  id: string
  label: string
  hookLabel: string
  sections: string[]
}

export const FORMATS: Format[] = [
  {
    id: 'case-study',
    label: 'Case Study',
    hookLabel: 'Resultado',
    sections: ['Contexto', 'Problema', 'Solução', 'Método', 'Aprendizados'],
  },
  {
    id: 'benchmark-analysis',
    label: 'Benchmark Analysis',
    hookLabel: 'Resultado comparativo',
    sections: ['Empresas avaliadas', 'Critérios', 'Metodologia', 'Interpretação'],
  },
  {
    id: 'research-breakdown',
    label: 'Research Breakdown',
    hookLabel: 'Descoberta',
    sections: ['Dados', 'Metodologia', 'Conclusões', 'Implicações'],
  },
  {
    id: 'company-analysis',
    label: 'Company Analysis',
    hookLabel: 'Resultado',
    sections: ['Contexto', 'Estratégia', 'Decisões', 'Fatores de sucesso', 'Aprendizados'],
  },
  {
    id: 'industry-analysis',
    label: 'Industry Analysis',
    hookLabel: 'Transformação do setor',
    sections: ['Dados de mercado', 'Agentes da mudança', 'Consequências', 'Oportunidades'],
  },
  {
    id: 'technology-explained',
    label: 'Technology Explained',
    hookLabel: 'Aplicação ou resultado',
    sections: ['Problema resolvido', 'Tecnologia', 'Funcionamento', 'Limitações'],
  },
  {
    id: 'business-model-analysis',
    label: 'Business Model Analysis',
    hookLabel: 'Modelo de receita',
    sections: [
      'Resultados',
      'Estrutura do negócio',
      'Mecanismo econômico',
      'Vantagens e limitações',
    ],
  },
  {
    id: 'failure-analysis',
    label: 'Failure Analysis',
    hookLabel: 'Falha ou prejuízo',
    sections: ['Contexto', 'Decisões', 'Causas', 'Consequências', 'Lições'],
  },
  {
    id: 'strategic-framework',
    label: 'Strategic Framework',
    hookLabel: 'Problema empresarial',
    sections: ['Framework', 'Critérios', 'Aplicação', 'Exemplo prático'],
  },
  {
    id: 'market-intelligence',
    label: 'Market Intelligence',
    hookLabel: 'Acontecimento',
    sections: ['Dados', 'Contexto', 'Movimentação do mercado', 'Implicações'],
  },
  {
    id: 'competitive-analysis',
    label: 'Competitive Analysis',
    hookLabel: 'Comparação de resultados',
    sections: ['Concorrentes', 'Estratégias', 'Diferenciais', 'Posicionamento'],
  },
  {
    id: 'practical-application',
    label: 'Practical Application',
    hookLabel: 'Problema real',
    sections: ['Resultado esperado', 'Abordagem', 'Implementação', 'Indicadores', 'Aprendizados'],
  },
]

export function sectionsFor(formatId: string): string[] {
  const f = FORMATS.find((fmt) => fmt.id === formatId)
  if (!f) return ['Interpretação', 'Aplicação prática']
  const base = [...f.sections]
  if (!base.includes('Interpretação')) base.push('Interpretação')
  if (!base.includes('Aplicação prática')) base.push('Aplicação prática')
  return base
}

export type InsightSection = {
  title: string
  body: string[]
}

export type Insight = {
  slug: string
  title: string
  date: string // ISO YYYY-MM-DD
  updated?: string
  territory: string
  format: string
  tags: string[]
  evidence: Evidence
  hook: string
  centralQuestion: string
  reference?: {
    name: string
    kind: 'empresa' | 'pesquisa' | 'artigo' | 'case' | 'benchmark'
    url?: string
  }
  sections: InsightSection[]
  discussion: string
  sources: { label: string; url?: string }[]
  relatedCases?: string[]
  linkedinUrl?: string
  draft?: boolean
}

export const INSIGHTS_MIN_TO_SHOW = 3

export const INSIGHTS: Insight[] = []

export const PUBLISHED: Insight[] = INSIGHTS.filter((item) => {
  if (item.draft) return false
  const itemDate = new Date(item.date).getTime()
  const now = new Date().getTime()
  return itemDate <= now
})

export const HAS_INSIGHTS: boolean = PUBLISHED.length >= INSIGHTS_MIN_TO_SHOW

export function getInsightBySlug(slug: string): Insight | undefined {
  return INSIGHTS.find((item) => item.slug === slug)
}

export function readingTime(insight: Insight): number {
  let wordCount = insight.hook.split(/\s+/).filter(Boolean).length
  for (const sec of insight.sections) {
    wordCount += sec.title.split(/\s+/).filter(Boolean).length
    for (const b of sec.body) {
      wordCount += b.split(/\s+/).filter(Boolean).length
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200))
}

function assertInsights() {
  const seenSlugs = new Set<string>()

  for (const item of INSIGHTS) {
    if (seenSlugs.has(item.slug)) {
      console.error(`[assertInsights] Slug duplicado: ${item.slug}`)
    }
    seenSlugs.add(item.slug)

    const territoryExists = TERRITORIES.some((t) => t.id === item.territory)
    if (!territoryExists) {
      console.error(`[assertInsights] Território inválido no artigo "${item.slug}": ${item.territory}`)
    }

    const format = FORMATS.find((f) => f.id === item.format)
    if (!format) {
      console.error(`[assertInsights] Formato inválido no artigo "${item.slug}": ${item.format}`)
    } else {
      const expectedSections = sectionsFor(item.format)
      const actualTitles = item.sections.map((s) => s.title)

      if (actualTitles.length !== expectedSections.length) {
        console.error(
          `[assertInsights] Quantidade de seções incorreta no artigo "${item.slug}". Esperado: ${expectedSections.join(', ')}; Atual: ${actualTitles.join(', ')}`,
        )
      } else {
        for (let i = 0; i < expectedSections.length; i++) {
          if (actualTitles[i] !== expectedSections[i]) {
            console.error(
              `[assertInsights] Seção fora de ordem ou incorreta no artigo "${item.slug}" na posição ${i}. Esperado: "${expectedSections[i]}", recebido: "${actualTitles[i]}"`,
            )
          }
        }
      }
    }

    if (!item.hook || item.hook.trim() === '') {
      console.error(`[assertInsights] Hook vazio no artigo "${item.slug}"`)
    }

    if (!item.sources || item.sources.length === 0) {
      console.error(`[assertInsights] O artigo "${item.slug}" deve ter ao menos 1 fonte`)
    }

    // Detecção da palavra "cosmos" case-insensitive
    const fullText = JSON.stringify(item).toLowerCase()
    if (fullText.includes('cosmos')) {
      console.error(
        `[assertInsights] Violação de política: a palavra "cosmos" não pode aparecer no artigo "${item.slug}"`,
      )
    }
  }
}

if (import.meta.env?.DEV) {
  assertInsights()
}
