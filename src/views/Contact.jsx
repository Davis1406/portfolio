import { useState } from 'react'
import { profile } from '../data/profile'
import SocialIcon from '../components/SocialIcon'

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex items-center justify-between bg-surface-muted rounded p-2 border border-surface-container-high">
      <span className="font-mono text-[13px] text-on-surface truncate pr-2" id="email-text">
        {email}
      </span>
      <button
        onClick={copy}
        className={`text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container-high ${
          copied ? 'text-primary' : ''
        }`}
        title="Copy to clipboard"
      >
        <span className="material-symbols-outlined text-[18px]">
          {copied ? 'check' : 'content_copy'}
        </span>
      </button>
    </div>
  )
}

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      e.target.reset()
    }, 1500)
  }

  const inputClass =
    'bg-surface-muted border border-surface-container-high rounded-lg px-4 py-3 font-body text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/50 w-full'

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-160px)] pt-8">
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-gutter mb-margin-desktop">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-white rounded-xl p-8 border border-surface-container-high tech-shadow relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div>
              <h2 className="font-display text-headline-lg font-bold text-on-surface mb-2">
                Initiate
                <br />
                Connection
              </h2>
              <p className="font-body text-body-md text-on-surface-variant mb-8">
                System ready to receive incoming transmissions. Expected latency: &lt; 24 hours.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 border border-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <p className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">
                      Coordinates
                    </p>
                    <p className="font-body text-body-md text-on-surface">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 border border-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <p className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">
                      Direct Line
                    </p>
                    <p className="font-body text-body-md text-on-surface">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-muted flex items-center justify-center shrink-0 border border-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div className="w-full">
                    <p className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">
                      Comms Link
                    </p>
                    <CopyEmail email={profile.email} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-surface-container-high">
              <p className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider mb-4">
                External Networks
              </p>
              <div className="flex gap-4">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.name}
                    className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-on-surface-variant border border-surface-container-high hover:border-primary hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-8">
          <div className="bg-surface-white rounded-xl p-8 border border-surface-container-high tech-shadow relative">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-surface-container-high">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
              <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
              <span className="ml-4 font-mono text-[13px] text-on-surface-variant">
                ~/transmit_message.sh
              </span>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider"
                    htmlFor="name"
                  >
                    Identifier
                  </label>
                  <input className={inputClass} id="name" placeholder="John Doe" required type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider"
                    htmlFor="email"
                  >
                    Return Address
                  </label>
                  <input
                    className={inputClass}
                    id="email"
                    placeholder="john@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label
                  className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider"
                  htmlFor="subject"
                >
                  Protocol
                </label>
                <select className={`${inputClass} appearance-none cursor-pointer`} id="subject">
                  <option value="project">Project Inquiry</option>
                  <option value="hire">Employment Opportunity</option>
                  <option value="collab">Collaboration</option>
                  <option value="other">Other</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-[38px] text-on-surface-variant text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-mono text-[12px] text-on-surface-variant uppercase tracking-wider"
                  htmlFor="message"
                >
                  Payload
                </label>
                <textarea
                  className={`${inputClass} resize-none`}
                  id="message"
                  placeholder="Enter transmission data..."
                  required
                  rows="5"
                />
              </div>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span className="font-mono text-[11px]">E2E ENCRYPTED (SIMULATED)</span>
                </div>
                <button
                  className="bg-primary text-on-primary font-mono text-[12px] uppercase tracking-wider px-8 py-3 rounded-lg hover:bg-primary-container transition-all duration-300 flex items-center gap-2 group disabled:opacity-70"
                  disabled={sending}
                  type="submit"
                >
                  <span>{sending ? 'Processing...' : 'Initialize Transfer'}</span>
                  {sending ? (
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      send
                    </span>
                  )}
                </button>
              </div>
            </form>

            {sent && (
              <div className="absolute inset-0 bg-surface-white/95 backdrop-blur-md rounded-xl flex flex-col items-center justify-center z-10 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h3 className="font-display text-headline-md font-semibold text-on-surface mb-2">
                  Transmission Successful
                </h3>
                <p className="font-body text-body-md text-on-surface-variant text-center max-w-sm">
                  Your data packet has been received and is currently processing in the queue.
                </p>
                <button
                  className="mt-8 border border-primary text-primary font-mono text-[12px] uppercase px-6 py-2 rounded hover:bg-primary/10 transition-colors"
                  onClick={() => setSent(false)}
                >
                  Acknowledge
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
