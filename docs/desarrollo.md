# Guía de desarrollo

## 1. Requisitos

- **Node.js 20.19+** o **22.12+** (probado con Node 24.15).
- npm 10+ (viene con Node).
- Editor con soporte de JSX y JSDoc (VS Code recomendado).

No se necesita base de datos. El formulario de contacto usa EmailJS y sus
variables de entorno; sin ellas, se puede contactar directamente por email.

## 2. Instalación y scripts

```bash
npm install
npm run dev
```

| Script | Comando | Qué hace |
| --- | --- | --- |
| `dev` | `vite` | Servidor de desarrollo con HMR (por defecto `http://localhost:5173`) |
| `build` | `vite build` | Genera `dist/` optimizado |
| `preview` | `vite preview` | Sirve `dist/` localmente para verificar el build |
| `lint` | `eslint .` | Analiza JS/JSX con reglas de Hooks y Fast Refresh |

Flujo recomendado antes de cada commit:

```bash
npm run lint
npm run build
npm run preview   # opcional, para revisar el resultado real
```

## 3. Convenciones del código

| Aspecto | Convención observada |
| --- | --- |
| Idioma de UI | Español; nombres de código en inglés |
| Comillas | Simples en JS/JSX |
| Punto y coma | No se usan |
| Indentación | 2 espacios |
| Componentes | `PascalCase.jsx`, `export default function` |
| Hooks | `useAlgo.js`, export nombrado **y** default |
| Datos | `camelCase.js`, export nombrado + default |
| Tipos | JSDoc (`@typedef`, `@param`, `@returns`) |
| Clases | Utilidades Tailwind + `cn()` para condicionales |
| Layout | `.section-shell` para el contenedor de sección |
| Animación | Easing común `[0.22, 1, 0.36, 1]` |

### Dónde va cada cosa

- ¿Es un botón, badge, card o modal? → `components/ui/`.
- ¿Es un wrapper de animación? → `components/motion/`.
- ¿Tiene estado o gestos propios? → `components/interactive/`.
- ¿Es una sección de la página? → `components/sections/`.
- ¿Es lógica sin JSX? → `hooks/`.
- ¿Es contenido? → `data/`.
- ¿Es una función pura? → `lib/`.

### Accesibilidad como requisito

Al añadir UI:

- Usa elementos nativos (`button`, `a`) antes que `div` con handlers.
- Todo control interactivo necesita nombre accesible (`aria-label` o texto).
- Los iconos decorativos llevan `aria-hidden="true"`.
- Respeta `useReducedMotion()` en animaciones nuevas.
- No elimines el anillo de foco global (`:focus-visible` en `globals.css`).

## 4. Recetas

### Añadir una sección

1. Crea `src/components/sections/MiSeccion.jsx`:

```jsx
import SectionHeading from '@/components/ui/SectionHeading'

export default function MiSeccion() {
  return (
    <section id="mi-seccion" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Eyebrow"
          title={<>Un título con <span className="text-gradient">acento</span>.</>}
          description="Una bajada breve."
        />
      </div>
    </section>
  )
}
```

2. Añádela a `src/App.jsx` dentro de `<main>`.
3. Añade `{ id: 'mi-seccion', label: 'Mi sección' }` a `site.nav` en
   `src/data/site.js`.
4. Si quieres icono propio en la navbar, añádelo al mapa `ICONS` de
   `NavbarFloating.jsx` (importa el icono de Lucide).
5. Verifica el `scroll-margin-top` global: las secciones con `id` ya lo heredan.

### Añadir un primitivo de UI

```jsx
import { cn } from '@/lib/utils'

export default function Chip({ active = false, className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs',
        active ? 'border-indigo-400/40 bg-indigo-400/10 text-indigo-200' : 'border-white/10 text-slate-400',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
```

Reglas: `className` al final de `cn()`, props extendidas, sin dependencias de
`data/`.

### Añadir una animación

1. Para entrada al hacer scroll, usa `RevealOnScroll` (o `FadeIn`).
2. Si necesitas una animación nueva, créala en `components/motion/` y usa
   `useReducedMotion()`.
3. Anima preferentemente `transform` y `opacity`; evita `width`, `height`,
   `top` o `left` en bucles.
4. Añade keyframes personalizados en `@theme` de `globals.css`.

### Cambiar colores o tipografías

Edita `@theme` en `src/styles/globals.css`:

```css
@theme {
  --color-ink-950: #05060b;
  --color-accent: #818cf8;
  --font-display: "Sora", sans-serif;
}
```

Las utilidades (`bg-ink-950`, `text-accent`, `font-display`) se regeneran solas
con HMR.

### Añadir una imagen

- **Procesada por Vite:** colócala en `src/assets/` e impórtala. Ideal para
  portadas y contenido versionado.
- **Pública y estable:** colócala en `public/` y referencia `/archivo.ext`. Útil
  para favicon o imágenes que no deben cambiar de nombre.

Las portadas actuales se importan en `src/data/projects.js`.

### Configurar el formulario de contacto

