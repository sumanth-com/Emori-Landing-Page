export function AmbientOrbs({ variant = 'warm' }: { variant?: 'warm' | 'dark' | 'gold' }) {
  return (
    <div className={`ambient-orbs ambient-orbs--${variant}`} aria-hidden="true">
      <span className="ambient-orbs__orb ambient-orbs__orb--a" />
      <span className="ambient-orbs__orb ambient-orbs__orb--b" />
      <span className="ambient-orbs__orb ambient-orbs__orb--c" />
    </div>
  )
}
