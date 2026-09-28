import type { ReactNode } from 'react'

/**
 * The dark "hero" block used on offer cards: a near-black base with a
 * glowing violet accent (matching the brand palette) and a crisp divider
 * where it meets the card body. The orb sits free, straddling that seam
 * with no container disc behind it, dark hero above and light body below
 * showing straight through its transparent edges.
 */
export function HeroNotch({
  heightClass,
  avatarSize,
  orb,
  topLeft,
  topRight,
  badge,
}: {
  heightClass: string
  avatarSize: number
  orb: ReactNode
  topLeft?: ReactNode
  topRight?: ReactNode
  badge?: ReactNode
}) {
  const avatarHalf = avatarSize / 2

  return (
    <>
      <div className={`relative overflow-hidden border-b border-white/10 bg-ink ${heightClass}`}>
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-muted-violet/30 blur-2xl" />
        <div className="absolute -left-4 bottom-0 h-16 w-16 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="relative flex items-center justify-between p-2.5">
          {topLeft}
          {topRight}
        </div>
        {badge}
      </div>

      <div className="relative flex justify-center">
        <div className="absolute z-10" style={{ top: -avatarHalf, width: avatarSize, height: avatarSize }}>
          {orb}
        </div>
      </div>
    </>
  )
}
