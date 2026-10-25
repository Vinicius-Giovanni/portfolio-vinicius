import { createFileRoute } from '@tanstack/react-router'
import { NavBar } from '@/components/ui/NavBar'
import { Hero } from '@/components/sections/Hero'
import { Authority } from '@/components/sections/Authority'
import { Testimonials } from '@/components/sections/Testimonials'
import { About } from '@/components/sections/About'
import { Deliverables } from '@/components/sections/Deliverables'
import { Journey } from '@/components/sections/Journey'
import { Stack } from '@/components/sections/Stack'
import { Education } from '@/components/sections/Education'
import { Cosmos } from '@/components/sections/Cosmos'
import { Footer } from '@/components/sections/Footer'
import { useScrollSnap } from '@/hooks/useScrollSnap'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  useScrollSnap(true)

  return (
    <>
      <NavBar />
      <main className="bg-cream text-navy relative">
        <Hero />
        <Authority />
        <Testimonials />
        <About />
        <Deliverables />
        <Journey />
        <Stack />
        <Education />
        <Cosmos />
      </main>
      <Footer />
    </>
  )
}