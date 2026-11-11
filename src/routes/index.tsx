import { createFileRoute } from '@tanstack/react-router'
import { NavBar } from '@/components/ui/NavBar'
import { Hero } from '@/components/sections/Hero'
import { Proof } from '@/components/sections/Proof'
import { CasesPreview } from '@/components/sections/CasesPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Journey } from '@/components/sections/Journey'
import { Education } from '@/components/sections/Education'
import { Footer } from '@/components/sections/Footer'
import { InsightsPreview } from '@/components/sections/InsightsPreview'

export const Route = createFileRoute('/')(({
  component: Home,
}))

function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-cream text-navy relative">
        <Hero />
        <Proof />
        <CasesPreview />
        <Testimonials />
        <InsightsPreview />
        <About />
        <Stack />
        <Journey />
        <Education />
      </main>
      <Footer />
    </>
  )
}