El formulario de `Contact.jsx` envía los datos del visitante mediante EmailJS.
Copia `.env.example` a `.env.local` y completa los valores desde tu cuenta:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

Reinicia Vite después de cambiar las variables. Las variables `VITE_*` forman
parte del código del navegador; usa únicamente la clave pública de EmailJS y
configura las restricciones de dominio desde EmailJS. Si falta alguna variable,
el formulario informa que no está disponible y mantiene el enlace `mailto:`.

En el dashboard de EmailJS:

1. Conecta y prueba un servicio de correo en **Email Services**.
2. Crea una plantilla y define el destinatario en **To Email**.
3. En el contenido de la plantilla usa `{{nombre}}` (o `{{from_name}}`),
   `{{email}}` (o `{{reply_to}}`) y `{{mensaje}}` (o `{{message}}`).
4. Configura **Reply-To** como `{{reply_to}}` para poder responder al remitente.
5. Autoriza el dominio del sitio en la configuración de seguridad de EmailJS.

El formulario también proporciona los alias `name`, `user_name`, `from_email`,
`user_email` y `user_message` para admitir plantillas que usen esos nombres.
Los tres IDs/keys deben pertenecer a la misma cuenta y servicio de EmailJS.
En producción, añade las mismas tres variables en la configuración del hosting
y vuelve a desplegar; el archivo `.env.local` solo configura el entorno local.

## 5. Despliegue

El resultado es estático: cualquier hosting de archivos sirve.

```bash
npm run build
# publicar el contenido de dist/
```

| Plataforma | Configuración |
| --- | --- |
| Vercel | Framework Vite; build `npm run build`; output `dist` |
| Netlify | Build `npm run build`; publish `dist` |
| GitHub Pages | Requiere `base` si se publica en `usuario.github.io/repositorio/` |
| Servidor propio / Laragon | Copiar `dist/` a la raíz pública |

Para GitHub Pages con ruta de proyecto:

```js
// vite.config.js
export default defineConfig({
  base: '/nombre-del-repositorio/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
```

No se necesitan rewrites de SPA porque solo existe `/`; la navegación interna
usa hashes (`#proyectos`, `#contacto`).

## 6. Resolución de problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| `Failed to resolve import "@/..."` | Falta el alias | Revisa `vite.config.js` y reinicia el dev server |
| El editor no reconoce `@/` | `jsconfig.json` desactualizado | Añade el path y reinicia el TS/JS server |
| Página en blanco | Error de runtime | Abre la consola; ejecuta `npm run build` para ver el error |
| Los estilos no se aplican | Clase dinámica construida con string | Usa clases completas o mapas de variantes, Tailwind no detecta concatenaciones |
| La navbar no marca la sección | `id` de `nav` ≠ `id` de `<section>` | Unifica los identificadores |
| El enlace no hace scroll | Falta la sección o el `id` | Verifica que exista y que `scroll-margin-top` sea suficiente |
| Las animaciones no se ven | `prefers-reduced-motion` activo | Es intencional; revisa la configuración del sistema |
| El modal no cierra con `Escape` | Hay otro listener interceptando | Revisa handlers globales añadidos |
| `npm` no ejecuta en PowerShell | Política de ejecución | Usa `npm.cmd` o ajusta `Set-ExecutionPolicy` |
| El puerto 5173 está ocupado | Otro proceso | `npm run dev -- --port 5174` |
| Fuentes distintas en local | Bloqueo de Google Fonts | Comprueba red o self-hostea las fuentes |

## 7. Deuda técnica y siguientes pasos

| Tema | Detalle | Impacto |
| --- | --- | --- |
| Enlaces placeholder | GitHub/LinkedIn genéricos y proyectos sin `links` | Medio (contenido) |
| Portadas de ejemplo | SVG ilustrativos, no capturas reales | Medio (contenido) |
| Cifras duplicadas | `STATS` + mini stats en `Hero.jsx` | Bajo (mantenimiento) |
| Textos fijos en contacto | `Remoto · UTC−5 · Respuesta en 24–48 h` | Bajo |
| Legado Bootstrap | `src/assets/components/`, `App.css`, `index.css` | Bajo (limpieza) |
| Assets sin uso | `hero.png`, `react.svg`, `vite.svg`, `public/icons.svg` | Bajo |
| Peso del JS | ~460 kB (~145 kB gzip) | Medio (performance) |
| Sin code splitting | Todo se carga en el bundle inicial | Medio si crece el sitio |
| Sin tests | No hay suite de pruebas | Medio (regresiones) |

Mejoras sugeridas, en orden:

1. Completar enlaces y capturas reales.
2. Extraer las cifras del hero a `data/site.js` para eliminar duplicación.
3. Evaluar `LazyMotion` de Framer Motion y `React.lazy` para el slider/modal.
4. Evaluar protección anti-spam para EmailJS si aumenta el tráfico del formulario.
5. Incorporar tests de humo (Vitest + Testing Library) para slider, modal y
   copia de email.
6. Limpiar el legado cuando ya no se necesite como referencia.
