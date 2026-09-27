import { Outlet, useLocation } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-svh flex-col lg:pl-[19rem]">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div key={pathname} className="mx-auto max-w-7xl animate-fade-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
