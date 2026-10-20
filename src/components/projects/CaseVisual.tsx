import type { ProjectVisual } from '@/data/projects'

export function CaseVisual({
  variant,
  accentColor,
}: {
  variant: ProjectVisual
  accentColor: string
}) {
  if (variant === 'none') return null

  return (
    <div className="border-navy/15 bg-navy relative overflow-hidden rounded-[30px] border p-6 md:p-10">
      {/* Grid de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, #EDE6D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Label topo */}
      <div className="relative mb-6 flex items-center justify-between">
        <p className="text-cream/50 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
          Diagnóstico · dados fictícios
        </p>
        <span className="text-cream/30 font-mono text-[9px]">Anonimizado</span>
      </div>

      <div className="relative">
        {variant === 'report' && <MockReport accent={accentColor} />}
        {variant === 'flow' && <MockFlow accent={accentColor} />}
        {variant === 'chart' && <MockChart accent={accentColor} />}
        {variant === 'dashboard' && <MockDashboard accent={accentColor} />}
      </div>
    </div>
  )
}

// ============================================================
// REPORT — Data Quality
// ============================================================
function MockReport({ accent }: { accent: string }) {
  const checks = [
    { label: 'Completeness', before: '62%', after: '99%', ok: true },
    { label: 'Uniqueness', before: '847 duplicatas', after: '0', ok: true },
    { label: 'Type Validity', before: '89%', after: '100%', ok: true },
    { label: 'Consistency', before: '⚠ 3.240 conflitos', after: '0', ok: true },
    { label: 'Timeliness', before: '4 dias atrás', after: 'Tempo real', ok: true },
  ]

  return (
    <div className="text-cream">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-cream/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          Relatório de Qualidade · Operação Transporte
        </p>
        <span className="text-cream/30 text-[9px]">Q4 2024</span>
      </div>

      <div className="space-y-2">
        {checks.map((c) => (
          <div
            key={c.label}
            className="border-cream/10 bg-cream/[0.04] flex items-center justify-between rounded-lg border px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: c.ok ? '#10B981' : '#F87171' }}
              />
              <span className="text-cream/80 text-xs font-medium">{c.label}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-cream/40 font-mono line-through">{c.before}</span>
              <span className="text-cream/30">→</span>
              <span className="text-cream font-mono font-bold">{c.after}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-cream/15 mt-5 flex items-center justify-between border-t pt-5">
        <div>
          <p className="text-cream/40 font-mono text-[9px] uppercase tracking-wider">
            Score geral
          </p>
          <p className="text-cream/50 mt-1 text-[10px]">antes → depois</p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-cream/40 text-xl font-bold line-through">54</span>
          <span className="text-cream/30">→</span>
          <span className="text-3xl font-bold" style={{ color: accent }}>
            98
          </span>
          <span className="text-cream/40 text-sm">/100</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// FLOW — RPA Pipeline
// ============================================================
function MockFlow({ accent }: { accent: string }) {
  const steps = [
    { label: 'Planilha', sub: 'input manual', icon: '📄' },
    { label: 'Validação', sub: 'regras de negócio', icon: '✓' },
    { label: 'RPA Bot', sub: 'automação', icon: '⚙', highlight: true },
    { label: 'ERP', sub: 'integração', icon: '🔗' },
    { label: 'Concluído', sub: 'SLA ok', icon: '✓', success: true },
  ]

  return (
    <div className="text-cream">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-cream/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          Pipeline · Programação de Pedidos
        </p>
        <span className="text-cream/30 text-[9px]">por execução</span>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex w-full items-center md:flex-1">
            <div
              className={`w-full rounded-xl border p-3 text-center transition-colors ${
                s.highlight
                  ? 'bg-cream/[0.08]'
                  : s.success
                    ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
                    : 'border-cream/10 bg-cream/[0.04]'
              }`}
              style={s.highlight ? { borderColor: `${accent}60` } : undefined}
            >
              <div className="mb-1.5 text-lg">{s.icon}</div>
              <p className="text-cream text-[11px] font-bold">{s.label}</p>
              <p className="text-cream/40 mt-0.5 text-[9px]">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden text-cream/30 md:mx-1 md:block">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-cream/15 mt-6 grid grid-cols-3 gap-3 border-t pt-5">
        {[
          { v: '1h → 5min', l: 'tempo por execução' },
          { v: '0', l: 'erros manuais' },
          { v: '+5.400h', l: 'liberadas/ano' },
        ].map((m, i) => (
          <div key={i}>
            <p className="text-cream font-anton text-lg leading-none md:text-xl">{m.v}</p>
            <p className="text-cream/40 mt-1.5 text-[9px] uppercase tracking-wider">{m.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// CHART — Lead Time (Antes vs Depois)
// ============================================================
function MockChart({ accent }: { accent: string }) {
  const beforeBars = [85, 92, 78, 95, 88, 91, 87, 90]
  const afterBars = [22, 25, 20, 28, 24, 26, 21, 23]

  return (
    <div className="text-cream">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-cream/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          Lead Time por Peça · Expedição
        </p>
        <span className="text-cream/30 text-[9px]">últimas 8 semanas</span>
      </div>

      {/* Legenda */}
      <div className="mb-4 flex gap-5 text-[10px]">
        <span className="flex items-center gap-1.5">
          <span className="bg-cream/30 h-2 w-2 rounded-sm" />
          <span className="text-cream/60">Antes (média 20h)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: accent }} />
          <span className="text-cream/60">Depois (média 3h)</span>
        </span>
      </div>

      {/* Gráfico */}
      <div className="border-cream/10 bg-cream/[0.03] flex h-40 items-end justify-between gap-2 rounded-xl border p-4 md:h-48 md:gap-3">
        {beforeBars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-end justify-center gap-0.5" style={{ height: '100%' }}>
              <div
                className="bg-cream/25 w-1/2 rounded-t"
                style={{ height: `${h}%`, minHeight: '8px' }}
              />
              <div
                className="w-1/2 rounded-t transition-all"
                style={{
                  height: `${afterBars[i]}%`,
                  minHeight: '4px',
                  backgroundColor: accent,
                }}
              />
            </div>
            <span className="text-cream/25 text-[8px]">S{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { v: '-85%', l: 'tempo parado' },
          { v: '-35%', l: 'lead time total' },
          { v: '17h', l: 'mais cedo na loja' },
        ].map((m, i) => (
          <div key={i}>
            <p className="text-cream font-anton text-lg leading-none md:text-xl">{m.v}</p>
            <p className="text-cream/40 mt-1.5 text-[9px] uppercase tracking-wider">{m.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// DASHBOARD — BI Nacional
// ============================================================
function MockDashboard({ accent }: { accent: string }) {
  return (
    <div className="text-cream">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-cream/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          BI Logístico Nacional · Inbound / Outbound
        </p>
        <span className="text-cream/30 text-[9px]">tempo real</span>
      </div>

      {/* KPI cards */}
      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          { v: '98,4%', l: 'SLA', delta: '+2,1%' },
          { v: '12,4k', l: 'Expedições/dia', delta: '+8,3%' },
          { v: '31h', l: 'Lead time médio', delta: '-35%' },
          { v: '1', l: 'Fonte de verdade', delta: 'unificada' },
        ].map((m, i) => (
          <div key={i} className="border-cream/10 bg-cream/[0.04] rounded-lg border p-3">
            <p className="text-cream font-anton text-lg leading-none">{m.v}</p>
            <p className="text-cream/40 mt-1.5 text-[9px] uppercase tracking-wider">{m.l}</p>
            <p className="mt-1 text-[9px] font-bold" style={{ color: accent }}>
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="border-cream/10 bg-cream/[0.03] rounded-xl border p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-cream/50 font-mono text-[9px] uppercase tracking-wider">
            Performance consolidada
          </span>
          <div className="flex gap-2 text-[9px]">
            <span className="text-cream/40">Inbound</span>
            <span style={{ color: accent }}>Outbound</span>
          </div>
        </div>
        <svg viewBox="0 0 320 90" className="w-full">
          <defs>
            <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Inbound */}
          <polyline
            points="0,70 40,62 80,68 120,55 160,58 200,48 240,52 280,42 320,45"
            fill="none"
            stroke="rgba(237,230,216,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Outbound */}
          <polyline
            points="0,72 40,60 80,55 120,50 160,42 200,35 240,30 280,25 320,20"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Area */}
          <polyline
            points="0,72 40,60 80,55 120,50 160,42 200,35 240,30 280,25 320,20 320,90 0,90"
            fill="url(#area-fill)"
          />
        </svg>
      </div>
    </div>
  )
}