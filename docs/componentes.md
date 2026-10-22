# Catálogo de componentes

Todos los componentes usan **export default** (salvo los iconos de marca, que
son exports nombrados) y aceptan `className` para extender estilos mediante
`cn()`.

## 1. Secciones

Las secciones no reciben props: leen el contenido desde `src/data/` y se
componen en `src/App.jsx`. Cada una declara el `id` que usa la navegación.

| Componente | `id` | Contenido |
| --- | --- | --- |
| `Hero` | `inicio` | Badge de disponibilidad, titular, CTAs, redes, stats y tarjeta 3D |
| `Projects` | `proyectos` | Slider de destacados, grid de tarjetas y modal de caso de estudio |
| `Experience` | `experiencia` | Principios de trabajo + timeline de puestos |
| `Skills` | `skills` | Grupos de skills con barras animadas y toolbelt |
| `Contact` | `contacto` | Formulario EmailJS, email copiable, redes y datos de contacto |
| `Footer` | — | Copyright, stack y enlace "volver arriba" |

### `Hero` — `src/components/sections/Hero.jsx`

- Animación de entrada escalonada con variantes (`staggerChildren: 0.09`).
- `STATS` y los mini stats de la tarjeta visual están **duplicados**; si cambias
  una cifra, actualiza ambos bloques.
- La tarjeta usa `TiltCard` y contiene un snippet de código decorativo.
- Enlaza a `#proyectos` y `#contacto`.

### `Projects` — `src/components/sections/Projects.jsx`

- Renderiza `ProjectSlider` con `featuredProjects`.
- Renderiza el grid completo con `projects`.
- `ProjectCard` (interno) muestra portada, categoría, año, descripción corta,
  hasta 3 tags y enlaces opcionales.
- Al pulsar **Caso de estudio** guarda el proyecto en `selectedProject` y abre
  `Modal` con descripción completa, portada y todos los tags.
- Los botones de demo/repositorio solo aparecen si `links.live` o
  `links.github` existen.

### `Experience` — `src/components/sections/Experience.jsx`

- Columna izquierda sticky con `SectionHeading` y los principios de trabajo
  (`PRINCIPLES`, hardcodeados en el archivo).
- Columna derecha con timeline; el punto del puesto `current: true` se resalta
  en cyan.
- Cada tarjeta usa `SpotlightCard` y `RevealOnScroll direction="left"`.

### `Skills` — `src/components/sections/Skills.jsx`

- Mapea `skillGroups` a tarjetas con icono, descripción y barras.
- Las barras usan `role="progressbar"` y `aria-valuenow`.
- Los iconos se resuelven desde el mapa `ICONS = { ChartColumn, Code2, Palette,
  Server }`; un `group.icon` desconocido cae en `Code2`.
- El bloque **Toolbelt** pinta `toolbelt` como badges alternando variantes.

### `Contact` — `src/components/sections/Contact.jsx`

- La información personal, disponibilidad, ubicación, email, tiempo de
  respuesta y redes se leen desde `src/data/site.js`.
- El formulario envía `nombre`, `email` y `mensaje` mediante EmailJS; requiere
  `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y
  `VITE_EMAILJS_PUBLIC_KEY`.
- También envía alias habituales de plantilla (`from_name`, `reply_to`,
  `message`, entre otros). Los destinatarios y los campos `To Email`/`Reply-To`
  se configuran en el dashboard de EmailJS.
- `handleCopyEmail` usa `navigator.clipboard`; si falla, abre el enlace `mailto:`.
  El estado `copied` se revierte a los 2.2 s y se anuncia con `aria-live`.
- `InfoRow` (interno) presenta email, ubicación y tiempo de respuesta; acepta
  `href` para convertir el dato en enlace.
- Los mensajes de envío y error se muestran con SweetAlert2, con la paleta
  oscura del sitio.

### `Footer` — `src/components/sections/Footer.jsx`

- Año calculado con `new Date().getFullYear()`.
- Enlace `#inicio` con `aria-label="Volver arriba"`.

---

## 2. Interactivos

### `NavbarFloating` — `src/components/interactive/NavbarFloating.jsx`

Navegación flotante fija, centrada, con `backdrop-blur-xl`.

| Comportamiento | Implementación |
| --- | --- |
| Sección activa | `useActiveSection(SECTION_IDS)` con `IntersectionObserver` |
| Píldora animada | `motion.span` con `layoutId="navbar-active-pill"` |
| Progreso de scroll | `useScrollProgress()` → `scaleX` |
| Responsive | Solo iconos hasta `lg`; etiquetas desde `lg` |
| Accesibilidad | `aria-label`, `aria-current="location"` |

