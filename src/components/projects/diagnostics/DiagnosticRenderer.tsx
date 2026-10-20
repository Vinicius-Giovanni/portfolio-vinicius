import { DiagnosticGargalos } from './DiagnosticGargalos'
import { DiagnosticDataQuality } from './DiagnosticDataQuality'
import { DiagnosticRPA } from './DiagnosticRPA'
import { DiagnosticBI } from './DiagnosticBI'

type DiagnosticRendererProps = {
  slug: string
  accentColor: string
}

export function DiagnosticRenderer({ slug, accentColor }: DiagnosticRendererProps) {
  switch (slug) {
    case 'diagnostico-gargalos-expedicao-alta-escala':
      return <DiagnosticGargalos accentColor={accentColor} />
    case 'data-quality-operacao-transporte':
      return <DiagnosticDataQuality accentColor={accentColor} />
    case 'automacao-rpa-programacao-pedidos':
      return <DiagnosticRPA accentColor={accentColor} />
    case 'infraestrutura-bi-logistico-nacional':
      return <DiagnosticBI accentColor={accentColor} />
    default:
      return null
  }
}