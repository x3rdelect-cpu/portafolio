import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Tarjeta con spotlight radial que sigue al cursor y elevación en hover.
 *
 * La luz se pinta con un gradiente controlado por MotionValues, por lo que el
 * movimiento no dispara re-renders de React. El `whileHover` de Framer Motion
 * se encarga de la micro-elevación y el `prefers-reduced-motion` se respeta
 * automáticamente.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.spotlightColor] Color RGBA del halo.
 * @param {number} [props.spotlightSize] Radio del halo en px.
 * @param {boolean} [props.interactive] Activa la elevación en hover.
 * @param {React.MouseEventHandler<HTMLElement>} [props.onMouseMove]
 */
export default function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(129, 140, 248, 0.16)',
  spotlightSize = 380,
  interactive = true,
  onMouseMove,
  onMouseLeave,
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(-spotlightSize)
  const mouseY = useMotionValue(-spotlightSize)

  const background = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 78%)`

  const handleMouseMove = (event) => {
    const node = ref.current
    if (node) {
      const rect = node.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    }
    onMouseMove?.(event)
  }

  const handleMouseLeave = (event) => {
    mouseX.set(-spotlightSize)
    mouseY.set(-spotlightSize)
    onMouseLeave?.(event)
  }

  const MotionTag = motion[Tag] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={interactive && !reduceMotion ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-indigo-950/50',
        className,
      )}
      {...props}
    >
      {/* Spotlight que sigue al puntero */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Reflejo sutil en el borde superior */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40"
      />

      <div className="relative z-10 h-full">{children}</div>
    </MotionTag>
  )
}
