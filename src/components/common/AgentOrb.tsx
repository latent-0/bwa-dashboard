import { OrbErrorBoundary } from '@/components/common/OrbErrorBoundary'
import { Orb } from '@/components/ui/orb'

function StaticOrbFallback() {
  return (
    <div
      className="h-full w-full rounded-full"
      style={{
        background:
          'radial-gradient(circle at 32% 26%, #ffffff 0%, #e4d3ff 10%, #c09dfd 22%, #5f01fb 42%, #1c0a3d 66%, #0b0d1b 100%)',
      }}
    />
  )
}

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
      <OrbErrorBoundary fallback={<StaticOrbFallback />}>
        <Orb colors={['#ffffff', '#c09dfd']} bgColor="#0b0d1b" seed={7} className="h-full w-full" />
      </OrbErrorBoundary>
    </button>
  )
}
