import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  Mail,
  MapPin,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/components/ui/BrandIcons'
import RevealOnScroll from '@/components/motion/RevealOnScroll'
import { site } from '@/data/site'

const SOCIAL_ICONS = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm text-slate-200">
          {value}
        </span>
      </span>
    </>
  )

  const classes =
    'flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors'

  if (href) {
    return (
      <a
        href={href}
        className={`${classes} hover:border-white/25 hover:bg-white/[0.05]`}
      >
        {content}
      </a>
    )
  }

  return <div className={classes}>{content}</div>
}

/**
 * CTA final con email copiable, redes y datos de contacto.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard no disponible')
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback: abre el cliente de correo si el portapapeles está bloqueado.
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="section-shell">
        <RevealOnScroll blur amount={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/[0.14] via-ink-900/75 to-cyan-500/[0.08] p-6 shadow-2xl shadow-black/40 sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-indigo-500/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-cyan-400/10 blur-[100px]"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-200">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  {site.availability}
                </span>

                <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  ¿Tienes una idea{' '}
                  <span className="text-gradient">ambiciosa</span>?
                </h2>

                <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">
                  Estoy disponible para sitios web comerciales, sistemas CRM,
                  diseño de aplicaciones móviles y análisis de datos con
                  RStudio. Cuéntame qué necesitas construir.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={`mailto:${site.email}`} size="lg">
                    <Mail className="size-4" />
                    Escríbeme
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleCopyEmail}
                    aria-label={
                      copied ? 'Email copiado' : 'Copiar email al portapapeles'
                    }
                  >
                    {copied ? (
                      <Check className="size-4 text-emerald-300" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    {copied ? 'Email copiado' : 'Copiar email'}
                  </Button>
                </div>

                <p role="status" aria-live="polite" className="sr-only">
                  {copied ? `${site.email} copiado al portapapeles` : ''}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
                    También en
                  </span>

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
                </div>
              </div>

              <div className="space-y-3">
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <InfoRow
                  icon={MapPin}
                  label="Ubicación"
                  value={site.location}
                />
                <InfoRow
                  icon={Clock3}
                  label="Tiempo de respuesta"
                  value={site.responseTime}
                />

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Disponibilidad
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Abierto a proyectos freelance y colaboraciones.
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500">
                    Remoto · UTC−5 · Respuesta en 24–48 h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
