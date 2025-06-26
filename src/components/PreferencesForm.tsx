
import React, { useState } from 'react';
import { UserPreferences } from '@/lib/types';

export interface PreferencesFormProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => Promise<void>;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  preferences: initialPreferences,
  onSave
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setSaveStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await onSave(preferences);
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = JSON.stringify(preferences) !== JSON.stringify(initialPreferences);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Font Size */}
      <div className="space-y-3">
        <label className="form-label">Terminal Font Size</label>
        <div className="grid grid-cols-3 gap-3">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleChange('fontSize', size)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                preferences.fontSize === size
                  ? 'border-terminal-green bg-terminal-green/10 text-terminal-green'
                  : 'border-gray-600 bg-neutral-800 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="font-mono" style={{
                fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'
              }}>
                Aa
              </div>
              <div className="text-xs mt-1 capitalize">{size}</div>
            </button>
          ))}
        </div>
      </div>

      {/* High Contrast */}
      <div className="space-y-3">
        <label className="form-label">Accessibility</label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) => handleChange('highContrast', e.target.checked)}
              className="w-5 h-5 text-terminal-green bg-neutral-800 border-gray-600 rounded focus:ring-terminal-green focus:ring-2"
            />
            <div>
              <div className="text-white font-medium">High Contrast Mode</div>
              <div className="text-gray-400 text-sm">Increases color contrast for better visibility</div>
            </div>
          </label>
        </div>
      </div>

      {/* Sound Effects */}
      <div className="space-y-3">
        <label className="form-label">Audio</label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.soundEnabled}
              onChange={(e) => handleChange('soundEnabled', e.target.checked)}
              className="w-5 h-5 text-terminal-green bg-neutral-800 border-gray-600 rounded focus:ring-terminal-green focus:ring-2"
            />
            <div>
              <div className="text-white font-medium">Sound Effects</div>
              <div className="text-gray-400 text-sm">Enable terminal sounds and notifications</div>
            </div>
          </label>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <label className="form-label">Interface Theme</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleChange('theme', 'default')}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.theme === 'default'
                ? 'border-terminal-green bg-terminal-green/10'
                : 'border-gray-600 bg-neutral-800 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-terminal-green rounded"></div>
              <span className="text-white font-medium">Hacker Green</span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleChange('theme', 'cyberpunk')}
            className={`p-4 rounded-lg border-2 transition-all ${
              preferences.theme === 'cyberpunk'
                ? 'border-terminal-green bg-terminal-green/10'
                : 'border-gray-600 bg-neutral-800 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <span className="text-white font-medium">Cyberpunk</span>
            </div>
          </button>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-green-900/50 border border-green-700 rounded-lg p-3 text-green-300 text-sm">
          ✓ Preferences saved successfully!
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
          ✗ Failed to save preferences. Please try again.
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={() => setPreferences(initialPreferences)}
          disabled={!hasChanges || isSaving}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset to Defaults
        </button>
        
        <button
          type="submit"
          disabled={!hasChanges || isSaving}
          className={`btn-primary flex items-center space-x-2 ${
            (!hasChanges || isSaving) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Preferences</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;
