import { useEffect, useRef, useState } from 'react'
import { profile, metrics } from '../data/profile'
import { terminalLines } from '../data/skills'

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

function Terminal() {
  const [shown, setShown] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const timers = []
    terminalLines.forEach((line, i) => {
      timers.push(setTimeout(() => setShown(i + 1), 400 + i * 260))
    })
    timers.push(setTimeout(() => setCursor(false), 400 + terminalLines.length * 260))
    const blink = setInterval(() => setCursor((c) => !c), 600)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(blink)
    }
  }, [])

  const renderLine = (line, i) => {
    if (line.type === 'spacer') return <div key={i} className="mt-3"></div>
    if (line.type === 'comment')
      return (
        <div key={i} className="text-on-surface-variant">
          {line.text}
        </div>
      )
    if (line.type === 'primary')
      return (
        <div key={i} className="text-primary">
          {line.text}
        </div>
      )
    if (line.type === 'cmd')
      return (
        <div key={i} className="mt-3">
          <span className="text-primary font-bold">{line.text.split('$')[0]}</span>
          <span>$</span>
          <span className="text-ink-black">{line.text.split('$')[1]}</span>
        </div>
      )
    if (line.type === 'json')
      return (
        <div key={i} className="mt-1 text-on-surface-variant whitespace-pre leading-relaxed">
          {line.text}
        </div>
      )
    return (
      <div key={i} className="mt-1 text-ink-black">
        {line.text}
      </div>
    )
  }

  return (
    <div className="w-full bg-surface-white rounded-xl overflow-hidden border border-surface-container-high shadow-sm">
      <div className="h-10 bg-surface-muted flex items-center px-4 gap-2 border-b border-surface-container-high">
        <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
        <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
        <div className="w-3 h-3 rounded-full bg-surface-container-highest border border-outline/20"></div>
        <div className="ml-4 font-mono text-[12px] text-on-surface-variant/70">
          core_sequence.sh
        </div>
      </div>
      <div className="p-6 font-mono text-[14px] text-ink-black h-[320px] overflow-y-auto bg-surface-bright">
        {terminalLines.slice(0, shown).map(renderLine)}
        {cursor && (
          <span className="inline-block w-2 h-4 bg-primary align-middle animate-pulse"></span>
        )}
      </div>
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
      <section className="min-h-[819px] flex flex-col justify-center relative w-full mb-margin-desktop mt-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-gutter">
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-muted rounded-full border border-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-primary absolute"></span>
              <span className="font-mono text-[12px] font-bold text-primary uppercase tracking-widest ml-2">
                System Online // v2.1.0
              </span>
            </div>
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
            <Terminal />
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
