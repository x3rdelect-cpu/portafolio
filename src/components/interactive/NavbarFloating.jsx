import { motion, useReducedMotion } from 'framer-motion'
import {
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Mail,
  Sparkles,
} from 'lucide-react'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

const ICONS = {
  inicio: Home,
  proyectos: FolderKanban,
  experiencia: BriefcaseBusiness,
  skills: Sparkles,
  contacto: Mail,
}

const SECTION_IDS = site.nav.map((item) => item.id)

/**
 * Navegación flotante, centrada y con indicador animado (layoutId).
 *
 * En mobile muestra solo iconos para mantenerse compacta; desde `lg` aparecen
 * las etiquetas. La barra incluye una línea de progreso de scroll.
 */
export default function NavbarFloating() {
  const active = useActiveSection(SECTION_IDS)
  const { progress } = useScrollProgress()
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto relative flex items-center gap-1 rounded-2xl border border-white/10 bg-ink-900/75 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/[0.05] sm:px-2.5"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-400 to-cyan-300 text-[11px] font-extrabold tracking-tight text-ink-950 shadow-lg shadow-indigo-500/20">
            {site.shortName}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-white md:inline">
            {site.name.split(' ')[0]}
          </span>
        </a>

        <span aria-hidden="true" className="mx-0.5 h-6 w-px bg-white/10 sm:mx-1" />

        <ul className="flex items-center gap-0.5">
          {site.nav.map((item) => {
            const Icon = ICONS[item.id] ?? Home
            const isActive = active === item.id

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-label={`Ir a ${item.label}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors duration-200 sm:px-3',
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl border border-indigo-400/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <Icon
                    className={cn(
                      'relative z-10 size-4 transition-colors',
                      isActive ? 'text-indigo-300' : 'text-current',
                    )}
                    strokeWidth={1.8}
                  />
                  <span className="relative z-10 hidden lg:inline">
                    {item.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div
          aria-hidden="true"
          className="absolute inset-x-3 bottom-0 h-px overflow-hidden rounded-full bg-white/5"
        >
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-indigo-400 to-cyan-300"
            style={{ scaleX: progress }}
          />
        </div>
      </nav>
    </motion.header>
  )
}
