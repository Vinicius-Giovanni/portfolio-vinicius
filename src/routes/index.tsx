import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { Authority } from '@/components/sections/Authority'
import { Testimonials } from '@/components/sections/Testimonials'
import { About } from '@/components/sections/About'
import { Deliverables } from '@/components/sections/Deliverables'
import { Journey } from '@/components/sections/Journey'
import { Stack } from '@/components/sections/Stack'
import { Education } from '@/components/sections/Education'
import { Footer } from '@/components/sections/Footer'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <main className="bg-cream text-navy relative">
        <Hero />
        <Authority />
        <Testimonials />
        <About />
        <Deliverables />
        <Journey />
        <Stack />
        <Education />
      </main>
      <Footer />
    </>
  )
}