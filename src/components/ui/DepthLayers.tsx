import { motion, useReducedMotion } from 'motion/react'

export function DepthLayers({ variant = 'navy' }: { variant?: 'navy' }) {
  const reduced = useReducedMotion()
  const isNavy = variant === 'navy'

  return (
    <>
      {/* CAMADA 1 — Grid animado ao fundo */}
      <motion.div
        className="pointer-events-none absolute inset-[-15%]"
        animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage: isNavy
            ? 'linear-gradient(rgba(237,230,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(237,230,216,0.04) 1px, transparent 1px)'
            : 'linear-gradient(rgba(11,31,58,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(11,31,58,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
        aria-hidden
      />

      {/* CAMADA 2 — Formas geométricas borradas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          animate={
            reduced ? undefined : { y: [0, -25, 0], rotate: [0, 8, 0], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[8%] right-[6%] h-40 w-40 rounded-full blur-3xl md:h-64 md:w-64"
          style={{
            background: isNavy
              ? 'radial-gradient(circle, rgba(237,230,216,0.12), transparent 70%)'
              : 'radial-gradient(circle, rgba(11,31,58,0.12), transparent 70%)',
          }}
        />
        <motion.div
          animate={
            reduced ? undefined : { y: [0, 30, 0], rotate: [0, -10, 0], scale: [1, 1.15, 1] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[10%] left-[4%] h-32 w-32 rounded-full blur-3xl md:h-56 md:w-56"
          style={{
            background: isNavy
              ? 'radial-gradient(circle, rgba(245,197,24,0.10), transparent 70%)'
              : 'radial-gradient(circle, rgba(11,31,58,0.08), transparent 70%)',
          }}
        />
        <motion.div
          animate={
            reduced ? undefined : { x: [0, 40, 0], rotate: [0, 90, 0] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[40%] left-[3%] h-24 w-24 blur-2xl md:h-32 md:w-32"
          style={{
            background: isNavy
              ? 'linear-gradient(45deg, rgba(237,230,216,0.08), transparent)'
              : 'linear-gradient(45deg, rgba(11,31,58,0.08), transparent)',
            borderRadius: '40%',
          }}
        />
      </div>

      {/* CAMADA 3 — Partículas flutuando */}
      <AmbientParticles
        count={18}
        color={isNavy ? 'rgba(237,230,216,0.5)' : 'rgba(11,31,58,0.35)'}
      />

      {/* CAMADA 4 — Vinheta fotográfica nas bordas */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: isNavy
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
            : 'radial-gradient(ellipse at center, transparent 45%, rgba(11,31,58,0.18) 100%)',
        }}
      />
    </>
  )
}

function AmbientParticles({ count = 20, color = 'rgba(237,230,216,0.4)' }: { count?: number; color?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: color,
            left: `${(i * 47) % 100}%`,
            top: `${(i * 71) % 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{
            duration: 5 + (i % 5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}