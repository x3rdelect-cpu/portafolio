import { useEffect, useState } from 'react'

/**
 * Detecta qué sección está activa en el viewport.
 *
 * Usa IntersectionObserver con una banda de detección cercana al centro de la
 * pantalla, lo que evita saltos cuando hay secciones muy altas. También
 * sincroniza el estado inicial con el hash de la URL.
 *
 * @param {string[]} ids IDs de las secciones, en orden de navegación.
 * @returns {string} ID de la sección activa.
 *
 * @example
 * const active = useActiveSection(['inicio', 'proyectos', 'contacto'])
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return ids[0] ?? ''
    const hash = window.location.hash.replace('#', '')
    return ids.includes(hash) ? hash : (ids[0] ?? '')
  })

  const idsKey = ids.join('|')

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined
    }

    const elements = idsKey
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    elements.forEach((element) => observer.observe(element))

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (idsKey.split('|').includes(hash)) setActive(hash)
    }
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [idsKey])

  return active
}

export default useActiveSection
