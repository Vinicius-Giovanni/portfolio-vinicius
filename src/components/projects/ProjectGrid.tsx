import { useState } from 'react'
import { PROJECTS, type ProjectType } from '@/data/projects'
import { ProjectCard } from './ProjectCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | ProjectType

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todos os dossiês' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'side', label: 'Side projects' },
]

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = PROJECTS.filter((p) => filter === 'all' || p.type === filter)

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-bold transition-all',
              filter === f.key
                ? 'bg-navy text-cream'
                : 'border-navy/20 text-navy/60 hover:border-navy/40 hover:text-navy border',
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="text-navy/40 ml-auto text-xs font-medium">
          {filtered.length} {filtered.length === 1 ? 'dossiê' : 'dossiês'}
        </span>
      </div>

      {/* Grid — featured ocupa 2 colunas */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}