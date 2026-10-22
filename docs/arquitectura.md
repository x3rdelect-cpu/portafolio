# Arquitectura

## 1. Visión general

El proyecto es una **landing page de una sola ruta** que presenta el perfil
profesional, proyectos, trayectoria, skills y contacto. No hay servidor propio,
autenticación ni base de datos: es un sitio estático que Vite compila a HTML,
CSS y JS.

Objetivos que guían la arquitectura:

1. **Contenido separado de la UI** — los textos y enlaces viven en `src/data/`.
2. **Componentes con una sola responsabilidad** — primitivos, motion, secciones
   e interactivos están en carpetas distintas.
3. **Movimiento con propósito y accesible** — animaciones centralizadas y
   respeto por `prefers-reduced-motion`.
4. **Rendimiento percibido** — animaciones sobre `transform`/`opacity`,
   `MotionValue` en lugar de estado React para el puntero y SVG locales.

## 2. Stack y responsabilidades

| Herramienta | Versión | Responsabilidad |
| --- | --- | --- |
| React | 19.x | UI declarativa y estado local |
| React DOM | 19.x | Render en el navegador (`createRoot`) |
| Vite | 8.x | Dev server, HMR y build de producción |
| `@vitejs/plugin-react` | 6.x | Fast Refresh y transformación JSX |
| Tailwind CSS | 4.x | Utilidades y design tokens vía CSS |
| `@tailwindcss/vite` | 4.x | Integración de Tailwind sin PostCSS |
| Framer Motion | 14.x | Transiciones, scroll reveal, gestos y layout animations |
| Lucide React | 1.x | Iconografía de interfaz |
| `clsx` + `tailwind-merge` | 2.x / 3.x | Utilidad `cn()` para clases condicionales |
| ESLint | 10.x | Reglas de JS, React Hooks y Fast Refresh |

No se usa TypeScript ni framework CSS adicional. Los tipos se documentan con
**JSDoc** y se resuelven en el editor con `jsconfig.json` (`checkJs: false`).

## 3. Punto de entrada y árbol de render

```text
index.html
└── <div id="root">
    └── src/main.jsx
        └── <StrictMode>
            └── <App />                    # src/App.jsx
                └── <MotionConfig reducedMotion="user">
                    ├── skip link ("Saltar al contenido")
                    ├── fondo ambiental (aria-hidden)
                    ├── <CursorGlow />         # halo que sigue al puntero
                    ├── <NavbarFloating />     # nav fija + progreso de scroll
                    └── <PageTransition>
                        ├── <main id="contenido">
                        │   ├── <Hero />        # #inicio
                        │   ├── <Projects />    # #proyectos
                        │   ├── <Experience />  # #experiencia
                        │   ├── <Skills />      # #skills
                        │   └── <Contact />     # #contacto
                        └── <Footer />
```

`src/main.jsx` es el único punto que importa CSS global:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 4. Capas del proyecto

| Carpeta | Responsabilidad | Regla práctica |
| --- | --- | --- |
| `src/components/sections/` | Composición de la página | Consume `data/`, no define primitivos |
| `src/components/ui/` | Primitivos visuales sin lógica de negocio | Reutilizable en cualquier sección |
| `src/components/motion/` | Wrappers de animación | Centraliza easings y movimiento reducido |
| `src/components/interactive/` | Componentes con estado o gestos | Slider, tilt y navbar |
| `src/hooks/` | Lógica reutilizable | Sin JSX, desacoplada de la UI |
| `src/data/` | Contenido editable | Sin imports de componentes |
| `src/lib/` | Utilidades puras | `cn()` es la única actual |
| `src/assets/` | Imágenes y SVG | Portadas de proyectos |
| `src/styles/` | CSS global y tokens | Tailwind v4 `@theme` |

Dependencias permitidas entre capas:

```text
sections ──> interactive ──> motion
    │            │
    ├──────────> ui ──────> lib
    ├──────────> hooks
    └──────────> data

motion / ui ──> lib
```

Evita que `ui/` importe `data/` o `sections/`: los primitivos deben poder
reutilizarse fuera de este portafolio.

## 5. Flujo de datos

El flujo es unidireccional y en tiempo de build:

```text
src/data/*.js  ──import──>  sections  ──props──>  ui / interactive
      │                        │
      │                        └── estado local (useState) para UI efímera
      └── contenido estático (sin fetch)
```

No hay `useEffect` que cargue contenido ni llamadas HTTP. Cambiar un archivo de
`data/` y guardar es suficiente para ver el cambio con HMR.

### Estado local relevante

| Componente | Estado | Para qué |
| --- | --- | --- |
| `Projects` | `selectedProject` | Abre/cierra el modal del caso de estudio |
| `ProjectSlider` | `index`, `direction` | Diapositiva actual y sentido de la animación |
| `Contact` | `form`, `isSending`, `copied`, `copyMessage` + `timeoutRef` | Envío del formulario y feedback temporal al copiar el email |
| `NavbarFloating` | vía `useActiveSection` | Resalta la sección visible |
| `Modal` | refs y efectos | Foco, scroll bloqueado y `Escape` |

## 6. Estilos y theming

Tailwind v4 se configura **desde CSS**, sin `tailwind.config.js`. El archivo
`src/styles/globals.css` contiene:

1. `@import "tailwindcss";`
2. `@source not "../../docs";` para que los ejemplos de la documentación no
   generen CSS (las rutas de `@source` son relativas al archivo CSS).
