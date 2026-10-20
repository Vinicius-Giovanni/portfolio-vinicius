import { useRef, useState, useEffect, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence } from 'motion/react'
import { CountUp } from '@/components/ui/CountUp'
import { Typewriter } from '@/components/ui/Typewriter'
import { FlowDiagram } from '@/components/ui/FlowDiagram'
import { DepthLayers } from '@/components/ui/DepthLayers'
import { PanelCanvas } from '@/components/three/PanelCanvas'
import { FinancialScene } from '@/components/three/scenes/FinancialScene'
import { DeliveriesScene } from '@/components/three/scenes/DeliveriesScene'
import { cn } from '@/lib/utils'

export function Deliverables() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%'])
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    if (next !== active) setActive(next)
  })

  return (
    <section id="entregaveis" ref={ref} className="relative h-[380vh]" data-snap="multi" data-snap-intervals="3">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ x: reduced ? 0 : x }} className="flex h-full w-[300vw]">
          <PanelImpact isActive={active === 0} />
          <PanelOperations isActive={active === 1} />
          <PanelDeliveries isActive={active === 2} />
        </motion.div>

        <div className="pointer-events-none absolute top-16 left-5 z-30 md:top-8 md:left-10">
          <span className="text-navy/40 text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs">
            ENTREGÁVEIS
          </span>
        </div>

        <div className="font-anton text-navy/60 pointer-events-none absolute top-16 right-5 z-30 flex items-baseline gap-1 md:top-8 md:right-10">
          <span className="text-3xl leading-none md:text-4xl">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="text-sm leading-none opacity-50">/ 03</span>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 md:bottom-10">
          <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2.5 backdrop-blur-md">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === active ? 'bg-cream w-8' : 'bg-cream/30 w-2',
                )}
              />
            ))}
          </div>
        </div>

        {/* CTA — aparece apenas no último painel */}
        <AnimatePresence>
          {active === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 bottom-20 z-40 md:right-10 md:bottom-24"
            >
              <Link
                to="/projetos"
                className="border-cream/20 bg-navy/60 text-cream hover:border-cream/50 hover:bg-navy/80 pointer-events-auto inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-bold backdrop-blur-md transition-colors"
              >
                Ver os 4 dossiês
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ============================================
// PAINEL 1 · IMPACTO FINANCEIRO — Cofre centralizado no mobile
// ============================================
function PanelImpact({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="relative isolate flex h-full w-screen shrink-0 items-center justify-center overflow-hidden bg-[#0B1F3A] px-4 md:px-16">
      {/* Fundo radial navy */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{ background: 'radial-gradient(circle at 20% 30%, #1a2f4f 0%, #0B1F3A 60%)' }}
      />

      {/* Camadas de profundidade */}
      <div className="absolute inset-0 z-[1]">
        <DepthLayers variant="navy" />
      </div>

      {/* Canvas 3D — cofre */}
      <div className="absolute inset-0 z-[2]">
        <PanelCanvas
          isActive={isActive}
          cameraPosition={[0, -0.25, 5.5]}
          envPreset="studio"
        >
          <FinancialScene isActive={isActive} isVisible={isActive} isMobile={isMobile} />
        </PanelCanvas>
      </div>

      {/* Conteúdo HTML */}
      <div className="relative z-10 grid w-full max-w-7xl items-center gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-cream/50 text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs"
          >
            Impacto Financeiro · Anual
          </motion.p>

          <div className="mt-4 md:mt-5">
            <GlowNumber isActive={isActive}>
              <div className="font-anton text-cream text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] tracking-tight">
                <CountUp to={4} prefix="+R$ " suffix=" mi" resetKey={isActive} duration={2.2} />
              </div>
            </GlowNumber>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream/15 mt-3 h-px w-full max-w-md origin-left md:mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-cream/75 mt-3 max-w-md text-xs md:mt-5 md:text-base"
          >
            <Typewriter
              text="de economia anual com dados, automação e IA"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-8 md:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border p-3 backdrop-blur-md transition-colors md:p-4"
            >
              <div className="text-cream text-xl font-bold md:text-2xl">
                <CountUp to={3} prefix="~R$ " suffix=" mi" resetKey={isActive} duration={1.8} />
              </div>
              <p className="text-cream/60 mt-1 text-[9px] font-bold tracking-[0.15em] uppercase md:text-[10px]">
                Dados &amp; B.I
              </p>
              <p className="text-cream/85 mt-1.5 text-[11px] leading-snug md:mt-2 md:text-xs">
                Otimização de operação logística em grande varejista nacional
              </p>
              <p className="text-cream mt-1 text-[11px] font-bold leading-snug md:mt-1.5 md:text-xs">
                -23% de frota, mantendo 100% do atendimento
              </p>
              <p className="text-cream/55 mt-1 text-[9px] leading-snug md:mt-1.5 md:text-[10px]">
                Liderei a análise e a ponte entre áreas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border p-3 backdrop-blur-md transition-colors md:p-4"
            >
              <div className="text-cream text-xl font-bold md:text-2xl">
                <CountUp to={1.5} prefix="~R$ " suffix=" mi" resetKey={isActive} duration={1.8} />
              </div>
              <p className="text-cream/60 mt-1 text-[9px] font-bold tracking-[0.15em] uppercase md:text-[10px]">
                Automação RPA
              </p>
              <p className="text-cream/85 mt-1.5 text-[11px] leading-snug md:mt-2 md:text-xs">
                Automação de rotinas administrativas em diversas operações
              </p>
              <p className="text-cream mt-1 text-[11px] font-bold leading-snug md:mt-1.5 md:text-xs">
                1h → &lt;5min por processo (-92%)
              </p>
              <p className="text-cream/55 mt-1 text-[9px] leading-snug md:mt-1.5 md:text-[10px]">
                Desenvolvi as automações ponta a ponta
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-cream/40 mt-3 text-[10px] leading-relaxed md:mt-4 md:text-[11px]"
          >
            Cálculo: gasto evitado com prestadores + ganhos de otimização + perdas de produto
            evitadas.
          </motion.p>
        </div>

        <div className="hidden md:col-span-5 md:flex md:items-end md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-right"
          >
            <p className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">
              Acúmulo de valor
            </p>
            <p className="text-cream/70 mt-1 max-w-[180px] text-xs">
              Cada camada é uma fonte real de economia
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PAINEL 2 · EFICIÊNCIA OPERACIONAL — FlowDiagram menor no mobile
// ============================================
function PanelOperations({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div className="bg-cream relative flex h-full w-screen shrink-0 items-start justify-center overflow-hidden px-4 pt-20 md:items-center md:px-16 md:pt-0">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <motion.div
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#0B1F3A 1px, transparent 1px), linear-gradient(90deg, #0B1F3A 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/4 h-[40vh] w-[40vh] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.35), transparent)' }}
        />
      </div>

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-navy/50 text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs"
          >
            Eficiência Operacional
          </motion.p>

          <div className="mt-4 flex items-end gap-3 md:mt-5 md:gap-4">
            <div className="font-anton text-navy text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] tracking-tight">
              <CountUp to={53} prefix="-" suffix="%" resetKey={isActive} duration={2.2} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <motion.div
                animate={reduced || !isActive ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="text-navy mb-2 h-6 w-6 md:mb-4 md:h-12 md:w-12" aria-hidden />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-navy/15 mt-3 h-px w-full max-w-md origin-left md:mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-navy/75 mt-3 max-w-md text-xs md:mt-5 md:text-base"
          >
            <Typewriter
              text="de economia média de tempo em rotinas operacionais manuais"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-8 md:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-navy/15 bg-cream/70 rounded-2xl border p-3 backdrop-blur-md md:p-4"
            >
              <p className="text-navy text-xs font-bold md:text-sm">Autonomia</p>
              <p className="text-navy/85 mt-1 text-[11px] leading-snug md:mt-1.5 md:text-xs">
                O robô executa as regras de negócio, o humano só entra nas exceções
              </p>
              <p className="text-navy mt-1 text-[11px] font-bold leading-snug md:mt-1.5 md:text-xs">
                Regras automatizadas, exceções mantidas com pessoas
              </p>
              <p className="text-navy/55 mt-1 text-[9px] leading-snug md:mt-1.5 md:text-[10px]">
                Mapeei as regras e desenhei o que o robô decide e o que vai para o humano
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-navy/15 bg-cream/70 rounded-2xl border p-3 backdrop-blur-md md:p-4"
            >
              <p className="text-navy text-xs font-bold md:text-sm">Velocidade</p>
              <p className="text-navy/85 mt-1 text-[11px] leading-snug md:mt-1.5 md:text-xs">
                Processos que levavam horas passando a rodar em minutos
              </p>
              <p className="text-navy mt-1 text-[11px] font-bold leading-snug md:mt-1.5 md:text-xs">
                1h → &lt;5min por processo no melhor caso (-92%)
              </p>
              <p className="text-navy/55 mt-1 text-[9px] leading-snug md:mt-1.5 md:text-[10px]">
                Desenvolvi e implantei as automações
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-navy/50 mt-3 text-[10px] leading-relaxed md:mt-4 md:text-[11px]"
          >
            Cálculo: média da redução de tempo por processo, comparando a execução manual com a
            automatizada.
          </motion.p>
        </div>

        {/* FlowDiagram — escala reduzida no mobile */}
        <div className="md:col-span-5">
          <div className="origin-top scale-[0.75] md:scale-100">
            <FlowDiagram isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PAINEL 3 · ENTREGAS — Cards empilhados no mobile
// ============================================
function PanelDeliveries({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full w-screen shrink-0 items-start justify-center overflow-hidden px-4 pt-20 md:items-center md:px-16 md:pt-0">
      <div className="absolute inset-0 -z-20" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 80% 50%, #1a2f4f 0%, #0B1F3A 60%)' }}
        />
      </div>

      <div className="absolute inset-0 -z-10">
        <DepthLayers variant="navy" />
      </div>

      <div className="absolute inset-0 z-0">
        <PanelCanvas isActive={isActive} cameraPosition={[0, 0, 7]} envPreset="city">
          <DeliveriesScene />
        </PanelCanvas>
      </div>

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-cream/50 text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs"
          >
            Entregas · Software &amp; BI
          </motion.p>

          <div className="mt-4 md:mt-5">
            <GlowNumber isActive={isActive}>
              <div className="font-anton text-cream text-[clamp(2.5rem,10vw,10rem)] leading-[0.85] tracking-tight">
                <CountUp to={33} prefix="+" resetKey={isActive} duration={2.2} />
              </div>
            </GlowNumber>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream/15 mt-3 h-px w-full max-w-md origin-left md:mt-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-cream/75 mt-3 max-w-md text-xs md:mt-5 md:text-base"
          >
            <Typewriter
              text="soluções sob medida entregues, de automações a dashboards"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          {/* Cards — empilhados no mobile, lado a lado no desktop */}
          <div className="mt-50 grid grid-cols-1 gap-2 md:mt-10 md:grid-cols-2 md:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border p-3 backdrop-blur-md md:p-4"
            >
              <div className="text-cream text-xl font-bold md:text-2xl">
                <CountUp to={14} prefix="+" resetKey={isActive} />
              </div>
              <p className="text-cream mt-1 text-[11px] font-bold leading-snug md:text-xs">
                Softwares e automações sob medida
              </p>
              <p className="text-cream/70 mt-1.5 text-[10px] leading-snug md:mt-2 md:text-[10px]">
                +70 usuários ativos e 7 áreas atendidas
              </p>
              <div className="mt-2 flex flex-wrap gap-1 md:mt-3">
                {['Logística', 'Fintechs', 'Advocacia', 'Marketing'].map((t) => (
                  <span
                    key={t}
                    className="border-cream/20 text-cream/70 rounded-full border px-2 py-0.5 text-[8px] md:text-[9px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border p-3 backdrop-blur-md md:p-4"
            >
              <div className="text-cream text-xl font-bold md:text-2xl">
                <CountUp to={19} prefix="+" resetKey={isActive} />
              </div>
              <p className="text-cream mt-1 text-[11px] font-bold leading-snug md:text-xs">
                Projetos de Business Intelligence
              </p>
              <p className="text-cream/70 mt-1.5 text-[10px] leading-snug md:mt-2 md:text-[10px]">
                +27 dashboards, KPIs monitorados e 107 usuários ativos
              </p>
              <div className="mt-2 flex flex-wrap gap-1 md:mt-3">
                {['Power B.I', 'Python', 'Databricks', 'SQL', 'Cloud', 'Power Automate', 'HTML & CSS'].map(
                  (t) => (
                    <span
                      key={t}
                      className="border-cream/20 text-cream/70 rounded-full border px-2 py-0.5 text-[8px] md:text-[9px]"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:flex md:items-end md:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-right"
          >
            <p className="text-cream/40 text-[10px] font-bold tracking-[0.25em] uppercase">
              Portfólio de entregas
            </p>
            <p className="text-cream/70 mt-1 max-w-[180px] text-xs">
              Cada tela é uma solução em produção
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function GlowNumber({
  children,
  isActive,
  color = 'rgba(237,230,216,0.35)',
}: {
  children: ReactNode
  isActive: boolean
  color?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="relative inline-block"
      animate={
        reduced || !isActive
          ? undefined
          : {
              textShadow: ['0 0 0px transparent', `0 0 40px ${color}`, '0 0px 0px transparent'],
            }
      }
      transition={{ duration: 2.5, delay: 2.2, repeat: Infinity, repeatDelay: 3 }}
    >
      {children}
    </motion.div>
  )
}