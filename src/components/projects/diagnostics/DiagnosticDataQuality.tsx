import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

type Planilha = { num: string; x: number; y: number; rot: number }

const CENTER_CARD = { num: '1.700', rot: -2 }

const OTHERS_DESKTOP: Planilha[] = [
  { num: '2.100', x: -290, y: -145, rot: -8 },
  { num: '1.750', x: 0, y: -165, rot: 5 },
  { num: '1.900', x: 290, y: -145, rot: -3 },
  { num: '1.640', x: -310, y: 0, rot: -6 },
  { num: '1.430', x: 310, y: 0, rot: -5 },
  { num: '1.700', x: -290, y: 145, rot: 3 },
  { num: '1.850', x: 0, y: 165, rot: -7 },
  { num: '2.040', x: 290, y: 145, rot: 6 },
]

const OTHERS_MOBILE: Planilha[] = [
  { num: '2.100', x: -110, y: -90, rot: -8 },
  { num: '1.750', x: 0, y: -105, rot: 5 },
  { num: '1.900', x: 110, y: -90, rot: -3 },
  { num: '1.640', x: -120, y: 0, rot: -6 },
  { num: '1.430', x: 120, y: 0, rot: -5 },
  { num: '1.700', x: -110, y: 90, rot: 3 },
  { num: '1.850', x: 0, y: 105, rot: -7 },
  { num: '2.040', x: 110, y: 90, rot: 6 },
]

export function DiagnosticDataQuality({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [phantomCount, setPhantomCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showOthers, setShowOthers] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Guard: outros cards só entram no DOM quando o scroll passar de 0.03.
  // Isso garante que no primeiro frame SÓ o card central existe na tela.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v > 0.03
    if (next !== showOthers) setShowOthers(next)
  })

  // Ato 1 — Grid
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0])
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

  const others = isMobile ? OTHERS_MOBILE : OTHERS_DESKTOP

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 pt-16">
        <div className="relative w-full max-w-4xl" style={{ minHeight: '70vh' }}>
          {/* ATO 1 — GRID */}
          <motion.div
            style={reduced ? {} : { opacity: gridOpacity, scale: gridScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative h-[55vh] w-full md:h-[60vh]">
              {/* Card central "1.700" — único elemento visível no frame 0 */}
              <CenterCard scrollYProgress={scrollYProgress} reduced={reduced} />

              {/* Outros cards — só montam após scroll > 0.03 */}
              {showOthers &&
                others.map((p, i) => (
                  <PlanilhaCard
                    key={`${p.num}-${i}`}
                    planilha={p}
                    index={i}
                    total={others.length}
                    scrollYProgress={scrollYProgress}
                    reduced={reduced}
                  />
                ))}
            </div>

            {/* Texto de contexto — só aparece junto com os outros */}
            {showOthers && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-navy/50 absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-[10px] font-bold tracking-[0.2em] uppercase md:bottom-4"
              >
                Dezenas de planilhas · mesmo indicador
              </motion.p>
            )}
          </motion.div>

          {/* ATO 2 — CONFLITO */}
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

          {/* ATO 3 — CONVERGÊNCIA */}
          <motion.div
            style={reduced ? {} : { opacity: convergenceOpacity, scale: convergenceScale }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div
              className="border-navy/15 rounded-[24px] border-2 bg-cream/80 px-6 py-6 text-center backdrop-blur-md md:px-12 md:py-10"
              style={{ borderColor: accentColor }}
            >
              <CheckCircle2
                className="mx-auto h-6 w-6 md:h-8 md:w-8"
                style={{ color: accentColor }}
              />
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

// ============================================
// CARD CENTRAL — "1.700" sempre visível
// ============================================
function CenterCard({
  scrollYProgress,
  reduced,
}: {
  scrollYProgress: MotionValue<number>
  reduced: boolean | null
}) {
  const scale = reduced ? 1 : useTransform(scrollYProgress, [0, 0.04], [0.7, 1])

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        style={{ scale, rotate: CENTER_CARD.rot }}
        className="border-navy/25 bg-cream/95 rounded-xl border-2 px-4 py-2.5 shadow-lg backdrop-blur-sm md:px-5 md:py-3"
      >
        <div className="flex items-center gap-1.5 pb-1 md:pb-1.5">
          <span className="bg-navy/25 h-1 w-1 rounded-full" />
          <span className="bg-navy/25 h-1 w-1 rounded-full" />
          <span className="bg-navy/25 h-1 w-1 rounded-full" />
        </div>
        <p className="font-anton text-navy text-base leading-none md:text-xl">
          {CENTER_CARD.num}
        </p>
      </motion.div>
    </div>
  )
}

// ============================================
// CARD NÃO-CENTRAL — opacity via scroll
// ============================================
function PlanilhaCard({
  planilha,
  index,
  total,
  scrollYProgress,
  reduced,
}: {
  planilha: Planilha
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  reduced: boolean | null
}) {
  const start = 0.04 + (index / total) * 0.2
  const end = start + 0.03

  const opacity = reduced ? 1 : useTransform(scrollYProgress, [start, end], [0, 1])
  const scale = reduced ? 1 : useTransform(scrollYProgress, [start, end], [0.7, 1])

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        style={{
          x: planilha.x,
          y: planilha.y,
          rotate: planilha.rot,
          opacity,
          scale,
        }}
        className="border-navy/15 bg-cream/70 rounded-lg border px-2.5 py-1.5 shadow-sm backdrop-blur-sm md:px-3 md:py-2"
      >
        <div className="flex items-center gap-1 pb-0.5 md:gap-1.5 md:pb-1">
          <span className="bg-navy/20 h-1 w-1 rounded-full" />
          <span className="bg-navy/20 h-1 w-1 rounded-full" />
          <span className="bg-navy/20 h-1 w-1 rounded-full" />
        </div>
        <p className="font-anton text-navy text-xs leading-none md:text-base">
          {planilha.num}
        </p>
      </motion.div>
    </div>
  )
}