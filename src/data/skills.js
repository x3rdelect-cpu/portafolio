/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {number} level  Nivel relativo 0–100 (solo visual).
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'Code2'|'ChartColumn'|'Palette'} icon
 * @property {Skill[]} items
 */

/** @type {SkillGroup[]} */
export const skillGroups = [
  {
    id: 'web',
    title: 'Desarrollo Web',
    description: 'Sitios comerciales y sistemas de gestión que se entienden rápido.',
    icon: 'Code2',
    items: [
      { name: 'React', level: 88 },
      { name: 'Laravel', level: 86 },
      { name: 'JavaScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    id: 'datos',
    title: 'Datos & Analytics',
    description: 'Del registro disperso al tablero que ayuda a decidir.',
    icon: 'ChartColumn',
    items: [
      { name: 'RStudio / R', level: 88 },
      { name: 'Power BI', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    id: 'diseno',
    title: 'Diseño & Herramientas',
    description: 'Prototipos claros, componentes consistentes y control de versiones.',
    icon: 'Palette',
    items: [
      { name: 'Figma', level: 88 },
      { name: 'UI/UX móvil', level: 85 },
      { name: 'Git & GitHub', level: 82 },
      { name: 'Excel / VBA', level: 92 },
    ],
  },
]

/** Tecnologías sueltas para la nube de herramientas. */
export const toolbelt = [
  'R',
  'tidyverse',
  'ggplot2',
  'R Markdown',
  'DAX',
  'Power Query',
  'MySQL',
  'PostgreSQL',
  'Node.js',
  'Vite',
  'Cisco',
  'Oracle',
]

export default skillGroups
