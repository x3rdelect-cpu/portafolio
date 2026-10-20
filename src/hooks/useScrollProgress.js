import { useScroll, useSpring } from 'framer-motion'

/**
 * Progreso de scroll (0 → 1) suavizado con un spring.
 *
 * Devuelve un MotionValue listo para usar en `style={{ scaleX }}` sin
 * provocar re-renders. También expone el valor crudo por si se necesita
 * lógica puntual (por ejemplo, mostrar un porcentaje).
 *
 * @param {Object} [options]
 * @param {import('react').RefObject<HTMLElement>} [options.target]
 *   Elemento concreto a medir. Por defecto, el viewport.
 * @param {import('react').RefObject<HTMLElement>} [options.container]
 * @param {[string, string]} [options.offset]
 * @param {{ stiffness?: number, damping?: number, restDelta?: number }} [options.spring]
 * @returns {{
 *   progress: import('framer-motion').MotionValue<number>,
 *   scrollYProgress: import('framer-motion').MotionValue<number>,
 *   scrollXProgress: import('framer-motion').MotionValue<number>,
 * }}
 *
 * @example
 * const { progress } = useScrollProgress()
 * <motion.span style={{ scaleX: progress }} />
 */
export function useScrollProgress({
  target,
  container,
  offset = ['start start', 'end end'],
  spring = { stiffness: 140, damping: 30, restDelta: 0.001 },
} = {}) {
  const scrollOptions = {}
  if (target) scrollOptions.target = target
  if (container) scrollOptions.container = container
  if (target) scrollOptions.offset = offset

  const { scrollYProgress, scrollXProgress } = useScroll(scrollOptions)
  const progress = useSpring(scrollYProgress, spring)

  return { progress, scrollYProgress, scrollXProgress }
}

export default useScrollProgress
