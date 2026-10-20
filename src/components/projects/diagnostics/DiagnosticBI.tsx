import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { AlertTriangle } from 'lucide-react'

const KPIS = [
  { area: 'Inbound', value: '92%', rule: 'Regra A' },
  { area: 'Outbound', value: '87%', rule: 'Regra B' },
  { area: 'Diretoria', value: '96%', rule: 'Regra C' },
]

export function DiagnosticBI({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Ato 1 — Cards com 3 números
  const cardsOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [0, 1, 1, 0])
  const cardsScale = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.4])

  // Ato 2 — Conflito
  const conflictOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.65, 0.75], [0, 1, 1, 0])

  // Ato 3 — Convergência
  const convergedOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])
  const convergedScale = useTransform(scrollYProgress, [0.75, 0.95], [0.8, 1])

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 pt-16">
        <div className="relative w-full max-w-4xl" style={{ minHeight: '60vh' }}>
          {/* ATO 1: 3 CARDS */}
          <motion.div
            style={reduced ? {} : { opacity: cardsOpacity, scale: cardsScale }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-8"
          >
            <p className="text-navy/50 text-center font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
              Reunião executiva · mesma métrica
            </p>
            <div className="grid w-full grid-cols-3 gap-2 md:gap-4">
              {KPIS.map((kpi, i) => (
                <motion.div
                  key={kpi.area}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: reduced ? 0 : i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-navy/15 bg-cream/70 rounded-2xl border p-3 text-center backdrop-blur-sm md:p-6"
                >
                  <p className="text-navy/50 font-mono text-[9px] font-bold uppercase tracking-wider md:text-[10px]">
                    {kpi.area}
                  </p>
                  <p className="font-anton text-red-600 mt-2 text-[clamp(1.25rem,4vw,3rem)] leading-none md:mt-3">
                    {kpi.value}
                  </p>
                  <p className="text-navy/40 mt-1 text-[9px] font-bold uppercase md:text-[10px]">
                    SLA
                  </p>
                  <p className="text-navy/50 mt-2 text-[8px] md:mt-3 md:text-[9px]">{kpi.rule}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-navy/60 text-center text-[11px] md:text-xs">
              "Qual é o número certo?"
            </p>
          </motion.div>

          {/* ATO 2: CONFLITO */}
          <motion.div
            style={reduced ? {} : { opacity: conflictOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <motion.div
                animate={reduced ? undefined : { rotate: [0, 8, -8, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <AlertTriangle className="h-6 w-6 text-red-500 md:h-8 md:w-8" />
              </motion.div>
              <p className="text-navy font-anton text-[clamp(1.1rem,3vw,2.5rem)] leading-none">
                Mesma métrica. 3 regras. 3 visões.
              </p>
            </div>
            <p className="text-navy/60 max-w-md px-4 text-center text-[11px] leading-relaxed md:text-xs">
              Nenhum número era "mentira" — cada área aplicava sua própria regra de negócio
            </p>
          </motion.div>

          {/* ATO 3: CONVERGÊNCIA */}
          <motion.div
            style={reduced ? {} : { opacity: convergedOpacity, scale: convergedScale }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div
              className="rounded-[24px] border-2 bg-cream/80 px-6 py-6 text-center backdrop-blur-md md:px-14 md:py-8"
              style={{ borderColor: accentColor }}
            >
              <p className="text-navy/50 font-mono text-[9px] font-bold uppercase tracking-[0.2em] md:text-[10px]">
                SLA unificado
              </p>
              <p className="font-anton text-navy mt-2 text-[clamp(2rem,7vw,5rem)] leading-none">
                94,2%
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 md:mt-3">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-navy/50 text-[10px] md:text-[11px]">
                  1 regra · 1 fonte · 1 número
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center md:mt-10 md:gap-4">
              {[
                { v: 'Todos', l: 'os setores' },
                { v: '100%', l: 'KPI padronizados' },
                { v: 'Semanal', l: 'em reuniões' },
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-anton text-navy text-sm leading-none md:text-xl">{m.v}</p>
                  <p className="text-navy/50 mt-1 text-[8px] uppercase tracking-wider md:text-[9px]">
                    {m.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}