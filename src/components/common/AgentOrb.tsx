import { Sparkles } from 'lucide-react'

export function AgentOrb({
  size,
  onClick,
  title = 'Ask the assistant',
}: {
  size: number
  onClick: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="group relative flex shrink-0 items-center justify-center rounded-full border-4 border-card transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 34% 28%, #f4ecff 0%, #c09dfd 16%, #7a2dfd 42%, #5f01fb 68%, #2b0173 100%)',
        boxShadow: '0 0 0 1px rgba(95,1,251,0.15), 0 8px 20px -4px rgba(95,1,251,0.55)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          boxShadow: '0 0 22px 6px rgba(95,1,251,0.45)',
        }}
      />
      <Sparkles
        className="relative text-white/90 drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
        style={{ width: size * 0.32, height: size * 0.32 }}
      />
    </button>
  )
}
