import { cn } from '@/lib/utils'

/**
 * Contenedor base con la superficie glass del sistema.
 *
 * @param {Object} props
 * @param {boolean} [props.interactive] Añade elevación y borde en hover.
 */
export default function Card({ className, interactive = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm',
        interactive &&
          'transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045] hover:shadow-2xl hover:shadow-indigo-950/40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
