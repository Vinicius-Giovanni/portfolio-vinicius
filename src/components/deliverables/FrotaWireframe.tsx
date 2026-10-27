import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const LINE = '#4A9EFF'
const GLOW = '#00E5FF'
const MUTED = 'rgba(74, 158, 255, 0.35)'
const DIM = 'rgba(74, 158, 255, 0.18)'
const LABEL = 'rgba(74, 158, 255, 0.7)'

const HUB = { x: 80, y: 112 }

// 13 pontos de entrega. `via` = rota que absorve o cliente quando a rota dele é removida.
// 3 de 13 removidas ≈ 23% da frota.
type DeliveryNode = { x: number; y: number; via?: number }
const NODES: DeliveryNode[] = [
  { x: 180, y: 38 },
  { x: 235, y: 55, via: 4 },
  { x: 295, y: 32 },
  { x: 350, y: 60 },
  { x: 200, y: 92 },
  { x: 268, y: 88 },
  { x: 330, y: 108, via: 3 },
  { x: 372, y: 140 },
  { x: 190, y: 142 },
  { x: 252, y: 135, via: 5 },
  { x: 310, y: 165 },
  { x: 225, y: 185 },
  { x: 285, y: 198 },
]

const BAR_COUNT = 12
const BAR_X = 40
const BAR_STEP = 26
const BAR_W = 22
const BAR_Y = 268
const BAR_H = 26

