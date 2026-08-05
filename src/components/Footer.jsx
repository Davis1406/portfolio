import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="w-full py-gutter border-t border-outline-variant/30 px-margin-mobile md:px-margin-desktop bg-surface-container-low/50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-base">
        <div className="flex items-center gap-base">
          <span className="font-mono text-[12px] text-outline uppercase">Status:</span>
          <span className="flex items-center gap-2 font-mono text-[13px] text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {profile.status}
          </span>
        </div>
        <div className="font-mono text-[12px] text-on-surface-variant">
          {profile.version} © {profile.year} {profile.name}
        </div>
      </div>
    </footer>
  )
}
