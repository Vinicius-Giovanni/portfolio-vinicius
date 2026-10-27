import { useEffect, useRef } from 'react'
import { motion, useAnimationFrame, useInView, useReducedMotion } from 'motion/react'

const COLOR_LINE = '#4A9EFF'
const COLOR_GLOW = '#00E5FF'
const COLOR_MUTED = 'rgba(74, 158, 255, 0.35)'
const COLOR_LABEL = 'rgba(74, 158, 255, 0.7)'

const GATE = { x: 190, y: 150 }
const BASE_Y = 212

const CLOUD = Array.from({ length: 22 }, (_, i) => ({
  x: 24 + ((i * 53) % 97),
  y: 72 + ((i * 37) % 148),
  r: 1.8 + (i % 3) * 0.6,
}))

const BARS = [
  { x: 266, h: 38 },
  { x: 288, h: 58 },
  { x: 310, h: 46 },
  { x: 332, h: 84 },
  { x: 354, h: 70 },
]

// Timing das partículas (compartilhado com as barras)
const PARTICLE_DELAY = 1.2
const PARTICLE_STEP = 0.2
const PARTICLE_DURATION = 2.6

const PARTICLES = CLOUD.slice(0, 15).map((c, i) => {
  const bar = BARS[i % BARS.length]
  return { sx: c.x, sy: c.y, tx: bar.x + 8, ty: BASE_Y - bar.h - 4, i }
})

// Instante da 1ª chegada de cada partícula, agrupado por barra
const ARRIVALS = BARS.map((_, j) =>
  PARTICLES.filter((p) => p.i % BARS.length === j).map(
    (p) => PARTICLE_DELAY + p.i * PARTICLE_STEP + PARTICLE_DURATION,
  ),
)

const STEP_GROW = 0.45 // segundos para completar cada degrau
const PULSE_DECAY = 0.3 // queda do brilho após a chegada

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (x: number) => 1 - (1 - x) * (1 - x)

// 0 → 1: quanto da altura final a barra j já atingiu
// (cada chegada soma 1/n e depois a barra para de crescer)
function levelAt(j: number, time: number) {
  const arr = ARRIVALS[j]
  let sum = 0
  for (const a of arr) sum += easeOut(clamp01((time - a) / STEP_GROW))
  return sum / arr.length
}

// 0 → 1: brilho do último ponto recebido (só nas chegadas que contam)
function pulseAt(j: number, time: number) {
  let dt = Infinity
  for (const a of ARRIVALS[j]) if (time >= a) dt = Math.min(dt, time - a)
  return dt === Infinity ? 0 : Math.exp(-dt / PULSE_DECAY)
}

