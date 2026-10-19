import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Projetos', href: '#entregaveis', id: 'entregaveis' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Contato', href: '#contato', id: 'contato' },
]

export function NavBar() {
    const [visible, setVisible] = useState(false)
    const [active, setActive] = useState<string>('')
    const [mobileOpen, setMobileOpen] = useState(false)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll()
    const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
    })

  // Mostra a nav só depois de 80vh de scroll
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detecta seção ativa
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]) setActive(visibleEntries[0].target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Bloqueia scroll do body quando drawer aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  const goTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="border-cream/10 bg-navy/85 fixed top-0 right-0 left-0 z-[100] border-b backdrop-blur-xl"
            role="navigation"
            aria-label="Navegação principal"
          >
            <div className="mx-auto flex h-14 w-[min(92%,1280px)] items-center justify-between gap-4">
              {/* Logo / voltar ao topo */}
              <button
                onClick={goTop}
                className="font-anton text-cream text-lg leading-none tracking-tight transition-opacity hover:opacity-70"
                aria-label="Voltar ao topo"
              >
                VGP
              </button>

              {/* Links — desktop */}
              <div className="hidden items-center gap-8 md:flex">
                {LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors',
                      active === link.id
                        ? 'text-cream'
                        : 'text-cream/50 hover:text-cream/85',
                    )}
                    aria-current={active === link.id ? 'page' : undefined}
                  >
                    {link.label}
                    {active === link.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="bg-cream absolute -bottom-1.5 left-0 right-0 h-px"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* CTA + hamburger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goTo('contato')}
                  className="border-cream/20 text-cream hover:border-cream/50 hover:bg-cream/5 hidden rounded-full border px-4 py-1.5 text-xs font-bold transition-colors md:inline-flex"
                >
                  Conversar
                </button>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="text-cream -mr-2 p-2 md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
            {/* Linha de progresso de scroll */}
            <motion.div
                style={{ scaleX: progress }}
                className="bg-cream/80 shadow-[0_0_8px_rgba(237,230,216,0.4)] absolute right-0 bottom-0 left-0 h-[2px] origin-left"
                aria-hidden
            />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Drawer mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: reduced ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-navy text-cream fixed top-0 right-0 bottom-0 z-[120] flex w-[80%] max-w-sm flex-col overflow-y-auto p-6 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-anton text-lg leading-none">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="-mr-2 p-2"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav className="flex flex-col">
                {LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.05 * i,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'border-cream/10 border-b py-4 text-left text-2xl font-bold transition-colors',
                      active === link.id
                        ? 'text-cream'
                        : 'text-cream/60 hover:text-cream/90',
                    )}
                    aria-current={active === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <button
                  onClick={() => goTo('contato')}
                  className="bg-cream text-navy w-full rounded-full py-3.5 text-sm font-bold transition-opacity hover:opacity-90"
                >
                  Conversar
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}