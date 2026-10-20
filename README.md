# Portafolio — Boilerplate React + Tailwind + Framer Motion

Portafolio personal de una sola página con estética dark, motion intencional y
componentes interactivos listos para reutilizar. Construido con React 19, Vite,
Tailwind CSS v4, Framer Motion y Lucide.

> Los datos de contacto ya están personalizados. Los enlaces de redes y de
> proyectos son opcionales: edítalos en `src/data/site.js` y
> `src/data/projects.js` cuando los tengas.

---

## Stack

| Herramienta | Uso |
| --- | --- |
| React 19 + Vite 8 | Base de la aplicación |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Design tokens y utilidades |
| Framer Motion | Transiciones, scroll reveal, layout animations y gestos |
| Lucide React | Iconografía (los logos de marca son SVG locales) |
| clsx + tailwind-merge | Utilidad `cn()` para clases |
| ESLint | Reglas de React Hooks y Fast Refresh |

---

## Instalación

Requiere **Node.js 20.19+** o **22.12+**.

```bash
# 1. Instalar dependencias
npm install

# 2. Desarrollo
npm run dev

# 3. Build de producción
npm run build

# 4. Previsualizar el build
npm run preview

# 5. Lint
npm run lint
```

Si partes desde cero, las dependencias clave son:

```bash
npm install react react-dom framer-motion lucide-react clsx tailwind-merge
npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite eslint
```

### Configuración de Vite + Tailwind v4

```js
// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
```

Tailwind v4 se configura desde CSS (no necesita `tailwind.config.js`):

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  --font-display: "Sora", sans-serif;
  --color-ink-950: #05060b;
  --color-accent: #818cf8;
}
```

---

## Estructura

```text
src/
├── assets/
│   └── projects/              # Covers SVG de los proyectos
├── components/
│   ├── ui/                    # Primitivos de interfaz
│   │   ├── Badge.jsx
│   │   ├── BrandIcons.jsx     # GitHub / LinkedIn / Dribbble inline
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── CursorGlow.jsx
│   │   ├── Modal.jsx
│   │   ├── SectionHeading.jsx
│   │   └── SpotlightCard.jsx
│   ├── motion/
│   │   ├── FadeIn.jsx
│   │   ├── PageTransition.jsx
│   │   └── RevealOnScroll.jsx
│   ├── sections/
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   └── interactive/
│       ├── NavbarFloating.jsx
│       ├── ProjectSlider.jsx
│       └── TiltCard.jsx
├── data/
│   ├── experience.js
│   ├── projects.js
│   ├── site.js                # Nombre, email, redes y navegación
│   └── skills.js
├── hooks/
│   ├── useActiveSection.js
│   ├── useMousePosition.js
│   └── useScrollProgress.js
├── lib/
│   └── utils.js               # cn()
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

### Responsabilidad de cada capa

- **`ui/`** — componentes sin lógica de negocio: botones, badges, cards, modal.
- **`motion/`** — wrappers de animación reutilizables; centralizan easings y
  respeto por `prefers-reduced-motion`.
- **`sections/`** — composición de la página; consumen `data/`.
- **`interactive/`** — componentes con estado/gestos: slider, tilt y navbar.
- **`hooks/`** — lógica reutilizable y desacoplada de la UI.
- **`data/`** — contenido editable sin tocar componentes.
- **`lib/`** — utilidades puras.

---

## Componentes clave

### `cn()` — `src/lib/utils.js`

Combina clases condicionales con `clsx` y resuelve conflictos con
`tailwind-merge`, permitiendo overrides vía `className`.

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

### `SpotlightCard` — `src/components/ui/SpotlightCard.jsx`

- Halo radial que sigue al cursor con `useMotionValue` + `useMotionTemplate`
  (sin re-renders por `mousemove`).
- Elevación en hover con `whileHover` de Framer Motion.
- Respeta `prefers-reduced-motion`.
- Acepta `spotlightColor`, `spotlightSize`, `interactive` y `as`.

### `ProjectSlider` — `src/components/interactive/ProjectSlider.jsx`

- Navegación con flechas, dots y teclado (`←` / `→`).
- Swipe horizontal con `drag="x"` y umbral de velocidad.
- `AnimatePresence mode="wait"` + variantes direccionales (slide + fade + blur).
- Controles persistentes fuera del área animada.
- Etiquetas ARIA de carrusel y diapositiva.

### `NavbarFloating` — `src/components/interactive/NavbarFloating.jsx`

- Barra flotante centrada con `backdrop-blur-xl`.
- Entrada animada y píldora activa con `layoutId="navbar-active-pill"`.
- Detecta la sección activa con `IntersectionObserver`.
- Línea de progreso de scroll con `useScrollProgress()`.
- En mobile muestra solo iconos; las etiquetas aparecen desde `lg`.

### Hooks

- `useMousePosition` — coordenadas globales/relativas como MotionValues.
- `useScrollProgress` — progreso 0→1 suavizado con spring.
- `useActiveSection` — sección visible actual, sincronizada con el hash.

---

## Personalización

1. **Datos personales** → `src/data/site.js` (nombre, email, redes, navegación).
2. **Proyectos** → `src/data/projects.js`. Reemplaza los SVG de
   `src/assets/projects/` por capturas reales y actualiza los `links`.
3. **Experiencia y skills** → `src/data/experience.js` y `skills.js`.
4. **Colores y tipografías** → tokens `@theme` en `src/styles/globals.css`.
5. **Copys de secciones** → cada archivo en `src/components/sections/`.

### Añadir un proyecto

```js
{
  id: 'mi-proyecto',
  title: 'Mi Proyecto',
  shortDescription: 'Resumen de una línea.',
  description: 'Caso de estudio completo...',
  tags: ['React', 'Tailwind CSS'],
  links: { github: 'https://github.com/...', live: 'https://...' },
  category: 'SaaS · Producto',
  image: miImagen,
  year: '2026',
  featured: true,
}
```

Los proyectos con `featured: true` aparecen en el slider; todos aparecen en el
grid y en el modal de caso de estudio.

---

## Decisiones de performance y accesibilidad

- Animaciones sobre `transform` y `opacity`; el spotlight y el cursor glow usan
  MotionValues para evitar re-renders.
- `MotionConfig reducedMotion="user"` + media query global para movimiento
  reducido.
- Skip link, focus visible, `aria-current`, `aria-live` al copiar el email,
  focus trap y cierre con `Escape` en el modal.
- Imágenes con `loading="lazy"` y covers SVG locales (sin dependencias externas).
- Scroll suave y `scroll-margin-top` para compensar la navbar fija.

---

## Notas

- Los componentes antiguos con Bootstrap permanecen en
  `src/assets/components/` como referencia, pero ya no se importan.
- `src/App.css` y `src/index.css` son legados y no se usan; el entrypoint importa
  únicamente `src/styles/globals.css`.
- Sustituye los enlaces genéricos de GitHub y LinkedIn en `src/data/site.js` y
  añade los enlaces reales de cada proyecto en `src/data/projects.js`. Los
  botones de demo/repositorio se ocultan automáticamente si no hay enlace.
