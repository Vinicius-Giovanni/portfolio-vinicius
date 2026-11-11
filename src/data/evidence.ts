export type Evidence = 'comprovado' | 'declarado' | 'estimado' | 'hipotese'

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  comprovado: 'Comprovado',
  declarado: 'Declarado',
  estimado: 'Estimado',
  hipotese: 'Hipótese',
}

export const EVIDENCE_HINT: Record<Evidence, string> = {
  comprovado: 'Medido em dados da operação ou verificável em fonte pública',
  declarado: 'Informado pela própria organização, sem verificação independente',
  estimado: 'Calculado a partir de premissas; não é resultado medido',
  hipotese: 'Proposta ainda não testada',
}
