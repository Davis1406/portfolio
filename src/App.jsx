import { useCallback, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './views/Home'
import Projects from './views/Projects'
import Skills from './views/Skills'
import Experience from './views/Experience'
import Contact from './views/Contact'

const SECTIONS = ['home', 'projects', 'skills', 'experience', 'contact']

export default function App() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const share = useCallback(async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Davis Hyacinth — Technical Portfolio', url })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch {
      /* user cancelled */
    }
  }, [])

  return (
    <div className="bg-surface font-body text-on-surface overflow-x-hidden min-h-screen">
      <div className="fixed inset-0 grainy-overlay z-0"></div>
      <Sidebar onShare={share} />
      <div className="pl-20 flex flex-col min-h-screen relative z-10">
        <Header active={active} onNavigate={scrollToSection} />
        <main className="relative pt-20 flex-1 px-margin-mobile md:px-margin-desktop pb-20">
          <section id="home" className="scroll-mt-20">
            <Home onNavigate={scrollToSection} />
          </section>
          <section id="projects" className="scroll-mt-20">
            <Projects />
          </section>
          <section id="skills" className="scroll-mt-20">
            <Skills onNavigate={scrollToSection} />
          </section>
          <section id="experience" className="scroll-mt-20">
            <Experience />
          </section>
          <section id="contact" className="scroll-mt-20">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