// stage 0: parado | 1: rede desenha | 2: frota consolida | 3: barra de 1h | 4: barra colapsa | 5: total
export function FrotaWireframe() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reduced) {
      setStage(5)
      return
    }
    const steps = [
      { ms: 200, s: 1 },
      { ms: 4000, s: 2 },
      { ms: 6800, s: 3 },
      { ms: 9400, s: 4 },
      { ms: 11600, s: 5 },
    ]
    const timers = steps.map(({ ms, s }) => setTimeout(() => setStage(s), ms))
    return () => timers.forEach(clearTimeout)
  }, [isInView, reduced])

  const t = (n: number) => (reduced ? 0 : n)

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 380"
        className="h-auto w-full max-w-[540px]"
        style={{ filter: 'drop-shadow(0 0 40px rgba(74, 158, 255, 0.15))' }}
        role="img"
        aria-label="Rede logística com 23% menos rotas mantendo todos os pontos atendidos, rotina de 1 hora reduzida a menos de 5 minutos, total de mais de R$ 4 milhões de economia anual"
      >
        <defs>
          <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="eco-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(74,158,255,0.14)" />
          </pattern>
        </defs>

        <rect width="400" height="380" fill="url(#eco-dots)" />

        {/* ───────── PAINEL 1 · LOGÍSTICA ───────── */}
        <motion.text
          x={20}
          y={18}
          fill={LABEL}
          fontSize="9"
          fontWeight="600"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 1 ? 1 : 0 }}
          transition={{ duration: t(0.4) }}
        >
          DADOS &amp; B.I · LOGÍSTICA
        </motion.text>

        {/* Rotas hub → entregas */}
        {NODES.map((n, i) => {
          const removed = n.via !== undefined
          return (
            <motion.line
              key={`route-${i}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={n.x}
              y2={n.y}
              stroke={LINE}
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: stage >= 1 ? 1 : 0,
                opacity: stage < 1 ? 0 : removed && stage >= 2 ? 0.1 : 0.75,
              }}
              transition={{
                pathLength: { duration: t(0.6), delay: t(i * 0.07) },
                opacity: {
                  duration: t(0.6),
                  delay: stage >= 2 && removed ? t(0.1) : t(i * 0.07),
                },
              }}
            />
          )
        })}

        {/* Clientes das rotas removidas são absorvidos pela rota vizinha */}
        {NODES.map((n, i) => {
          if (n.via === undefined) return null
          const v = NODES[n.via]
          return (
            <motion.line
              key={`link-${i}`}
              x1={n.x}
              y1={n.y}
              x2={v.x}
              y2={v.y}
              stroke={GLOW}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: stage >= 2 ? 1 : 0, opacity: stage >= 2 ? 1 : 0 }}
              transition={{ duration: t(0.6), delay: t(0.5) }}
            />
          )
        })}

        {/* Caminhões (pontos viajando nas rotas ativas) */}
        {!reduced &&
          stage >= 1 &&
          NODES.map((n, i) => {
            const removed = n.via !== undefined
            if (removed && stage >= 2) return null
            return (
              <motion.circle
                key={`truck-${i}`}
                r="2.2"
                fill={GLOW}
                initial={{ cx: HUB.x, cy: HUB.y, opacity: 0 }}
                animate={{ cx: [HUB.x, n.x], cy: [HUB.y, n.y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.2 + (i % 4) * 0.25,
                  delay: 0.8 + i * 0.12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )
          })}

        {/* Pontos de entrega: todos continuam acesos */}
        {NODES.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="4.5"
            stroke={stage >= 2 ? GLOW : LINE}
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0, fill: 'rgba(0,229,255,0)' }}
            animate={{
              scale: stage >= 1 ? 1 : 0,
              opacity: stage >= 1 ? 1 : 0,
              fill: stage >= 2 ? 'rgba(0,229,255,0.4)' : 'rgba(0,229,255,0)',
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            transition={{ duration: t(0.4), delay: stage >= 2 ? t(0.9) : t(0.3 + i * 0.07) }}
          />
        ))}

        {/* Centro de distribuição */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.6 }}
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
          transition={{ duration: t(0.5) }}
        >
          <rect
            x={HUB.x - 9}
            y={HUB.y - 9}
            width="18"
            height="18"
            rx="2"
            fill="#050d1a"
            stroke={GLOW}
            strokeWidth="2"
            style={{ filter: 'url(#eco-glow)' }}
          />
          <rect x={HUB.x - 3} y={HUB.y - 3} width="6" height="6" fill={GLOW} />
        </motion.g>

        {/* Métricas do painel 1 */}
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 6 }}
          transition={{ duration: t(0.5), delay: t(0.8) }}
        >
          <text x={HUB.x} y={152} textAnchor="middle" fill={GLOW} fontSize="20" fontFamily="Anton, sans-serif">
            -23%
          </text>
          <text x={HUB.x} y={165} textAnchor="middle" fill={LABEL} fontSize="8.5" fontWeight="600" letterSpacing="1.5">
            FROTA
          </text>
          <text x={HUB.x} y={190} textAnchor="middle" fill={GLOW} fontSize="20" fontFamily="Anton, sans-serif">
            100%
          </text>
          <text x={HUB.x} y={203} textAnchor="middle" fill={LABEL} fontSize="8.5" fontWeight="600" letterSpacing="1.5">
            ATENDIMENTO
          </text>
        </motion.g>

        {/* ───────── PAINEL 2 · RPA ───────── */}
        <motion.text
          x={20}
          y={252}
          fill={LABEL}
          fontSize="9"
          fontWeight="600"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: t(0.4) }}
        >
          RPA · ROTINAS ADMINISTRATIVAS
        </motion.text>

        {/* Trilho tracejado: o espaço de 1h que sobra depois */}
        <motion.rect
          x={BAR_X - 3}
          y={BAR_Y - 3}
          width={BAR_COUNT * BAR_STEP - 2 + 6}
          height={BAR_H + 6}
          rx="3"
          fill="none"
          stroke={DIM}
          strokeWidth="1"
          strokeDasharray="3 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: t(0.5) }}
        />

        {/* 12 blocos de 5 min = 1h */}
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const keep = i === 0
          const collapsed = stage >= 4 && !keep
          return (
            <motion.rect
              key={`bar-${i}`}
              x={BAR_X + i * BAR_STEP}
              y={BAR_Y}
              height={BAR_H}
              rx="2"
              stroke={keep && stage >= 4 ? GLOW : LINE}
              strokeWidth={keep && stage >= 4 ? 1.8 : 1.2}
              initial={{ width: 0, opacity: 0, fill: 'rgba(74,158,255,0.12)' }}
              animate={{
                width: stage >= 3 && !collapsed ? BAR_W : 0,
                opacity: stage >= 3 && !collapsed ? 1 : 0,
                fill: keep && stage >= 4 ? 'rgba(0,229,255,0.45)' : 'rgba(74,158,255,0.12)',
              }}
              style={keep && stage >= 4 ? { filter: 'url(#eco-glow)' } : undefined}
              transition={{
                duration: t(0.35),
                delay: stage >= 4 ? t((BAR_COUNT - i) * 0.04) : t(i * 0.05),
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* Rótulos da barra */}
        <motion.text
          x={BAR_X}
          y={316}
          fill={LABEL}
          fontSize="11"
          fontWeight="700"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 && stage < 4 ? 1 : 0 }}
          transition={{ duration: t(0.3) }}
        >
          1h por processo
        </motion.text>
        <motion.text
          x={BAR_X}
          y={316}
          fill={GLOW}
          fontSize="11"
          fontWeight="700"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: t(0.4), delay: t(0.6) }}
        >
          &lt;5 min por processo
        </motion.text>
        <motion.text
          x={BAR_X + BAR_COUNT * BAR_STEP - 2}
          y={318}
          textAnchor="end"
          fill={GLOW}
          fontSize="20"
          fontFamily="Anton, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: t(0.4), delay: t(0.7) }}
        >
          -92%
        </motion.text>

        {/* ───────── TOTAL ───────── */}
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 8 }}
          transition={{ duration: t(0.6) }}
        >
          <line x1={120} y1={334} x2={280} y2={334} stroke={MUTED} strokeWidth="1" />
          <text
            x={200}
            y={362}
            textAnchor="middle"
            fill={GLOW}
            fontSize="26"
            fontFamily="Anton, sans-serif"
            style={{ filter: 'url(#eco-glow)' }}
          >
            +R$ 4 mi
          </text>
          <text x={200} y={375} textAnchor="middle" fill={LABEL} fontSize="8.5" fontWeight="600" letterSpacing="2">
            ECONOMIA ANUAL
          </text>
        </motion.g>
      </svg>
    </div>
  )
}