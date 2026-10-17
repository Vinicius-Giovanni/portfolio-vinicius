import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type CountUpProps = {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  resetKey?: unknown
}

export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className,
  resetKey,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, margin: '-50px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(from)

  const hasDecimals = to % 1 !== 0
  const format = (n: number) =>
    n.toLocaleString('pt-BR', {
      minimumFractionDigits: hasDecimals ? 1 : 0,
      maximumFractionDigits: hasDecimals ? 1 : 0,
    })

  const current = `${prefix}${format(value)}${suffix}`
  const final = `${prefix}${format(to)}${suffix}`

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    if (!inView) return
    setValue(from)
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [from, to, duration, inView, reduced, resetKey])

  return (
    <span
      ref={ref}
      className={cn('relative inline-block align-baseline', className)}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {/* Reserva o espaço do valor final — nunca muda */}
      <span aria-hidden className="invisible">
        {final}
      </span>
      {/* Valor animado sobreposto */}
      <span className="absolute inset-0">{current}</span>
    </span>
  )
}