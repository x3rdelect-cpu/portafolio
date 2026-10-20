import { ArrowUp } from 'lucide-react'
import { site } from '@/data/site'

/**
 * Footer mínimo con atribución y acceso rápido al inicio.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-center text-xs text-slate-500 sm:text-left">
          © {year} {site.name}. Diseñado y construido con intención.
        </p>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] tracking-wide text-slate-600 sm:inline">
            React · Tailwind · Framer Motion
          </span>

          <a
            href="#inicio"
            aria-label="Volver arriba"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
