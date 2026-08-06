import { useEffect, useMemo, useState } from 'react'
import { radarAxes, radarValues, competence, skillBars, activeStack, terminalLines } from '../data/skills'
import { githubConfig, fetchPublicContributions } from '../data/github'

const angleOf = (index, count) => (-90 + index * (360 / count)) * (Math.PI / 180)

function RadarChart({ axes, values }) {
  const [hovered, setHovered] = useState(null)
  const cx = 150
  const cy = 118
  const maxR = 78
  const labelR = 88

  const dataPoints = useMemo(
    () =>
      axes.map((axis, i) => {
        const angle = angleOf(i, axes.length)
        const r = (values[i] / 100) * maxR
        return {
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          value: values[i],
          axis,
        }
      }),
    [axes, values]
  )

  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')
  const gridLevels = [0.25, 0.5, 0.75, 1]

  const outerPoints = axes.map((_, i) => {
    const angle = angleOf(i, axes.length)
    return { x: cx + maxR * Math.cos(angle), y: cy + maxR * Math.sin(angle) }
  })

  return (
    <svg viewBox="0 0 300 240" className="w-full h-full" role="img" aria-label="Domain expertise radar chart">
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={outerPoints
            .map((p) => {
              const x = cx + (p.x - cx) * level
              const y = cy + (p.y - cy) * level
              return `${x},${y}`
            })
            .join(' ')}
          fill="none"
          stroke="var(--outline-variant)"
          strokeWidth="1"
          opacity={0.4 + level * 0.18}
        />
      ))}
      {outerPoints.map((p, i) => (
        <line
          key={`axis-${i}`}
          x1={cx}
          y1={cy}
          x2={cx + (p.x - cx) * 1.14}
          y2={cy + (p.y - cy) * 1.14}
          stroke="var(--outline-variant)"
          strokeWidth="1"
        />
      ))}
      <circle cx={cx} cy={cy} r="3" fill="var(--outline-variant)" />

      <polygon points={polygon} fill="#E63946" opacity="0.12" />
      <polygon
        points={polygon}
        fill="none"
        stroke="#E63946"
        strokeWidth="2"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(230,57,70,0.4)]"
      />

      {dataPoints.map((p, i) => {
        const r = (p.value / 100) * maxR
        const vx = cx + (r - 14) * Math.cos(angleOf(i, axes.length))
        const vy = cy + (r - 14) * Math.sin(angleOf(i, axes.length))
        return (
          <g key={i} className="cursor-pointer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hovered === i ? 7 : 4.5}
              fill={hovered === i ? '#db313f' : '#E63946'}
              className="transition-all duration-200"
            />
            <text
              x={vx}
              y={vy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="8.5"
              fontWeight="700"
              fill={hovered === i ? '#E63946' : 'var(--on-surface-variant)'}
              className="select-none"
            >
              {p.value}%
            </text>
          </g>
        )
      })}

      {axes.map((axis, i) => {
        const angle = angleOf(i, axes.length)
        const tx = cx + labelR * Math.cos(angle)
        const ty = cy + labelR * Math.sin(angle)
        const anchor =
          Math.abs(Math.cos(angle)) < 0.3 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'
        return (
          <text
            key={`label-${i}`}
            x={tx}
            y={ty}
            dominantBaseline="middle"
            textAnchor={anchor}
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fontWeight="700"
            fill={hovered === i ? '#E63946' : 'var(--on-surface-variant)'}
            className="cursor-pointer select-none"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {axis}
          </text>
        )
      })}
    </svg>
  )
}

function CompetenceRing({ value }) {
  const r = 45
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface-container-highest)" strokeWidth="4" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#E63946"
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(230,57,70,0.5)] transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="font-display text-headline-lg font-bold text-on-surface">
        {value}
        <span className="text-primary text-headline-md">%</span>
      </div>
    </div>
  )
}

function intensityFor(count) {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count <= 4) return 3
  return 4
}

