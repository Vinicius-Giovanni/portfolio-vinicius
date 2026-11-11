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

  const inset = useTransform(scrollYProgress, [0, 1], ['48px', '0px'])
  const radius = useTransform(scrollYProgress, [0, 1], ['30px', '0px'])

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.9], [0, 1])
  const textY = useTransform(scrollYProgress, [0.35, 0.9], [30, 0])

  const imageStyle = reduced
    ? { inset: '48px', borderRadius: '30px' }
    : { inset, borderRadius: radius }

  const textStyle = reduced ? { opacity: 1, y: 0 } : { opacity: textOpacity, y: textY }

  return (
    <section id="sobre" ref={ref} data-snap="start" className="relative h-[110vh] md:h-[140vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* CAMADA 1 — Imagem com inset animado */}
        <motion.div style={imageStyle} className="absolute overflow-hidden">
          <picture>
            <source srcSet="/assets/vinicius-mountain.avif" type="image/avif" />
            <source srcSet="/assets/vinicius-mountain.webp" type="image/webp" />
            <img
              src="/assets/vinicius-mountain.png"
              alt="Vinícius G Pereira em uma montanha"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'center' }}
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="bg-navy/60 absolute inset-0" aria-hidden />
        </motion.div>

        {/* CAMADA 2 — Texto em posição FIXA */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 md:p-16">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6">
              <SectionLabel variant="light">SOBRE MIM</SectionLabel>
            </div>

            <motion.div style={textStyle} className="text-cream">
              <h2 className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] leading-tight font-bold">
                Da operação logística à engenharia de dados
              </h2>

              <p className="mt-4 max-w-3xl text-[clamp(0.85rem,1.2vw,1.125rem)] leading-relaxed md:mt-6">
                Sempre gostei de resolver problemas, e foi isso que me levou para a tecnologia.
                Comecei na Mecatrônica, entrei na operação logística do Grupo Casas Bahia e cheguei
                à análise de dados. Hoje atuo com indicadores logísticos em nível nacional, unindo
                BI, pipelines e automação (Python e RPA), e estudo Engenharia de Dados.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
