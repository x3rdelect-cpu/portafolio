# Contenido y modelo de datos

Todo el contenido editable vive en `src/data/`. Los componentes solo se
encargan de presentarlo, así que **cambiar textos, enlaces o proyectos no
requiere tocar JSX**.

| Archivo | Exporta | Consumido por |
| --- | --- | --- |
| `site.js` | `site` | `App`, `NavbarFloating`, `Hero`, `Contact`, `Footer` |
| `projects.js` | `projects`, `featuredProjects` | `Projects`, `ProjectSlider` |
| `experience.js` | `experience` | `Experience` |
| `skills.js` | `skillGroups`, `toolbelt` | `Skills` |

---

## 1. `site.js` — identidad y navegación

```js
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
```

| Campo | Tipo | Dónde se usa |
| --- | --- | --- |
| `name` | `string` | Hero, tarjeta visual, footer, copyright |
| `shortName` | `string` | Logo de la navbar y avatar de la tarjeta |
| `role` | `string` | Tarjeta visual del hero |
| `location` | `string` | Hero y bloque de contacto |
| `email` | `string` | `mailto:` y botón de copiar |
| `availability` | `string` | Badge del hero y de contacto |
| `responseTime` | `string` | Fila "Tiempo de respuesta" |
| `currentProject` | `string` | Tarjeta "Currently building" |
| `socials[]` | `Social[]` | Hero y contacto |
| `nav[]` | `NavItem[]` | `NavbarFloating` y orden de secciones |

### `Social`

```ts
{
  label: string      // Texto accesible y clave de React
  href: string       // URL completa, se abre en pestaña nueva
  icon: 'Github' | 'Linkedin' | 'Dribbble'
}
```

El mapa de iconos está en `Hero.jsx` y `Contact.jsx`:

```js
const SOCIAL_ICONS = { Github: GithubIcon, Linkedin: LinkedinIcon, Dribbble: DribbbleIcon }
```

Si usas otro valor, el componente cae en `ArrowUpRight`. Para añadir una red
nueva, añade también su icono en `src/components/ui/BrandIcons.jsx` y regístralo
en ambos mapas.

### `NavItem`

```ts
{ id: string, label: string }
```

> **Importante:** cada `id` de `nav` debe coincidir con el `id` de una
> `<section>` real. La navbar construye los enlaces como `#${id}` y
> `useActiveSection` busca `document.getElementById(id)`. Si no coinciden, el
> enlace no navega y la píldora activa no se mueve.

La navbar resuelve los iconos con un mapa fijo:

```js
const ICONS = { inicio: Home, proyectos: FolderKanban, experiencia: BriefcaseBusiness, skills: Sparkles, contacto: Mail }
```

Un `id` nuevo sin entrada en ese mapa mostrará el icono `Home`.

---

## 2. `projects.js` — proyectos y casos de estudio

```js
import commercialCover from '@/assets/projects/aurora.svg'

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} shortDescription
 * @property {string} description
 * @property {string[]} tags
 * @property {{ github?: string, live?: string }} links
 * @property {string} category
 * @property {string} image
 * @property {string} year
 * @property {boolean} featured
 */
```

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | `string` | Clave de React y de las diapositivas; debe ser único |
| `title` | `string` | Card, slider, modal y `alt` de la imagen |
| `shortDescription` | `string` | Card del grid (recortada con `line-clamp-3`) |
| `description` | `string` | Slider (recortada a 6 líneas) y modal completo |
| `tags` | `string[]` | Card muestra 3 + contador; slider y modal muestran todas |
| `links.github` | `string?` | Botón "Repositorio"/icono de GitHub |
| `links.live` | `string?` | Botón "Ver demo"/icono de enlace |
| `category` | `string` | Badge de categoría |
| `image` | `string` | Import del SVG/PNG de portada |
| `year` | `string` | Badge de año |
| `featured` | `boolean` | Si es `true`, aparece en el slider |

### Comportamiento de `featured`

```js
export const featuredProjects = projects.filter((project) => project.featured)
```

- `featured: true` → slider **y** grid.
- `featured: false` → solo grid (y modal).
- Si ningún proyecto es destacado, `ProjectSlider` devuelve `null`.

### Añadir un proyecto

1. Coloca la portada en `src/assets/projects/` (idealmente 16:9).
2. Impórtala al inicio de `src/data/projects.js`.
3. Añade el objeto al array `projects`.

```js
import nuevaPortada from '@/assets/projects/nueva.svg'

{
  id: 'mi-proyecto',
  title: 'Mi Proyecto',
  shortDescription: 'Resumen de una línea para la tarjeta.',
  description:
    'Caso de estudio completo: problema, decisiones, solución y resultado. ' +
    'Este texto se ve en el slider y en el modal.',
  tags: ['React', 'Tailwind CSS', 'Vite'],
  links: {
    github: 'https://github.com/usuario/mi-proyecto',
    live: 'https://mi-proyecto.com',
  },
  category: 'SaaS · Producto',
  image: nuevaPortada,
  year: '2026',
  featured: true,
}
```

