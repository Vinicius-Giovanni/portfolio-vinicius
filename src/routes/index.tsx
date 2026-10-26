import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { NavBar } from '@/components/ui/NavBar'
import { Hero } from '@/components/sections/Hero'
import { Authority } from '@/components/sections/Authority'
import { Testimonials } from '@/components/sections/Testimonials'
import { useScrollSnap } from '@/hooks/useScrollSnap'
import { useHydrated } from '@/hooks/useHydrated'

const About = lazy(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About })),
)
const Deliverables = lazy(() =>
  import('@/components/sections/Deliverables').then((m) => ({ default: m.Deliverables })),
)
const Journey = lazy(() =>
  import('@/components/sections/Journey').then((m) => ({ default: m.Journey })),
)
const Stack = lazy(() =>
  import('@/components/sections/Stack').then((m) => ({ default: m.Stack })),
)
const Education = lazy(() =>
  import('@/components/sections/Education').then((m) => ({ default: m.Education })),
)
const Cosmos = lazy(() =>
  import('@/components/sections/Cosmos').then((m) => ({ default: m.Cosmos })),
)
const Footer = lazy(() =>
  import('@/components/sections/Footer').then((m) => ({ default: m.Footer })),
)

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  useScrollSnap(true)
  const hydrated = useHydrated()

  return (
    <>
      <NavBar />
      <main className="bg-cream text-navy relative">
        <Hero />
        <Authority />
        <Testimonials />
        {hydrated && (
          <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
            <About />
            <Deliverables />
            <Journey />
            <Stack />
            <Education />
            <Cosmos />
          </Suspense>
        )}
      </main>
      {hydrated && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  )
}