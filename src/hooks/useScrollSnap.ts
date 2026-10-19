import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'

type LenisLike = {
  scroll: number
  on: (event: string, cb: (e: { scroll: number }) => void) => void
  off: (event: string, cb: (e: { scroll: number }) => void) => void
  scrollTo: (target: number, opts?: Record<string, unknown>) => void
}

const SNAP_THRESHOLD_RATIO = 0.18   // 18% da viewport
const SCROLL_END_DEBOUNCE = 160     // ms sem scroll para tentar snap
const SNAP_DURATION = 0.85          // duração do smooth scroll final

export function useScrollSnap(enabled = true) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!enabled || reduced || typeof window === 'undefined') return

    let lenis: LenisLike | null = null
    let retryTimer: ReturnType<typeof setTimeout>
    let endTimer: ReturnType<typeof setTimeout>
    let isSnapping = false
    let cancelled = false
    let lastScroll = 0
    let direction: 0 | 1 | -1 = 0

    const getLenis = (): LenisLike | null =>
      (window as unknown as { lenis?: LenisLike }).lenis ?? null

    const collectSnapPoints = (): number[] => {
      const points = new Set<number>()
      points.add(0)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      document.querySelectorAll<HTMLElement>('[data-snap]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        const top = Math.round(rect.top + window.scrollY)
        const height = el.offsetHeight
        const mode = el.dataset.snap
        const intervals = Math.max(1, parseInt(el.dataset.snapIntervals || '1', 10))

        if (mode === 'start') {
          if (top >= 0 && top <= maxScroll) points.add(top)
        } else if (mode === 'multi') {
          const range = Math.max(0, height - window.innerHeight)
          for (let i = 0; i < intervals; i++) {
            const pos = Math.round(top + (range / intervals) * i)
            if (pos >= 0 && pos <= maxScroll) points.add(pos)
          }
        }
      })

      points.add(maxScroll)
      return Array.from(points).sort((a, b) => a - b)
    }

    const trySnap = () => {
      if (cancelled || isSnapping || !lenis) return

      const current = lenis.scroll
      const points = collectSnapPoints()
      const threshold = window.innerHeight * SNAP_THRESHOLD_RATIO

      let nearest: number | null = null
      let minDist = threshold

      for (const p of points) {
        const dist = Math.abs(p - current)
        // Bias de direção: se rolou pra baixo, prioriza snap point à frente;
        // se pra cima, prioriza atrás. Reduz o "puxão pra trás" indesejado.
        if (direction === 1 && p < current - 4) continue
        if (direction === -1 && p > current + 4) continue

        if (dist < minDist) {
          minDist = dist
          nearest = p
        }
      }

      if (nearest !== null && minDist > 4) {
        isSnapping = true
        lenis.scrollTo(nearest, {
          duration: SNAP_DURATION,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            isSnapping = false
          },
        })
      }
    }

    const handleScroll = ({ scroll }: { scroll: number }) => {
      if (cancelled || isSnapping) return
      direction = scroll > lastScroll ? 1 : scroll < lastScroll ? -1 : direction
      lastScroll = scroll
      clearTimeout(endTimer)
      endTimer = setTimeout(trySnap, SCROLL_END_DEBOUNCE)
    }

    const init = () => {
      if (cancelled) return
      const l = getLenis()
      if (!l) {
        retryTimer = setTimeout(init, 200)
        return
      }
      lenis = l
      lastScroll = l.scroll
      l.on('scroll', handleScroll)
    }

    init()

    return () => {
      cancelled = true
      clearTimeout(retryTimer)
      clearTimeout(endTimer)
      if (lenis) {
        try {
          lenis.off('scroll', handleScroll)
        } catch {
          /* noop */
        }
      }
    }
  }, [enabled, reduced])
}