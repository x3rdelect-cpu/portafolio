import { cn } from '@/lib/utils'
import RevealOnScroll from '@/components/motion/RevealOnScroll'

/**
 * Encabezado reutilizable para secciones.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.eyebrow]
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.description]
 * @param {'left'|'center'} [props.align]
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
}) {
  return (
    <RevealOnScroll
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-300',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400/80" />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </div>
      )}

      <h2
        className={cn(
          'text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl',
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </RevealOnScroll>
  )
}
