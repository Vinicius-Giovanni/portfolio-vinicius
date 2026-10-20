import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Printer } from 'lucide-react'
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  CV_VARIANTS,
  type CVVariant,
} from '@/data/cv'
import { NavBar } from '#/components/ui/NavBar'

export const Route = createFileRoute('/cv')({
  validateSearch: (search: Record<string, unknown>): { v: CVVariant } => ({
    v: search.v === 'tech' ? 'tech' : 'corporate',
  }),
  component: CVPage,
})

function CVPage() {
  const { v } = Route.useSearch()
  const navigate = useNavigate()
  const variant = CV_VARIANTS[v]

  const handlePrint = () => window.print()

  const setVariant = (next: CVVariant) => {
    navigate({ to: '/cv', search: { v: next } })
  }

  return (
    <>
    <NavBar forceVisible />
    <div className="min-h-screen bg-[#ede6d8] text-[#0b1f3a] pt-14 print:bg-white print:pt-0">
      {/* Barra de ações — some na impressão */}
      <div className="sticky top-14 z-50 bg-[#ede6d8] print:hidden">
        <div className="mx-auto flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-2 rounded-full bg-white/60 p-1 backdrop-blur-sm">
            {(Object.keys(CV_VARIANTS) as CVVariant[]).map((key) => (
              <button
                key={key}
                onClick={() => setVariant(key)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  v === key
                    ? 'bg-[#0b1f3a] text-[#ede6d8]'
                    : 'text-[#0b1f3a]/60 hover:text-[#0b1f3a]'
                }`}
              >
                {CV_VARIANTS[key].label}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-full bg-[#0b1f3a] px-5 py-2.5 text-sm font-bold text-[#ede6d8] transition hover:opacity-90"
          >
            <Printer className="h-4 w-4" />
            Baixar PDF
          </button>
        </div>
        <p className="mx-auto max-w-[210mm] px-4 pb-3 text-center text-[11px] text-[#0b1f3a]/50">
          Versão: {variant.label} — {variant.tagline}
        </p>
      </div>

      {/* Folha A4 */}
      <main className="mx-auto max-w-[210mm] bg-white p-[20mm] shadow-xl print:max-w-none print:p-0 print:shadow-none">
        {/* Header */}
        <header className="border-b border-[#0b1f3a]/20 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="mt-1 text-sm text-[#0b1f3a]/70">
            {PROFILE.location} · {PROFILE.email} · {PROFILE.phone}
          </p>
          <p className="mt-0.5 text-sm text-[#0b1f3a]/70">
            {PROFILE.linkedin} · {PROFILE.github}
          </p>
        </header>

        {variant.sectionOrder.map((section) => {
          if (section === 'summary') {
            return (
              <Section key="summary" title="Resumo">
                <p className="text-sm leading-relaxed">{variant.summary}</p>
              </Section>
            )
          }
          if (section === 'skills') {
            return (
              <Section key="skills" title="Habilidades Técnicas">
                <p className="text-sm leading-relaxed"><strong>Dados & BI:</strong> {SKILLS.data}</p>
                <p className="mt-1 text-sm leading-relaxed"><strong>Automação & Desenvolvimento:</strong> {SKILLS.dev}</p>
                <p className="mt-1 text-sm leading-relaxed"><strong>Idiomas:</strong> {SKILLS.languages}</p>
              </Section>
            )
          }
          if (section === 'experience') {
            return (
              <Section key="experience" title="Experiência Profissional">
                <div className="space-y-4">
                  <JobBlock job={EXPERIENCE.casasBahiaAnalyst} />
                  <JobBlock job={EXPERIENCE.casasBahiaAssistant} />
                  <JobBlock job={EXPERIENCE.casasBahiaHelper} />
                  <CosmosBlock data={variant.cosmos} />
                </div>
              </Section>
            )
          }
          if (section === 'education') {
            return (
              <Section key="education" title="Formação">
                <ul className="space-y-1 text-sm leading-relaxed">
                  {EDUCATION.map((edu) => (
                    <li key={edu.title}>
                      <strong>{edu.title}</strong> — {edu.institution} · {edu.period}
                    </li>
                  ))}
                </ul>
              </Section>
            )
          }
          return null
        })}
      </main>

      <style>{`
        @media print {
          @page { size: A4; margin: 20mm; }
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
    </>
  )
}

// ============================================================
// SUBCOMPONENTES
// ============================================================
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-xs font-bold tracking-[0.2em] text-[#0b1f3a]/60 uppercase">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function JobBlock({
  job,
}: {
  job: {
    company: string
    role: string
    period: string
    bullets?: string[]
    description?: string
    highlights?: { label: string; text: string }[]
  }
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold">
          {job.company} — {job.role}
        </h3>
        <span className="text-xs whitespace-nowrap text-[#0b1f3a]/60">{job.period}</span>
      </div>

      {job.bullets && (
        <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-relaxed">
          {job.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {job.description && <p className="mt-1 text-sm leading-relaxed">{job.description}</p>}

      {job.highlights && (
        <>
          <p className="mt-1 text-sm font-medium">Projetos de destaque:</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-relaxed">
            {job.highlights.map((h) => (
              <li key={h.label}>
                <strong>{h.label}:</strong> {h.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function CosmosBlock({
  data,
}: {
  data: { company: string; role: string; period: string; bullets: string[] }
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold">
          {data.company} — {data.role}
        </h3>
        <span className="text-xs whitespace-nowrap text-[#0b1f3a]/60">{data.period}</span>
      </div>
      <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-relaxed">
        {data.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  )
}