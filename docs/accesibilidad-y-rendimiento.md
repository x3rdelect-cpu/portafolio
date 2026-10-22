# Accesibilidad y rendimiento

## 1. Accesibilidad

El sitio se pensó para funcionar con teclado, lectores de pantalla y movimiento
reducido. Estas son las implementaciones concretas y dónde viven.

### Estructura y navegación

| Medida | Implementación |
| --- | --- |
| Idioma del documento | `<html lang="es">` |
| Esquema de color | `<meta name="color-scheme" content="dark">` + `color-scheme: dark` |
| Landmarks | `<header>` (navbar), `<main id="contenido">`, `<footer>` |
| Skip link | Primer elemento de `App.jsx`: `href="#contenido"`, visible al enfocar |
| Foco visible | `:focus-visible` global con ring indigo y offset |
| Sección activa | `aria-current="location"` en el enlace correspondiente |
| Navegación | `<nav aria-label="Navegación principal">` |
| Enlaces externos | `target="_blank"` + `rel="noreferrer noopener"` + `aria-label` |

### Carrusel de proyectos

- Contenedor con `role="region"`, `aria-roledescription="carrusel"` y
  `aria-label="Proyectos destacados"`.
- Cada diapositiva: `role="group"`, `aria-roledescription="diapositiva"` y
  `aria-label="${title}, ${n} de ${total}"`.
- Navegación por teclado con `←` / `→` cuando el contenedor tiene foco.
- Botones de flecha con `aria-label` ("Proyecto anterior/siguiente").
- Dots con `aria-label="Mostrar ${title}"` y `aria-current="true"` en el activo.
- El swipe no es la única forma de navegar: siempre hay flechas y dots.

### Modal de caso de estudio

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` y `aria-describedby`.
- Se monta en un portal sobre `document.body`.
- **Focus trap:** `Tab` y `Shift+Tab` ciclan entre los elementos enfocables del
  panel.
- Al abrir, enfoca el botón de cierre; al cerrar, devuelve el foco al elemento
  que lo abrió.
- `Escape` cierra el modal.
- Click en el backdrop cierra (comparando `target` con `currentTarget`).
- Bloquea el scroll del body mientras está abierto y restaura el valor previo.

### Formularios y feedback

- Los campos del formulario de contacto tienen etiquetas asociadas, validación
  nativa y se deshabilitan durante el envío.
- El envío usa EmailJS; los estados de éxito, error y configuración incompleta
  se comunican con SweetAlert2.
- El email se copia con `navigator.clipboard` y tiene un fallback a `mailto:`.
  El resultado se anuncia con `<p role="status" aria-live="polite">`.
- El botón de copia cambia su `aria-label` según el estado (`copied`).

### Skills

- Cada barra es `role="progressbar"` con `aria-label`, `aria-valuenow`,
  `aria-valuemin` y `aria-valuemax`.
- El porcentaje también está visible en texto, no solo en la barra.

### Imágenes y decoración

- Las portadas tienen `alt` descriptivo (`Vista previa de ${title}`).
- Las imágenes del grid y del slider usan `loading="lazy"`.
- Todos los halos, grids, ruido, iconos decorativos y badges puramente visuales
  llevan `aria-hidden="true"`.
- Los iconos de marca ya incluyen `aria-hidden` y `focusable="false"`.

### Movimiento reducido

Hay tres capas de protección:

1. `<MotionConfig reducedMotion="user">` en `App.jsx`, que afecta a todos los
   componentes de Framer Motion.
2. `useReducedMotion()` en componentes que deben cambiar estructura, no solo
   duración: `CursorGlow` (no se renderiza), `TiltCard` (sin tilt ni glare),
   `ProjectSlider` (sin drag ni blur), `NavbarFloating`, `RevealOnScroll`.
3. Media query global en `globals.css` que reduce animaciones y transiciones CSS
   a `0.01ms` y desactiva el scroll suave.

### Mapa de teclado

| Tecla | Contexto | Acción |
| --- | --- | --- |
| `Tab` | Global | Navegar; primer tab revela el skip link |
| `Enter` / `Space` | Botones y enlaces | Activar |
| `←` / `→` | Carrusel enfocado | Diapositiva anterior/siguiente |
| `Escape` | Modal abierto | Cerrar |
| `Tab` / `Shift+Tab` | Modal abierto | Ciclar dentro del panel |

### Contraste y tipografía

- Texto principal: `text-slate-200` sobre `#05060b`.
- Textos secundarios: `slate-400`.
- Textos terciarios/metadatos: `slate-500` y `slate-600`, a menudo en tamaños de
  10–11 px. **Es la zona de mayor riesgo de contraste y legibilidad.** Si se
  modifica, verifica con una herramienta WCAG y considera subir un paso la
  escala (`slate-400`) en textos esenciales.
