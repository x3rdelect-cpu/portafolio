import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/components/ui/BrandIcons'
import RevealOnScroll from '@/components/motion/RevealOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { site } from '@/data/site'

const SOCIAL_ICONS = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Dribbble: DribbbleIcon,
}

const INPUT_CLASS =
  'w-full rounded-xl border border-white/10 bg-ink-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 disabled:cursor-not-allowed disabled:opacity-60'

async function showContactAlert(options) {
  const { default: Swal } = await import('sweetalert2')
  return Swal.fire(options)
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-indigo-400/15 bg-indigo-400/[0.07] text-indigo-300">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          {label}
        </span>
        <span className="mt-1 block break-words text-sm text-slate-200">
          {value}
        </span>
      </span>
    </>
  )

  const className =
    'flex min-w-0 items-center gap-3 rounded-xl transition-colors'

  return href ? (
    <a href={href} className={`${className} hover:text-white`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}

/**
 * Contacto: formulario EmailJS, datos del sitio, redes y acción para copiar el email.
 */
export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [isSending, setIsSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const handleCopyEmail = async () => {
    window.clearTimeout(timeoutRef.current)

    try {
      if (!navigator.clipboard?.writeText) {
        window.location.href = `mailto:${site.email}`
        setCopied(false)
        setCopyMessage('Se abrió tu aplicación de correo.')
        return
      }

      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setCopyMessage(`${site.email} copiado al portapapeles`)
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
        setCopyMessage('')
      }, 2200)
    } catch (error) {
      console.error('No se pudo copiar el email:', error)
      window.location.href = `mailto:${site.email}`
      setCopied(false)
      setCopyMessage('No se pudo copiar el email. Se abrió tu aplicación de correo.')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('Falta configurar una o más variables de EmailJS.')
      await showContactAlert({
        title: 'Formulario no disponible',
        text: 'El servicio de contacto aún no está configurado. Puedes escribirme directamente por email.',
        icon: 'error',
        confirmButtonColor: '#6366f1',
        background: '#0d101b',
        color: '#e2e8f0',
      })
      return
    }

    setIsSending(true)

    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        serviceId,
        templateId,
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
        },
        publicKey,
      )

      await showContactAlert({
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarme. Te responderé a la brevedad.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        background: '#0d101b',
        color: '#e2e8f0',
      })
      setForm({ nombre: '', email: '', mensaje: '' })
    } catch (error) {
      console.error('Error al enviar el mensaje:', error)
      await showContactAlert({
        title: 'No se pudo enviar',
        text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo o escríbeme directamente por email.',
        icon: 'error',
        confirmButtonColor: '#6366f1',
        background: '#0d101b',
        color: '#e2e8f0',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contacto"
      className="relative border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contacto"
              title={
                <>
                  Hagamos algo{' '}
                  <span className="text-gradient-cyan">que importe</span>.
                </>
              }
              description="¿Tienes un proyecto en mente o necesitas ayuda para convertir una idea en producto? Cuéntame qué necesitas y lo vemos juntos."
            />

            <RevealOnScroll delay={0.12} className="mt-8">
              <SpotlightCard className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Hablemos de tu próximo proyecto
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {site.responseTime}
                    </p>
                  </div>
                  <Badge variant="success">{site.availability}</Badge>
                </div>

                <div className="mt-6 grid gap-5 border-t border-white/[0.07] pt-5">
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
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyEmail}
                    aria-label={copied ? 'Email copiado' : 'Copiar email'}
                  >
                    {copied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied ? 'Copiado' : 'Copiar email'}
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <span className="mr-1 text-[11px] text-slate-600">
                      También en
                    </span>
                    {site.socials.map((social) => {
                      const Icon = SOCIAL_ICONS[social.icon] ?? ArrowUpRight
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={social.label}
                          className="grid size-8 place-items-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
                        >
                          <Icon className="size-3.5" />
                        </a>
                      )
                    })}
                  </div>
                </div>
                <p
                  role="status"
                  aria-live="polite"
                  className="min-h-5 text-xs text-cyan-200"
                >
                  {copyMessage}
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.1} amount={0.12}>
            <SpotlightCard className="h-full p-5 sm:p-7">
              <div className="mb-6">
                <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Cuéntame sobre tu proyecto
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Completa el formulario y me pondré en contacto contigo.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contacto-nombre"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Nombre
                  </label>
                  <input
                    id="contacto-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={INPUT_CLASS}
                    required
                    disabled={isSending}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contacto-email"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="contacto-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={INPUT_CLASS}
                    required
                    disabled={isSending}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contacto-mensaje"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="contacto-mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    className={`${INPUT_CLASS} resize-y`}
                    required
                    disabled={isSending}
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-slate-500">
                    O escríbeme a{' '}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-indigo-300 transition-colors hover:text-indigo-200"
                    >
                      {site.email}
                    </a>
                  </p>
                  <Button
                    type="submit"
                    disabled={isSending}
                    className="shrink-0"
                  >
                    <Send className="size-3.5" />
                    {isSending ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </div>
              </form>
            </SpotlightCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
