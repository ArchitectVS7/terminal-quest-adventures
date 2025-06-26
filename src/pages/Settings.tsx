
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ThemeSelector from '@/components/ThemeSelector';
import PreferencesForm from '@/components/PreferencesForm';
import { UserPreferences, Theme } from '@/lib/types';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preferences' | 'themes' | 'account'>('preferences');

  // Get current user preferences
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [preferences, setPreferences] = useState<UserPreferences>(
    user.preferences || {
      theme: 'default',
      fontSize: 'medium',
      highContrast: false,
      soundEnabled: true
    }
  );

  // Mock available themes
  const availableThemes: Theme[] = [
    {
      id: 'default',
      name: 'Hacker Green',
      previewImage: '',
      colors: {
        primary: '#39FF14',
        secondary: '#00FFFF',
        background: '#121212',
        text: '#FFFFFF'
      }
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Purple',
      previewImage: '',
      colors: {
        primary: '#FF00FF',
        secondary: '#00FFFF',
        background: '#0D0D0D',
        text: '#FFFFFF'
      }
    },
    {
      id: 'matrix',
      name: 'Matrix Green',
      previewImage: '',
      colors: {
        primary: '#00FF00',
        secondary: '#00CC00',
        background: '#000000',
        text: '#00FF00'
      }
    },
    {
      id: 'retro',
      name: 'Retro Amber',
      previewImage: '',
      colors: {
        primary: '#FFAA00',
        secondary: '#FF8800',
        background: '#1A1A00',
        text: '#FFDD88'
      }
    }
  ];

  const handlePreferencesSave = async (newPreferences: UserPreferences) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update local state and storage
    setPreferences(newPreferences);
    const updatedUser = { ...user, preferences: newPreferences };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleThemeChange = (themeId: string) => {
    const newPreferences = { ...preferences, theme: themeId };
    setPreferences(newPreferences);
    
    // Save immediately for theme changes
    const updatedUser = { ...user, preferences: newPreferences };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const tabs = [
    { id: 'preferences' as const, label: 'Preferences', icon: '⚙️' },
    { id: 'themes' as const, label: 'Themes', icon: '🎨' },
    { id: 'account' as const, label: 'Account', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
      <Navigation />
      
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              <span className="text-terminal-green">Settings</span> & Preferences
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Customize your Terminal Quest experience. Configure your interface, themes, and account settings.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-800 rounded-lg p-1 flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-terminal-green text-black'
                      : 'text-gray-300 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'preferences' && (
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-8 animate-fade-in">
                <h2 className="font-orbitron font-bold text-2xl text-white mb-6">
                  Terminal Preferences
                </h2>
                <PreferencesForm
                  preferences={preferences}
                  onSave={handlePreferencesSave}
                />
              </div>
            )}

            {activeTab === 'themes' && (
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-8 animate-fade-in">
                <h2 className="font-orbitron font-bold text-2xl text-white mb-6">
                  Interface Themes
                </h2>
                <ThemeSelector
                  availableThemes={availableThemes}
                  selectedTheme={preferences.theme}
                  onChange={handleThemeChange}
                />
              </div>
            )}

            {activeTab === 'account' && (
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-8 animate-fade-in">
                <h2 className="font-orbitron font-bold text-2xl text-white mb-6">
                  Account Settings
                </h2>
                
                {/* Account Info */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={user.email || ''}
                        className="form-input"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        value={user.name || 'Terminal Hacker'}
                        className="form-input"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="bg-neutral-900 border border-neutral-600 rounded-lg p-6">
                    <h3 className="font-orbitron font-semibold text-lg text-white mb-4">
                      Progress Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-terminal-green">
                          {user.completedMissions?.length || 0}
                        </div>
                        <div className="text-sm text-gray-400">Missions Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-terminal-cyan">
                          {Math.floor(Math.random() * 50) + 20}
                        </div>
                        <div className="text-sm text-gray-400">Commands Mastered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-purple-400">
                          {Math.floor(Math.random() * 10) + 5}
                        </div>
                        <div className="text-sm text-gray-400">Days Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-orbitron font-bold text-yellow-400">
                          Elite
                        </div>
                        <div className="text-sm text-gray-400">Hacker Rank</div>
                      </div>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h3 className="font-orbitron font-semibold text-lg text-white">
                      Data Management
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="btn-secondary text-left p-4">
                        <div className="font-semibold">Export Progress</div>
                        <div className="text-sm opacity-75">Download your mission data</div>
                      </button>
                      
                      <button className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-left hover:bg-red-900/70 transition-colors">
                        <div className="font-semibold text-red-300">Reset Progress</div>
                        <div className="text-sm text-red-400">Clear all mission data</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
