import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavLink = {
  label: string
  target: string
  type: 'anchor' | 'route'
  id: string
}

const LINKS: NavLink[] = [
  { label: 'Início', target: '/', type: 'route', id: 'home' },
  { label: 'Sobre', target: '#sobre', type: 'anchor', id: 'sobre' },
  { label: 'Projetos', target: '/projetos', type: 'route', id: 'projetos' },
  { label: 'Stack', target: '#stack', type: 'anchor', id: 'stack' },
  { label: 'Contato', target: '#contato', type: 'anchor', id: 'contato' },
]

export function NavBar({ forceVisible = false }: { forceVisible?: boolean }) {
  const [visible, setVisible] = useState(forceVisible)
  const [active, setActive] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = useReducedMotion()
  const navigate = useNavigate()
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const isHome = pathname === '/'

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  })

  // Visibilidade: em páginas que não são home, sempre visível
  useEffect(() => {
    if (forceVisible) {
      setVisible(true)
      return
    }
    if (!isHome) {
      setVisible(true)
      return
    }
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [forceVisible, isHome])

  // Detecção de seção ativa (só na home)
  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith('/projetos') ? 'projetos' : '')
      return
    }
    const anchorLinks = LINKS.filter((l) => l.type === 'anchor')
    const sections = anchorLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
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
  }, [isHome, pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const goTo = (link: NavLink) => {
    setMobileOpen(false)

    if (link.type === 'route') {
      navigate({ to: link.target })
      return
    }

    // Link de âncora
    if (isHome) {
      // Já está na home — scroll normal
      const el = document.getElementById(link.id)
      if (!el) return
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -80 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Não está na home — navega pra home, e depois scrolla
      navigate({ to: '/' })
      setTimeout(() => {
        const el = document.getElementById(link.id)
        if (!el) return
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -80 })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 400) // aguarda transição de rota
    }
  }

  const goTop = () => {
    if (isHome) {
      if (window.lenis) {
        window.lenis.scrollTo(0)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      navigate({ to: '/' })
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
            className="border-cream/10 bg-navy/85 fixed top-0 right-0 left-0 z-[100] border-b backdrop-blur-xl print:hidden"
            role="navigation"
            aria-label="Navegação principal"
          >
            <div className="mx-auto flex h-14 w-[min(92%,1280px)] items-center justify-between gap-4">
              <button
                onClick={goTop}
                className="font-anton text-cream text-lg leading-none tracking-tight transition-opacity hover:opacity-70"
                aria-label="Voltar ao início"
              >
                VGP
              </button>

              <div className="hidden items-center gap-7 md:flex">
                {LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => goTo(link)}
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

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    goTo({ label: 'Contato', target: '#contato', type: 'anchor', id: 'contato' })
                  }
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

            <motion.div
              style={{ scaleX: progress }}
              className="bg-cream/80 shadow-[0_0_8px_rgba(237,230,216,0.4)] absolute right-0 bottom-0 left-0 h-[2px] origin-left"
              aria-hidden
            />
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm print:hidden md:hidden"
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
              className="bg-navy text-cream fixed top-0 right-0 bottom-0 z-[120] flex w-[80%] max-w-sm flex-col overflow-y-auto p-6 print:hidden md:hidden"
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
                    onClick={() => goTo(link)}
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
                  onClick={() =>
                    goTo({ label: 'Contato', target: '#contato', type: 'anchor', id: 'contato' })
                  }
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