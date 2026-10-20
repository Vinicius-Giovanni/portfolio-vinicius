import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

const PLANILHAS = [
  { num: '2.100', x: -280, y: -140, rot: -8 },
  { num: '1.750', x: -90, y: -150, rot: 5 },
  { num: '1.900', x: 100, y: -130, rot: -3 },
  { num: '1.820', x: 280, y: -145, rot: 7 },
  { num: '1.640', x: -300, y: -20, rot: -6 },
  { num: '2.015', x: -100, y: -35, rot: 4 },
  { num: '1.430', x: 110, y: -25, rot: -5 },
  { num: '1.980', x: 300, y: -15, rot: 8 },
  { num: '1.700', x: -290, y: 100, rot: 3 },
  { num: '1.850', x: -95, y: 110, rot: -7 },
  { num: '2.040', x: 105, y: 115, rot: 6 },
  { num: '1.590', x: 295, y: 105, rot: -4 },
  { num: '1.920', x: -270, y: 215, rot: 5 },
  { num: '1.680', x: -85, y: 225, rot: -6 },
  { num: '1.980', x: 120, y: 220, rot: 3 },
  { num: '1.750', x: 285, y: 210, rot: -8 },
]

export function DiagnosticDataQuality({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [phantomCount, setPhantomCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Ato 1 — Grid de planilhas
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [0, 1, 1, 0])
  const gridScale = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.4])

  // Ato 2 — Conflito
  const conflictOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.65, 0.75], [0, 1, 1, 0])
  const conflictScale = useTransform(scrollYProgress, [0.4, 0.5], [0.7, 1])

  // Ato 3 — Convergência
  const convergenceOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])
  const convergenceScale = useTransform(scrollYProgress, [0.75, 0.95], [0.8, 1])

  const phantomVal = useTransform(scrollYProgress, [0.5, 0.65], [0, 600])
  useMotionValueEvent(phantomVal, 'change', (v) => {
    if (!reduced) setPhantomCount(Math.round(v))
  })
  const finalPhantom = reduced ? 600 : phantomCount

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 pt-16">
        <div className="relative w-full max-w-4xl" style={{ minHeight: '70vh' }}>
          {/* ATO 1: GRID DE PLANILHAS */}
          <motion.div
            style={reduced ? {} : { opacity: gridOpacity, scale: gridScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative h-[50vh] w-full scale-[0.45] md:h-[60vh] md:scale-100">
              {PLANILHAS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-navy/15 bg-cream/70 absolute rounded-lg border px-3 py-2 shadow-sm backdrop-blur-sm"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) rotate(${p.rot}deg)`,
                  }}
                >
                  <div className="flex items-center gap-1.5 pb-1">
                    <span className="bg-navy/20 h-1 w-1 rounded-full" />
                    <span className="bg-navy/20 h-1 w-1 rounded-full" />
                    <span className="bg-navy/20 h-1 w-1 rounded-full" />
                  </div>
                  <p className="font-anton text-navy text-sm leading-none md:text-base">
                    {p.num}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="text-navy/50 absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-[10px] font-bold tracking-[0.2em] uppercase md:bottom-4">
              Dezenas de planilhas · mesmo indicador
            </p>
          </motion.div>

          {/* ATO 2: CONFLITO */}
          <motion.div
            style={reduced ? {} : { opacity: conflictOpacity, scale: conflictScale }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 md:gap-8"
          >
            <div className="grid w-full max-w-2xl grid-cols-2 gap-3 md:gap-4">
              <div className="border-navy/15 bg-cream/80 rounded-2xl border p-4 text-center backdrop-blur-sm md:p-6">
                <p className="text-navy/40 font-mono text-[9px] font-bold uppercase tracking-wider md:text-[10px]">
                  Terceirizada
                </p>
                <p className="font-anton text-navy mt-2 text-[clamp(1.5rem,4vw,3rem)] leading-none">
                  2.100
                </p>
                <p className="text-navy/50 mt-1 text-[9px] md:text-[10px]">funcionários</p>
              </div>
              <div className="border-navy/15 bg-cream/80 rounded-2xl border p-4 text-center backdrop-blur-sm md:p-6">
                <p className="text-navy/40 font-mono text-[9px] font-bold uppercase tracking-wider md:text-[10px]">
                  Real
                </p>
                <p className="font-anton text-navy mt-2 text-[clamp(1.5rem,4vw,3rem)] leading-none">
                  ~1.500
                </p>
                <p className="text-navy/50 mt-1 text-[9px] md:text-[10px]">funcionários</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <motion.div
                animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <AlertTriangle className="h-4 w-4 text-red-500 md:h-5 md:w-5" />
              </motion.div>
              <p className="text-red-600 font-anton text-[clamp(1.1rem,3vw,2.5rem)] leading-none">
                {finalPhantom} funcionários fantasmas
              </p>
            </div>
            <p className="text-navy/60 max-w-md text-center text-[11px] leading-relaxed md:text-xs">
              Rotas geradas para pessoas que não existem mais — custo maior, SLA afetado
            </p>
          </motion.div>

          {/* ATO 3: CONVERGÊNCIA */}
          <motion.div
            style={reduced ? {} : { opacity: convergenceOpacity, scale: convergenceScale }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div
              className="border-navy/15 rounded-[24px] border-2 bg-cream/80 px-6 py-6 text-center backdrop-blur-md md:px-12 md:py-10"
              style={{ borderColor: accentColor }}
            >
              <CheckCircle2 className="mx-auto h-6 w-6 md:h-8 md:w-8" style={{ color: accentColor }} />
              <p className="text-navy/50 mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] md:mt-4 md:text-[10px]">
                1 fonte de verdade
              </p>
              <p className="font-anton text-navy mt-2 text-[clamp(2rem,6vw,5rem)] leading-none">
                1.500
              </p>
              <p className="text-navy/50 mt-1 text-[10px] md:text-[11px]">funcionários reais</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-center md:mt-10 md:gap-4">
              <div>
                <p className="font-anton text-navy text-lg leading-none md:text-3xl">R$ 3 mi</p>
                <p className="text-navy/50 mt-1 text-[8px] uppercase tracking-wider md:text-[9px]">
                  economia/ano
                </p>
              </div>
              <div>
                <p className="font-anton text-navy text-lg leading-none md:text-3xl">
                  R$ 13 → 10 mi
                </p>
                <p className="text-navy/50 mt-1 text-[8px] uppercase tracking-wider md:text-[9px]">
                  custo anual (-23%)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}