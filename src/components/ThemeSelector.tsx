
import React from 'react';
import { Theme } from '@/lib/types';

export interface ThemeSelectorProps {
  availableThemes: Theme[];
  selectedTheme: string;
  onChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  availableThemes,
  selectedTheme,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Terminal Theme</h3>
        <p className="text-gray-400 text-sm mb-4">
          Choose your preferred terminal appearance for the ultimate hacker experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableThemes.map((theme) => (
          <div
            key={theme.id}
            className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedTheme === theme.id
                ? 'border-terminal-green shadow-lg shadow-terminal-green/30'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onClick={() => onChange(theme.id)}
          >
            {/* Theme Preview */}
            <div className="aspect-video relative">
              {theme.previewImage ? (
                <img
                  src={theme.previewImage}
                  alt={`${theme.name} theme preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Fallback: Generate preview from colors
                <div
                  className="w-full h-full flex flex-col"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  {/* Simulated terminal header */}
                  <div className="h-6 bg-gray-800 flex items-center px-2 space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  {/* Simulated terminal content */}
                  <div className="flex-1 p-2 space-y-1">
                    <div className="flex items-center">
                      <span
                        className="text-xs font-mono"
                        style={{ color: theme.colors.primary }}
                      >
                        user@terminal:~$
                      </span>
                      <span
                        className="text-xs font-mono ml-1"
                        style={{ color: theme.colors.text }}
                      >
                        ls -la
                      </span>
                    </div>
                    <div
                      className="text-xs font-mono"
                      style={{ color: theme.colors.text, opacity: 0.7 }}
                    >
                      drwxr-xr-x missions
                    </div>
                    <div className="flex items-center">
                      <span
                        className="text-xs font-mono"
                        style={{ color: theme.colors.primary }}
                      >
                        user@terminal:~$
                      </span>
                      <div
                        className="w-1 h-3 ml-1 animate-pulse"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Selection Overlay */}
              {selectedTheme === theme.id && (
                <div className="absolute inset-0 bg-terminal-green/20 flex items-center justify-center">
                  <div className="w-8 h-8 bg-terminal-green rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Info */}
            <div className="p-3 bg-neutral-800">
              <h4 className="font-orbitron font-semibold text-white text-sm">
                {theme.name}
              </h4>
              
              {/* Color Palette */}
              <div className="flex items-center space-x-1 mt-2">
                <div
                  className="w-3 h-3 rounded-full border border-gray-600"
                  style={{ backgroundColor: theme.colors.primary }}
                  title="Primary Color"
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-600"
                  style={{ backgroundColor: theme.colors.secondary }}
                  title="Secondary Color"
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-600"
                  style={{ backgroundColor: theme.colors.background }}
                  title="Background Color"
                ></div>
                <div
                  className="w-3 h-3 rounded-full border border-gray-600"
                  style={{ backgroundColor: theme.colors.text }}
                  title="Text Color"
                ></div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Custom Theme Option */}
      <div className="mt-6 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-orbitron font-semibold text-white">Custom Theme</h4>
            <p className="text-gray-400 text-sm">Create your own terminal color scheme</p>
          </div>
          <button className="btn-secondary text-sm">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
