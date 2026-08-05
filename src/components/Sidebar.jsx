import { profile } from '../data/profile'

export default function Sidebar({ onShare }) {
  const logo = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#E63946" />
      <path
        d="M13 15l5 5-5 5M21 25h6"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-surface-white/80 backdrop-blur-xl border-r border-outline-variant/30 z-50 flex flex-col items-center py-base">
      <div className="mb-10 mt-4" title={profile.name}>
        {logo}
      </div>
      <div className="flex-1 flex flex-col items-center gap-gutter">
        <button
          type="button"
          className="text-on-surface-variant hover:text-primary transition-all"
          title="Terminal"
        >
          <span className="material-symbols-outlined text-[28px]">terminal</span>
        </button>
        <button
          type="button"
          className="text-on-surface-variant hover:text-primary transition-all"
          title="Copy link"
          onClick={onShare}
        >
          <span className="material-symbols-outlined text-[28px]">link</span>
        </button>
        <button
          type="button"
          className="text-on-surface-variant hover:text-primary transition-all"
          title="Share"
          onClick={onShare}
        >
          <span className="material-symbols-outlined text-[28px]">share</span>
        </button>
      </div>
      <div className="mt-auto pb-gutter flex flex-col gap-base items-center">
        <div className="w-[1px] h-24 bg-gradient-to-t from-primary to-transparent opacity-30"></div>
        <span
          className="vertical-text text-primary opacity-70 tracking-[0.2em] font-mono text-[11px] font-bold uppercase"
          style={{ transform: 'rotate(180deg)' }}
        >
          SOCIAL
        </span>
      </div>
    </aside>
  )
}
