import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { GithubIcon } from '@/components/ui/BrandIcons'
import Modal from '@/components/ui/Modal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/motion/RevealOnScroll'
import ProjectSlider from '@/components/interactive/ProjectSlider'
import { featuredProjects, projects } from '@/data/projects'

function ProjectCard({ project, onOpen }) {
  return (
    <SpotlightCard className="h-full" spotlightColor="rgba(34, 211, 238, 0.12)">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={project.image}
            alt={`Vista previa de ${project.title}`}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            <Badge className="border-white/10 bg-ink-950/65 backdrop-blur-md">
              <Layers3 className="size-3" />
              {project.category}
            </Badge>
          </div>

          <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-[10px] font-medium tracking-wide text-slate-300 backdrop-blur-md">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline">+{project.tags.length - 3}</Badge>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpen(project)}
              aria-label={`Ver caso de estudio de ${project.title}`}
              className="-ml-2 px-2 text-slate-300"
            >
              Caso de estudio
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Button>

            <div className="flex items-center gap-1">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Repositorio de ${project.title} en GitHub`}
                  className="grid size-8 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <GithubIcon className="size-4" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Demo de ${project.title}`}
                  className="grid size-8 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </SpotlightCard>
  )
}

/**
 * Sección de proyectos: slider destacado + grid con casos de estudio en modal.
 */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="proyectos" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Trabajo seleccionado"
            title={
              <>
                Proyectos que{' '}
                <span className="text-gradient">empujan límites</span>.
              </>
            }
            description="Una muestra de productos donde la estrategia, el diseño y la ingeniería trabajan como un solo sistema."
          />

          <RevealOnScroll delay={0.15} className="shrink-0">
            <Button href="#contacto" variant="secondary" size="md">
              Hablemos de tu proyecto
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
            </Button>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1} amount={0.1} blur className="mt-12">
          <ProjectSlider projects={featuredProjects} />
        </RevealOnScroll>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <RevealOnScroll
              key={project.id}
              delay={index * 0.08}
              amount={0.12}
              className="h-full"
            >
              <ProjectCard project={project} onOpen={setSelectedProject} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title ?? 'Caso de estudio'}
        description={
          selectedProject
            ? `${selectedProject.category} · ${selectedProject.year}`
            : undefined
        }
        size="lg"
        footer={
          selectedProject &&
          (selectedProject.links.live || selectedProject.links.github) ? (
            <div className="flex flex-wrap items-center gap-2.5">
              {selectedProject.links.live && (
                <Button
                  href={selectedProject.links.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="sm"
                >
                  Ver demo
                  <ArrowUpRight className="size-3.5" />
                </Button>
              )}
              {selectedProject.links.github && (
                <Button
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="sm"
                >
                  <GithubIcon className="size-3.5" />
                  Repositorio
                </Button>
              )}
            </div>
          ) : null
        }
      >
        {selectedProject && (
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={selectedProject.image}
                alt={`Vista previa de ${selectedProject.title}`}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <p className="mt-6 text-pretty text-sm leading-relaxed text-slate-300">
              {selectedProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {selectedProject.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
