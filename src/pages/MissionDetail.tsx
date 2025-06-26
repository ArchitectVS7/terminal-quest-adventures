
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import TerminalSimulator from '@/components/TerminalSimulator';
import PuzzleSummary from '@/components/PuzzleSummary';
import { MissionDetail as MissionDetailType } from '@/lib/types';
import { api } from '@/lib/api';

const MissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mission, setMission] = useState<MissionDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    if (id) {
      loadMission(id);
    }
  }, [id]);

  const loadMission = async (missionId: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getMissionDetail(missionId);
      setMission(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mission');
    } finally {
      setLoading(false);
    }
  };

  const handleMissionComplete = () => {
    if (!mission) return;

    // Mark mission as completed
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const completedMissions = user.completedMissions || [];
    
    if (!completedMissions.includes(mission.id)) {
      user.completedMissions = [...completedMissions, mission.id];
      localStorage.setItem('user', JSON.stringify(user));
    }

    // Show completion dialog or navigate
    navigate('/missions');
  };

  const handleBackToMissions = () => {
    navigate('/missions');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
        <Navigation />
        <main className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-terminal-green mb-4"></div>
                <p className="text-gray-300">Loading mission data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !mission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
        <Navigation />
        <main className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-lg font-semibold text-red-300 mb-2">Mission Not Found</h3>
                <p className="text-red-400 text-sm mb-4">{error || 'The requested mission could not be loaded.'}</p>
                <button
                  onClick={handleBackToMissions}
                  className="btn-primary"
                >
                  Back to Missions
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
      <Navigation />
      
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToMissions}
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                  {mission.title}
                </h1>
                <p className="text-gray-400">{mission.category} • {mission.estimatedTime}</p>
              </div>
            </div>

            <button
              onClick={() => setShowSummary(!showSummary)}
              className="btn-secondary text-sm md:hidden"
            >
              {showSummary ? 'Hide Brief' : 'Show Brief'}
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission Summary */}
            <div className={`lg:col-span-1 ${showSummary ? 'block' : 'hidden lg:block'}`}>
              <PuzzleSummary
                description={mission.description}
                hints={mission.hints}
                objectives={mission.objectives}
                difficulty={mission.difficulty}
                estimatedTime={mission.estimatedTime}
              />
            </div>

            {/* Terminal Simulator */}
            <div className="lg:col-span-2">
              <TerminalSimulator
                mission={mission}
                onMissionComplete={handleMissionComplete}
              />
            </div>
          </div>

          {/* Mission Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="hidden lg:block btn-secondary text-sm"
              >
                {showSummary ? 'Hide Mission Brief' : 'Show Mission Brief'}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                Restart Mission
              </button>
              <button
                onClick={handleMissionComplete}
                className="btn-primary text-sm"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MissionDetail;
