
import React, { useState } from 'react';

export interface PuzzleSummaryProps {
  description: string;
  hints: string[];
  objectives?: string[];
  difficulty?: string;
  estimatedTime?: string;
}

const PuzzleSummary: React.FC<PuzzleSummaryProps> = ({
  description,
  hints,
  objectives = [],
  difficulty,
  estimatedTime
}) => {
  const [showHints, setShowHints] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<Set<number>>(new Set());

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  const toggleObjective = (index: number) => {
    setCompletedObjectives(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const difficultyColors = {
    Easy: 'text-green-400 bg-green-400/20',
    Medium: 'text-yellow-400 bg-yellow-400/20',
    Hard: 'text-red-400 bg-red-400/20'
  };

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-orbitron font-bold text-xl text-white">Mission Brief</h2>
        <div className="flex items-center space-x-3">
          {difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors] || 'text-gray-400 bg-gray-400/20'}`}>
              {difficulty}
            </span>
          )}
          {estimatedTime && (
            <span className="text-gray-400 text-sm">
              ⏱ {estimatedTime}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="font-orbitron font-semibold text-lg text-terminal-green">Overview</h3>
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Objectives */}
      {objectives.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-orbitron font-semibold text-lg text-terminal-green">Objectives</h3>
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 group cursor-pointer"
                onClick={() => toggleObjective(index)}
              >
                <button
                  className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    completedObjectives.has(index)
                      ? 'bg-terminal-green border-terminal-green'
                      : 'border-gray-500 hover:border-terminal-green'
                  }`}
                >
                  {completedObjectives.has(index) && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className={`text-sm transition-colors ${
                  completedObjectives.has(index) 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {objective}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress */}
          {objectives.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{completedObjectives.size} / {objectives.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-terminal-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedObjectives.size / objectives.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hints Section */}
      {hints.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron font-semibold text-lg text-terminal-green">Hints</h3>
            <button
              onClick={toggleHints}
              className="text-terminal-cyan hover:text-cyan-300 text-sm transition-colors flex items-center space-x-1"
            >
              <span>{showHints ? 'Hide' : 'Show'} Hints</span>
              <svg 
                className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Hints Panel */}
          {showHints && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 animate-fade-in">
              <div className="space-y-3">
                {hints.map((hint, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-terminal-cyan/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-terminal-cyan text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-cyan-300 text-sm leading-relaxed">
                      {hint}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-cyan-800/20 rounded border border-cyan-600/30">
                <p className="text-cyan-200 text-xs">
                  💡 <strong>Pro Tip:</strong> Try to solve without hints first to maximize your learning!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Reference */}
      <div className="bg-neutral-900 border border-neutral-600 rounded-lg p-4">
        <h4 className="font-orbitron font-semibold text-sm text-white mb-3">Quick Reference</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-terminal-green font-mono">ls</span>
            <span className="text-gray-400 ml-2">list files</span>
          </div>
          <div>
            <span className="text-terminal-green font-mono">cd</span>
            <span className="text-gray-400 ml-2">change directory</span>
          </div>
          <div>
            <span className="text-terminal-green font-mono">cat</span>
            <span className="text-gray-400 ml-2">view file contents</span>
          </div>
          <div>
            <span className="text-terminal-green font-mono">pwd</span>
            <span className="text-gray-400 ml-2">current directory</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleSummary;
