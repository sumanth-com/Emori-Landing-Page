import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WhyEmori } from './components/WhyEmori'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { TrustProven } from './components/TrustProven'
import { FicoModel } from './components/FicoModel'
import { Performance } from './components/Performance'
import { Investment } from './components/Investment'
import { StoreExperience } from './components/StoreExperience'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { ApplicationModal } from './components/ApplicationModal'
import { ThankYouPage } from './components/ThankYouPage'
import { PrivacyPolicyPage, TermsAndConditionsPage } from './components/LegalPages'
import { ScrollManager } from './components/ScrollManager'
import { CursorGlow } from './components/ui/CursorGlow'
import { ApplicationModalProvider } from './context/ApplicationModalContext'
import { useLenis } from './hooks/useLenis'
import { WhatsAppButton } from './components/WhatsAppButton'
import { SECTION_SLUGS } from './lib/scrollToSection'

function Experience() {
  useLenis()

  return (
    <div className="experience">
      <CursorGlow />
      <Navigation />
      <main>
        <Hero />
        <TrustProven />
        <WhyEmori />
        <FicoModel />
        <Investment />
        <StoreExperience />
        <Performance />
        <Faq />
        <FinalCta />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ApplicationModalProvider>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Experience />} />
          {SECTION_SLUGS.map((section) => (
            <Route key={section} path={`/${section}`} element={<Experience />} />
          ))}
          <Route path="/invitation" element={<Experience />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        </Routes>
        <ApplicationModal />
        <WhatsAppButton />
      </ApplicationModalProvider>
    </BrowserRouter>
  )
}
