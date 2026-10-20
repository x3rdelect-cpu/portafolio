import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/components/ui/BrandIcons'
import TiltCard from '@/components/interactive/TiltCard'
import { site } from '@/data/site'

const SOCIAL_ICONS = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

const STATS = [
  { value: '15+', label: 'años enseñando' },
  { value: '11+', label: 'años de experiencia' },
  { value: '4', label: 'áreas de trabajo' },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Hero de una sola pantalla: mensaje, CTAs, prueba social y una tarjeta 3D.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24"
    >
      <div className="section-shell">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Columna editorial */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-w-0"
          >
            <motion.div variants={item}>
              <Badge variant="success" className="gap-2 px-3 py-1.5 text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {site.availability}
              </Badge>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance font-display text-[2.3rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem]"
            >
              Diseño y construyo{' '}
              <span className="text-gradient">productos digitales</span> que no se
              olvidan.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-slate-400 sm:text-base"
            >
              Soy{' '}
              <span className="font-medium text-slate-200">{site.name}</span>,
              diseñador web e ingeniero de sistemas. Construyo sitios
              comerciales, CRMs, aplicaciones móviles y análisis de datos con
              RStudio, cuidando que cada producto sea claro, rápido y fácil de
              usar.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="#proyectos" size="lg">
                Ver proyectos
                <ArrowDown className="size-4 transition-transform duration-300 group-hover/button:translate-y-0.5" />
              </Button>
              <Button href="#contacto" variant="secondary" size="lg">
                <Mail className="size-4" />
                Hablemos
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-3"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
                Encuéntrame
              </span>
              <span className="h-px w-8 bg-white/10" />
              <div className="flex items-center gap-1.5">
                {site.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon] ?? ArrowUpRight
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                    >
                      <Icon className="size-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p className="mt-1 text-[11px] leading-tight text-slate-500 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Tarjeta visual */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none"
          >
            <TiltCard className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-400/10 blur-2xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/75 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-400/70" />
                    <span className="size-2.5 rounded-full bg-amber-300/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wide text-slate-500">
                    portfolio.tsx
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-400 to-cyan-300 font-display text-xl font-extrabold tracking-tight text-ink-950 shadow-lg shadow-indigo-500/25">
                    {site.shortName}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
                      {site.name}
                    </p>
                    <p className="text-xs text-slate-400">{site.role}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="size-3" />
                      {site.location}
                    </p>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-950/80 p-4 font-mono text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                  <p>
                    <span className="text-fuchsia-300">const</span>{' '}
                    <span className="text-cyan-300">developer</span>{' '}
                    <span className="text-slate-500">=</span> {'{'}
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">stack</span>: [
                    <span className="text-emerald-300">'React'</span>,{' '}
                    <span className="text-emerald-300">'Laravel'</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">datos</span>:{' '}
                    <span className="text-emerald-300">'RStudio'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">focus</span>:{' '}
                    <span className="text-emerald-300">'detalle'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-300">status</span>:{' '}
                    <span className="text-amber-200">'open_to_work'</span>,
                  </p>
                  <p>{'}'}</p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { value: '15+', label: 'años' },
                    { value: '11+', label: 'experiencia' },
                    { value: '4', label: 'áreas' },
                  ].map((mini) => (
                    <div
                      key={mini.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 text-center"
                    >
                      <p className="font-display text-sm font-semibold text-white">
                        {mini.value}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">
                        {mini.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
                    </span>
                    Currently building
                  </div>
                  <span className="truncate text-[11px] font-medium text-cyan-300">
                    {site.currentProject}
                  </span>
                </div>
              </div>

              <div className="absolute -left-4 -top-4 hidden animate-float items-center gap-2 rounded-xl border border-white/10 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur-md sm:flex">
                <span className="grid size-6 place-items-center rounded-md bg-cyan-400/10 text-cyan-300">
                  <Code2 className="size-3.5" />
                </span>
                <span className="text-xs font-medium text-slate-200">
                  React + Vite
                </span>
              </div>

              <div className="absolute -right-4 top-24 hidden animate-float-slow items-center gap-2 rounded-xl border border-white/10 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur-md sm:flex">
                <span className="grid size-6 place-items-center rounded-md bg-indigo-400/10 text-indigo-300">
                  <Sparkles className="size-3.5" />
                </span>
                <span className="text-xs font-medium text-slate-200">
                  Framer Motion
                </span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
          Scroll
        </span>
        <span className="h-8 w-px animate-scroll-hint bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
