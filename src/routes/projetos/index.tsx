import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { NavBar } from '#/components/ui/NavBar'

export const Route = createFileRoute('/projetos/')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <>
    <NavBar forceVisible />
    <main className="bg-cream text-navy min-h-screen">
      <div className="mx-auto w-[min(92%,1280px)] px-2 pt-28 pb-24 md:pt-32 md:pb-32">
        <SectionLabel>ENTREGÁVEIS · DOSSIÊS DESCLASSIFICADOS</SectionLabel>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.92] font-bold tracking-tight"
        >
          Cases construídos
          <br />
          <span className="text-navy/40">com dados reais.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-navy/60 mt-8 max-w-2xl text-sm leading-relaxed md:text-base"
        >
          Quatro operações enterprise, documentadas sob NDA e anonimizadas. Cada dossiê
          detalha problema, abordagem, stack e impacto mensurável. Números auditáveis. Nenhuma
          empresa citada por nome.
        </motion.p>

        <div className="mt-16 md:mt-20">
          <ProjectGrid />
        </div>
      </div>
    </main>
    </>
  )
}