function Heatmap({ days = 90 }) {
  const [counts, setCounts] = useState(null)
  const [status, setStatus] = useState('loading')
  const [fetchedAt, setFetchedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPublicContributions(githubConfig.username)
      .then((data) => {
        if (cancelled) return
        setCounts(data.counts)
        setFetchedAt(data.fetchedAt)
        setStatus('live')
      })
      .catch(() => {
        if (!cancelled) setStatus('fallback')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const cells = useMemo(() => {
    const weeks = Math.ceil(days / 7)
    const today = new Date()
    const out = []
    let seed = 42
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648
      return seed / 2147483648
    }
    for (let col = 0; col < weeks; col++) {
      for (let row = 0; row < 7; row++) {
        const day = new Date(today)
        day.setDate(today.getDate() - ((weeks - 1 - col) * 7 + (6 - row)))
        const key = day.toISOString().slice(0, 10)
        let intensity
        if (counts) {
          intensity = intensityFor(counts[key] || 0)
        } else {
          intensity = rand() > 0.3 ? Math.floor(rand() * 5) : 0
        }
        out.push({ row, col, key, intensity })
      }
    }
    return out
  }, [days, counts])

  const minutesAgo = fetchedAt ? Math.max(0, Math.round((Date.now() - fetchedAt) / 60000)) : null

  const statusChip =
    status === 'loading' ? (
      <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-on-surface-variant uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-outline animate-pulse"></span>
        Syncing GitHub…
      </span>
    ) : status === 'live' ? (
      <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-primary uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_6px_#E63946]"></span>
        Live · public pushes · updated {minutesAgo}m ago
      </span>
    ) : (
      <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-on-surface-variant uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
        Simulated · API rate-limited
      </span>
    )

  const colors = [
    'bg-surface-container border-outline-variant/30',
    'bg-primary-fixed border-primary-fixed/60',
    'bg-primary-fixed-dim border-primary-fixed-dim/60',
    'bg-primary border-primary',
    'bg-surface-tint border-surface-tint shadow-[0_0_5px_rgba(187,21,44,0.5)]',
  ]

  return (
    <div>
      <div className="overflow-x-auto pb-4">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-max">
          {cells.map((c, i) => (
            <div
              key={`${c.key}-${i}`}
              title={c.key + (counts ? ` — ${counts[c.key] || 0} commits` : '')}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border transition-colors hover:border-primary-container cursor-pointer hover:scale-125 ${colors[c.intensity]}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/30 pt-3">
        {statusChip}
        <span className="font-mono text-[11px] text-on-surface-variant">
          {counts ? 'Fetched from GitHub API' : 'Deterministic placeholder'}
        </span>
      </div>
    </div>
  )
}

function Terminal({ lines }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= lines.length) return
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 80)
    return () => clearTimeout(t)
  }, [visible, lines.length])

  return (
    <div className="font-mono text-[12px] leading-relaxed overflow-y-auto max-h-[340px] pr-1 space-y-0.5 scrollbar-thin">
      {lines.slice(0, visible).map((line, i) => {
        if (line.type === 'spacer') return <div key={i} className="h-2" />
        if (line.type === 'comment')
          return (
            <div key={i} className="text-on-surface-variant opacity-60">
              {line.text}
            </div>
          )
        if (line.type === 'primary')
          return (
            <div key={i} className="text-primary font-bold">
              {line.text}
            </div>
          )
        if (line.type === 'cmd')
          return (
            <div key={i} className="text-[#4ade80]">
              {line.text}
            </div>
          )
        if (line.type === 'json') {
          return (
            <pre key={i} className="text-[11px] text-on-surface-variant whitespace-pre-wrap break-all leading-relaxed">
              {line.text}
            </pre>
          )
        }
        return (
          <div key={i} className="text-on-surface">
            {line.text}
          </div>
        )
      })}
      {visible < lines.length && (
        <span className="inline-block w-2 h-3.5 bg-primary animate-pulse align-middle" />
      )}
    </div>
  )
}

export default function Skills({ onNavigate }) {
  return (
    <div className="flex flex-col w-full gap-gutter py-8">
      <section className="relative w-full rounded-2xl bg-surface-container-lowest shadow-xl overflow-hidden p-6 md:p-margin-desktop border border-outline-variant/50">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #ff9b92 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffdad8 0%, transparent 50%)',
          }}
        ></div>
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#e4bebc 1px, transparent 1px), linear-gradient(90deg, #e4bebc 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-gutter items-start justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(230,57,70,0.6)]"></span>
              <span className="font-mono text-[12px] font-bold text-primary tracking-widest uppercase">
                System Status: Optimal
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-headline-xl font-extrabold text-on-surface mb-4 leading-tight tracking-[-0.02em]">
              Technical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                Proficiency
              </span>
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-xl">
              Real-time telemetry of engineering capabilities, language fluency, and architectural
              expertise. Data aggregated across professional deployments and independent research.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="font-mono text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">
              Global Competence
            </div>
            <CompetenceRing value={competence} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full">
        <section className="lg:col-span-8 bg-surface-container rounded-xl p-gutter tech-shadow border border-outline-variant/50 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="font-display text-headline-md font-semibold text-on-surface">
              Domain Expertise Vector
            </h2>
            <span className="font-mono text-[12px] text-on-surface-variant hidden md:inline">
              hover nodes
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="relative w-full max-w-[380px] aspect-square mx-auto">
              <RadarChart axes={radarAxes} values={radarValues} />
            </div>
            <div className="flex-1 flex flex-col gap-6 w-full">
              {skillBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-[14px] text-on-surface">{bar.label}</span>
                    <span className="font-mono text-[12px] font-bold text-primary">{bar.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-container shadow-[0_0_10px_rgba(230,57,70,0.5)] transition-all duration-1000"
                      style={{ width: `${bar.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-gutter tech-shadow border border-outline-variant/50 flex flex-col relative group hover:border-primary/30 transition-colors duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[64px] text-primary">code_blocks</span>
          </div>
          <h2 className="font-display text-headline-md font-semibold text-on-surface mb-6 relative z-10">
            Active Stack
          </h2>
          <div className="flex flex-col gap-4 relative z-10 flex-1">
            {activeStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-container border border-outline-variant/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center font-bold text-[13px]"
                    style={{
                      background: `${tech.color}20`,
                      color: tech.color,
                    }}
                  >
                    {tech.initials}
                  </div>
                  <span className="font-body text-body-md text-on-surface">{tech.name}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-on-surface-variant px-2 py-1 bg-surface-white rounded border border-outline-variant/20">
                  {tech.level}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate && onNavigate('projects')}
            className="mt-6 w-full py-3 px-4 rounded-lg border border-primary text-primary font-mono text-[12px] font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-[0_0_10px_rgba(230,57,70,0.1)] hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]"
          >
            View Full Arsenal
          </button>
        </section>

        {/* core_sequence.sh + Commit Frequency Matrix — side by side */}
        <section className="lg:col-span-6 bg-surface-container-lowest rounded-xl tech-shadow border border-outline-variant/50 flex flex-col overflow-hidden">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-container border-b border-outline-variant/40 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F]"></span>
            <span className="ml-2 font-mono text-[12px] text-on-surface-variant">core_sequence.sh</span>
          </div>
          <div className="flex-1 p-gutter bg-surface-container-lowest">
            <Terminal lines={terminalLines} />
          </div>
        </section>

        <section className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-gutter tech-shadow border border-outline-variant/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h2 className="font-display text-headline-md font-semibold text-on-surface mb-2">
                Commit Frequency Matrix
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Last 90 days of real GitHub deployment activity — public push events.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-on-surface-variant">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-surface-container border border-outline-variant/30"></div>
                <div className="w-3 h-3 rounded-sm bg-primary-fixed border border-primary-fixed/60"></div>
                <div className="w-3 h-3 rounded-sm bg-primary-fixed-dim border border-primary-fixed-dim/60"></div>
                <div className="w-3 h-3 rounded-sm bg-primary border border-primary"></div>
                <div className="w-3 h-3 rounded-sm bg-surface-tint shadow-[0_0_5px_rgba(187,21,44,0.5)]"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          <Heatmap />
        </section>
      </div>
    </div>
  )
}
