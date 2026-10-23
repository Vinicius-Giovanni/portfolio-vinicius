import { useRef, useState, useEffect, lazy, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { CountUp } from '@/components/ui/CountUp'
import { Typewriter } from '@/components/ui/Typewriter'
import { FlowDiagram } from '@/components/ui/FlowDiagram'
import { DepthLayers } from '@/components/ui/DepthLayers'
import { LazyThree } from '@/components/three/LazyThree'
import { cn } from '@/lib/utils'

const PanelCanvas = lazy(() =>
  import('@/components/three/PanelCanvas').then((m) => ({ default: m.PanelCanvas })),
)
const FinancialScene = lazy(() =>
  import('@/components/three/scenes/FinancialScene').then((m) => ({ default: m.FinancialScene })),
)
const DeliveriesScene = lazy(() =>
  import('@/components/three/scenes/DeliveriesScene').then((m) => ({ default: m.DeliveriesScene })),
)

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
    <section
      id="entregaveis"
      ref={ref}
      className="relative h-[380vh]"
      data-snap="multi"
      data-snap-intervals="3"
    >
      <div className="h-screen-safe sticky top-0 w-full overflow-hidden">
        <motion.div style={{ x: reduced ? 0 : x }} className="flex h-full w-[300vw]">
          <PanelImpact isActive={active === 0} />
          <PanelOperations isActive={active === 1} />
          <PanelDeliveries isActive={active === 2} />
        </motion.div>

        <div
          className="pointer-events-none absolute left-[max(1.25rem,3vw)] z-30"
          style={{ top: 'max(4.25rem, 6.5vh)' }}
        >
          <span
            className={cn(
              'inline-block font-bold tracking-[0.3em] uppercase transition-colors duration-500',
              active === 1 ? 'text-navy/60' : 'text-cream/60',
            )}
            style={{ fontSize: 'max(0.625rem, 0.8vw)' }}
          >
            ENTREGÁVEIS
          </span>
        </div>

        <div
          className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2"
          style={{ bottom: 'max(1.25rem, 3vh)' }}
        >
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
      </div>
    </section>
  )
}

// ============================================
// PAINEL 1 · IMPACTO FINANCEIRO
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
    <div className="relative isolate flex h-full w-screen shrink-0 items-center justify-center overflow-hidden bg-[#0B1F3A]">
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{ background: 'radial-gradient(circle at 20% 30%, #1a2f4f 0%, #0B1F3A 60%)' }}
      />

      <div className="absolute inset-0 z-[1]">
        <DepthLayers variant="navy" />
      </div>

      {/* LazyThree: só monta o Canvas quando a seção estiver próxima */}
      <div className="absolute inset-0 z-[2]">
        <LazyThree rootMargin="300px" fallback={null}>
          <PanelCanvas isActive={isActive} cameraPosition={[0, -0.25, 5.5]} envPreset="studio">
            <FinancialScene isActive={isActive} isVisible={isActive} isMobile={isMobile} />
          </PanelCanvas>
        </LazyThree>
      </div>

      <div
        className="relative z-10 grid w-full items-center xl:grid-cols-[3fr_2fr]"
        style={{
          maxWidth: 'min(94vw, 1600px)',
          paddingInline: 'max(1rem, 4vw)',
          paddingTop: 'max(6.5rem, 13vh)',
          paddingBottom: 'max(5rem, 10vh)',
          gap: 'max(1.5rem, 3vw)',
        }}
      >
        <div>
          <div>
            <GlowNumber isActive={isActive}>
              <div
                className="font-anton text-cream leading-[0.85] tracking-tight"
                style={{ fontSize: 'var(--text-numeral-xl)' }}
              >
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
            className="text-cream/75 mt-3 max-w-md leading-snug"
            style={{ fontSize: 'var(--text-body)' }}
          >
            <Typewriter
              text="de economia anual com dados, automação e IA"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          <div
            className="mt-5 grid grid-cols-1 lg:grid-cols-2 md:mt-7"
            style={{ gap: 'var(--spacing-fluid-gap)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border backdrop-blur-md transition-colors"
              style={{ padding: 'max(0.875rem, 1.4vw)' }}
            >
              <div
                className="text-cream font-bold"
                style={{ fontSize: 'max(1.125rem, 1.5vw)' }}
              >
                <CountUp to={3} prefix="~R$ " suffix=" mi" resetKey={isActive} duration={1.8} />
              </div>
              <p
                className="text-cream/60 mt-1 font-bold tracking-[0.15em] uppercase"
                style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
              >
                Dados &amp; B.I
              </p>
              <p
                className="text-cream/85 mt-1.5 leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                Otimização de operação logística em grande varejista nacional
              </p>
              <p
                className="text-cream mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                -23% de frota, mantendo 100% do atendimento
              </p>
              <p
                className="text-cream/55 mt-1 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.75vw)' }}
              >
                Liderei a análise e a ponte entre áreas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/10 bg-cream/5 hover:bg-cream/10 rounded-2xl border backdrop-blur-md transition-colors"
              style={{ padding: 'max(0.875rem, 1.4vw)' }}
            >
              <div
                className="text-cream font-bold"
                style={{ fontSize: 'max(1.125rem, 1.5vw)' }}
              >
                <CountUp to={1.5} prefix="~R$ " suffix=" mi" resetKey={isActive} duration={1.8} />
              </div>
              <p
                className="text-cream/60 mt-1 font-bold tracking-[0.15em] uppercase"
                style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
              >
                Automação RPA
              </p>
              <p
                className="text-cream/85 mt-1.5 leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                Automação de rotinas administrativas em diversas operações
              </p>
              <p
                className="text-cream mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                1h → &lt;5min por processo (-92%)
              </p>
              <p
                className="text-cream/55 mt-1 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.75vw)' }}
              >
                Desenvolvi as automações ponta a ponta
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-cream/40 mt-3 leading-relaxed md:mt-4"
            style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
          >
            Cálculo: gasto evitado com prestadores + ganhos de otimização + perdas de produto
            evitadas.
          </motion.p>
        </div>

        <div className="hidden xl:block" />
      </div>
    </div>
  )
}

