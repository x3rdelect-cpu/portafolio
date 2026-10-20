import commercialCover from '@/assets/projects/aurora.svg'
import crmCover from '@/assets/projects/pulse.svg'
import mobileCover from '@/assets/projects/mobile.svg'
import dataCover from '@/assets/projects/nebula.svg'

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} shortDescription  Texto de una o dos líneas para cards.
 * @property {string} description       Caso de estudio para el slider / modal.
 * @property {string[]} tags            Tecnologías usadas.
 * @property {{ github?: string, live?: string }} links  Enlaces opcionales.
 * @property {string} category
 * @property {string} image
 * @property {string} year
 * @property {boolean} featured
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 'sitio-web-comercial',
    title: 'Sitio Web Comercial',
    shortDescription:
      'Diseño y construcción de una web comercial enfocada en presentar el negocio y convertir visitas en clientes.',
    description:
      'Diseño y desarrollo de un sitio web comercial de principio a fin: arquitectura de la información, identidad visual, maquetación responsive y publicación. El sitio presenta los productos y servicios del negocio, ordena la información en secciones claras y guía al visitante hacia el contacto mediante llamadas a la acción visibles en todo el recorrido. Incluye formulario de contacto, optimización de carga y metadatos para buscadores.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Responsive', 'SEO'],
    links: {},
    category: 'Web comercial',
    image: commercialCover,
    year: '2025',
    featured: true,
  },
  {
    id: 'crm-a-medida',
    title: 'CRM a Medida',
    shortDescription:
      'Sistema de gestión de clientes con seguimiento de oportunidades, tareas y reportes para el equipo comercial.',
    description:
      'Construcción de un CRM a medida para centralizar clientes, contactos y oportunidades de venta. El sistema organiza el embudo comercial por etapas, registra la interacción con cada cliente y permite asignar tareas al equipo. Incluye autenticación por roles, búsqueda y filtros sobre la base de datos, tablero con indicadores del embudo y exportación de reportes para el seguimiento semanal.',
    tags: ['Laravel', 'MySQL', 'React', 'REST API', 'Power BI'],
    links: {},
    category: 'Sistema de gestión',
    image: crmCover,
    year: '2025',
    featured: true,
  },
  {
    id: 'apps-moviles',
    title: 'Diseño de Aplicaciones Móviles',
    shortDescription:
      'Diseño de interfaces móviles claras, consistentes y listas para implementar, de la wireframe al prototipo.',
    description:
      'Diseño de aplicaciones móviles centrado en el usuario: investigación del flujo, wireframes de baja fidelidad, sistema de componentes y prototipo interactivo. Cada pantalla se pensó primero para el pulgar, con jerarquía tipográfica clara, estados vacíos, de carga y de error definidos. El entregable incluye el design system en Figma, la guía de estilos y el prototipo navegable para validar con usuarios antes de programar.',
    tags: ['Figma', 'UI/UX', 'Design System', 'Prototipado', 'Mobile First'],
    links: {},
    category: 'Diseño móvil',
    image: mobileCover,
    year: '2024',
    featured: true,
  },
  {
    id: 'analisis-datos-rstudio',
    title: 'Análisis de Datos con RStudio',
    shortDescription:
      'Limpieza, exploración y visualización de datos en R para convertir registros dispersos en decisiones.',
    description:
      'Análisis de datos de principio a fin con RStudio: importación y limpieza de los registros, análisis exploratorio, construcción de variables y visualizaciones con ggplot2. El trabajo se documenta en un reporte reproducible con R Markdown, de modo que cualquier persona del equipo pueda ejecutar el análisis y actualizar los resultados. Las conclusiones se resumen en un tablero con los indicadores más relevantes para la toma de decisiones.',
    tags: ['R', 'RStudio', 'ggplot2', 'tidyverse', 'R Markdown'],
    links: {},
    category: 'Análisis de datos',
    image: dataCover,
    year: '2024',
    featured: true,
  },
]

/** Proyectos marcados como destacados para el slider principal. */
export const featuredProjects = projects.filter((project) => project.featured)

export default projects
