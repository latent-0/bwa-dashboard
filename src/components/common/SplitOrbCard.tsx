import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Two genuinely separate cards (a dark hero on top, the content card below)
 * with a real gap between them, each with a concave bite cut out of the
 * edge that faces the gap.
 *
 * A plain circular cutout meets the flat edge at a right angle (the
 * circle's tangent goes vertical exactly where the edge is horizontal),
 * which reads as a sharp corner no matter how it's feathered. Each notch is
 * instead a single closed SVG path: flat edge -> small fillet arc -> main
 * bite arc -> mirrored fillet arc -> flat edge, where every arc-to-arc and
 * arc-to-line junction is built to share a tangent (the classic
 * line-to-circle fillet construction), so the boundary curves continuously
 * with no kink anywhere. Since that path needs real pixel dimensions, the
 * card measures its own width with a ResizeObserver.
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
  const filletRadius = notchRadius * 0.42

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [bodyHeight, setBodyHeight] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current
    const bodyEl = bodyRef.current
    if (!wrapperEl || !bodyEl) return
    const ro = new ResizeObserver(() => {
      setWidth(wrapperEl.getBoundingClientRect().width)
      setBodyHeight(bodyEl.getBoundingClientRect().height)
    })
    ro.observe(wrapperEl)
    ro.observe(bodyEl)
    return () => ro.disconnect()
  }, [])

  const heroMask = buildNotchMask(width, heroHeightPx, 'bottom', notchRadius, filletRadius)
  const bodyMask = buildNotchMask(width, bodyHeight, 'top', notchRadius, filletRadius)

  return (
    <div ref={wrapperRef} className="relative flex flex-col" style={{ gap: gapPx }}>
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-ink shadow-sm"
        style={{
          height: heroHeightPx,
          maskImage: heroMask,
          WebkitMaskImage: heroMask,
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
        ref={bodyRef}
        className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        style={{ maskImage: bodyMask, WebkitMaskImage: bodyMask }}
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

type Point = { x: number; y: number }

function arcSweepFlag(from: Point, to: Point, center: Point): 0 | 1 {
  const cross = (from.x - center.x) * (to.y - center.y) - (from.y - center.y) * (to.x - center.x)
  return cross > 0 ? 1 : 0
}

/**
 * Builds a mask-image data URL that's opaque everywhere except a smooth
 * fillet-arc-fillet notch cut into the given edge, centered horizontally.
 */
function buildNotchMask(
  width: number,
  height: number,
  edge: 'top' | 'bottom',
  R: number,
  r: number,
): string | undefined {
  if (width <= 0 || height <= 0) return undefined

  const cx = width / 2
  const cy = edge === 'bottom' ? height : 0
  const dir = edge === 'bottom' ? -1 : 1
  const x2 = Math.sqrt(Math.max(0, R * R - 2 * R * r))
  const scale = R / (R - r)

  const start: Point = { x: cx - x2, y: cy }
  const end: Point = { x: cx + x2, y: cy }
  const filletCenterLeft: Point = { x: cx - x2, y: cy + dir * r }
  const filletCenterRight: Point = { x: cx + x2, y: cy + dir * r }
  const mainCenter: Point = { x: cx, y: cy }
  const tangentLeft: Point = {
    x: cx + (filletCenterLeft.x - cx) * scale,
    y: cy + (filletCenterLeft.y - cy) * scale,
  }
  const tangentRight: Point = {
    x: cx + (filletCenterRight.x - cx) * scale,
    y: cy + (filletCenterRight.y - cy) * scale,
  }

  const sweep1 = arcSweepFlag(start, tangentLeft, filletCenterLeft)
  const sweep2 = arcSweepFlag(tangentLeft, tangentRight, mainCenter)
  const sweep3 = arcSweepFlag(tangentRight, end, filletCenterRight)

  const path = [
    `M ${start.x} ${start.y}`,
    `A ${r} ${r} 0 0 ${sweep1} ${tangentLeft.x} ${tangentLeft.y}`,
    `A ${R} ${R} 0 0 ${sweep2} ${tangentRight.x} ${tangentRight.y}`,
    `A ${r} ${r} 0 0 ${sweep3} ${end.x} ${end.y}`,
    `L ${start.x} ${start.y}`,
    'Z',
  ].join(' ')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="white"/><path d="${path}" fill="black"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}
