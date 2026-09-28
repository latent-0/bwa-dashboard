import type { ReactNode } from 'react'

/**
 * The dark gradient "hero" block used on offer cards, molded around the
 * avatar circle with a concave notch (like a physical card with a bite taken
 * out) instead of the circle just floating on a straight seam. The notch is
 * built from two small quarter-circle "fillets": each is a radial-gradient
 * square whose curved edge is transparent (revealing the hero underneath)
 * and whose straight portion is card-colored, so the hero's edge appears to
 * curve smoothly into the circle instead of meeting it at a hard corner.
 */
export function HeroNotch({
  heightClass,
  avatarSize,
  filletSize,
  initial,
  topLeft,
  topRight,
  badge,
}: {
  heightClass: string
  avatarSize: number
  filletSize: number
  initial: string
  topLeft?: ReactNode
  topRight?: ReactNode
  badge?: ReactNode
}) {
  const half = avatarSize / 2

  return (
    <>
      <div className={`relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-burgundy-700 ${heightClass}`}>
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
          className="absolute z-10"
          style={{
            left: `calc(50% - ${half + filletSize}px)`,
            top: -filletSize,
            width: filletSize,
            height: filletSize,
            background: `radial-gradient(circle at bottom right, transparent ${filletSize}px, var(--color-card) ${filletSize}px)`,
          }}
        />
        <div
          className="absolute z-10"
          style={{
            left: `calc(50% + ${half}px)`,
            top: -filletSize,
            width: filletSize,
            height: filletSize,
            background: `radial-gradient(circle at bottom left, transparent ${filletSize}px, var(--color-card) ${filletSize}px)`,
          }}
        />
        <div
          className="absolute z-20 flex items-center justify-center rounded-full border-4 border-card bg-brand-50 font-heading font-semibold text-brand-700 shadow-md"
          style={{ top: -half, width: avatarSize, height: avatarSize, fontSize: avatarSize * 0.34 }}
        >
          {initial}
        </div>
      </div>
    </>
  )
}
