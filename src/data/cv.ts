import { METRICS } from './metrics'

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

export const SUMMARY = `Analista de dados com experiência em logística nacional de grande escala, atuando em BI, automação RPA e engenharia de dados. Em célula corporativa de análises estratégicas, liderou projetos que liberaram ${METRICS['cap-liberado'].value} de capital parado, geraram ${METRICS['eco-recorrente'].value} de economia direta (Data Quality) e devolveram ${METRICS['horas-liberadas'].value} aos times operacionais por meio de automação. Cursando Bacharelado em Engenharia de Dados.`

export const COSMOS = {
  company: 'Cosmos',
  role: 'Fundador',
  period: '2026 – Atual',
  bullets: ['Consultoria técnica B2B em automação e engenharia de dados.'],
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
        text: `${METRICS['cap-liberado'].value} de capital liberado em fluxo parado + ${METRICS['custo-fin'].value} de custo financeiro evitado. Tempo parado por peça: ${METRICS['tempo-parado'].value} (-85%). Lead time total: 48h → 31h (-35%).`,
      },
      {
        label: 'Data Quality em Operação de Transporte',
        text: `Centralização de dezenas de fontes em 1 B.I unificado. Custo operacional: R$ 13 mi → R$ 10 mi/ano (-23%), com ${METRICS['eco-recorrente'].value} de economia direta (R$ 300 mil/mês).`,
      },
      {
        label: 'Automação RPA em Programação de Pedidos',
        text: `1h → 5 min por execução (-92%). ${METRICS['horas-liberadas'].value} liberadas para o time. R$ 98 mil/ano de economia direta; ganho operacional adicional estimado em ~R$ 12 mi/ano (estimativa de cálculo).`,
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
