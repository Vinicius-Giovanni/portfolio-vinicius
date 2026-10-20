import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { CheckCircle2, Loader2 } from 'lucide-react'

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function DiagnosticRPA({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [leftSeconds, setLeftSeconds] = useState(0)
  const [rightSeconds, setRightSeconds] = useState(0)
  const [hoursCount, setHoursCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const timersOpacity = useTransform(scrollYProgress, [0, 0.65, 0.75], [1, 1, 0])
  const timersScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.85])

  const numbersOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])
  const numbersY = useTransform(scrollYProgress, [0.75, 1], [40, 0])

  const leftVal = useTransform(scrollYProgress, [0, 0.7], [0, 3600])
  const rightVal = useTransform(scrollYProgress, [0, 0.25], [0, 300])
  const hoursVal = useTransform(scrollYProgress, [0.78, 1], [0, 5400])

  useMotionValueEvent(leftVal, 'change', (v) => {
    if (!reduced) setLeftSeconds(Math.floor(v))
  })
  useMotionValueEvent(rightVal, 'change', (v) => {
    if (!reduced) setRightSeconds(Math.floor(v))
  })
  useMotionValueEvent(hoursVal, 'change', (v) => {
    if (!reduced) setHoursCount(Math.round(v))
  })

  const finalLeft = reduced ? 3600 : leftSeconds
  const finalRight = reduced ? 300 : rightSeconds
  const finalHours = reduced ? 5400 : hoursCount
  const rightDone = finalRight >= 300

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4">
        <div className="w-full max-w-5xl">
          {/* TIMERS */}
          <motion.div
            style={reduced ? {} : { opacity: timersOpacity, scale: timersScale }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10"
          >
            {/* LEFT — MANUAL */}
            <div className="border-navy/15 bg-cream/60 rounded-[24px] border p-8 text-center md:p-10">
              <p className="text-navy/50 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                Processo Manual
              </p>
              <p className="font-anton text-navy mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none tabular-nums">
                {formatTime(finalLeft)}
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                {!rightDone || finalLeft < 3600 ? (
                  <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
                <p className="text-navy/60 text-xs font-medium">
                  Funcionário programando pedidos
                </p>
              </div>
            </div>

            {/* RIGHT — RPA */}
            <div
              className="rounded-[24px] border-2 p-8 text-center md:p-10"
              style={{
                borderColor: rightDone ? accentColor : 'rgba(11,31,58,0.15)',
                backgroundColor: rightDone ? `${accentColor}10` : 'rgba(237,230,216,0.6)',
              }}
            >
              <p className="text-navy/50 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                RPA Bot
              </p>
              <p className="font-anton text-navy mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none tabular-nums">
                {formatTime(finalRight)}
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                {rightDone ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" style={{ color: accentColor }} />
                    <p className="text-xs font-bold" style={{ color: accentColor }}>
                      Concluído em 5 minutos
                    </p>
                  </>
                ) : (
                  <p className="text-navy/60 text-xs font-medium">Executando regras...</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* BIG NUMBERS */}
          <motion.div
            style={reduced ? {} : { opacity: numbersOpacity, y: numbersY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="text-navy/50 mb-4 font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
              Diagnóstico
            </span>
            <p
              className="font-anton leading-[0.85] tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)', color: '#0B1F3A' }}
            >
              {finalHours.toLocaleString('pt-BR')}
            </p>
            <p className="text-navy/60 mt-2 text-sm font-bold tracking-[0.2em] uppercase md:text-base">
              horas/ano liberadas
            </p>

            <div className="border-navy/15 mt-8 flex flex-col items-center border-t pt-8 md:mt-10">
              <p
                className="font-anton text-[clamp(1.75rem,5vw,3.5rem)] leading-none tracking-tight"
                style={{ color: accentColor }}
              >
                ≈ 2,7 pessoas full-time/ano
              </p>
              <p className="text-navy/60 mt-2 text-xs font-bold tracking-[0.2em] uppercase">
                realocadas para trabalho analítico
              </p>
            </div>

            <p className="text-navy/50 mt-10 max-w-md text-xs leading-relaxed md:text-sm">
              1h → 5min por execução (-92%) · R$ 98 mil/ano de economia direta
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}