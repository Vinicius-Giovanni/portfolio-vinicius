import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<Project['status'], string> = {
  anonymized: 'NDA · Anonimizado',
  live: 'Live',
  'in-development': 'Em breve',
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  const reduced = useReducedMotion()
  const isFeatured = project.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('group relative', isFeatured && 'md:col-span-2')}
    >
      <Link
        to="/projetos/$slug"
        params={{ slug: project.slug }}
        className={cn(
          'rounded-brand border-navy/15 bg-cream/40 hover:bg-cream/70 hover:border-navy/40 relative flex h-full flex-col overflow-hidden border backdrop-blur-sm transition-all duration-300',
          'hover:shadow-[0_16px_40px_-12px_rgba(11,31,58,0.18)]',
          isFeatured ? 'p-7 md:p-10' : 'p-6 md:p-8',
        )}
      >
        {/* Glow colorido no hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${project.accentColor}14, transparent 55%)`,
          }}
          aria-hidden
        />

        {/* Carimbo "DECLASSIFIED" no hover */}
        <div
          className="pointer-events-none absolute top-6 right-6 opacity-0 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:opacity-100 md:top-10 md:right-10"
          aria-hidden
        >
          <span
            className="border-2 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{
              borderColor: project.accentColor,
              color: project.accentColor,
            }}
          >
            Declassified
          </span>
        </div>

        {/* Header — dossiê + status + ano */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-navy/50 uppercase">
              Dossiê {project.dossierNumber}
            </span>
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span
              className="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-white uppercase"
              style={{ backgroundColor: project.accentColor }}
            >
              {project.category}
            </span>
          </div>
          <span className="text-navy/40 text-[11px] font-medium">{project.year}</span>
        </div>

        {/* Título */}
        <h3
          className={cn(
            'text-navy font-anton relative mt-6 leading-[0.95] tracking-tight',
            isFeatured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl',
          )}
        >
          {project.title}
        </h3>
        <p className="text-navy/55 relative mt-2 text-sm">{project.subtitle}</p>

        {/* Métricas — 2 destacadas */}
        <div className="border-navy/10 relative mt-auto pt-8">
          <div
            className={cn(
              'grid gap-4',
              isFeatured ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-2',
            )}
          >
            {project.cardMetrics.slice(0, 2).map((m, i) => (
              <div key={i}>
                <p
                  className={cn(
                    'text-navy leading-[0.95] font-bold',
                    isFeatured ? 'text-2xl md:text-4xl font-anton' : 'text-xl md:text-2xl',
                  )}
                >
                  {m.value}
                </p>
                <p className="text-navy/50 mt-1.5 text-[10px] leading-tight font-medium">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-navy/10 relative mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-navy/40 text-[9px] font-bold tracking-[0.2em] uppercase">
            {STATUS_LABEL[project.status]}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-navy/50 group-hover:text-navy text-[10px] font-bold tracking-[0.15em] uppercase transition-colors">
              Ver dossiê
            </span>
            <ArrowUpRight
              className="text-navy/40 group-hover:text-navy h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}