import { Check } from 'lucide-react'

import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { rolloutGroups } from '@/data/rollout'
import { cn } from '@/lib/utils'
import { ROLLOUT_STAGES } from '@/types/rollout'

export function RolloutRoadmapPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Rollout Roadmap"
        description="The rollout plan Jeff described: get the category page live, then a statewide video variant, then drill into specific high-value zip codes. Illustrative, Home Service Live only for now."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {rolloutGroups.map((group) => {
          const currentIndex = ROLLOUT_STAGES.findIndex((s) => s.key === group.currentStage)
          return (
            <Card
              key={`${group.brand}-${group.category}`}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-foreground">{group.category}</CardTitle>
                <p className="text-xs text-muted-foreground">{group.brand}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  {ROLLOUT_STAGES.map((stage, index) => {
                    const isDone = index < currentIndex
                    const isCurrent = index === currentIndex
                    return (
                      <div key={stage.key} className="flex flex-1 flex-col items-center text-center">
                        <div className="flex w-full items-center">
                          <div
                            className={cn(
                              'ml-[calc(50%-1px)] h-0.5 flex-1',
                              index === 0 ? 'invisible' : isDone || isCurrent ? 'bg-brand-500' : 'bg-border',
                            )}
                          />
                          <span
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300',
                              isDone && 'border-brand-600 bg-brand-600 text-white',
                              isCurrent && 'border-brand-600 bg-white text-brand-600 dark:bg-card',
                              !isDone && !isCurrent && 'border-border text-muted-foreground',
                            )}
                          >
                            {isDone ? <Check className="h-3.5 w-3.5" /> : index + 1}
                          </span>
                          <div
                            className={cn(
                              'mr-[calc(50%-1px)] h-0.5 flex-1',
                              index === ROLLOUT_STAGES.length - 1 ? 'invisible' : isDone ? 'bg-brand-500' : 'bg-border',
                            )}
                          />
                        </div>
                        <p
                          className={cn(
                            'mt-2 text-xs font-medium',
                            (isDone || isCurrent) ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {stage.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  {ROLLOUT_STAGES[currentIndex].description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
