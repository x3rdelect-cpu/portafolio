/**
 * @typedef {Object} Social
 * @property {string} label  Texto accesible y clave de React.
 * @property {string} href   URL completa; se abre en pestaña nueva.
 * @property {'Github'|'Linkedin'|'Dribbble'} icon
 */

/**
 * @typedef {Object} NavItem
 * @property {string} id     Debe coincidir con el id de una <section>.
 * @property {string} label
 */

/**
 * Identidad, contacto y navegación del sitio.
 *
 * Es la única fuente de verdad para estos datos: la consumen la navbar, el
 * hero, el contacto y el footer. Cambiar un valor aquí se refleja en toda la
 * página.
 *
 * @type {{
 *   name: string,
 *   shortName: string,
 *   role: string,
 *   location: string,
 *   email: string,
 *   availability: string,
 *   responseTime: string,
 *   currentProject: string,
 *   socials: Social[],
 *   nav: NavItem[],
 * }}
 */
export const site = {
  name: 'Renato Francisco Ramos Rojas',
  shortName: 'RR',
  role: 'Diseñador Web & Ingeniero de Sistemas',
  location: 'Lima, Perú',
  email: 'x3rdelect@gmail.com',
  availability: 'Disponible para nuevos proyectos',
  responseTime: 'Respondo en 24–48 h',
  currentProject: 'CRM a medida',
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'Github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'Linkedin' },
  ],
  nav: [
    { id: 'inicio', label: 'Inicio' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'experiencia', label: 'Trayectoria' },
    { id: 'skills', label: 'Skills' },
    { id: 'contacto', label: 'Contacto' },
  ],
}

export default site
