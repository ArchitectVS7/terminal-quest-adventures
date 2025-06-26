
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import MissionList from '@/components/MissionList';
import { Mission } from '@/lib/types';
import { api } from '@/lib/api';

const Missions: React.FC = () => {
  const navigate = useNavigate();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getMissions();
      setMissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load missions');
    } finally {
      setLoading(false);
    }
  };

  const handleMissionStart = (missionId: string) => {
    navigate(`/missions/${missionId}`);
  };

  const categories = ['all', ...Array.from(new Set(missions.map(m => m.category).filter(Boolean)))];
  
  const filteredMissions = selectedCategory === 'all' 
    ? missions 
    : missions.filter(m => m.category === selectedCategory);

  // Get user progress
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const completedMissions = user.completedMissions || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
      <Navigation />
      
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              <span className="text-terminal-green">Mission</span> Control
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose your next challenge from our collection of realistic hacker scenarios. Each mission teaches essential CLI skills through immersive storytelling.
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-orbitron font-bold text-terminal-green">
                  {completedMissions.length}
                </div>
                <div className="text-sm text-gray-400">Missions Completed</div>
              </div>
              <div>
                <div className="text-2xl font-orbitron font-bold text-terminal-cyan">
                  {missions.length}
                </div>
                <div className="text-sm text-gray-400">Total Available</div>
              </div>
              <div>
                <div className="text-2xl font-orbitron font-bold text-purple-400">
                  {Math.round((completedMissions.length / missions.length) * 100) || 0}%
                </div>
                <div className="text-sm text-gray-400">Progress</div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-terminal-green text-black'
                      : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'All Missions' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          {completedMissions.length > 0 && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-neutral-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-orbitron font-semibold text-white">Overall Progress</span>
                  <span className="text-sm text-gray-400">
                    {completedMissions.length} / {missions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-terminal-green to-terminal-cyan h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedMissions.length / missions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mission List */}
          <MissionList
            missions={filteredMissions}
            onMissionStart={handleMissionStart}
            loading={loading}
            error={error}
          />

          {/* Retry Button */}
          {error && (
            <div className="text-center mt-8">
              <button
                onClick={loadMissions}
                className="btn-primary"
              >
                Retry Loading Missions
              </button>
            </div>
          )}

          {/* Empty State for Filtered Results */}
          {!loading && !error && filteredMissions.length === 0 && selectedCategory !== 'all' && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-orbitron font-semibold text-white mb-2">
                  No {selectedCategory} Missions
                </h3>
                <p className="text-gray-400 mb-4">
                  Try selecting a different category or check back later for new missions.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="btn-secondary"
                >
                  Show All Missions
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Missions;
