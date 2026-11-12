import { createFileRoute } from '@tanstack/react-router'
import { Printer } from 'lucide-react'
import {
  PROFILE,
  SUMMARY,
  EXPERIENCE,
  COSMOS,
  EDUCATION,
  SKILLS,
} from '@/data/cv'
import { NavBar } from '@/components/ui/NavBar'

export const Route = createFileRoute('/cv')({
  component: CVPage,
})

function CVPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <>
      <NavBar forceVisible />
      <div className="min-h-screen bg-[#ede6d8] pt-14 text-[#0b1f3a] print:bg-white print:pt-0">
        {/* Barra de ações — some na impressão */}
        <div className="sticky top-14 z-50 bg-[#ede6d8] print:hidden">
          <div className="mx-auto flex max-w-[210mm] items-center justify-end px-4 py-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-full bg-[#0b1f3a] px-5 py-2.5 text-sm font-bold text-[#ede6d8] transition hover:opacity-90"
            >
              <Printer className="h-4 w-4" />
              Baixar PDF
            </button>
          </div>
        </div>

        {/* Folha A4 */}
        <main className="mx-auto max-w-[210mm] bg-white p-5 sm:p-10 md:p-[20mm] shadow-xl print:max-w-none print:p-0 print:shadow-none">
          {/* Header */}
          <header className="border-b border-[#0b1f3a]/20 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="mt-1 text-xs sm:text-sm text-[#0b1f3a]/70 break-words">
              {PROFILE.location} · {PROFILE.email} · {PROFILE.phone}
            </p>
            <p className="mt-0.5 text-xs sm:text-sm text-[#0b1f3a]/70 break-words">
              {PROFILE.linkedin} · {PROFILE.github}
            </p>
          </header>

          {/* Resumo */}
          <Section title="Resumo">
            <p className="text-sm leading-relaxed">{SUMMARY}</p>
          </Section>

          {/* Habilidades Técnicas */}
          <Section title="Habilidades Técnicas">
            <p className="text-sm leading-relaxed">
              <strong>Dados & BI:</strong> {SKILLS.data}
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              <strong>Automação & Desenvolvimento:</strong> {SKILLS.dev}
            </p>
            <p className="mt-1 text-sm leading-relaxed">
              <strong>Idiomas:</strong> {SKILLS.languages}
            </p>
          </Section>

          {/* Experiência */}
          <Section title="Experiência Profissional">
            <div className="space-y-4">
              <JobBlock job={EXPERIENCE.casasBahiaAnalyst} />
              <JobBlock job={EXPERIENCE.casasBahiaAssistant} />
              <JobBlock job={EXPERIENCE.casasBahiaHelper} />
              <CosmosBlock data={COSMOS} />
            </div>
          </Section>

          {/* Formação */}
          <Section title="Formação">
            <ul className="space-y-1 text-sm leading-relaxed">
              {EDUCATION.map((edu) => (
                <li key={edu.title}>
                  <strong>{edu.title}</strong> — {edu.institution} · {edu.period}
                </li>
              ))}
            </ul>
          </Section>
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
