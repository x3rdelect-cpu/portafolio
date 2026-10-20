import { motion } from 'framer-motion'
import { ChartColumn, Code2, Palette, Server, Sparkles } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/motion/RevealOnScroll'
import { skillGroups, toolbelt } from '@/data/skills'

const ICONS = { ChartColumn, Code2, Palette, Server }

/**
 * Skills agrupadas con barras animadas y toolbelt complementario.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.05] py-24 sm:py-32"
    >
      <div className="section-shell">
        <SectionHeading
          align="center"
          eyebrow="Stack & herramientas"
          title={
            <>
              Un stack elegido con{' '}
              <span className="text-gradient">intención</span>.
            </>
          }
          description="Tecnologías que domino lo suficiente para tomar decisiones de arquitectura, no solo para escribir componentes."
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = ICONS[group.icon] ?? Code2

            return (
              <RevealOnScroll
                key={group.id}
                delay={index * 0.08}
                amount={0.15}
                className="h-full"
              >
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 text-indigo-300">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-slate-600">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {group.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    {group.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-baseline justify-between gap-3 text-xs">
                          <span className="font-medium text-slate-300">
                            {skill.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-600">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            role="progressbar"
                            aria-label={`${skill.name}: ${skill.level}%`}
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{
                              duration: 1,
                              delay: 0.15,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            )
          })}
        </div>

        <RevealOnScroll delay={0.1} amount={0.15} blur className="mt-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-64 rounded-full bg-cyan-400/[0.07] blur-3xl"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-sm">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  <Sparkles className="size-3.5" />
                  Toolbelt
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                  Herramientas que uso a diario
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  El resto del ecosistema que mantiene el código testeable,
                  medible y fácil de mantener.
                </p>
              </div>

              <div className="flex max-w-xl flex-wrap gap-2">
                {toolbelt.map((tool, index) => (
                  <Badge
                    key={tool}
                    variant={index % 4 === 0 ? 'cyan' : 'default'}
                    className="transition-colors hover:border-white/25 hover:text-white"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
