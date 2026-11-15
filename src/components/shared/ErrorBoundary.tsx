import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Rapido Parcel:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-[#FFD21F] rounded-2xl flex items-center justify-center mx-auto text-black font-black text-xl shadow-lg shadow-[#FFD21F]/30">
              R
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Something went wrong</h2>
              <p className="text-xs text-slate-400 mt-1">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              className="w-full py-2.5 px-4 bg-[#FFD21F] text-black font-extrabold rounded-xl text-xs hover:bg-yellow-400 active:scale-95 transition-all shadow-md"
            >
              Reload Rapido App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

