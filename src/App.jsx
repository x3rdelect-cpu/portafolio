import { MotionConfig } from 'framer-motion'
import NavbarFloating from '@/components/interactive/NavbarFloating'
import CursorGlow from '@/components/ui/CursorGlow'
import PageTransition from '@/components/motion/PageTransition'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

/**
 * Shell de la aplicación.
 *
 * `MotionConfig reducedMotion="user"` respeta la preferencia del sistema en
 * todos los componentes que usan Framer Motion.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-indigo-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>

        {/* Fondo ambiental */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-18rem] size-[38rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute -right-40 top-[35%] size-[30rem] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
          <div className="absolute -left-40 bottom-[5%] size-[28rem] rounded-full bg-fuchsia-600/[0.05] blur-[130px]" />
          <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="bg-noise absolute inset-0 opacity-[0.035]" />
        </div>

        <CursorGlow />
        <NavbarFloating />

        <PageTransition className="relative z-10">
          <main id="contenido" tabIndex={-1}>
            <Hero />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </PageTransition>
      </div>
    </MotionConfig>
  )
}
