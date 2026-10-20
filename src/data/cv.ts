export const PROFILE = {
  name: 'Vinícius Giovanni Pereira Barbosa',
  location: 'Jundiaí, SP',
  email: 'viniciusgiovanni588@gmail.com',
  phone: '11 96863-5390',
  linkedin: 'linkedin.com/in/vinícius-giovanni-139941297',
  linkedinUrl: 'https://www.linkedin.com/in/vinícius-giovanni-139941297',
  github: 'github.com/Vinicius-Giovanni',
  githubUrl: 'https://github.com/Vinicius-Giovanni',
}

export const EXPERIENCE = {
  casasBahiaAnalyst: {
    company: 'Grupo Casas Bahia',
    role: 'Analista de Planejamento',
    period: 'Jul 2023 – Atual',
    bullets: [
      'Desenvolvimento e gestão de relatórios estratégicos em nível Brasil (INBOUND e OUTBOUND).',
      'Liderança de projetos nacionais de BI: padronização de KPIs de Expedição e análise comparativa de Produtividade.',
      'Criação de automações e RPA em Python, reduzindo tempo operacional e erros manuais.',
      'Atuação em célula corporativa de análises estratégicas para todas as filiais.',
    ],
    highlights: [
      {
        label: 'Diagnóstico de Gargalos em Expedição de Alta Escala',
        text: 'R$ 25,5 mi de capital liberado em fluxo parado + R$ 3,6 mi/ano de custo financeiro evitado. Tempo parado por peça: 20h → 3h (-85%). Lead time total: 48h → 31h (-35%).',
      },
      {
        label: 'Data Quality em Operação de Transporte',
        text: 'Centralização de dezenas de fontes em 1 B.I unificado. Custo operacional: R$ 13 mi → R$ 10 mi/ano (-23%), com R$ 3 mi/ano de economia direta (R$ 300 mil/mês).',
      },
      {
        label: 'Automação RPA em Programação de Pedidos',
        text: '1h → 5min por execução (-92%). +5.400 horas/ano liberadas. R$ 98 mil/ano de economia direta + ~R$ 12 mi/ano em ganhos operacionais estimados.',
      },
      {
        label: 'Infraestrutura de BI Logístico Nacional',
        text: 'Fonte única de verdade para toda a filial, com KPIs padronizados em nível Brasil e automação de alimentação de dados.',
      },
    ],
  },
  casasBahiaAssistant: {
    company: 'Grupo Casas Bahia',
    role: 'Assistente Administrativo',
    period: 'Jun 2022 – Jul 2023',
    description:
      'Controles administrativos e manipulação de dados em Excel para apoio à operação logística.',
  },
  casasBahiaHelper: {
    company: 'Grupo Casas Bahia',
    role: 'Ajudante Interno',
    period: 'Dez 2021 – Jun 2022',
    description: 'Atuação direta na operação logística (carregamento e movimentação de produtos).',
  },
}

export const EDUCATION = [
  {
    title: 'Bacharelado em Engenharia de Dados',
    institution: 'UNICV',
    period: '2025 – 2028 (cursando)',
  },
  { title: 'Leadership Communication', institution: 'FIAP', period: '2026' },
  { title: 'Gestão Financeira de Empresas', institution: 'FIAP', period: '2026' },
  { title: 'Data Analyst Learning Plan', institution: 'Databricks', period: '2026' },
  { title: 'Data Engineer Learning Plan', institution: 'Databricks', period: '2026' },
]

export const SKILLS = {
  data: 'SQL, Python, Power BI, Databricks, ETL, Data Quality, Modelagem de Dados',
  dev: 'RPA, Power Automate, Node.js, TypeScript, JavaScript, HTML, CSS, APIs REST',
  languages: 'Português (nativo), Inglês (básico – em aprendizado contínuo)',
}

// ============================================================
// VARIANTES
// ============================================================
export type CVVariant = 'corporate' | 'tech'

export const CV_VARIANTS = {
  corporate: {
    label: 'Corporativo',
    tagline: 'Para bancos, indústrias e grandes empresas',
    summary:
      'Analista de dados com experiência em logística nacional de grande escala, automação RPA e engenharia de dados. Atuação em célula corporativa que atende centros de distribuição em todo o Brasil, com projetos de impacto mensurável: R$ 25,5 mi de capital liberado em fluxo parado, R$ 3,6 mi/ano em custo financeiro evitado e R$ 3 mi/ano em economia direta com Data Quality. Consultoria técnica paralela em automação e engenharia de dados. Cursando Bacharelado em Engenharia de Dados.',
    cosmos: {
      company: 'Cosmos',
      role: 'Consultoria Técnica em Automação e Dados (projeto paralelo)',
      period: '2026 – Atual',
      bullets: [
        'Consultoria técnica em automação, software e engenharia de dados B2B, atuando em paralelo à posição atual.',
        'Desenvolvimento de automações, sistemas e dashboards sob medida para clientes.',
        'Resultados agregados: +R$ 4 mi de economia anual gerada, 14 softwares e 19 projetos de BI entregues.',
      ],
    },
    sectionOrder: ['summary', 'experience', 'education', 'skills'] as const,
  },
  tech: {
    label: 'Tech / Startup',
    tagline: 'Para startups, consultorias e vagas internacionais',
    summary:
      'Data & Software professional com background em logística nacional de grande escala, automação RPA e desenvolvimento full-stack. Fundador da Cosmos, consultoria técnica B2B que já entregou 14 softwares e 19 projetos de BI, gerando +R$ 4 mi de economia anual para clientes. Atuo como analista de planejamento no Grupo Casas Bahia, liderando iniciativas de BI e automação em escala nacional — com projetos que resultaram em R$ 25,5 mi de capital liberado e +5.400 horas/ano devolvidas aos times operacionais. Cursando Engenharia de Dados.',
    cosmos: {
      company: 'Cosmos',
      role: 'Fundador',
      period: '2026 – Atual',
      bullets: [
        'Fundei e lidero consultoria técnica B2B focada em automação RPA, IA e engenharia de dados.',
        'Desenvolvimento de produtos e soluções sob medida: SaaS, dashboards, automações e APIs.',
        'Resultados: +R$ 4 mi de economia anual para clientes, 14 softwares e 19 projetos de BI entregues, +70 usuários ativos.',
      ],
    },
    sectionOrder: ['summary', 'skills', 'experience', 'education'] as const,
  },
}