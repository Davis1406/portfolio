import { useState } from 'react'

const NAV = [
  { key: 'home', label: 'Home' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'contact', label: 'Contact' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  )

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 rounded-full bg-surface-muted border border-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="material-symbols-outlined text-[18px]">
        {dark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}

export default function Header({ active, onNavigate }) {
  return (
    <header className="fixed top-0 left-20 right-0 h-20 bg-surface/95 z-40 flex items-center justify-between px-margin-mobile md:px-margin-desktop border-b border-outline-variant/30">
      <nav className="flex items-center gap-6 md:gap-10 h-full">
        {NAV.map((item) => {
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`transition-all uppercase tracking-widest py-2 font-mono text-[13px] md:text-label-mono ${
                isActive
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="flex items-center gap-gutter">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(230,57,70,0.25)]">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  )
}
