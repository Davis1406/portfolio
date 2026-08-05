import { useEffect, useRef, useState } from 'react'
import { profile, metrics } from '../data/profile'

function useCountUp(target, { duration = 1400, start = false } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 40 : 80
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span>
      {text}
      <span className="inline-block w-[3px] h-[0.9em] bg-primary align-middle animate-pulse ml-1"></span>
    </span>
  )
}

function ProfileImage() {
  return (
    <div className="relative max-w-[420px] mx-auto w-full">
      <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-2xl blur-2xl"></div>
      <div className="relative bg-surface-white rounded-2xl p-2.5 border border-surface-container-high tech-shadow">
        <div className="h-9 bg-surface-muted flex items-center px-4 gap-2 rounded-t-xl border-b border-surface-container-high">
          <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
          <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
          <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
          <div className="ml-4 font-mono text-[12px] text-on-surface-variant/70">
            profile_photo.jpeg
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/profile.jpeg"
            alt={`${profile.name} — Lead Data Engineer`}
            className="w-full aspect-square object-cover"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                Status: Online
              </p>
              <p className="font-display text-[15px] font-bold text-white">
                {profile.name}
              </p>
            </div>
            <span className="font-mono text-[11px] text-primary bg-primary/10 border border-primary/30 rounded-md px-2 py-1">
              {profile.location}
            </span>
          </div>
        </div>
      </div>
      <span className="absolute -top-2 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl"></span>
      <span className="absolute -top-2 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr"></span>
      <span className="absolute -bottom-2 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl"></span>
      <span className="absolute -bottom-2 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br"></span>
    </div>
  )
}

function MetricCard({ metric, start }) {
  const value = useCountUp(metric.value, { start })
  return (
    <div className="bg-surface-white p-8 rounded-xl border border-surface-container-high hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden tech-shadow">
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-surface-muted flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-2xl">{metric.icon}</span>
        </div>
        <div className="font-display text-4xl font-extrabold text-ink-black mb-2 group-hover:text-primary transition-colors tabular-nums">
          {value}
          {metric.suffix}
        </div>
        <div className="font-mono text-[12px] font-bold text-on-surface-variant uppercase tracking-wider">
          {metric.label}
        </div>
        <div className="font-body text-[14px] text-on-surface-variant mt-1">{metric.sub}</div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
    </div>
  )
}

export default function Home({ onNavigate }) {
  const [animate, setAnimate] = useState(false)
  const metricsRef = useRef(null)

  useEffect(() => {
    const el = metricsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="flex flex-col w-full relative z-10">
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center relative w-full mb-margin-desktop mt-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-gutter">
          <div className="flex-1 w-full space-y-6">
            <h1 className="font-display text-ink-black">
              <span className="block text-on-surface-variant text-2xl md:text-3xl font-bold tracking-tight">
                Hello, it's me
              </span>
              <span className="block text-4xl md:text-6xl font-extrabold tracking-[-0.02em] leading-tight mt-1">
                {profile.name}
              </span>
              <span className="block text-2xl md:text-3xl font-bold text-on-surface-variant tracking-tight mt-3">
                And I'm a{' '}
                <span className="text-primary">
                  <Typewriter words={profile.roles} />
                </span>
              </span>
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl pt-2">
              {profile.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('projects')}
                className="px-8 py-4 bg-primary text-on-primary font-mono text-[12px] font-bold uppercase tracking-wider rounded-lg hover:bg-primary-container transition-all duration-300 flex items-center gap-2 group"
              >
                View Projects
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-transparent border border-surface-container-high text-on-surface font-mono text-[12px] font-bold uppercase tracking-wider rounded-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
                Get in Touch
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 text-primary font-mono text-[12px] font-bold uppercase tracking-wider hover:underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">code</span>
                GitHub
              </a>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <ProfileImage />
          </div>
        </div>
      </section>

      <section className="w-full mb-margin-desktop relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-surface-container-high"></div>
          <h2 className="font-mono text-[12px] font-bold text-primary tracking-[0.3em] uppercase">
            System Metrics
          </h2>
          <div className="h-[1px] flex-1 bg-surface-container-high"></div>
        </div>
        <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {metrics.map((m) => (
            <MetricCard key={m.label} metric={m} start={animate} />
          ))}
        </div>
      </section>
    </div>
  )
}
