import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const VARIANTS = {
  primary:
    'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 hover:shadow-indigo-500/35 border border-indigo-400/30',
  secondary:
    'border border-white/12 bg-white/[0.04] text-slate-100 backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.08]',
  outline:
    'border border-indigo-400/35 bg-transparent text-indigo-200 hover:border-indigo-300/60 hover:bg-indigo-400/10',
  ghost: 'border border-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white',
  glow: 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110',
}

const SIZES = {
  sm: 'h-9 gap-1.5 rounded-lg px-3.5 text-xs',
  md: 'h-11 gap-2 rounded-xl px-5 text-sm',
  lg: 'h-12 gap-2.5 rounded-xl px-6 text-sm sm:text-base',
  icon: 'size-10 rounded-xl',
}

/**
 * Botón/enlace animado con variantes visuales.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'glow'} [props.variant]
 * @param {'sm'|'md'|'lg'|'icon'} [props.size]
 * @param {string} [props.href]  Si existe, renderiza un <a>.
 * @param {React.ReactNode} props.children
 */
export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  href,
  children,
  disabled,
  ...props
}) {
  const classes = cn(
    'group/button inline-flex select-none items-center justify-center whitespace-nowrap font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,filter] duration-300 disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  const interaction = disabled
    ? {}
    : { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...interaction} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      disabled={disabled}
      {...interaction}
      {...props}
    >
      {children}
    </motion.button>
  )
}
