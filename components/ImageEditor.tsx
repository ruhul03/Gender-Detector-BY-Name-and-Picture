
import React, { useState, useRef } from 'react';
import { detectGenderFromImage } from '../services/geminiService';
import { GenderGuess } from '../types';

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<GenderGuess | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!image) return;

    setIsProcessing(true);
    setError(null);
    try {
      const data = await detectGenderFromImage(image);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to process image. Try a clearer photo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">📸</span>
        Visual Gender Oracle
      </h2>
      <p className="text-slate-500 mb-6 text-sm">
        Upload a photo and our visual AI (Gemini 2.5 Flash Image) will analyze physical features and style to guess the likely gender identity.
      </p>

      <div className="flex-1 space-y-6">
        <div 
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative aspect-square sm:aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
            image ? 'border-transparent bg-slate-100' : 'border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50'
          }`}
        >
          {image ? (
            <img src={image} alt="Target" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center p-4">
              <span className="text-4xl mb-2 block">📤</span>
              <p className="text-sm text-slate-500 font-medium">Click to upload photo</p>
              <p className="text-xs text-slate-400 mt-1">Clear faces work best</p>
            </div>
          )}
          
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
              <p className="text-emerald-800 font-semibold animate-pulse">Analyzing visual patterns...</p>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDetect}
            disabled={isProcessing || !image}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
          >
            Run Visual Analysis
          </button>
          
          {error && (
            <p className="text-xs text-red-600 font-medium text-center">{error}</p>
          )}
        </div>

        {result && !isProcessing && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Visual Detection</span>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm ${
                result.gender === 'male' ? 'bg-blue-600 text-white' :
                result.gender === 'female' ? 'bg-pink-600 text-white' :
                result.gender === 'non-binary' ? 'bg-purple-600 text-white' :
                'bg-slate-500 text-white'
              }`}>
                {result.gender}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">AI Certainty</span>
                  <span className="font-bold text-slate-700">{(result.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-1000" 
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{result.reasoning}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
