
import React from 'react';
import { Mission } from '@/lib/types';
import MissionCard from './MissionCard';

export interface MissionListProps {
  missions: Mission[];
  onMissionStart: (id: string) => void;
  loading?: boolean;
  error?: string;
}

const MissionList: React.FC<MissionListProps> = ({
  missions,
  onMissionStart,
  loading = false,
  error
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="mission-card animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-4"></div>
            <div className="h-3 bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded mb-4 w-1/2"></div>
            <div className="h-16 bg-gray-700 rounded mb-4"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-300 mb-2">Failed to Load Missions</h3>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (missions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-orbitron font-semibold text-white mb-2">No Missions Available</h3>
          <p className="text-gray-400">Check back later for new hacker challenges!</p>
        </div>
      </div>
    );
  }

  // Group missions by difficulty
  const groupedMissions = missions.reduce((acc, mission) => {
    if (!acc[mission.difficulty]) {
      acc[mission.difficulty] = [];
    }
    acc[mission.difficulty].push(mission);
    return acc;
  }, {} as Record<string, Mission[]>);

  const difficultyOrder = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="space-y-8">
      {difficultyOrder.map(difficulty => {
        const difficultyMissions = groupedMissions[difficulty];
        if (!difficultyMissions || difficultyMissions.length === 0) return null;

        return (
          <div key={difficulty} className="space-y-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-orbitron font-bold text-white">
                {difficulty} Missions
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                difficulty === 'Easy' ? 'text-green-400 bg-green-400/20' :
                difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/20' :
                'text-red-400 bg-red-400/20'
              }`}>
                {difficultyMissions.length} available
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {difficultyMissions.map((mission, index) => (
                <div
                  key={mission.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MissionCard
                    mission={mission}
                    onStart={onMissionStart}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MissionList;
