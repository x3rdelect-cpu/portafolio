import { motion, useReducedMotion } from 'framer-motion'

/**
 * Transición de entrada/salida para el contenido de una página.
 *
 * Al no usar router, se monta una sola vez; el `exit` queda listo para
 * integrarse con `AnimatePresence` si más adelante añades React Router.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function PageTransition({ children, className }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