3. Bloque `@theme` con tokens y animaciones.
4. `@layer base` con estilos globales.
5. `@layer components` con primitivas reutilizables.
6. Media query global de `prefers-reduced-motion`.

### Tokens principales

| Token | Valor | Uso |
| --- | --- | --- |
| `--font-sans` | Inter | Texto general |
| `--font-display` | Sora | Títulos y cifras |
| `--color-ink-950` | `#05060b` | Fondo base |
| `--color-ink-900` | `#080a12` | Superficies |
| `--color-ink-800` | `#0d101b` | Superficies elevadas |
| `--color-accent` | `#818cf8` | Acento indigo |
| `--color-accent-strong` | `#6366f1` | Acento fuerte |
| `--color-glow` | `#22d3ee` | Acento cyan |

Estos tokens generan utilidades como `bg-ink-950`, `text-accent` o
`font-display`.

### Animaciones declaradas

`animate-float`, `animate-float-slow`, `animate-pulse-ring`,
`animate-shimmer` y `animate-scroll-hint`, definidas con `@keyframes` dentro de
`@theme`.

### Clases de componente

| Clase | Efecto |
| --- | --- |
| `.section-shell` | Contenedor centrado `max-w-6xl` con padding responsive |
| `.glass-panel` | Superficie glass con borde y blur |
| `.text-gradient` | Texto con gradiente indigo → blanco → cyan |
| `.text-gradient-cyan` | Texto con gradiente cyan → indigo |
| `.bg-grid` | Retícula de 64 px para fondos |
| `.bg-noise` | Textura de ruido SVG inline |
| `.card-sheen` | Reflejo diagonal sutil |

La paleta concreta de cada componente se expresa con utilidades de Tailwind
(`bg-white/[0.025]`, `border-white/10`, `shadow-indigo-950/50`, etc.). Para
cambiar la identidad visual, empieza por `@theme` y por las clases anteriores.

## 7. Alias de importación

`@` apunta a `src/` en dos lugares que deben mantenerse sincronizados:

```js
// vite.config.js
resolve: {
  alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
}
```

```json
// jsconfig.json
"paths": { "@/*": ["src/*"] }
```

Vite resuelve el alias en build/dev; `jsconfig.json` permite que el editor
autocomplete y navegue. Si añades otro alias, decláralo en ambos archivos.

## 8. Build y artefactos

```bash
npm run build
```

La salida va a `dist/` y contiene:

```text
dist/
├── index.html
└── assets/
    ├── index-[hash].js     # React + Framer Motion + Lucide + app
    ├── index-[hash].css    # Tailwind compilado
    └── *.svg               # portadas de proyectos (hasheadas)
```

Medición de referencia en este repositorio (Node 24, build limpio):

| Artefacto | Tamaño | Gzip |
| --- | --- | --- |
| JS | ~460 kB | ~145 kB |
| CSS | ~69 kB | ~11 kB |
| SVG de portadas | 4–7 kB cada uno | ~1–1.6 kB |

El JS concentra React, Framer Motion y los iconos de Lucide. Si el peso pasa a
ser crítico, las mejoras con más impacto son:

- Sustituir iconos individuales por imports directos (ya se hace) y revisar los
  que no se usan.
- Evaluar `LazyMotion` + `domAnimation` de Framer Motion.
- Dividir el slider/modal con `React.lazy` si se añaden más secciones.

## 9. Decisiones y límites conocidos

- **Sin router:** la navegación usa anchors (`#seccion`) y `scroll-behavior:
  smooth`. `PageTransition` deja preparado un `exit` por si se integra un
  router, pero hoy se monta una sola vez.
- **Sin backend propio:** el formulario de contacto envía mediante EmailJS; no
  hay almacenamiento ni API propia. `mailto:` y copiar email siguen
  disponibles como alternativas.
- **Contenido en código:** no hay CMS. Es deliberado para mantener el sitio
  estático y simple.
- **SVG locales:** las portadas son ilustraciones en `src/assets/projects/`, no
  capturas externas; no dependen de red ni de licencias de terceros.
- **Datos duplicados:** las cifras del hero (`STATS` en `Hero.jsx` y los mini
  stats de la tarjeta) están escritas dos veces. Si cambian, actualiza ambas.
- **Textos parcialmente hardcodeados:** la tarjeta de disponibilidad de
  `Contact.jsx` incluye `Remoto · UTC−5 · Respuesta en 24–48 h` aparte de
  `site.responseTime`.
- **Legado:** ver la sección siguiente.

## 10. Legado y archivos sin uso

| Ruta | Estado | Nota |
| --- | --- | --- |
| `src/assets/components/` | Legado | Componentes de una versión con Bootstrap (`Banner`, `Contacto`, `Habilidades`, `Navbar`, `Perfil`, `Proyectos`). No se importan. |
| `src/App.css`, `src/index.css` | Legado | No se importan; el entrypoint usa `styles/globals.css`. |
| `src/assets/hero.png`, `react.svg`, `vite.svg` | Sin uso | Restos del template de Vite. |
| `public/icons.svg` | Sin uso | Sprite con iconos de Bluesky, Discord, GitHub, etc. No referenciado por `index.html`. |

Antes de borrar cualquier archivo de esta tabla, confirma con `grep` que no
tenga imports. El proyecto se mantiene funcional sin ellos, pero se conservan
como referencia histórica.
