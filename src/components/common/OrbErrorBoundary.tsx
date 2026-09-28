import { Component, type ReactNode } from 'react'

/**
 * WebGL context creation can fail for real reasons outside our control: a
 * sandboxed browser, a disabled GPU process, too many contexts already open
 * elsewhere on the page. React Three Fiber throws synchronously when that
 * happens, and without a boundary here that takes down the ENTIRE app, not
 * just this decorative orb. Catch it and fall back to the plain CSS orb.
 */
export class OrbErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Orb failed to render, falling back to CSS orb:', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
