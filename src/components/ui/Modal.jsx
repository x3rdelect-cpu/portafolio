import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

/**
 * Modal accesible con portal, bloqueo de scroll, focus trap básico y Escape.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.description]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size]
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'lg',
  className,
}) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const node = panelRef.current
      if (!node) return

      const focusable = Array.from(
        node.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onCloseRef.current?.()
            }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              'relative z-10 max-h-[calc(100svh-2rem)] w-full overflow-y-auto rounded-3xl border border-white/12 bg-ink-900/95 shadow-2xl shadow-black/60 backdrop-blur-2xl',
              SIZES[size],
              className,
            )}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/8 p-6 sm:p-7">
              <div>
                <h2
                  id={titleId}
                  className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl"
                >
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="mt-1.5 text-sm text-slate-400">
                    {description}
                  </p>
                )}
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={() => onCloseRef.current?.()}
                aria-label="Cerrar"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-6 sm:p-7">{children}</div>

            {footer && (
              <div className="border-t border-white/8 p-6 sm:px-7 sm:py-5">{footer}</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
