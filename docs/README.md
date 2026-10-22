# Documentación — Portafolio de Renato Ramos

Documentación técnica del portafolio personal: una **single page application**
(SPA) de una sola página construida con React 19, Vite 8, Tailwind CSS v4 y
Framer Motion. No tiene backend ni router: todo el contenido vive en archivos de
datos dentro de `src/data/`.

## Índice

| Documento | Qué encontrarás |
| --- | --- |
| [arquitectura.md](./arquitectura.md) | Stack, árbol de render, capas, flujo de datos, estilos, build y legado. |
| [componentes.md](./componentes.md) | Catálogo de componentes con props, comportamiento y ejemplos de uso. |
| [datos.md](./datos.md) | Esquemas de `site`, `projects`, `experience` y `skills`; cómo editar el contenido. |
| [desarrollo.md](./desarrollo.md) | Entorno, scripts, convenciones, recetas, despliegue y resolución de problemas. |
| [accesibilidad-y-rendimiento.md](./accesibilidad-y-rendimiento.md) | Accesibilidad, teclado, movimiento reducido y decisiones de performance. |

## Resumen en 30 segundos

```text
index.html
└── src/main.jsx            # createRoot + globals.css
    └── src/App.jsx         # MotionConfig + fondo + navbar + secciones
        ├── NavbarFloating  # navegación fija con sección activa
        ├── Hero            # presentación y tarjeta 3D
        ├── Projects        # slider destacado + grid + modal de caso
        ├── Experience      # timeline profesional
        ├── Skills          # grupos con barras + toolbelt
        ├── Contact         # Formulario EmailJS, email copiable y redes
        └── Footer
```

- **Contenido** → `src/data/*.js` (no se toca JSX para cambiar textos).
- **Composición** → `src/components/sections/*.jsx`.
- **Reutilizables** → `src/components/ui`, `motion` e `interactive`.
- **Lógica reutilizable** → `src/hooks`.
- **Estilos** → `src/styles/globals.css` (tokens `@theme` de Tailwind v4).

## Dónde cambiar cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Nombre, rol, email, ubicación, redes, navegación | `src/data/site.js` |
| Proyectos, portadas, enlaces, año, destacados | `src/data/projects.js` |
| Experiencia, puestos, stack | `src/data/experience.js` |
| Skills, niveles y toolbelt | `src/data/skills.js` |
| Colores, tipografías, animaciones y utilidades CSS | `src/styles/globals.css` |
| SEO, título, fuentes y favicon | `index.html`, `public/favicon.svg` |
| Copys de cada sección | `src/components/sections/*.jsx` |

> ⚠️ **Pendiente de personalizar:** `src/data/site.js` todavía apunta a
> `https://github.com/` y `https://www.linkedin.com/` genéricos, y todos los
> proyectos tienen `links: {}`. Los botones de demo/repositorio se ocultan
> automáticamente mientras no exista un enlace real.
