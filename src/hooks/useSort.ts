import { useState } from 'react'

import type { SortState } from '@/components/common/DataTable'

export function useSort(initial?: SortState) {
  const [sort, setSort] = useState<SortState | undefined>(initial)

  function toggleSort(key: string) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return undefined
    })
  }

  return { sort, toggleSort }
}
