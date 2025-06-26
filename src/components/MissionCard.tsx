
import React from 'react';
import { Mission } from '@/lib/types';

export interface MissionCardProps {
  mission: Mission;
  onStart: (id: string) => void;
  isLocked?: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onStart,
  isLocked = false
}) => {
  const difficultyColors = {
    Easy: 'text-green-400 bg-green-400/20',
    Medium: 'text-yellow-400 bg-yellow-400/20',
    Hard: 'text-red-400 bg-red-400/20'
  };

  const handleStart = () => {
    if (!isLocked) {
      onStart(mission.id);
    }
  };

  return (
    <div className={`mission-card group ${isLocked ? 'opacity-50' : 'hover:scale-105'} transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-orbitron font-semibold text-lg text-white mb-2 group-hover:text-terminal-green transition-colors">
            {mission.title}
          </h3>
          <div className="flex items-center space-x-3 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[mission.difficulty]}`}>
              {mission.difficulty}
            </span>
            {mission.estimatedTime && (
              <span className="text-gray-400">
                ⏱ {mission.estimatedTime}
              </span>
            )}
          </div>
        </div>
        
        {isLocked && (
          <div className="text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>

      {/* Description */}
      {mission.description && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {mission.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        {mission.category && (
          <span className="text-xs text-terminal-cyan bg-terminal-cyan/20 px-2 py-1 rounded">
            {mission.category}
          </span>
        )}
        
        {mission.completionRate !== undefined && (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-terminal-green transition-all duration-300"
                style={{ width: `${mission.completionRate}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{mission.completionRate}%</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleStart}
        disabled={isLocked}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
          isLocked
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-terminal-green text-black hover:bg-green-400 hover:shadow-lg hover:shadow-terminal-green/30'
        }`}
      >
        {isLocked ? 'Locked' : 'Start Mission'}
      </button>

      {/* Hover Effect Overlay */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/0 via-terminal-green/5 to-terminal-green/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      )}
    </div>
  );
};

export default MissionCard;
