import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Só a imagem anima o inset/radius
  const inset = useTransform(scrollYProgress, [0, 1], ['48px', '0px'])
  const radius = useTransform(scrollYProgress, [0, 1], ['30px', '0px'])

  // Texto só faz fade + slide leve — nunca muda de posição estrutural
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.9], [0, 1])
  const textY = useTransform(scrollYProgress, [0.35, 0.9], [30, 0])

  const imageStyle = reduced
    ? { inset: '48px', borderRadius: '30px' }
    : { inset, borderRadius: radius }

  const textStyle = reduced ? { opacity: 1, y: 0 } : { opacity: textOpacity, y: textY }

  return (
    <section ref={ref} className="relative h-[140vh] md:h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* CAMADA 1 — Imagem com inset animado (isolada) */}
        <motion.div style={imageStyle} className="absolute overflow-hidden">
          <img
            src="/assets/vinicius-mountain.png"
            alt="Vinícius G Pereira em uma montanha"
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="bg-navy/60 absolute inset-0" aria-hidden />
        </motion.div>

        {/* CAMADA 2 — Texto em posição FIXA (não depende do inset) */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 md:p-16">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6">
              <SectionLabel variant="light">SOBRE MIM</SectionLabel>
            </div>

            <motion.div style={textStyle} className="text-cream">
              <h2 className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] leading-tight font-bold">
                Construindo Pontes entre Dados, Software e Negócios
              </h2>

              <p className="mt-4 max-w-3xl text-[clamp(0.85rem,1.2vw,1.125rem)] leading-relaxed md:mt-6">
                Sempre tive <strong>facilidade</strong> para <strong>resolver</strong>{' '}
                problemas, e foi isso que me levou para a <strong>tecnologia</strong>.
                Comecei na Mecatrônica, passei pela área de <strong>dados</strong> e hoje
                uno análise, <strong>desenvolvimento</strong> e <strong>automação</strong>{' '}
                para transformar processos complicados em soluções simples. Trabalho como{' '}
                <strong>analista de dados</strong> no Grupo Casas Bahia, cuidando de
                indicadores logísticos em nível nacional, e estudo{' '}
                <strong>Engenharia de Dados</strong>. Em paralelo, fundei a{' '}
                <strong>Cosmos</strong>, uma empresa de tecnologia que constrói automações,
                sistemas e dashboards sob medida.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}