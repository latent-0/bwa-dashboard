import type { ReactNode } from 'react'

/**
 * Two genuinely separate cards (a dark hero on top, the content card below)
 * with a real gap between them, each with a concave bite cut out of the
 * edge that faces the gap. A plain radial-gradient CSS mask carves each
 * notch: since it's just a circle (not a square trying to blend into one),
 * there is no tangent-matching to get wrong and no seam artifacts. The orb
 * sits centered in the gap, nested into the opening the two notches form
 * together.
 */
export function SplitOrbCard({
  heroHeightPx,
  avatarSize,
  gapPx = 20,
  orb,
  topLeft,
  topRight,
  badge,
  children,
}: {
  heroHeightPx: number
  avatarSize: number
  gapPx?: number
  orb: ReactNode
  topLeft?: ReactNode
  topRight?: ReactNode
  badge?: ReactNode
  children: ReactNode
}) {
  const avatarHalf = avatarSize / 2
  const notchRadius = avatarHalf + Math.max(10, avatarSize * 0.18)
  const feather = Math.max(14, avatarSize * 0.3)
  const notchMask = (edge: '0%' | '100%') =>
    `radial-gradient(circle at 50% ${edge}, transparent ${Math.max(0, notchRadius - feather * 0.4)}px, black ${notchRadius + feather}px)`

  return (
    <div className="relative flex flex-col" style={{ gap: gapPx }}>
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-ink shadow-sm"
        style={{
          height: heroHeightPx,
          maskImage: notchMask('100%'),
          WebkitMaskImage: notchMask('100%'),
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-muted-violet/30 blur-2xl" />
        <div className="absolute -left-4 bottom-0 h-16 w-16 rounded-full bg-brand-500/20 blur-2xl" />
        <div className="relative flex items-center justify-between p-2.5">
          {topLeft}
          {topRight}
        </div>
        {badge}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        style={{ maskImage: notchMask('0%'), WebkitMaskImage: notchMask('0%') }}
      >
        <div style={{ paddingTop: avatarHalf + 12 }}>{children}</div>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
        style={{ top: heroHeightPx + gapPx / 2 - avatarHalf, width: avatarSize, height: avatarSize }}
      >
        <div className="pointer-events-auto h-full w-full">{orb}</div>
      </div>
    </div>
  )
}
