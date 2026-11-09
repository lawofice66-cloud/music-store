import React, { Component, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl border border-neutral-800 bg-[#0d0f17] shadow-2xl space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 text-2xl">
              🎵
            </div>
            <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              FALLEN 75 FRANCE • Studio Store
            </h1>
            <p className="text-sm text-neutral-400">
              Une mise à jour du catalogue a eu lieu. Cliquez ci-dessous pour actualiser le lecteur.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('fallen75_tracks_v1');
                window.location.reload();
              }}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
            >
              🔄 Actualiser le Catalogue
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);