- Los degradados de texto (`text-gradient`) pueden perder contraste en el
  extremo cyan; se usan en titulares grandes, no en texto corrido.

### Checklist al añadir UI

- [ ] ¿Es un control nativo o tiene `role` y nombre accesible?
- [ ] ¿Funciona solo con teclado y el foco es visible?
- [ ] ¿Los iconos decorativos están ocultos para lectores?
- [ ] ¿La animación respeta `prefers-reduced-motion`?
- [ ] ¿El texto cumple contraste en su tamaño real?
- [ ] ¿Los estados (hover, focus, active, disabled) son distinguibles?
- [ ] ¿Los mensajes dinámicos se anuncian (`aria-live`)?

---

## 2. Rendimiento

### Técnicas aplicadas

| Técnica | Dónde | Por qué |
| --- | --- | --- |
| MotionValues para el puntero | `useMousePosition`, `SpotlightCard`, `TiltCard`, `CursorGlow` | Evita re-renders de React en cada `pointermove` |
| `useMotionTemplate` | Spotlight y glare | El gradiente se actualiza en el DOM sin pasar por React |
| Scroll con spring | `useScrollProgress` | Barra de progreso suave sin estado React |
| Animaciones sobre `transform`/`opacity` | Reveals, slider, botones, modal | Se resuelven en el compositor |
| `layoutId` | Píldora de la navbar | Animación de layout compartida sin cálculos manuales |
| Imágenes lazy | Grid y slider | No bloquean el primer render |
| SVG locales | Portadas y logos | Sin peticiones externas ni dependencias de terceros |
| Fuentes con `preconnect` y `display=swap` | `index.html` | Reduce bloqueo y FOIT |
| Build con hash | Vite | Cache busting automático |
| CSS-first tokens | Tailwind v4 | Menos configuración y CSS generado acorde al uso |

### Costes a vigilar

| Elemento | Coste | Mitigación |
| --- | --- | --- |
| `backdrop-blur` en navbar, modal y tarjetas | Alto en GPUs modestas | Usarlo en superficies clave, no en listas largas |
| Capas `fixed` + `blur-[140px]` del fondo | Pintado continuo | Son estáticas; evitar añadir más halos animados |
| `background-attachment: fixed` | Costoso en móvil | Se puede limitar a `lg` si hay problemas |
| Animación de `width` en barras de skills | Propiedad de layout | Sustituir por `scaleX` con `transform-origin: left` |
| Bundle único de ~460 kB | Parseo inicial | `LazyMotion`, code splitting o menos iconos |
| Imágenes sin dimensiones explícitas | CLS | Añadir `width`/`height` o `aspect-ratio` (las cards ya usan `aspect-[16/9]`) |

### Presupuesto de referencia

Medición local con Node 24 y build limpio:

| Recurso | Tamaño | Gzip |
| --- | --- | --- |
| JS | ~460 kB | ~145 kB |
| CSS | ~69 kB | ~11 kB |
| Portadas SVG | 4–7 kB c/u | ~1–1.6 kB c/u |

Objetivos razonables para el futuro:

- JS inicial < 200 kB gzip (hoy ~145 kB, ya dentro de un rango aceptable).
- Evitar que el CSS pase de ~15 kB gzip.
- Mantener LCP por debajo de 2.5 s en 4G.

### Cómo medir

```bash
npm run build
npm run preview
```

Luego usa Lighthouse en Chrome DevTools (modo móvil, throttling) y revisa:

- **LCP:** el titular del hero y la tarjeta visual.
- **CLS:** portadas sin dimensiones y fuentes.
- **TBT/INP:** hidratación de Framer Motion y eventos de puntero.
- **Accesibilidad:** contraste de metadatos y nombres accesibles.

### Optimizaciones recomendadas

1. Reemplazar la animación de `width` de las skills por `scaleX`.
2. Añadir `width`/`height` a las imágenes cuando se usen capturas reales.
3. Evaluar `LazyMotion` + `domAnimation` para reducir el peso de Framer Motion.
4. Cargar el slider y el modal con `React.lazy` si el bundle crece.
5. Self-hostear Inter y Sora si la red de Google Fonts es un riesgo.
6. Revisar iconos de Lucide no usados (el bundle actual ya importa solo los
   necesarios, pero conviene verificarlo al añadir secciones).
