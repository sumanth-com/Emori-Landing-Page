import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { TrustProven } from './components/TrustProven'
import { BrandJourney } from './components/BrandJourney'
import { Opportunity } from './components/Opportunity'
import { Performance } from './components/Performance'
import { FicoModel } from './components/FicoModel'
import { Investment } from './components/Investment'
import { StoreExperience } from './components/StoreExperience'
import { Testimonials } from './components/Testimonials'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { ApplicationModal } from './components/ApplicationModal'
import { CursorGlow } from './components/ui/CursorGlow'
import { ApplicationModalProvider } from './context/ApplicationModalContext'
import { useLenis } from './hooks/useLenis'

function Experience() {
  useLenis()

  return (
    <div className="experience">
      <CursorGlow />
      <Navigation />
      <main>
        <Hero />
        <TrustProven />
        <BrandJourney />
        <Opportunity />
        <Performance />
        <FicoModel />
        <Investment />
        <StoreExperience />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ApplicationModalProvider>
      <Experience />
      <ApplicationModal />
    </ApplicationModalProvider>
  )
}
