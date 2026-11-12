import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { METRICS, PROOF_IDS, VOLUME_IDS } from '@/data/metrics'

export function Proof() {
  return (
    <section id="resultados" className="bg-navy text-cream relative overflow-hidden py-24 md:py-32">
      {/* Grid pontilhado */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(237,230,216,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto w-[min(92%,1280px)]">
        <SectionLabel variant="light">RESULTADOS</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream mt-10 max-w-3xl font-bold leading-tight"
          style={{ fontSize: 'clamp(1.75rem,4vw,3.5rem)' }}
        >
          Resultados em operação logística de grande escala
        </motion.h2>

        {/* Grade de 4 números */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-5">
          {PROOF_IDS.map((id, i) => {
            const m = METRICS[id]
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-cream/10 rounded-2xl border p-4 sm:p-5 md:p-6"
              >
                <p className="font-anton text-cream text-[clamp(1.4rem,3.8vw,3rem)] leading-[0.95] tracking-tight">
                  {m.value}
                </p>
                <p className="text-cream/70 mt-2 text-xs font-semibold leading-tight uppercase tracking-wide">
                  {m.label}
                </p>
                {m.micro && (
                  <p className="text-cream/40 mt-1.5 text-[10px] leading-snug">{m.micro}</p>
                )}
                {m.caseSlug && (
                  <Link
                    to="/projetos/$slug"
                    params={{ slug: m.caseSlug }}
                    className="text-cream/40 hover:text-cream mt-3 inline-block text-[10px] font-bold tracking-[0.15em] uppercase transition-colors"
                  >
                    Case →
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Linha de volume */}
        <div className="border-cream/10 mt-10 flex flex-wrap gap-6 border-t pt-8 md:gap-10">
          {VOLUME_IDS.map((id) => {
            const m = METRICS[id]
            return (
              <div key={id} className="flex items-baseline gap-3">
                <span className="font-anton text-cream text-2xl leading-none">{m.value}</span>
                <span className="text-cream/60 text-xs font-medium">{m.label}</span>
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-cream/40 mt-8 text-[10px] leading-relaxed">
          Valores de naturezas distintas; não somar.
        </p>
      </div>
    </section>
  )
}
