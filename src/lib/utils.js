import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases condicionales y resuelve conflictos de Tailwind.
 *
 * clsx se encarga de la lógica (strings, arrays, objetos) y tailwind-merge
 * elimina clases duplicadas quedándose con la última. Es el patrón estándar
 * para construir componentes reutilizables y permitir overrides vía `className`.
 *
 * @param {...import('clsx').ClassValue} inputs
 * @returns {string}
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-indigo-500', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
