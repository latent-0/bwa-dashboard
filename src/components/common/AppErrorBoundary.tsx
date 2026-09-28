import { AlertTriangle } from 'lucide-react'
import { Component, type ReactNode } from 'react'

/**
 * Last-resort safety net: if any part of the app throws during render (a bad
 * data row, a third-party widget, anything), show a recoverable screen
 * instead of a blank page. The orb has its own narrower boundary for the
 * common WebGL-unavailable case; this catches everything else.
 */
export class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Dashboard crashed:', error)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-status-red-bg text-status-red">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <p className="font-heading text-lg font-semibold">Something went wrong</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            The dashboard hit an unexpected error. Reloading usually fixes it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          Reload
        </button>
      </div>
    )
  }
}
