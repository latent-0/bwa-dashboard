import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { OffersProvider } from '@/context/OffersContext'
import { BrandsPage } from '@/pages/BrandsPage'
import { BuyersPage } from '@/pages/BuyersPage'
import { InventoryTrackerPage } from '@/pages/InventoryTrackerPage'
import { MediaKitsPage } from '@/pages/MediaKitsPage'
import { OpsChecklistsPage } from '@/pages/OpsChecklistsPage'
import { OverviewPage } from '@/pages/OverviewPage'
import { RolloutRoadmapPage } from '@/pages/RolloutRoadmapPage'
import { VideoProductionPage } from '@/pages/VideoProductionPage'
import { VideoTrackerPage } from '@/pages/VideoTrackerPage'

function App() {
  return (
    <OffersProvider>
      <Router>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<OverviewPage />} />
            <Route path="inventory" element={<InventoryTrackerPage />} />
            <Route path="video-tracker" element={<VideoTrackerPage />} />
            <Route path="video-production" element={<VideoProductionPage />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="media-kits" element={<MediaKitsPage />} />
            <Route path="rollout-roadmap" element={<RolloutRoadmapPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="ops-checklists" element={<OpsChecklistsPage />} />
          </Route>
        </Routes>
      </Router>
    </OffersProvider>
  )
}

export default App
