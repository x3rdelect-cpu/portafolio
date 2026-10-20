import { cn } from '@/lib/utils'

const VARIANTS = {
  default: 'border-white/10 bg-white/[0.05] text-slate-300',
  accent: 'border-indigo-400/25 bg-indigo-400/10 text-indigo-200',
  cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
  success: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  outline: 'border-white/15 bg-transparent text-slate-400',
}

/**
 * Etiqueta compacta para tecnologías, categorías o estados.
 *
 * @param {Object} props
 * @param {'default'|'accent'|'cyan'|'success'|'outline'} [props.variant]
 */
export default function Badge({
  className,
  variant = 'default',
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none tracking-wide',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
