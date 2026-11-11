import { Link } from '@tanstack/react-router'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { PROJECTS } from '@/data/projects'

export function CasesPreview() {
  return (
    <section className="bg-cream relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto w-[min(92%,1280px)]">
        <SectionLabel>CASES</SectionLabel>

        <h2
          className="text-navy mt-10 max-w-3xl font-bold leading-tight"
          style={{ fontSize: 'clamp(1.75rem,4vw,3.5rem)' }}
        >
          Operações reais, números auditáveis
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/projetos"
            className="text-navy/60 hover:text-navy inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
          >
            Ver todos os cases →
          </Link>
        </div>
      </div>
    </section>
  )
}