// ============================================
// PAINEL 2 · EFICIÊNCIA OPERACIONAL
// ============================================
function PanelOperations({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div className="bg-cream relative flex h-full w-screen shrink-0 items-start justify-center overflow-hidden md:items-center">
      <div className="absolute inset-0 z-0" aria-hidden>
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

      <div
        className="relative z-10 grid w-full items-start lg:grid-cols-12 md:items-center"
        style={{
          maxWidth: 'min(94vw, 1600px)',
          paddingInline: 'max(1rem, 4vw)',
          paddingTop: 'max(8rem, 15vh)',
          paddingBottom: 'max(5rem, 10vh)',
          gap: 'max(1.5rem, 3vw)',
        }}
      >
        <div className="lg:col-span-7">
          <div className="flex items-end" style={{ gap: 'max(0.75rem, 1.5vw)' }}>
            <div
              className="font-anton text-navy leading-[0.85] tracking-tight"
              style={{ fontSize: 'var(--text-numeral-xl)' }}
            >
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
                <ArrowDown
                  className="text-navy mb-1 h-5 w-5 md:mb-3 md:h-8 md:w-8 xl:h-10 xl:w-10"
                  aria-hidden
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-navy/15 mt-2 h-px w-full max-w-md origin-left md:mt-3"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-navy/75 mt-2 max-w-md leading-snug md:mt-3"
            style={{ fontSize: 'var(--text-body)' }}
          >
            <Typewriter
              text="de economia média de tempo em rotinas operacionais manuais"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          <div
            className="mt-4 grid grid-cols-1 lg:grid-cols-2 md:mt-5"
            style={{ gap: 'max(0.5rem, 1vw)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-navy/15 bg-cream/70 rounded-2xl border backdrop-blur-md"
              style={{ padding: 'max(0.75rem, 1.2vw)' }}
            >
              <p className="text-navy font-bold" style={{ fontSize: 'max(0.8125rem, 1vw)' }}>
                Autonomia
              </p>
              <p
                className="text-navy/85 mt-1 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.8vw)' }}
              >
                O robô executa as regras de negócio, o humano só entra nas exceções
              </p>
              <p
                className="text-navy mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.8vw)' }}
              >
                Regras automatizadas, exceções mantidas com pessoas
              </p>
              <p
                className="text-navy/55 mt-1 leading-snug"
                style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
              >
                Mapeei as regras e desenhei o que o robô decide e o que vai para o humano
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-navy/15 bg-cream/70 rounded-2xl border backdrop-blur-md"
              style={{ padding: 'max(0.75rem, 1.2vw)' }}
            >
              <p className="text-navy font-bold" style={{ fontSize: 'max(0.8125rem, 1vw)' }}>
                Velocidade
              </p>
              <p
                className="text-navy/85 mt-1 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.8vw)' }}
              >
                Processos que levavam horas passando a rodar em minutos
              </p>
              <p
                className="text-navy mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.8vw)' }}
              >
                1h → &lt;5min por processo no melhor caso (-92%)
              </p>
              <p
                className="text-navy/55 mt-1 leading-snug"
                style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
              >
                Desenvolvi e implantei as automações
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-navy/50 mt-2 hidden leading-relaxed md:mt-3 md:block"
            style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
          >
            Cálculo: média da redução de tempo por processo, comparando a execução manual com a
            automatizada.
          </motion.p>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto w-full origin-top scale-[0.55] md:scale-[0.8] lg:scale-100">
            <FlowDiagram isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PAINEL 3 · ENTREGAS
// ============================================
function PanelDeliveries({ isActive }: { isActive: boolean }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full w-screen shrink-0 items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 80% 50%, #1a2f4f 0%, #0B1F3A 60%)' }}
        />
      </div>

      <div className="absolute inset-0 z-[1]">
        <DepthLayers variant="navy" />
      </div>

      <div className="absolute inset-0 z-[2] opacity-45 md:opacity-75 xl:opacity-100">
        <LazyThree rootMargin="300px" fallback={null}>
          <PanelCanvas isActive={isActive} cameraPosition={[0, 0, 7]} envPreset="city">
            <DeliveriesScene />
          </PanelCanvas>
        </LazyThree>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-navy/30 md:bg-transparent"
        aria-hidden
      />

      <div
        className="relative z-10 grid w-full items-start lg:grid-cols-12 md:items-center"
        style={{
          maxWidth: 'min(94vw, 1600px)',
          paddingInline: 'max(1rem, 4vw)',
          paddingTop: 'max(7rem, 14vh)',
          paddingBottom: 'max(5rem, 10vh)',
          gap: 'max(1.5rem, 3vw)',
        }}
      >
        <div className="lg:col-span-7">
          <div>
            <GlowNumber isActive={isActive}>
              <div
                className="font-anton text-cream leading-[0.85] tracking-tight"
                style={{ fontSize: 'var(--text-numeral-xl)' }}
              >
                <CountUp to={33} prefix="+" resetKey={isActive} duration={2.2} />
              </div>
            </GlowNumber>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream/15 mt-2 h-px w-full max-w-md origin-left md:mt-3"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-cream/90 mt-2 max-w-md leading-snug md:mt-3"
            style={{ fontSize: 'var(--text-body)' }}
          >
            <Typewriter
              text="soluções sob medida entregues, de automações a dashboards"
              resetKey={isActive}
              delay={1000}
            />
          </motion.p>

          <div
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 md:mt-12"
            style={{ gap: 'var(--spacing-fluid-gap)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-cream/15 bg-navy/40 rounded-2xl border backdrop-blur-lg"
              style={{ padding: 'max(0.875rem, 1.4vw)' }}
            >
              <div
                className="text-cream font-bold"
                style={{ fontSize: 'max(1.125rem, 1.5vw)' }}
              >
                <CountUp to={14} prefix="+" resetKey={isActive} />
              </div>
              <p
                className="text-cream mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                Softwares e automações sob medida
              </p>
              <p
                className="text-cream/80 mt-1.5 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.75vw)' }}
              >
                +70 usuários ativos e 7 áreas atendidas
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {['Logística', 'Fintechs', 'Advocacia', 'Marketing'].map((t) => (
                  <span
                    key={t}
                    className="border-cream/25 text-cream/85 rounded-full border px-2 py-0.5"
                    style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
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
              className="border-cream/15 bg-navy/40 rounded-2xl border backdrop-blur-lg"
              style={{ padding: 'max(0.875rem, 1.4vw)' }}
            >
              <div
                className="text-cream font-bold"
                style={{ fontSize: 'max(1.125rem, 1.5vw)' }}
              >
                <CountUp to={19} prefix="+" resetKey={isActive} />
              </div>
              <p
                className="text-cream mt-1 font-bold leading-snug"
                style={{ fontSize: 'max(0.75rem, 0.9vw)' }}
              >
                Projetos de Business Intelligence
              </p>
              <p
                className="text-cream/80 mt-1.5 leading-snug"
                style={{ fontSize: 'max(0.6875rem, 0.75vw)' }}
              >
                +27 dashboards, KPIs monitorados e 107 usuários ativos
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {['Power B.I', 'Python', 'Databricks', 'SQL', 'Cloud', 'Power Automate', 'HTML & CSS'].map(
                  (t) => (
                    <span
                      key={t}
                      className="border-cream/25 text-cream/85 rounded-full border px-2 py-0.5"
                      style={{ fontSize: 'max(0.625rem, 0.7vw)' }}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-5" />
      </div>
    </div>
  )
}

// ============================================
// COMPONENTE AUXILIAR
// ============================================
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