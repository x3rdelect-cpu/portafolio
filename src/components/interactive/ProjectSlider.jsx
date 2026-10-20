import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers3,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { cn } from '@/lib/utils'

/**
 * Carrusel de proyectos con navegación por flechas, dots, teclado y swipe.
 *
 * Efecto: deslizamiento horizontal + fade + blur usando AnimatePresence con
 * `mode="wait"` y variantes que reciben la dirección como `custom`.
 *
 * @param {Object} props
 * @param {import('@/data/projects').Project[]} props.projects
 */
export default function ProjectSlider({ projects = [], className }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const reduceMotion = useReducedMotion()
  const count = projects.length

  const paginate = useCallback(
    (nextDirection) => {
      if (count === 0) return
      setDirection(nextDirection)
      setIndex((current) => (current + nextDirection + count) % count)
    },
    [count],
  )

  const goTo = useCallback(
    (nextIndex) => {
      setDirection(nextIndex > index ? 1 : -1)
      setIndex(nextIndex)
    },
    [index],
  )

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      paginate(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      paginate(-1)
    }
  }

  if (count === 0) return null

  const project = projects[index]
  const offset = reduceMotion ? 0 : 72

  const variants = {
    enter: (slideDirection) => ({
      opacity: 0,
      x: slideDirection < 0 ? -offset : offset,
      filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (slideDirection) => ({
      opacity: 0,
      x: slideDirection < 0 ? offset : -offset,
      filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
      transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
    }),
  }

  const handleDragEnd = (_event, info) => {
    const swipePower = info.offset.x + info.velocity.x * 0.15
    if (swipePower < -70) paginate(1)
    else if (swipePower > 70) paginate(-1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos destacados"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn('relative', className)}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/55 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={reduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className="grid cursor-grab active:cursor-grabbing lg:grid-cols-[1.05fr_1fr]"
          >
            {/* Visual */}
            <div className="relative min-h-[240px] overflow-hidden sm:min-h-[320px] lg:min-h-[470px]">
              <img
                src={project.image}
                alt={`Vista previa del proyecto ${project.title}`}
                className="absolute inset-0 size-full object-cover"
                draggable="false"
                loading="lazy"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-900/90"
              />

              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                <Badge variant="cyan">
                  <Layers3 className="size-3" />
                  {project.category}
                </Badge>
                <Badge className="bg-ink-950/60 backdrop-blur-md">
                  {project.year}
                </Badge>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <p className="font-display text-4xl font-semibold tracking-tight text-white/90 sm:text-5xl">
                  {String(index + 1).padStart(2, '0')}
                  <span className="ml-1 text-lg font-medium text-white/30 sm:text-xl">
                    / {String(count).padStart(2, '0')}
                  </span>
                </p>
                <span className="rounded-full border border-white/10 bg-ink-950/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                  Destacado
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${project.title}, ${index + 1} de ${count}`}
              className="flex flex-col justify-between p-6 sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Caso de estudio
                </p>

                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-6 text-pretty text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                  {project.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                {(project.links.live || project.links.github) && (
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    {project.links.live && (
                      <Button
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        size="sm"
                      >
                        Ver demo
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                      </Button>
                    )}

                    {project.links.github && (
                      <Button
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        variant="secondary"
                        size="sm"
                      >
                        <GithubIcon className="size-3.5" />
                        Código
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles persistentes */}
        <div className="flex items-center justify-between gap-4 border-t border-white/8 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-1.5" aria-label="Seleccionar proyecto">
            {projects.map((item, itemIndex) => {
              const isActive = itemIndex === index
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(itemIndex)}
                  aria-label={`Mostrar ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    isActive
                      ? 'w-8 bg-gradient-to-r from-indigo-400 to-cyan-300'
                      : 'w-1.5 bg-white/20 hover:bg-white/40',
                  )}
                />
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-1 hidden text-[11px] tabular-nums tracking-wide text-slate-500 sm:inline">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(count).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Proyecto anterior"
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Proyecto siguiente"
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