`SECTION_IDS` se deriva de `site.nav`; los iconos se resuelven con el mapa
`ICONS` y caen en `Home` si el id no existe. **No recibe props.**

### `ProjectSlider` — `src/components/interactive/ProjectSlider.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `projects` | `Project[]` | `[]` | Proyectos a mostrar |
| `className` | `string` | — | Clases del contenedor |

- Navegación circular con flechas, dots y teclado (`←` / `→`).
- Swipe con `drag="x"`; el umbral combina desplazamiento y velocidad
  (`offset.x + velocity.x * 0.15 > 70`).
- `AnimatePresence mode="wait"` con variantes direccionales (slide + fade +
  blur).
- Controles fuera del área animada para que no se desmonten.
- ARIA: `role="region"`, `aria-roledescription="carrusel"`, cada diapositiva
  con `aria-roledescription="diapositiva"`.
- Con `prefers-reduced-motion` desactiva drag, desplazamiento y blur.

```jsx
<ProjectSlider projects={featuredProjects} />
```

### `TiltCard` — `src/components/interactive/TiltCard.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `maxTilt` | `number` | `9` | Grados máximos de inclinación |
| `glare` | `boolean` | `true` | Reflejo radial que sigue al puntero |
| `children` | `ReactNode` | — | Contenido |
| `className` | `string` | — | Clases extra |

- Coordenadas normalizadas 0–1 con `useMotionValue`.
- `rotateX` / `rotateY` con `useSpring` y `useTransform`.
- `transformPerspective: 1200` y `preserve-3d`.
- En movimiento reducido devuelve una tarjeta estática sin glare.

---

## 3. Primitivos de UI

### `Badge` — `src/components/ui/Badge.jsx`

| Prop | Tipo | Default |
| --- | --- | --- |
| `variant` | `'default' \| 'accent' \| 'cyan' \| 'success' \| 'outline'` | `'default'` |

```jsx
<Badge variant="success">Disponible</Badge>
```

### `Button` — `src/components/ui/Button.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'glow'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Altura y padding |
| `href` | `string` | — | Si existe, renderiza `<motion.a>` |
| `disabled` | `boolean` | — | Desactiva hover/tap y aplica opacidad |

- Sin `href` renderiza `<motion.button type="button">`.
- Añade `whileHover={{ y: -2 }}` y `whileTap={{ scale: 0.97 }}` salvo si está
  deshabilitado.
- El grupo `group/button` permite animar iconos hijos con
  `group-hover/button:*`.

```jsx
<Button href="#contacto" size="lg">Hablemos</Button>
<Button variant="secondary" onClick={copyEmail}>Copiar email</Button>
```

### `Card` — `src/components/ui/Card.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `interactive` | `boolean` | `false` | Elevación y borde en hover |

Contenedor glass básico. Las secciones usan `SpotlightCard` cuando necesitan
interacción; `Card` queda como alternativa simple.

### `CursorGlow` — `src/components/ui/CursorGlow.jsx`

Halo radial fijo que sigue al puntero con springs. Sin props. Se oculta en
`prefers-reduced-motion` y solo se muestra desde `lg`.

### `Modal` — `src/components/ui/Modal.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controla la visibilidad |
| `onClose` | `() => void` | — | Cierre por backdrop, botón o `Escape` |
| `title` | `ReactNode` | — | Se usa en `aria-labelledby` |
| `description` | `ReactNode` | — | Se usa en `aria-describedby` |
| `footer` | `ReactNode` | — | Acciones al pie |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Ancho máximo |
| `children` | `ReactNode` | — | Contenido |

- Se renderiza con `createPortal` en `document.body`.
- Bloquea el scroll del body y lo restaura al cerrar.
- Focus trap básico: `Tab`/`Shift+Tab` ciclan dentro del panel.
- `Escape` cierra y devuelve el foco al elemento previo.
- `AnimatePresence` anima entrada y salida.

### `SectionHeading` — `src/components/ui/SectionHeading.jsx`

| Prop | Tipo | Default |
| --- | --- | --- |
| `eyebrow` | `ReactNode` | — |
| `title` | `ReactNode` | — |
| `description` | `ReactNode` | — |
| `align` | `'left' \| 'center'` | `'left'` |
| `className` | `string` | — |
| `titleClassName` | `string` | — |

Incluye `RevealOnScroll` internamente; no lo envuelvas otra vez salvo que
necesites otro timing.

### `SpotlightCard` — `src/components/ui/SpotlightCard.jsx`

