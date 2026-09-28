import type { ReactNode } from 'react'

/**
 * The dark "hero" block used on offer cards: a near-black base with a
 * glowing violet accent (matching the brand palette), a crisp divider where
 * it meets the card body, and a socket disc that punches a clean circular
 * gap at the seam for whatever orb/badge sits on top.
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
  const socketSize = avatarSize + Math.max(14, avatarSize * 0.28)
  const socketHalf = socketSize / 2
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
        <div
          className="absolute rounded-full bg-card shadow-[0_6px_16px_-4px_rgba(11,13,27,0.35)]"
          style={{ top: -socketHalf, width: socketSize, height: socketSize }}
        />
        <div className="absolute z-10" style={{ top: -avatarHalf, width: avatarSize, height: avatarSize }}>
          {orb}
        </div>
      </div>
    </>
  )
}
