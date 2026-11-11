import { PROJECTS } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  return (
    <div>
      <div className="mb-8 flex justify-end">
        <span className="text-navy/40 text-xs font-medium">
          {PROJECTS.length} {PROJECTS.length === 1 ? 'case' : 'cases'}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