### Reglas y detalles

- **Enlaces opcionales:** con `links: {}` no se renderiza ningún botón de demo
  ni repositorio, ni en la card ni en el modal.
- **Orden:** el array define el orden del grid y el del slider.
- **Imágenes:** se importan para que Vite las procese y les añada hash. No uses
  rutas absolutas a `public/` salvo que quieras saltarte el pipeline de Vite.
- **Texto alternativo:** se genera como `Vista previa de ${title}`.
- **Sin capturas reales todavía:** las portadas actuales son ilustraciones SVG
  en `src/assets/projects/` (`aurora`, `pulse`, `mobile`, `nebula`). Reemplázalas
  por capturas reales cuando existan.
- **Año:** es un `string` para admitir rangos (`'2024 — 2025'`).

---

## 3. `experience.js` — trayectoria

```js
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
```

| Campo | Uso |
| --- | --- |
| `id` | Clave de React |
| `role` | Título del puesto |
| `company` | Empresa o contexto |
| `period` | Texto libre (`'2014 — Presente'`) |
| `location` | Ubicación o modalidad |
| `summary` | Párrafo introductorio |
| `highlights` | Lista de logros/responsabilidades |
| `stack` | Badges de tecnologías |
| `current` | Si es `true`, badge "Actual" y punto cyan en el timeline |

El orden del array es el orden visual. Los principios de la columna izquierda
(`PRINCIPLES`) están en `Experience.jsx`, no en este archivo.

### Añadir un puesto

```js
{
  id: 'nuevo-puesto',
  role: 'Desarrollador Frontend',
  company: 'Empresa',
  period: '2024 — 2025',
  location: 'Lima, Perú · Híbrido',
  summary: 'Una o dos frases sobre el rol y el impacto.',
  highlights: [
    'Logro medible o responsabilidad principal.',
    'Otra contribución relevante.',
  ],
  stack: ['React', 'Tailwind CSS', 'Vite'],
  current: false,
}
```

---

## 4. `skills.js` — skills y toolbelt

```js
/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {number} level  // 0–100, solo visual
 */

/**
 * @typedef {Object} SkillGroup
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'Code2' | 'ChartColumn' | 'Palette' | 'Server'} icon
 * @property {Skill[]} items
 */
```

| Campo | Uso |
| --- | --- |
| `id` | Clave de React |
| `title` | Título de la tarjeta |
| `description` | Bajada de la tarjeta |
| `icon` | Nombre resuelto contra `ICONS` en `Skills.jsx` |
| `items[].name` | Etiqueta de la barra |
| `items[].level` | Porcentaje mostrado y ancho de la barra |

Iconos disponibles: `Code2`, `ChartColumn`, `Palette`, `Server` (importados de
Lucide en `Skills.jsx`). Cualquier otro valor cae en `Code2`.

> `level` es **solo visual**: no representa una evaluación formal. Mantén
> valores coherentes y evita mostrar barras al 100 % si no es realista.

### `toolbelt`

Array de strings que se pinta como badges en el bloque inferior:

```js
export const toolbelt = ['R', 'tidyverse', 'ggplot2', 'R Markdown', 'DAX', …]
```

La variante de color alterna cada 4 elementos; no requiere configuración.

### Añadir un grupo

```js
{
  id: 'backend',
  title: 'Backend',
  description: 'APIs y bases de datos que sostienen el producto.',
  icon: 'Server',
  items: [
    { name: 'Node.js', level: 80 },
    { name: 'MySQL', level: 85 },
  ],
}
```

---

## 5. Metadatos y SEO

`index.html` contiene lo que no vive en `site.js`:

- `<html lang="es" class="dark">`
- `<title>` y `meta[name="description"]`
- Open Graph (`og:type`, `og:title`, `og:description`)
- `theme-color` y `color-scheme`
- Favicon (`/favicon.svg`)
- Fuentes de Google (Inter y Sora) con `preconnect`

Si cambias nombre, rol o propuesta de valor, actualiza **también** estos textos:
son los que ven los buscadores y las previsualizaciones al compartir el enlace.

---

## 6. Checklist al personalizar

- [ ] Reemplazar las URLs genéricas de GitHub y LinkedIn en `site.js`.
- [ ] Revisar `email`, `location` y `availability`.
- [ ] Añadir enlaces reales (`live` / `github`) a cada proyecto.
- [ ] Sustituir los SVG de portada por capturas reales.
- [ ] Verificar que los `id` de `nav` existen como secciones.
- [ ] Actualizar las cifras duplicadas del hero (`STATS` y mini stats).
- [ ] Ajustar `title`, `description` y Open Graph en `index.html`.
- [ ] Revisar los textos fijos de contacto (`Remoto · UTC−5 · …`).
- [ ] Ejecutar `npm run lint` y `npm run build`.
