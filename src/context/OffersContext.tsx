import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import { offers as seedOffers } from '@/data/offers'
import type { Offer } from '@/types/offer'

const STORAGE_KEY = 'bwa-dashboard-offer-overrides'

type OfferOverrides = Record<string, Partial<Offer>>

function loadOverrides(): OfferOverrides {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as OfferOverrides) : {}
  } catch {
    return {}
  }
}

function saveOverrides(overrides: OfferOverrides) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch {
    // localStorage unavailable (private mode, etc). Edits stay in memory for this session.
  }
}

function mergeOffers(overrides: OfferOverrides): Offer[] {
  return seedOffers.map((offer) => (overrides[offer.id] ? { ...offer, ...overrides[offer.id] } : offer))
}

interface OffersContextValue {
  offers: Offer[]
  updateOffer: (id: string, patch: Partial<Offer>) => void
  hasEdits: boolean
  resetToSample: () => void
}

const OffersContext = createContext<OffersContextValue | null>(null)

export function OffersProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<OfferOverrides>(loadOverrides)

  const offers = useMemo(() => mergeOffers(overrides), [overrides])

  function updateOffer(id: string, patch: Partial<Offer>) {
    setOverrides((prev) => {
      const next = {
        ...prev,
        [id]: { ...prev[id], ...patch, lastUpdated: new Date().toISOString().slice(0, 10) },
      }
      saveOverrides(next)
      return next
    })
  }

  function resetToSample() {
    setOverrides({})
    saveOverrides({})
  }

  const value: OffersContextValue = {
    offers,
    updateOffer,
    hasEdits: Object.keys(overrides).length > 0,
    resetToSample,
  }

  return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
}

export function useOffers() {
  const ctx = useContext(OffersContext)
  if (!ctx) throw new Error('useOffers must be used within OffersProvider')
  return ctx
}
