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
      className="group relative flex shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{
        width: size,
        height: size,
        filter:
          'drop-shadow(0 4px 18px rgba(95,1,251,0.5)) drop-shadow(0 0 10px rgba(122,45,253,0.35))',
      }}
    >
      <Orb colors={['#9c5cfd', '#5f01fb']} seed={7} className="h-full w-full" />
    </button>
  )
}
