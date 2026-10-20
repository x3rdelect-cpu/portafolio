import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Tarjeta con inclinación 3D siguiendo al puntero y glare opcional.
 *
 * El tilt se calcula con MotionValues + springs. En dispositivos con
 * `prefers-reduced-motion` se desactiva y se devuelve una tarjeta estática.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.maxTilt] Grados máximos de inclinación.
 * @param {boolean} [props.glare]
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 9,
  glare = true,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]),
    { stiffness: 180, damping: 22 },
  )
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]),
    { stiffness: 180, damping: 22 },
  )

  const glareX = useTransform(pointerX, (value) => `${value * 100}%`)
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`)
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.13), transparent 55%)`

  const handlePointerMove = (event) => {
    if (!reduceMotion && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width)
      pointerY.set((event.clientY - rect.top) / rect.height)
    }
    onPointerMove?.(event)
  }

  const handlePointerLeave = (event) => {
    pointerX.set(0.5)
    pointerY.set(0.5)
    onPointerLeave?.(event)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={cn('group relative', className)}
      {...props}
    >
      {children}

      {glare && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  )
}
