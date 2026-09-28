import { Orb } from '@/components/ui/orb'

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
      className="group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-card transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        width: size,
        height: size,
        boxShadow: '0 0 0 1px rgba(95,1,251,0.15), 0 8px 20px -4px rgba(95,1,251,0.55)',
      }}
    >
      <Orb colors={['#9c5cfd', '#5f01fb']} seed={7} className="h-full w-full" />
    </button>
  )
}
