import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Segment = { value: number; color: string }

type DonutChartProps = {
  segments: Segment[]
  size?: number
  strokeWidth?: number
  children?: ReactNode
}

export function DonutChart({ segments, size = 200, strokeWidth = 26, children }: DonutChartProps) {
  const radius = (size - strokeWidth) / 2
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  let cumulative = 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {segments.map((seg, i) => {
          const fraction = seg.value / total
          const rotation = cumulative * 360
          cumulative += fraction
          return (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              pathLength={1}
              strokeDasharray={`${fraction} 1`}
              initial={{ strokeDashoffset: fraction }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.1, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: `${size / 2}px ${size / 2}px`,
              }}
            />
          )
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}