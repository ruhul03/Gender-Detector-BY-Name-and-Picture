
import React from 'react';
import { GenderGuesser } from './components/GenderGuesser';
import { ImageEditor } from './components/ImageEditor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
                Gender Oracle
              </span>
            </div>
            <nav className="hidden sm:flex space-x-8">
              <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">Linguistic Engine</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">Visual AI</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
            The AI Identity Engine
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto">
            Guess gender identities via linguistic patterns or visual analysis powered by Google's latest Gemini models.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="space-y-8">
            <GenderGuesser />
            
            <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span>📚</span> Linguistic Analysis
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Gemini 3 Flash explores naming traditions across thousands of cultures to find the most probable identity based on text alone.
              </p>
            </div>
          </div>

          <div>
            <ImageEditor />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 Gender Oracle. Built with high-performance Gemini models.
          </p>
          <div className="flex gap-6">
            <span className="text-xs font-mono px-2 py-1 bg-slate-100 rounded text-slate-500 uppercase">
              Models: gemini-3-flash-preview & gemini-2.5-flash-image
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
