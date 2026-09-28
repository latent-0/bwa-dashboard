/**
 * A lightweight, CSS-only stand-in for the real WebGL Orb, used on the dense
 * offer-card grid. Browsers cap simultaneous WebGL contexts (we blew past it
 * rendering 24+ real Three.js orbs at once, silently losing most of them), so
 * the grid gets this cheap animated gradient instead. Clicking it opens the
 * same Assistant dialog, which shows the real orb.
 */
export function AgentOrbLite({ size, onClick, title = 'Ask the assistant' }: { size: number; onClick: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="group relative shrink-0 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 34% 28%, #f4ecff 0%, #c09dfd 16%, #7a2dfd 42%, #5f01fb 68%, #2b0173 100%)',
        filter: 'drop-shadow(0 4px 14px rgba(95,1,251,0.5))',
      }}
    />
  )
}
