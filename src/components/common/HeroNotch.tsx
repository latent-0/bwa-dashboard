import type { ReactNode } from 'react'

/**
 * The dark gradient "hero" block used on offer cards. A larger "socket" disc
 * in the card's own background color punches a clean circular gap in the
 * hero at the seam (simple circle-over-rectangle overlap, so the edges stay
 * crisp with no gradient-masking artifacts), and the smaller avatar badge
 * sits centered on top of it with its own ring and shadow so it clearly
 * reads as a detached element rather than a flat part of the card.
 */
export function HeroNotch({
  heightClass,
  avatarSize,
  initial,
  topLeft,
  topRight,
  badge,
}: {
  heightClass: string
  avatarSize: number
  initial: string
  topLeft?: ReactNode
  topRight?: ReactNode
  badge?: ReactNode
}) {
  const socketSize = avatarSize + Math.max(14, avatarSize * 0.28)
  const socketHalf = socketSize / 2
  const avatarHalf = avatarSize / 2

  return (
    <>
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-burgundy-700 ${heightClass}`}
      >
        <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-burgundy-400/30 blur-xl" />
        <div className="absolute -left-4 bottom-0 h-16 w-16 rounded-full bg-brand-300/20 blur-xl" />
        <div className="relative flex items-center justify-between p-2.5">
          {topLeft}
          {topRight}
        </div>
        {badge}
      </div>

      <div className="relative flex justify-center">
        <div
          className="absolute rounded-full bg-card shadow-[0_6px_16px_-4px_rgba(15,23,42,0.25)]"
          style={{ top: -socketHalf, width: socketSize, height: socketSize }}
        />
        <div
          className="absolute z-10 flex items-center justify-center rounded-full border-4 border-card bg-brand-50 font-heading font-semibold text-brand-700 shadow-md ring-1 ring-black/5"
          style={{ top: -avatarHalf, width: avatarSize, height: avatarSize, fontSize: avatarSize * 0.34 }}
        >
          {initial}
        </div>
      </div>
    </>
  )
}