export function DashboardWireframe() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  const barRefs = useRef<(SVGRectElement | null)[]>([])
  const lineRef = useRef<SVGPolylineElement>(null)
  const startRef = useRef<number | null>(null)

  const t = (delay: number, duration = 0.6) => ({
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  })

    const applyFrame = (time: number, still = false) => {
    const pts: string[] = []
    BARS.forEach((b, j) => {
        const level = still ? 1 : levelAt(j, time)
        const pulse = still ? 0 : pulseAt(j, time)
        const h = b.h * level
        const el = barRefs.current[j]
        if (el) {
        el.setAttribute('y', String(BASE_Y - h))
        el.setAttribute('height', String(Math.max(0, h)))
        el.setAttribute('opacity', h > 0.5 ? '1' : '0')
        el.setAttribute('fill', `rgba(0, 229, 255, ${0.1 + 0.35 * pulse})`)
        el.setAttribute('stroke-width', String((j === 3 ? 1.8 : 1.3) + 1.2 * pulse))
        }
        pts.push(`${b.x + 8},${BASE_Y - h - 10}`)
    })
    lineRef.current?.setAttribute('points', pts.join(' '))
    }

  // Marca o início do relógio quando entra na tela
  useEffect(() => {
    if (!isInView) return
    startRef.current = performance.now()
    if (reduced) applyFrame(0, true)
  }, [isInView, reduced])

  // Loop: barras e linha reagem às chegadas
  useAnimationFrame(() => {
    if (reduced || startRef.current === null) return
    applyFrame((performance.now() - startRef.current) / 1000)
  })

  const initialTrend = BARS.map((b) => `${b.x + 8},${BASE_Y - 10}`).join(' ')

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 290"
        className="h-auto w-full max-w-[540px]"
        style={{ filter: 'drop-shadow(0 0 40px rgba(74, 158, 255, 0.15))' }}
        role="img"
        aria-label="Dados brutos e desorganizados passam por código e se transformam em um painel de decisão"
      >
        <defs>
          <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="flow-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(74,158,255,0.12)" />
          </pattern>
        </defs>

        <rect width="400" height="290" fill="url(#flow-dots)" />

        {/* ───────── 1 · DADOS BRUTOS ───────── */}
        {CLOUD.map((c, i) => (
          <motion.circle
            key={`cloud-${i}`}
            cx={c.x}
            cy={c.y}
            r={c.r}
            fill={COLOR_MUTED}
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? reduced
                  ? { opacity: 0.8 }
                  : { opacity: 0.8, y: [0, i % 2 ? -4 : 4, 0] }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : i * 0.04 },
              y: { duration: 3 + (i % 4) * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* ───────── 2 · PORTAL DE CÓDIGO ───────── */}
        <motion.circle
          cx={GATE.x}
          cy={GATE.y}
          r={50}
          fill="none"
          stroke={COLOR_MUTED}
          strokeWidth="1"
          strokeDasharray="3 6"
          style={{ transformOrigin: `${GATE.x}px ${GATE.y}px` }}
          initial={{ opacity: 0 }}
          animate={isInView ? (reduced ? { opacity: 1 } : { opacity: 1, rotate: 360 }) : { opacity: 0 }}
          transition={{
            opacity: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3 },
            rotate: { duration: 24, repeat: Infinity, ease: 'linear' },
          }}
        />

        <motion.polyline
          points="176,118 160,150 176,182"
          fill="none"
          stroke={COLOR_LINE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'url(#flow-glow)' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={t(0.5, 0.8)}
        />
        <motion.polyline
          points="204,118 220,150 204,182"
          fill="none"
          stroke={COLOR_LINE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'url(#flow-glow)' }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={t(0.6, 0.8)}
        />

        {!reduced && isInView && (
          <motion.line
            x1={178}
            x2={202}
            stroke={COLOR_GLOW}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ y1: 122, y2: 122, opacity: 0 }}
            animate={{ y1: [122, 178], y2: [122, 178], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, delay: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        )}

        {/* ───────── 3 · PAINEL ───────── */}
        <motion.rect
          x={250}
          y={70}
          width={130}
          height={160}
          rx={8}
          fill="rgba(4, 9, 20, 0.5)"
          stroke={COLOR_LINE}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={t(0.8, 1)}
        />

        {[0, 1, 2].map((k) => (
          <motion.line
            key={`kpi-${k}`}
            x1={264 + k * 38}
            x2={264 + k * 38 + 26}
            y1={90}
            y2={90}
            stroke={COLOR_MUTED}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={t(1.3 + k * 0.12, 0.4)}
          />
        ))}

        {/* barras controladas pelo loop (crescem a cada ponto recebido) */}
        {BARS.map((b, i) => (
          <rect
            key={`bar-${i}`}
            ref={(el) => {
              barRefs.current[i] = el
            }}
            x={b.x}
            y={BASE_Y}
            width={16}
            height={0}
            rx={2}
            opacity={0}
            fill="rgba(0, 229, 255, 0.1)"
            stroke={i === 3 ? COLOR_GLOW : COLOR_LINE}
            strokeWidth={i === 3 ? 1.8 : 1.3}
          />
        ))}

        {/* linha de tendência: acompanha o topo das barras */}
        <motion.polyline
          ref={lineRef}
          points={initialTrend}
          fill="none"
          stroke={COLOR_GLOW}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'url(#flow-glow)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={t(2.2, 0.6)}
        />

        <line x1={262} x2={368} y1={BASE_Y + 1} y2={BASE_Y + 1} stroke={COLOR_MUTED} strokeWidth="1" />

        {/* ───────── PARTÍCULAS: caos → código → painel ───────── */}
        {!reduced &&
          isInView &&
          PARTICLES.map((p) => (
            <motion.circle
              key={`p-${p.i}`}
              r={2.6}
              initial={{ cx: p.sx, cy: p.sy, opacity: 0, fill: COLOR_LINE }}
              animate={{
                cx: [p.sx, 158, GATE.x, 224, p.tx],
                cy: [p.sy, GATE.y + (p.sy - GATE.y) * 0.2, GATE.y, GATE.y, p.ty],
                opacity: [0, 1, 1, 1, 0],
                fill: [COLOR_LINE, COLOR_LINE, COLOR_GLOW, COLOR_GLOW, COLOR_GLOW],
              }}
              transition={{
                duration: PARTICLE_DURATION,
                delay: PARTICLE_DELAY + p.i * PARTICLE_STEP,
                times: [0, 0.35, 0.5, 0.62, 1],
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ filter: 'url(#flow-glow)' }}
            />
          ))}

        {/* ───────── RÓTULOS ───────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={t(2, 0.6)}
        >
          <text x={72} y={258} textAnchor="middle" fill={COLOR_LABEL} fontSize="10" fontWeight="600" letterSpacing="2">
            DADOS
          </text>
          <text x={GATE.x} y={258} textAnchor="middle" fill={COLOR_GLOW} fontSize="10" fontWeight="600" letterSpacing="2">
            CÓDIGO
          </text>
          <text x={315} y={258} textAnchor="middle" fill={COLOR_LABEL} fontSize="10" fontWeight="600" letterSpacing="2">
            DECISÃO
          </text>
        </motion.g>
      </svg>
    </div>
  )
}