/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} role
 * @property {string} company
 * @property {string} period
 * @property {string} location
 * @property {string} summary
 * @property {string[]} highlights
 * @property {string[]} stack
 * @property {boolean} [current]
 */

/** @type {ExperienceItem[]} */
export const experience = [
  {
    id: 'consultoria-software',
    role: 'Consultor & Desarrollador de Software',
    company: 'Independiente',
    period: '2014 — Presente',
    location: 'Lima, Perú · Remoto',
    summary:
      'Acompaño a negocios y equipos en el diseño, construcción y análisis de sus herramientas digitales, desde la web comercial hasta el CRM y los tableros de datos.',
    highlights: [
      'Diseño y construyo sitios web comerciales y sistemas de gestión a medida, con foco en claridad y facilidad de uso.',
      'Diseño aplicaciones móviles y prototipos navegables para validar el flujo antes de programar.',
      'Automatizo el análisis y los reportes con R, Python, SQL y Power BI.',
    ],
    stack: ['React', 'Laravel', 'MySQL', 'RStudio', 'Power BI'],
    current: true,
  },
  {
    id: 'docencia',
    role: 'Docente de Computación e Informática',
    company: 'Instituciones educativas',
    period: '2010 — Presente',
    location: 'Lima, Perú',
    summary:
      'Más de 15 años enseñando computación e informática en modalidad presencial y virtual, con experiencia en el diseño de materiales y en la formación de equipos.',
    highlights: [
      'Dicté cursos de ofimática, bases de datos y desarrollo web en distintas instituciones.',
      'Instructor CISCO y Oracle, con certificación Microsoft Office Specialist (MOS) Excel Expert.',
      'Certificación Microsoft Power BI Data Analyst Associate (PL-300).',
    ],
    stack: ['Excel & VBA', 'SQL', 'Power BI', 'Cisco', 'Oracle'],
    current: true,
  },
]

export default experience
