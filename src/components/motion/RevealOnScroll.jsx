import { motion, useReducedMotion } from 'framer-motion'

const OFFSETS = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Revela contenido al hacer scroll con dirección y blur opcionales.
 *
 * @param {Object} props
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction]
 * @param {boolean} [props.blur] Añade un desenfoque de entrada.
 * @param {number} [props.delay]
 * @param {number} [props.amount]
 * @param {boolean} [props.once]
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function RevealOnScroll({
  children,
  className,
  direction = 'up',
  blur = false,
  delay = 0,
  duration = 0.75,
  amount = 0.2,
  once = true,
  as = 'div',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div
  const offset = OFFSETS[direction] ?? OFFSETS.up

  return (
    <MotionTag
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              ...offset,
              ...(blur ? { filter: 'blur(10px)' } : {}),
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
      }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