| Prop | Tipo | Default | Descripción |
| --- | --- | --- | --- |
| `spotlightColor` | `string` | `rgba(129, 140, 248, 0.16)` | Color RGBA del halo |
| `spotlightSize` | `number` | `380` | Radio en px |
| `interactive` | `boolean` | `true` | Elevación en hover |
| `as` | `string` | `'div'` | Etiqueta motion a renderizar |
| `onMouseMove` | `function` | — | Callback adicional |
| `onMouseLeave` | `function` | — | Callback adicional |

- El halo se pinta con `useMotionTemplate` + MotionValues: mover el ratón no
  provoca re-renders.
- Usa `whileHover={{ y: -6 }}` y respeta `useReducedMotion`.
- Añade automáticamente el grupo `group`, necesario para algunos hover hijos.

```jsx
<SpotlightCard spotlightColor="rgba(34, 211, 238, 0.12)" className="h-full">
  …
</SpotlightCard>
```

### `BrandIcons` — `src/components/ui/BrandIcons.jsx`

Exports nombrados `GithubIcon`, `LinkedinIcon`, `DribbbleIcon`.

- SVG inline con `fill="currentColor"`, `aria-hidden` y `focusable="false"`.
- Se dimensionan con `className` (por ejemplo `size-4`).
- Existen porque Lucide v1 ya no incluye logos de marcas.

---

## 4. Motion

### `RevealOnScroll` — `src/components/motion/RevealOnScroll.jsx`

| Prop | Tipo | Default |
| --- | --- | --- |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'none'` | `'up'` |
| `blur` | `boolean` | `false` |
| `delay` | `number` | `0` |
| `duration` | `number` | `0.75` |
| `amount` | `number` | `0.2` |
| `once` | `boolean` | `true` |
| `as` | etiqueta motion | `'div'` |

- Usa `whileInView` con `viewport={{ once, amount }}`.
- Easing común `[0.22, 1, 0.36, 1]`.
- Con movimiento reducido no hay estado inicial animado.

### `FadeIn` — `src/components/motion/FadeIn.jsx`

| Prop | Tipo | Default |
| --- | --- | --- |
| `delay` | `number` | `0` |
| `y` | `number` | `24` |
| `duration` | `number` | `0.7` |
| `once` | `boolean` | `true` |
| `amount` | `number` | `0.25` |
| `as` | etiqueta motion | `'div'` |

Versión mínima de aparición. No se usa en las secciones actuales, pero está
disponible para contenido nuevo.

### `PageTransition` — `src/components/motion/PageTransition.jsx`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `children` | `ReactNode` | Contenido de la página |
| `className` | `string` | Clases del wrapper |

Entrada de 0.6 s con `opacity` + `y`. Define `exit` para una futura integración
con `AnimatePresence`/router, aunque hoy no hay rutas.

---

## 5. Hooks

### `useActiveSection(ids)` — `src/hooks/useActiveSection.js`

- Devuelve el `id` de la sección visible.
- `IntersectionObserver` con `rootMargin: '-35% 0px -55% 0px'` y umbrales
  múltiples, lo que evita saltos en secciones altas.
- Inicializa desde `window.location.hash` y escucha `hashchange`.
- Si el navegador no soporta `IntersectionObserver`, devuelve el primer id.

```js
const active = useActiveSection(['inicio', 'proyectos', 'contacto'])
```

### `useMousePosition({ scopeRef, initial })`

- Devuelve `x`, `y`, `relativeX`, `relativeY` como `MotionValue<number>`.
- Ignora eventos `pointerType === 'touch'`.
- Con `scopeRef`, las coordenadas relativas se calculan contra ese elemento.
- Escucha en `window` con `{ passive: true }` y limpia al desmontar.

### `useScrollProgress({ target, container, offset, spring })`

- Devuelve `progress` (spring), `scrollYProgress` y `scrollXProgress`.
- `offset` por defecto `['start start', 'end end']` y solo se aplica si hay
  `target`.
- Spring por defecto `{ stiffness: 140, damping: 30, restDelta: 0.001 }`.
- Se usa en la navbar con `style={{ scaleX: progress }}`.

---

## 6. Utilidad `cn()`

`src/lib/utils.js`:

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

Uso típico:

```jsx
className={cn(
  'rounded-xl px-3 py-2 text-sm',
  isActive ? 'bg-white/10 text-white' : 'text-slate-400',
  className,
)}
```

`clsx` resuelve condicionales y `twMerge` elimina conflictos para que el
`className` externo pueda sobrescribir el interno.
