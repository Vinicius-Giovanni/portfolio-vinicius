import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Particle = {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
  depth: number
}

const PARTICLE_COUNT_DESKTOP = 60
const PARTICLE_COUNT_MOBILE = 24

export function HeroCssParticles() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 8,
      depth: 0.3 + Math.random() * 0.7,
    }))
    setParticles(generated)
  }, [])

  useEffect(() => {
    if (reduced) return
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      setMouse({
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Glow ambiente pulsante */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.18), transparent 70%)' }}
      />

      {/* Partículas */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="bg-navy absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: 0.3 + p.depth * 0.35,
            x: mouse.x * p.depth * 30,
            y: mouse.y * p.depth * 30,
          }}
          animate={{
            y: [0, -20 * p.depth, 0],
            x: [0, 10 * p.depth, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}