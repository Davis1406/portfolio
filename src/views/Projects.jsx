import { useEffect, useMemo, useState } from 'react'
import { projects, filters } from '../data/projects'

function ProjectCard({ project, onOpen }) {
  const isWide = project.span.includes('col-span-8') || project.span.includes('col-span-12')

  /* ── Wide card: image left · content right ── */
  if (isWide) {
    return (
      <article
        className={`${project.span} group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container hover:border-primary/40 hover:shadow-[0_6px_32px_rgba(230,57,70,0.12)] transition-all duration-500 cursor-pointer`}
        onClick={() => onOpen(project)}
      >
        {/* Left: screenshot */}
        <div className="sm:w-2/5 shrink-0 overflow-hidden min-h-[200px] sm:min-h-0">
          <div
            className="w-full h-full min-h-[200px] bg-cover bg-top transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${project.screenshot})` }}
            role="img"
            aria-label={project.title}
          />
        </div>

        {/* Right: content */}
        <div className="flex-1 flex flex-col justify-between p-6 gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t, i) => (
              <span
                key={t}
                className={`px-3 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase border ${
                  i % 2 === 0
                    ? 'border-primary/40 text-primary'
                    : 'border-outline-variant/60 text-on-surface-variant'
                }`}
              >
                {t}
              </span>
            ))}
            {project.private && (
              <span className="px-3 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase border border-outline-variant/60 text-on-surface-variant">
                Private
              </span>
            )}
          </div>

          {/* Title + subtitle */}
          <div>
            <h2 className="font-display text-2xl font-bold text-on-surface leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h2>
            <p className="font-display text-[15px] font-semibold text-primary mt-1 leading-snug">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="font-body text-[14px] text-on-surface-variant leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
              {project.category.includes('web') ? 'View Site' : 'View Project'}
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </span>
            <span className="material-symbols-outlined text-outline-variant/60 group-hover:text-primary transition-colors duration-300 text-[20px]">
              open_in_new
            </span>
          </div>
        </div>
      </article>
    )
  }

  /* ── Narrow card: full-bleed image · title overlay at bottom ── */
  return (
    <article
      className={`${project.span} group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(230,57,70,0.15)] flex flex-col cursor-pointer min-h-[280px]`}
      onClick={() => onOpen(project)}
    >
      <div
        className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${project.screenshot})` }}
        role="img"
        aria-label={project.title}
      />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 p-3">
        {project.tags.map((t) => (
          <span key={t} className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-black/55 text-white/90 border border-white/15 backdrop-blur-sm">
            {t}
          </span>
        ))}
        {project.private && (
          <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-primary/75 text-white border border-primary/30 backdrop-blur-sm">
            Private
          </span>
        )}
      </div>

      <span className="absolute top-3 right-3 z-10 material-symbols-outlined text-white/50 group-hover:text-primary transition-colors duration-300 text-[20px]">
        open_in_new
      </span>

      {/* Bottom title */}
      <div className="relative z-10 mt-auto p-4">
        <h2 className="font-display text-[15px] font-bold text-white leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {project.title}
        </h2>
        <p className="font-mono text-[10px] text-white/55 uppercase tracking-widest mt-0.5">
          {project.subtitle}
        </p>
        <p className="font-body text-[12px] text-white/75 mt-2 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {project.description}
        </p>
        <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white font-mono text-[10px] font-bold uppercase">
            <span className="material-symbols-outlined text-[13px]">zoom_in</span>
            View
          </span>
        </div>
      </div>
    </article>
  )
}

function Lightbox({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 md:p-6"
      style={{ animation: 'fadeIn 0.2s ease-out both' }}
      onClick={onClose}
    >
      <div
        className="bg-[#16181c] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="h-11 bg-[#1e2026] flex items-center px-4 gap-2 border-b border-white/10">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity" title="Close" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <div className="ml-4 font-mono text-[12px] text-white/40 truncate">
            {project.title.toLowerCase().replace(/ /g, '_')} — screenshot
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Screenshot */}
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="w-full max-h-[60vh] object-cover object-top"
        />

        {/* Info bar */}
        <div className="p-5 flex flex-col md:flex-row gap-4 md:items-start justify-between border-t border-white/10">
          <div>
            <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
            <p className="font-body text-[14px] text-white/60 mt-1 max-w-2xl leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((t, i) => (
                <span key={t} className={`px-3 py-0.5 rounded-full font-mono text-[11px] font-bold border ${i % 2 === 0 ? 'bg-primary/15 text-primary border-primary/30' : 'bg-white/10 text-white/70 border-white/20'}`}>
                  {t}
                </span>
              ))}
              {project.private && (
                <span className="px-3 py-0.5 rounded-full bg-primary/20 text-primary font-mono text-[11px] font-bold border border-primary/30 uppercase">
                  Private
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded bg-primary text-on-primary font-mono text-[12px] uppercase hover:bg-primary-container transition-colors inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {project.category.includes('web') ? 'language' : 'open_in_new'}
                </span>
                {project.category.includes('web') ? 'View Site' : 'View Project'}
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-white/20 text-white/70 font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[15px]">code</span>
                Source
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-white/20 text-white/70 font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors"
              >
                Docs
              </a>
            )}
            {project.links.audit && (
              <a
                href={project.links.audit}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-white/20 text-white/70 font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors"
              >
                Audit Report
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category.includes(filter)),
    [filter]
  )

  return (
    <div className="flex flex-col w-full gap-margin-desktop">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 blur-[120px] -z-10"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-secondary-container/10 blur-[150px] -z-10"></div>

      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-gutter pt-8">
        <div className="flex flex-col gap-base max-w-2xl">
          <div className="flex items-center gap-base mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#E63946]"></span>
            <span className="font-mono text-[12px] uppercase tracking-widest text-primary">
              Portfolio Database
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-display-lg font-extrabold text-on-surface tracking-[-0.02em] relative">
            System <span className="text-primary">Architecture</span>
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-transparent rounded-full opacity-50"></div>
          </h1>
          <p className="font-body text-lg text-on-surface-variant mt-4">
            A curated selection of deployed nodes. Explore active instances, technical
            documentation, and underlying frameworks driving interactive experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 md:mt-0" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full font-mono text-[12px] uppercase transition-all duration-300 ${
                  active
                    ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(230,57,70,0.15)]'
                    : 'bg-surface-white text-on-surface-variant border border-outline-variant/50 hover:text-primary hover:border-primary/50'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(340px,auto)] pb-margin-desktop">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setSelected} />
        ))}
      </section>

      {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
