
import React, { useState } from 'react';
import { guessGender } from '../services/geminiService';
import { GenderGuess } from '../types';

export const GenderGuesser: React.FC = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<GenderGuess | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await guessGender(name);
      setResult(data);
    } catch (err) {
      setError('Failed to analyze name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">👤</span>
        Gender Oracle
      </h2>
      <p className="text-slate-500 mb-6 text-sm">
        Enter a name and our AI will attempt to guess the likely gender identity based on cultural patterns.
      </p>

      <form onSubmit={handleGuess} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name or First Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            'Guess Gender'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Analysis Result</span>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              result.gender === 'male' ? 'bg-blue-100 text-blue-700' :
              result.gender === 'female' ? 'bg-pink-100 text-pink-700' :
              result.gender === 'non-binary' ? 'bg-purple-100 text-purple-700' :
              'bg-slate-200 text-slate-700'
            }`}>
              {result.gender}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Confidence Score</span>
                <span className="font-bold text-slate-700">{(result.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-1000" 
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "{result.reasoning}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
