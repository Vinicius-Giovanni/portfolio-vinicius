import type { Evidence } from './evidence'

export type Metric = {
  id: string
  value: string
  label: string
  caseLabel?: string
  micro?: string
  evidence: Evidence
  method?: string
  status: 'ok' | 'validar'
  note?: string
  caseSlug?: string
}

export const METRICS: Record<string, Metric> = {
  'cap-liberado': {
    id: 'cap-liberado',
    value: 'R$ 25,5 mi',
    label: 'Capital liberado',
    caseLabel: 'de capital liberado (estoque em fluxo)',
    micro: 'Pontual · 2024',
    evidence: 'comprovado',
    status: 'ok',
    caseSlug: 'diagnostico-gargalos-expedicao-alta-escala',
  },
  'eco-recorrente': {
    id: 'eco-recorrente',
    value: 'R$ 3 mi/ano',
    label: 'Economia direta',
    caseLabel: 'de economia direta (R$ 300 mil/mês)',
    micro: 'Recorrente · Data Quality',
    evidence: 'comprovado',
    status: 'ok',
    caseSlug: 'data-quality-operacao-transporte',
  },
  'horas-liberadas': {
    id: 'horas-liberadas',
    value: '5.400 h/ano',
    label: 'Horas devolvidas ao time',
    caseLabel: 'liberadas para o time',
    micro: '1h → 5 min por execução (-92%)',
    evidence: 'comprovado',
    status: 'ok',
    caseSlug: 'automacao-rpa-programacao-pedidos',
  },
  'tempo-parado': {
    id: 'tempo-parado',
    value: '20h → 3h',
    label: 'Tempo parado por peça',
    caseLabel: 'de tempo parado por peça (-85%)',
    micro: 'Lead time total 48h → 31h',
    evidence: 'comprovado',
    status: 'ok',
    caseSlug: 'diagnostico-gargalos-expedicao-alta-escala',
  },
  'vol-software': {
    id: 'vol-software',
    value: '+14',
    label: 'Softwares e automações sob medida',
    evidence: 'comprovado',
    status: 'ok',
  },
  'vol-bi': {
    id: 'vol-bi',
    value: '+19',
    label: 'Projetos de Business Intelligence',
    evidence: 'comprovado',
    status: 'ok',
  },
  'custo-fin': {
    id: 'custo-fin',
    value: 'R$ 3,6 mi/ano',
    label: 'Custo financeiro evitado',
    caseLabel: 'de custo financeiro evitado sobre o capital liberado',
    evidence: 'estimado',
    status: 'validar',
    note: 'confirmar taxa de custo de capital',
    caseSlug: 'diagnostico-gargalos-expedicao-alta-escala',
  },
  'rpa-direto': {
    id: 'rpa-direto',
    value: 'R$ 98.181/ano',
    label: 'Economia direta RPA',
    caseLabel: 'de economia direta (custo evitado)',
    evidence: 'comprovado',
    status: 'ok',
    caseSlug: 'automacao-rpa-programacao-pedidos',
  },
  'rpa-estimado': {
    id: 'rpa-estimado',
    value: 'R$ 12 mi/ano',
    label: 'Ganho operacional estimado RPA',
    caseLabel: 'de ganho operacional estimado (estimativa de cálculo)',
    evidence: 'estimado',
    status: 'validar',
    note: 'falta método em 1 linha',
    caseSlug: 'automacao-rpa-programacao-pedidos',
  },
}

export const PROOF_IDS: string[] = [
  'cap-liberado',
  'eco-recorrente',
  'horas-liberadas',
  'tempo-parado',
]

export const VOLUME_IDS: string[] = ['vol-software', 'vol-bi']

export function fromMetric(
  id: string,
  o?: Partial<Metric>,
): { value: string; label: string; evidence: Evidence } {
  const m = { ...METRICS[id], ...o }
  return {
    value: m.value,
    label: m.caseLabel ?? m.label,
    evidence: m.evidence,
  }
}
