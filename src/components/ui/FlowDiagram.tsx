import { motion, useReducedMotion } from 'motion/react'

type NodeVariant = 'dark' | 'light' | 'success' | 'warning' | 'subtle'

const VARIANTS: Record<NodeVariant, { bg: string; border: string; text: string }> = {
  dark: { bg: '#0B1F3A', border: '#0B1F3A', text: '#EDE6D8' },
  light: { bg: '#EDE6D8', border: '#0B1F3A', text: '#0B1F3A' },
  success: { bg: '#ECFDF5', border: '#10B981', text: '#065F46' },
  warning: { bg: '#FFFBEB', border: '#D97706', text: '#78350F' },
  subtle: { bg: '#F3F4F6', border: '#9CA3AF', text: '#374151' },
}

type NodeProps = {
  x: number
  y: number
  w: number
  h: number
  label: string
  sublabel?: string
  variant: NodeVariant
  isActive: boolean
  delay?: number
}

function FlowNode({ x, y, w, h, label, sublabel, variant, isActive, delay = 0 }: NodeProps) {
  const c = VARIANTS[variant]
  const reduced = useReducedMotion()

  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: 'backOut' }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        ry={12}
        fill={c.bg}
        stroke={c.border}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sublabel ? -6 : 0)}
        fill={c.text}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight={600}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 10}
          fill={c.text}
          opacity={0.65}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9}
        >
          {sublabel}
        </text>
      )}
    </motion.g>
  )
}

type FlowPathProps = {
  d: string
  isActive: boolean
  delay?: number
  duration?: number
  color?: string
}

function FlowPath({ d, isActive, delay = 0, duration = 0.5, color = '#0B1F3A' }: FlowPathProps) {
  const reduced = useReducedMotion()
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: 'easeInOut' },
        opacity: { duration: 0.2, delay: reduced ? 0 : delay },
      }}
    />
  )
}

export function FlowDiagram({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 500 580" className="h-auto w-full" aria-hidden>
        {/* Paths (embaixo dos nodes) */}
        <FlowPath d="M 100 90 L 100 160 L 185 160" isActive={isActive} delay={0.5} duration={0.4} />
        <FlowPath d="M 250 90 L 250 135" isActive={isActive} delay={0.6} duration={0.3} />
        <FlowPath d="M 400 90 L 400 160 L 315 160" isActive={isActive} delay={0.7} duration={0.4} />
        <FlowPath d="M 250 185 L 250 260" isActive={isActive} delay={1.0} duration={0.3} />
        <FlowPath
          d="M 250 320 Q 250 440 180 440"
          isActive={isActive}
          delay={1.5}
          duration={0.5}
          color="#10B981"
        />
        <FlowPath
          d="M 250 320 Q 250 440 325 440"
          isActive={isActive}
          delay={1.5}
          duration={0.5}
          color="#D97706"
        />
        <FlowPath d="M 390 465 L 390 505" isActive={isActive} delay={2.1} duration={0.3} color="#D97706" />

        {/* Pulse no RPA (motor do fluxo) */}
        {isActive && !reduced && (
          <>
            <motion.rect
              x={170}
              y={260}
              width={160}
              height={60}
              rx={12}
              fill="none"
              stroke="#EDE6D8"
              strokeWidth={2}
              style={{ transformOrigin: '250px 290px' }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.18, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.6, ease: 'easeOut' }}
            />
            <motion.rect
              x={170}
              y={260}
              width={160}
              height={60}
              rx={12}
              fill="none"
              stroke="#EDE6D8"
              strokeWidth={2}
              style={{ transformOrigin: '250px 290px' }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.18, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 2.3, ease: 'easeOut' }}
            />
          </>
        )}

        {/* Nodes */}
        <FlowNode
          x={45}
          y={50}
          w={110}
          h={40}
          label="Entrada Manual"
          variant="light"
          isActive={isActive}
          delay={0.0}
        />
        <FlowNode
          x={195}
          y={50}
          w={110}
          h={40}
          label="Planilha"
          variant="light"
          isActive={isActive}
          delay={0.1}
        />
        <FlowNode
          x={345}
          y={50}
          w={110}
          h={40}
          label="Sistema ERP"
          variant="light"
          isActive={isActive}
          delay={0.2}
        />

        <FlowNode
          x={185}
          y={135}
          w={130}
          h={50}
          label="Validação"
          sublabel="limpeza + regras"
          variant="subtle"
          isActive={isActive}
          delay={0.9}
        />

        <FlowNode
          x={170}
          y={260}
          w={160}
          h={60}
          label="RPA · Motor de Regras"
          sublabel="aplica decisões automatizadas"
          variant="dark"
          isActive={isActive}
          delay={1.2}
        />

        <FlowNode
          x={40}
          y={415}
          w={140}
          h={50}
          label="✓ Concluído"
          sublabel="automaticamente"
          variant="success"
          isActive={isActive}
          delay={1.9}
        />

        <FlowNode
          x={325}
          y={415}
          w={130}
          h={50}
          label="⚠ Exceção"
          sublabel="fora da regra"
          variant="warning"
          isActive={isActive}
          delay={1.9}
        />

        <FlowNode
          x={320}
          y={505}
          w={140}
          h={50}
          label="👤 Revisão Humana"
          sublabel="tratamento manual"
          variant="warning"
          isActive={isActive}
          delay={2.3}
        />
      </svg>

      {/* Legenda do fluxo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] md:mt-3"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-navy/60">Caminho automatizado</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-navy/60">Exceção → humano</span>
        </span>
      </motion.div>
    </div>
  )
}