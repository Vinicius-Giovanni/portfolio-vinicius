import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type TypewriterProps = {
  text: string
  speed?: number
  delay?: number
  className?: string
  resetKey?: unknown
}

export function Typewriter({ text, speed = 28, delay = 0, className, resetKey }: TypewriterProps) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? text : '')

  useEffect(() => {
    if (reduced) {
      setDisplay(text)
      return
    }
    setDisplay('')
    let i = 0
    let timeoutId: ReturnType<typeof setTimeout>
    const start = setTimeout(() => {
      const tick = () => {
        i++
        setDisplay(text.slice(0, i))
        if (i < text.length) timeoutId = setTimeout(tick, speed)
      }
      tick()
    }, delay)
    return () => {
      clearTimeout(start)
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay, reduced, resetKey])

  return (
    <span className={cn('relative inline-block align-baseline', className)}>
      {/* Reserva espaço do texto completo (incluindo quebras de linha) */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      {/* Texto animado sobreposto */}
      <span className="absolute inset-0">{display}</span>
    </span>
  )
}