export type ProjectType = 'enterprise' | 'side'
export type ProjectStatus = 'anonymized' | 'live' | 'in-development'
export type ProjectCategory =
  | 'Data Quality'
  | 'Cost Optimization'
  | 'RPA'
  | 'Business Intelligence'
  | 'Lead Time'
  | 'Product'
  | 'Full-Stack'

export type ProjectVisual = 'dashboard' | 'flow' | 'report' | 'chart' | 'none'

export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  slug: string
  dossierNumber: string
  title: string
  subtitle: string
  category: ProjectCategory
  type: ProjectType
  status: ProjectStatus
  year: string
  featured?: boolean
  accentColor: string
  visual: ProjectVisual
  cardMetrics: ProjectMetric[]
  context?: string
  challenge?: string
  approach?: string[]
  stack?: string[]
  results?: ProjectMetric[]
  learnings?: string
  description?: string
  liveUrl?: string
  repoUrl?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'diagnostico-gargalos-expedicao-alta-escala',
    dossierNumber: '001',
    title: 'Diagnóstico de Gargalos em Expedição de Alta Escala',
    subtitle: 'Maior centro de distribuição do país · +100 mil peças/dia',
    category: 'Lead Time',
    type: 'enterprise',
    status: 'anonymized',
    year: '2024',
    featured: true,
    accentColor: '#4A90B8',
    visual: 'chart',
    cardMetrics: [
      { value: 'R$ 25,5 mi', label: 'de capital liberado' },
      { value: '20h → 3h', label: 'de tempo parado por peça' },
    ],
    context:
      'Setor de expedição de um dos maiores centros de distribuição do país, processando mais de 100 mil peças por dia, operava há anos com o mesmo fluxo: a peça chegava da separação, era armazenada no bolsão, conferida e entregue ao transportador. O processo era necessário, mas acumulava múltiplos gargalos, erros, retrabalho e dependência de outros setores. Cada peça passava, em média, 20 horas parada entre etapas — capital imobilizado e SLA comprometido.',
    challenge:
      'Diagnosticar e eliminar gargalos em uma operação gigante, sem acesso a sistemas ideais e sem poder parar a operação. Quantificar o impacto em R$ de capital e tempo para justificar mudanças estruturais na liderança.',
    approach: [
      'Análise de 1 ano de histórico de expedição do setor',
      'Separação das etapas, cálculo de lead time, horas paradas por etapa e produtividade por colaborador',
      'Identificação de dependências de outros setores e mapeamento de erros recorrentes',
      'Construção de B.I com dados históricos consolidados (Big Data)',
      'Apresentação do diagnóstico para liderança com números concretos',
      'Aplicação das melhorias nas etapas identificadas como gargalo',
    ],
    stack: ['Python', 'SQL', 'Databricks', 'Power BI', 'Power Automate'],
    results: [
      { value: 'R$ 25,5 mi', label: 'de capital liberado (estoque em fluxo)' },
      { value: 'R$ 3,6 mi/ano', label: 'de custo financeiro evitado' },
      { value: '20h → 3h', label: 'de tempo parado por peça (-85%)' },
      { value: '48h → 31h', label: 'de lead time total (-35%)' },
      { value: '71 mil', label: 'de peças removidas do fluxo parado' },
      { value: '17h', label: 'mais cedo na loja' },
    ],
    learnings:
      'Em operações gigantes, os gargalos raramente estão onde todo mundo acha. O diagnóstico com base em Big Data mostrou que a maior perda não estava em "trabalhar mais rápido" — estava em peças paradas em etapas intermediárias que ninguém media.',
  },
  {
    slug: 'data-quality-operacao-transporte',
    dossierNumber: '002',
    title: 'Data Quality Aplicada a Operação de Transporte',
    subtitle: 'Grande varejista nacional',
    category: 'Data Quality',
    type: 'enterprise',
    status: 'anonymized',
    year: '2024',
    accentColor: '#6B21A8',
    visual: 'report',
    cardMetrics: [
      { value: 'R$ 3 mi/ano', label: 'de economia direta (R$ 300 mil/mês)' },
      { value: 'R$ 13 mi → R$ 10 mi', label: 'de custo operacional (-23%)' },
    ],
    context:
      'Operação de transporte de uma grande varejista nacional convivia com dados fragmentados entre dezenas de áreas. Cada líder mantinha sua própria planilha, funcionários e endereços permaneciam desatualizados, e a consequência era operacional: rotas geradas a partir de endereços de pessoas que já não estavam na empresa, entregas mais longas, custo maior e SLA afetado.',
    challenge:
      'Centralizar dados dispersos, implementar cultura de dados do zero, unificar métricas entre a varejista e a transportadora terceirizada e reduzir custo operacional sem comprometer o nível de serviço.',
    approach: [
      'Centralização dos dados dispersos e aplicação de Data Quality',
      'Armazenamento no Databricks com consumo via B.I (Power BI) e atualização automatizada por Power Automate',
      'Alinhamento direto com a transportadora terceirizada — metas, prazos e implementação de qualidade de dados também do lado deles',
      'Acompanhamento de métricas antes vs depois até a normalização da cultura de dados',
      'Disponibilização de visão gerencial para gerentes regionais e gestores de CD',
    ],
    stack: ['Python', 'Power BI', 'Power Automate', 'Databricks', 'SQL'],
    results: [
      { value: 'R$ 13 mi → R$ 10 mi', label: 'de custo operacional anual' },
      { value: 'R$ 3 mi/ano', label: 'de economia direta (R$ 300 mil/mês)' },
      { value: '1 B.I', label: 'consolidado e em produção' },
      { value: 'Toda a operação', label: 'com visão gerencial unificada' },
    ],
    learnings:
      'Data Quality não é problema técnico — é cultural. Antes de criar mais uma tabela, é preciso alinhar quem define o que é cada métrica e convencer as pessoas a manterem os dados atualizados. O sistema sozinho não resolve nada.',
  },
  {
    slug: 'automacao-rpa-programacao-pedidos',
    dossierNumber: '003',
    title: 'Automação RPA em Programação de Pedidos',
    subtitle: 'Operação logística de grande escala',
    category: 'RPA',
    type: 'enterprise',
    status: 'anonymized',
    year: '2024',
    accentColor: '#D97706',
    visual: 'flow',
    cardMetrics: [
      { value: '1h → 5min', label: 'por execução (-92%)' },
      { value: '+5.400h', label: 'liberadas para o time' },
    ],
    context:
      'O setor de programação de pedidos executava o processo de forma manual, todos os dias, várias vezes ao dia. Cada ciclo consumia cerca de 1 hora de trabalho dedicado, e o acúmulo gerava erros humanos, retrabalho e alto índice de peças canceladas. Um processo crítico que alimentava toda a cadeia de distribuição.',
    challenge:
      'Reduzir tempo de execução, eliminar erros manuais e liberar o time para atividades analíticas — sem comprometer a confiabilidade de um processo crítico.',
    approach: [
      'Mapeamento completo do processo real (não o documentado)',
      'Identificação de gaps, exceções e oportunidades de automação',
      'Desenvolvimento do MVP da aplicação RPA em Python',
      'Entrega da aplicação completa com logging estruturado e monitoramento',
      'Homologação com as áreas afetadas e transferência de operação',
    ],
    stack: ['Python', 'RPA', 'APIs REST', 'SQL'],
    results: [
      { value: 'R$ 98.181/ano', label: 'de economia direta (custo evitado)' },
      { value: '+5.400 horas', label: 'liberadas para o time' },
      { value: '1h → 5-10min', label: 'por execução (-92%)' },
      { value: '~R$ 12 mi/ano', label: 'de ganhos operacionais estimados (SLA, pedidos mais cedo na cadeia)' },
      { value: '0', label: 'erros manuais' },
    ],
    learnings:
      'Mapear regras de negócio de um processo crítico é mais difícil do que programar. As regras variam, as exceções existem, e cada uma precisa ser tratada com o mesmo cuidado. Automação sem entendimento profundo de negócio é só código.',
  },
  {
    slug: 'infraestrutura-bi-logistico-nacional',
    dossierNumber: '004',
    title: 'Infraestrutura de BI Logístico Nacional',
    subtitle: 'Grande varejista nacional',
    category: 'Business Intelligence',
    type: 'enterprise',
    status: 'anonymized',
    year: '2023-2024',
    accentColor: '#10B981',
    visual: 'dashboard',
    cardMetrics: [
      { value: '1 fonte', label: 'única de verdade' },
      { value: 'Toda a filial', label: 'atendida' },
    ],
    context:
      'Dados espalhados entre dezenas de setores, regras de negócio diferentes em cada área e números conflitantes em reuniões. Sem histórico para análise de sazonalidade. Decisões eram tomadas com base em achismo, não em dado. Cada área defendia seu número como "o certo".',
    challenge:
      'Construir uma infraestrutura de BI que consolidasse dados de múltiplos setores com regras padronizadas, criasse métricas únicas e fornecesse visão integrada para todos os níveis de gestão — sem parar as operações existentes.',
    approach: [
      'Levantamento de dados em todos os setores envolvidos',
      'Padronização das regras de negócio (com buy-in das áreas)',
      'Criação do MVP do produto de BI',
      'Iteração com melhorias e novas features até atender todos os setores',
      'Automação da alimentação dos dados',
      'Documentação e treinamento dos usuários',
    ],
    stack: ['Power BI', 'Python', 'SQL', 'Databricks', 'Power Automate'],
    results: [
      { value: '1 fonte', label: 'única de dados para toda a filial' },
      { value: 'Todos os níveis', label: 'de gestão atendidos' },
      { value: 'Semanal', label: 'uso em reuniões executivas' },
      { value: '100%', label: 'das automações de alimentação ativas' },
    ],
    learnings:
      'BI é 30% tecnologia e 70% política. Antes de construir dashboard, é preciso alinhar quem manda em cada número. Cada área acha que o seu número é o certo — e o papel do analista é construir consenso, não impor.',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getFeaturedProject(): Project | undefined {
  return PROJECTS.find((p) => p.featured)
}