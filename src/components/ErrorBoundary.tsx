import React, { ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Epistola ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#140C07] text-[#FAF4EA] flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-[#8C6D46]/40 bg-[#1E140D]/95 p-8 text-center shadow-2xl backdrop-blur-md">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#8C2318]/20 border border-[#8C2318]/60 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-[#E06A55]" />
            </div>
            <h2 className="font-cinzel text-xl font-bold text-[#E5C365] mb-2">
              Writing Desk Interrupted
            </h2>
            <p className="font-serif text-xs text-[#D1C7BD] mb-4 leading-relaxed">
              The ink encountered an unexpected transcription disturbance. Click below to restore your historical writing desk.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-[#A69580] bg-[#120B06] p-2.5 rounded-lg overflow-x-auto text-left mb-6 max-h-32 border border-[#3D2817]">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#B8860B] bg-[#3D2617] px-4 py-2.5 text-xs font-semibold text-[#F2DFCE] hover:bg-[#543520] transition shadow-lg"
            >
              <RotateCcw className="h-4 w-4 text-[#D4AF37]" />
              <span>Return to Epistola Desk</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
