import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { AlertTriangle, ArrowDown } from 'lucide-react'

const GARGALOS = [
  {
    id: 'bolsao',
    label: 'Bolsão',
    desc: 'Peça separada no picking fica parada esperando armazenagem',
  },
  {
    id: 'box',
    label: 'Box',
    desc: 'Peça espera horas por conferência. Erros: box errado, faltante, avariada',
  },
  {
    id: 'transporte',
    label: 'Transporte',
    desc: 'Má conferência → retrabalho, SLA afetado, perda',
  },
]

export function DiagnosticGargalos({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [peaces, setPeaces] = useState(0)
  const [money, setMoney] = useState(0)
  const [hoveredGargalo, setHoveredGargalo] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const flowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0])
  const flowScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85])

  const warningsOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.75], [0, 1, 1, 0])
  const warningsScale = useTransform(scrollYProgress, [0.35, 0.5], [0.6, 1])

  const numbersOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])
  const numbersY = useTransform(scrollYProgress, [0.75, 1], [40, 0])

  const peacesVal = useTransform(scrollYProgress, [0.78, 1], [0, 83000])
  const moneyVal = useTransform(scrollYProgress, [0.78, 1], [0, 30])

  useMotionValueEvent(peacesVal, 'change', (v) => {
    if (!reduced) setPeaces(Math.round(v))
  })
  useMotionValueEvent(moneyVal, 'change', (v) => {
    if (!reduced) setMoney(Math.round(v))
  })

  const finalPeaces = reduced ? 83000 : peaces
  const finalMoney = reduced ? 30 : money

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 pt-16">
        <div className="w-full max-w-5xl">
          {/* FLOW VISUAL — vertical no mobile, horizontal no desktop */}
          <motion.div
            style={reduced ? {} : { opacity: flowOpacity, scale: flowScale }}
            className="relative"
          >
            <p className="text-navy/50 mb-6 text-center font-mono text-[10px] font-bold tracking-[0.25em] uppercase md:mb-8">
              Fluxo de expedição · +100 mil peças/dia
            </p>

            <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
              {['Picking', 'Bolsão', 'Box', 'Transporte'].map((stage, i) => (
                <div key={stage} className="flex flex-col items-center md:flex-1 md:flex-row md:items-center md:gap-2">
                  <div className="border-navy/20 bg-cream/60 relative flex h-14 w-full flex-row items-center justify-center rounded-xl border px-2 py-2 text-center md:h-24 md:flex-col md:py-3">
                    <span className="text-navy text-[11px] font-bold tracking-[0.15em] uppercase md:text-xs">
                      {stage}
                    </span>
                    {i > 0 && i < 4 && (
                      <motion.div
                        style={reduced ? {} : { opacity: warningsOpacity }}
                        className="absolute -right-2 flex flex-col gap-0.5 md:-top-3 md:right-auto md:flex-row"
                      >
                        {[0, 1, 2, 3].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: '#DC2626' }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  {i < 3 && (
                    <div className="relative flex h-4 w-6 items-center justify-center md:h-auto md:w-10">
                      <div className="hidden h-px w-full bg-navy/20 md:block" />
                      <ArrowDown className="text-navy/30 h-3 w-3 md:hidden" aria-hidden />
                      <motion.div
                        animate={reduced ? undefined : { x: ['-100%', '100%'], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'linear',
                        }}
                        className="absolute hidden h-1.5 w-1.5 rounded-full md:block"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <motion.div
              style={reduced ? {} : { opacity: warningsOpacity, scale: warningsScale }}
              className="mt-6 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-3 md:gap-3"
            >
              {GARGALOS.map((g) => (
                <div
                  key={g.id}
                  onMouseEnter={() => setHoveredGargalo(g.id)}
                  onMouseLeave={() => setHoveredGargalo(null)}
                  className="border-red-500/30 bg-red-500/[0.06] relative flex flex-col gap-1.5 rounded-xl border p-3 md:p-4"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500 md:h-4 md:w-4" />
                    </motion.div>
                    <span className="text-navy text-[11px] font-bold tracking-wider uppercase md:text-xs">
                      {g.label}
                    </span>
                  </div>
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: hoveredGargalo === g.id ? 1 : 0.6,
                      height: hoveredGargalo === g.id ? 'auto' : 0,
                    }}
                    className="text-navy/70 overflow-hidden text-[10px] leading-snug md:text-[11px]"
                  >
                    {g.desc}
                  </motion.p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* BIG NUMBERS */}
          <motion.div
            style={reduced ? {} : { opacity: numbersOpacity, y: numbersY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          >
            <span className="text-navy/50 mb-3 font-mono text-[10px] font-bold tracking-[0.3em] uppercase md:mb-4">
              Diagnóstico
            </span>
            <p
              className="font-anton leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 12vw, 11rem)', color: '#0B1F3A' }}
            >
              {finalPeaces.toLocaleString('pt-BR')}
            </p>
            <p className="text-navy/60 mt-2 text-[11px] font-bold tracking-[0.2em] uppercase md:text-base">
              peças paradas agora
            </p>

            <div className="border-navy/15 mt-6 flex flex-col items-center border-t pt-6 md:mt-10 md:pt-8">
              <p
                className="font-anton text-[clamp(1.75rem,6vw,4.5rem)] leading-none tracking-tight"
                style={{ color: accentColor }}
              >
                R$ {finalMoney} mi
              </p>
              <p className="text-navy/60 mt-2 text-[10px] font-bold tracking-[0.2em] uppercase md:text-xs">
                em estoque imóvel
              </p>
            </div>

            <p className="text-navy/50 mt-6 max-w-md text-[11px] leading-relaxed md:mt-10 md:text-sm">
              3 gargalos identificados · 20h → 3h de tempo parado por peça
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}