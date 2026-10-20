import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

/**
 * Halo ambiental que sigue al cursor. Decorativo y desactivado en mobile.
 *
 * Usa MotionValues + spring: el movimiento se resuelve en el compositor y no
 * provoca re-renders. Se oculta si el usuario prefiere movimiento reducido.
 */
export default function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const { x, y } = useMousePosition({ initial: { x: -600, y: -600 } })

  const smoothX = useSpring(x, { stiffness: 70, damping: 22, mass: 0.5 })
  const smoothY = useSpring(y, { stiffness: 70, damping: 22, mass: 0.5 })

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.13),rgba(34,211,238,0.05)_45%,transparent_68%)] blur-2xl lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        marginLeft: '-18rem',
        marginTop: '-18rem',
      }}
    />
  )
}
