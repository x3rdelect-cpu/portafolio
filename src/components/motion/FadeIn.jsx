import { motion, useReducedMotion } from 'framer-motion'

/**
 * Aparición suave al entrar en el viewport.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay] Segundos.
 * @param {number} [props.y] Desplazamiento inicial en px.
 * @param {number} [props.duration]
 * @param {boolean} [props.once] Animar solo la primera vez.
 * @param {number} [props.amount] Porción visible necesaria (0–1).
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  amount = 0.25,
  as = 'div',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
