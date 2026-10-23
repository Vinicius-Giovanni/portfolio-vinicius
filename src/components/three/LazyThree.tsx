import { useEffect, useRef, useState, Suspense, type ReactNode } from 'react'

type LazyThreeProps = {
  children: ReactNode
  /** Distância antes da viewport para começar a carregar */
  rootMargin?: string
  /** Fallback enquanto o chunk carrega */
  fallback?: ReactNode
}

export function LazyThree({
  children,
  rootMargin = '300px',
  fallback = null,
}: LazyThreeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    const el = ref.current
    if (!el) return

    // Sem IO (browser antigo) → carrega direto
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    // Se já está visível no primeiro render, carrega direto
    const rect = el.getBoundingClientRect()
    const isAlreadyVisible =
      rect.top < window.innerHeight + 300 && rect.bottom > -300
    if (isAlreadyVisible) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [shouldLoad, rootMargin])

  return (
    <div ref={ref} className="h-full w-full">
      {shouldLoad ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}