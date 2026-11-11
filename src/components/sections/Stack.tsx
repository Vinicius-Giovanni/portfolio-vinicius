import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  SiJavascript,
  SiTypescript,
  SiCss,
  SiHtml5,
  SiPython,
  SiDatabricks,
} from 'react-icons/si'
import { BarChart3, Workflow, Bot, Database } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TiltCard } from '@/components/ui/TiltCard'

type Tech = {
  label: string
  Icon: React.ElementType
  color: string
}

const TECHNOLOGIES: Tech[] = [
  { label: 'Python', Icon: SiPython, color: '#3776AB' },
  { label: 'Power BI', Icon: BarChart3, color: '#F2C811' },
  { label: 'SQL', Icon: Database, color: '#336791' },
  { label: 'Databricks', Icon: SiDatabricks, color: '#FF3621' },
  { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { label: 'RPA', Icon: Bot, color: '#6B21A8' },
  { label: 'Power Automate', Icon: Workflow, color: '#0066FF' },
  { label: 'CSS', Icon: SiCss, color: '#1572B6' },
  { label: 'HTML', Icon: SiHtml5, color: '#E34F26' },
]

const SKILL_CHIPS = [
  'Business Intelligence',
  'Data Quality',
  'Análise de Dados',
  'Engenharia de Dados',
  'Robotic Process Automation',
  'Automação com IA',
]

export function Stack() {
  const reduced = useReducedMotion()

  return (
    <section id="stack" data-snap="start" className="bg-cream relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0B1F3A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        {!reduced && (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/3 right-1/4 h-[40vh] w-[40vh] rounded-full blur-[120px]"
              style={{ background: 'radial-gradient(circle, rgba(242,200,17,0.25), transparent)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/4 left-1/4 h-[35vh] w-[35vh] rounded-full blur-[120px]"
              style={{ background: 'radial-gradient(circle, rgba(49,120,198,0.25), transparent)' }}
            />
          </>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto mb-14 w-[min(92%,1280px)]">
        <SectionLabel>STACK</SectionLabel>

        <div className="mt-10 flex flex-wrap items-baseline gap-4 md:gap-8">
          <div>
            <span className="font-anton text-navy text-[clamp(3rem,8vw,6rem)] leading-none">
              {String(TECHNOLOGIES.length).padStart(2, '0')}
            </span>
            <p className="text-navy/60 mt-1 text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs">
              Tecnologias
            </p>
          </div>
        </div>

        <p className="text-navy/60 mt-6 max-w-md text-sm leading-relaxed">
          Ferramentas que aplico no dia a dia — da análise de dados à automação.
        </p>
      </div>

      {/* Tech grid */}
      <div className="relative z-10 mx-auto w-[min(92%,1280px)]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {TECHNOLOGIES.map((tech, i) => (
            <TechTile key={tech.label} tech={tech} index={i} />
          ))}
        </div>
      </div>

      {/* Chips estáticos */}
      <div className="relative z-10 mx-auto mt-14 w-[min(92%,1280px)]">
        <div className="flex flex-wrap gap-2">
          {SKILL_CHIPS.map((chip) => (
            <span
              key={chip}
              className="border-navy/25 bg-cream text-navy rounded-full border px-5 py-2.5 text-sm font-medium"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechTile({ tech, index }: { tech: Tech; index: number }) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const { Icon, label, color } = tech

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard maxTilt={6}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group rounded-brand border-navy/15 bg-cream hover:border-navy/40 relative flex min-h-[150px] flex-col items-center justify-center gap-3 overflow-hidden border p-5 transition-all duration-300 hover:shadow-[0_16px_40px_-12px_rgba(11,31,58,0.2)] md:p-7"
        >
          {/* Radial glow no hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}20, transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Pulso de energia no hover */}
          {!reduced && hovered && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              className="pointer-events-none absolute h-20 w-20 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}40, transparent 70%)`,
              }}
            />
          )}

          {/* Número de índice */}
          <span className="text-navy/25 absolute top-3 right-3 font-mono text-[10px] font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Ícone */}
          <Icon
            className="relative h-10 w-10 transition-all duration-300 md:h-12 md:w-12"
            style={{
              color: hovered ? color : 'rgba(11,31,58,0.75)',
              transform: hovered ? 'scale(1.15) translateY(-2px)' : 'scale(1) translateY(0)',
            }}
            aria-hidden
          />

          {/* Label */}
          <span className="text-navy relative text-center text-xs font-semibold md:text-sm">
            {label}
          </span>
        </div>
      </TiltCard>
    </motion.div>
  )
}
