import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/**
 * Sigue la posición del puntero usando MotionValues.
 *
 * Al guardar las coordenadas en MotionValues evitamos re-renders de React en
 * cada `pointermove`: Framer Motion actualiza el transform directamente sobre
 * el DOM, manteniendo la animación en el compositor.
 *
 * @param {Object} [options]
 * @param {import('react').RefObject<HTMLElement>} [options.scopeRef]
 *   Si se pasa, `relativeX` / `relativeY` se calculan dentro de ese elemento.
 * @param {{ x: number, y: number }} [options.initial]
 * @returns {{
 *   x: import('framer-motion').MotionValue<number>,
 *   y: import('framer-motion').MotionValue<number>,
 *   relativeX: import('framer-motion').MotionValue<number>,
 *   relativeY: import('framer-motion').MotionValue<number>,
 * }}
 *
 * @example
 * const scopeRef = useRef(null)
 * const { relativeX, relativeY } = useMousePosition({ scopeRef })
 */
export function useMousePosition({ scopeRef, initial = { x: 0, y: 0 } } = {}) {
  const x = useMotionValue(initial.x)
  const y = useMotionValue(initial.y)
  const relativeX = useMotionValue(initial.x)
  const relativeY = useMotionValue(initial.y)

  useEffect(() => {
    const handlePointerMove = (event) => {
      // En pantallas táctiles no hay hover: ignoramos el evento.
      if (event.pointerType === 'touch') return

      x.set(event.clientX)
      y.set(event.clientY)

      const node = scopeRef?.current
      if (node) {
        const rect = node.getBoundingClientRect()
        relativeX.set(event.clientX - rect.left)
        relativeY.set(event.clientY - rect.top)
      } else {
        relativeX.set(event.clientX)
        relativeY.set(event.clientY)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [scopeRef, x, y, relativeX, relativeY])

  return { x, y, relativeX, relativeY }
}

export default useMousePosition
