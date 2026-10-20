import { CalendarDays, Check, MapPin } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/motion/RevealOnScroll'
import { experience } from '@/data/experience'
import { cn } from '@/lib/utils'

const PRINCIPLES = [
  'Diseño y código dentro del mismo loop de feedback.',
  'La performance es un requisito, no una fase final.',
  'Motion con propósito, siempre accesible y reducible.',
]

/**
 * Trayectoria profesional en formato timeline editorial.
 */
export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Trayectoria"
              title={
                <>
                  Experiencia que se convierte en{' '}
                  <span className="text-gradient-cyan">criterio</span>.
                </>
              }
              description="No solo entrego pantallas: entiendo el producto, cuestiono el alcance y cuido cómo se comporta cada decisión en producción."
            />

            <RevealOnScroll delay={0.15} className="mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Cómo trabajo
                </p>

                <ul className="mt-4 space-y-3">
                  {PRINCIPLES.map((principle) => (
                    <li
                      key={principle}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400"
                    >
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-3 left-[6px] top-3 w-px bg-gradient-to-b from-indigo-400/60 via-white/10 to-transparent"
            />

            <div className="space-y-5">
              {experience.map((job, index) => (
                <RevealOnScroll
                  key={job.id}
                  delay={index * 0.07}
                  amount={0.15}
                  direction="left"
                >
                  <article className="relative pl-8 sm:pl-9">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-0 top-6 grid size-3.5 place-items-center rounded-full border transition-colors',
                        job.current
                          ? 'border-cyan-300 bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                          : 'border-indigo-400/50 bg-ink-950',
                      )}
                    >
                      <span
                        className={cn(
                          'size-1 rounded-full',
                          job.current ? 'bg-ink-950' : 'bg-indigo-400',
                        )}
                      />
                    </span>

                    <SpotlightCard className="p-6 sm:p-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                              {job.role}
                            </h3>
                            {job.current && (
                              <Badge variant="success">Actual</Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm font-medium text-indigo-300">
                            {job.company}
                          </p>
                        </div>

                        <div className="text-xs text-slate-500 sm:text-right">
                          <p className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-3.5" />
                            {job.period}
                          </p>
                          <p className="mt-1.5 inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {job.location}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-400">
                        {job.summary}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {job.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-400"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] size-1 shrink-0 rounded-full bg-indigo-400"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.stack.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </SpotlightCard>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
