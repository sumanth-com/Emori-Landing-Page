import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

type LegalSection = {
  title: string
  paragraphs: string[]
}

type LegalPageProps = {
  title: string
  intro: string
  sections: LegalSection[]
}

function formatPresentDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [title])

  return (
    <div className="legal-page">
      <Navigation variant="solid" />
      <main className="legal-page__main">
        <article className="legal-page__article">
          <header className="legal-page__header">
            <p className="legal-page__eyebrow">EMORI</p>
            <h1 className="legal-page__title">{title}</h1>
            <p className="legal-page__updated">Last updated: {formatPresentDate()}</p>
          </header>
          <p className="legal-page__intro">{intro}</p>

          {sections.map((section) => (
            <section key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <p className="legal-page__back">
            <Link to="/">Return to Home</Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="EMORI respects your privacy and is committed to protecting the personal information you share with us through our website, franchise enquiry forms, and related communications. This Privacy Policy explains what information we collect, how we use it, and the choices available to you."
      sections={[
        {
          title: '1. Information We Collect',
          paragraphs: [
            'We may collect personal details that you voluntarily provide, including your full name, email address, phone number, preferred location, investment budget, and any other information submitted through our franchise enquiry or contact forms.',
            'We may also collect limited technical information automatically, such as browser type, device information, and pages visited, to improve website performance and user experience.',
          ],
        },
        {
          title: '2. How We Use Your Information',
          paragraphs: [
            'Your information is used to respond to franchise enquiries, assess eligibility, schedule consultations, share relevant opportunity details, and provide follow-up support from our partnerships team.',
            'We may also use aggregated, non-identifiable information to understand website engagement and improve our services, communications, and franchise processes.',
          ],
        },
        {
          title: '3. Sharing of Information',
          paragraphs: [
            'We do not sell your personal information. We may share your details only with authorised internal teams or trusted service partners who assist with franchise operations, communications, or customer support, and only as needed to fulfil your request.',
            'We may also disclose information when required by applicable law, regulation, or legal process, or to protect the rights, safety, and integrity of EMORI and its users.',
          ],
        },
        {
          title: '4. Data Security & Retention',
          paragraphs: [
            'We apply reasonable administrative and technical safeguards to protect personal information against unauthorised access, loss, misuse, or alteration. While no method of transmission or storage is fully secure, we take appropriate steps to maintain confidentiality.',
            'Personal information is retained only for as long as necessary to fulfil the purposes described in this policy, meet legal or business requirements, or resolve enquiries related to the franchise opportunity.',
          ],
        },
        {
          title: '5. Your Rights & Choices',
          paragraphs: [
            'You may request access to, correction of, or deletion of your personal information, subject to applicable law and legitimate business retention needs. You may also opt out of non-essential communications at any time.',
            'To exercise these rights, please contact us using the details provided on our website. We will respond to verified requests within a reasonable timeframe.',
          ],
        },
        {
          title: '6. Updates to This Policy',
          paragraphs: [
            'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The revised version will be posted on this page with an updated revision date.',
            'Continued use of our website after changes are posted constitutes acceptance of the updated policy.',
          ],
        },
        {
          title: '7. Contact',
          paragraphs: [
            'If you have questions about this Privacy Policy or how EMORI handles personal information, please contact our team through the Contact section of this website or via the official communication channels listed there.',
          ],
        },
      ]}
    />
  )
}

export function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These Terms & Conditions govern your use of the EMORI website and any franchise-related enquiries submitted through it. By accessing or using this website, you agree to these terms. If you do not agree, please discontinue use of the site."
      sections={[
        {
          title: '1. About EMORI',
          paragraphs: [
            'EMORI is a lab-grown diamond jewellery brand offering franchise partnership opportunities under a Franchise Invested, Company Operated (FICO) model. Information on this website is provided for general informational and enquiry purposes.',
          ],
        },
        {
          title: '2. Website Use',
          paragraphs: [
            'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others, disrupt website operations, or attempt unauthorised access to systems, data, or accounts.',
            'All content on this website, including text, imagery, branding, and design, is owned by or licensed to EMORI and may not be copied, reproduced, or distributed without prior written consent.',
          ],
        },
        {
          title: '3. Franchise Information',
          paragraphs: [
            'Investment figures, returns, store details, and other commercial information presented on this website are indicative and subject to confirmation in the final Franchise Agreement and related documents.',
            'Submitting an enquiry does not create a franchise relationship, reservation of territory, or binding commercial commitment. Any partnership is subject to eligibility assessment, due diligence, and formal agreement between the parties.',
          ],
        },
        {
          title: '4. No Guarantee of Acceptance',
          paragraphs: [
            'EMORI reserves the right to accept or decline any franchise enquiry at its sole discretion. Availability of locations, commercial terms, and operational arrangements may change without prior notice.',
          ],
        },
        {
          title: '5. Accuracy of Information',
          paragraphs: [
            'While we aim to keep website content accurate and current, EMORI does not warrant that all information is complete, uninterrupted, or free from error. You should not rely solely on website content for investment decisions without independent verification and professional advice.',
          ],
        },
        {
          title: '6. Limitation of Liability',
          paragraphs: [
            'To the fullest extent permitted by law, EMORI shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of this website or reliance on its content.',
            'Nothing in these terms excludes liability that cannot be excluded under applicable law.',
          ],
        },
        {
          title: '7. Third-Party Links',
          paragraphs: [
            'This website may contain links to third-party websites or services. EMORI is not responsible for the content, privacy practices, or availability of those external sites.',
          ],
        },
        {
          title: '8. Changes to Terms',
          paragraphs: [
            'EMORI may revise these Terms & Conditions at any time by updating this page. Continued use of the website following such updates constitutes acceptance of the revised terms.',
          ],
        },
        {
          title: '9. Governing Law',
          paragraphs: [
            'These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in India.',
          ],
        },
        {
          title: '10. Contact',
          paragraphs: [
            'For questions regarding these Terms & Conditions, please reach out through the Contact section of this website.',
          ],
        },
      ]}
    />
  )
}
