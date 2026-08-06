import { useEffect, useMemo, useState } from 'react'
import { projects, filters } from '../data/projects'

function Tag({ children, tone = 'primary' }) {
  const colors =
    tone === 'secondary'
      ? 'bg-secondary/10 text-secondary border-secondary/30'
      : 'bg-primary/10 text-primary border-primary/30'
  return (
    <span className={`px-3 py-1 rounded-full font-mono text-[12px] font-bold border ${colors}`}>
      {children}
    </span>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article
      className={`${project.span} group relative overflow-hidden rounded-xl bg-surface-white border border-outline-variant/50 transition-all duration-500 hover:border-primary/50 hover:shadow-card flex flex-col cursor-pointer`}
      onClick={() => onOpen(project)}
    >
      {/* ── Top plate: tags ── */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-4 py-3 bg-surface-container/95 border-b border-outline-variant/40 shrink-0">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <Tag key={t} tone={i % 2 === 0 ? 'primary' : 'secondary'}>
              {t}
            </Tag>
          ))}
          {project.private && (
            <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-mono text-[12px] font-bold border border-outline/50 uppercase">
              Private
            </span>
          )}
        </div>
        <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors duration-300 shrink-0">
          open_in_new
        </span>
      </div>

      {/* ── Screenshot ── */}
      <div
        className="flex-1 bg-cover bg-center transition-all duration-700 group-hover:scale-[1.02] min-h-[160px]"
        style={{ backgroundImage: `url(${project.screenshot})` }}
        role="img"
        aria-label={project.title}
      />

      {/* ── Bottom plate: title + actions ── */}
      <div className="relative z-10 px-4 py-3 bg-surface-container/95 border-t border-outline-variant/40 shrink-0">
        <h2 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-300 leading-snug">
          {project.title}
        </h2>
        <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider mt-0.5">
          {project.subtitle}
        </p>
        <p className="font-body text-body-sm text-on-surface-variant mt-1 mb-3 line-clamp-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
          {project.description}
        </p>
        <div className="flex gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
          <span className="px-5 py-1.5 rounded bg-primary text-on-primary font-mono text-[11px] uppercase inline-flex items-center gap-1.5 hover:shadow-[0_4px_15px_rgba(230,57,70,0.3)] transition-shadow">
            <span className="material-symbols-outlined text-[14px]">zoom_in</span>
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
      className="fixed inset-0 z-[60] bg-ink-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-white rounded-xl max-w-5xl w-full overflow-hidden tech-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-12 bg-surface-muted flex items-center px-4 gap-2 border-b border-surface-container-high">
          <div className="w-3 h-3 rounded-full bg-error"></div>
          <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
          <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
          <div className="ml-4 font-mono text-[12px] text-on-surface-variant/70 truncate">
            {project.title.toLowerCase().replace(/ /g, '_')} — screenshot
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-on-surface-variant hover:text-primary transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="w-full max-h-[65vh] object-cover"
        />
        <div className="p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink-black">{project.title}</h3>
            <p className="font-body text-body-md text-on-surface-variant mt-1 max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
              {project.private && (
                <span className="px-3 py-1 rounded-full bg-ink-black text-surface-white font-mono text-[12px] border border-ink-black uppercase">
                  Private
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="px-6 py-2 rounded bg-primary text-on-primary font-mono text-[12px] uppercase hover:bg-primary-container transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.links.source && (
              <a
                href={project.links.source}
                className="px-6 py-2 rounded border border-outline text-on-surface font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">code</span>
                Source
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                className="px-6 py-2 rounded border border-outline text-on-surface font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors"
              >
                Docs
              </a>
            )}
            {project.links.audit && (
              <a
                href={project.links.audit}
                className="px-6 py-2 rounded border border-outline text-on-surface font-mono text-[12px] uppercase hover:border-primary hover:text-primary transition-colors"
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

      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(300px,auto)] pb-margin-desktop">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setSelected} />
        ))}
      </section>

      {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
