
import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { MissionDetail } from '@/lib/types';

export interface TerminalSimulatorProps {
  mission: MissionDetail;
  onMissionComplete?: () => void;
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  mission,
  onMissionComplete
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    state,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearHistory,
    resetTerminal,
    isExecuting,
    terminalRef
  } = useTerminal({
    missionId: mission.id,
    initialState: mission.initialState
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isExecuting) {
      executeCommand(currentInput);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-focus input on mount and when terminal is clicked
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearHistory();
      } else if (e.ctrlKey && e.key === 'c' && isExecuting) {
        e.preventDefault();
        // In a real implementation, this would cancel the current command
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearHistory, isExecuting]);

  const terminalClasses = `
    terminal-window w-full transition-all duration-300
    ${isFullscreen 
      ? 'fixed inset-0 z-50 rounded-none h-screen' 
      : 'max-w-5xl mx-auto'
    }
  `;

  return (
    <div 
      ref={containerRef}
      className={isFullscreen ? 'fixed inset-0 bg-black z-50' : ''}
    >
      <div className={terminalClasses}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex items-center space-x-2">
            <div className="terminal-button bg-red-500"></div>
            <div className="terminal-button bg-yellow-500"></div>
            <div className="terminal-button bg-green-500"></div>
          </div>
          
          <div className="flex-1 text-center">
            <span className="text-gray-300 text-sm font-mono">
              {mission.title} - Terminal Simulator
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={clearHistory}
              className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              title="Clear Terminal (Ctrl+L)"
            >
              Clear
            </button>
            <button
              onClick={resetTerminal}
              className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              title="Reset Terminal"
            >
              Reset
            </button>
            <button
              onClick={toggleFullscreen}
              className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              title="Toggle Fullscreen (F11)"
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className={`terminal-content cursor-text ${
            isFullscreen ? 'min-h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)]' : 'min-h-[500px] max-h-[600px]'
          }`}
          onClick={handleTerminalClick}
        >
          {/* Welcome Message */}
          {state.history.length === 0 && (
            <div className="mb-4 text-terminal-green">
              <p>🚀 Mission: {mission.title}</p>
              <p>📁 Current Directory: {state.currentDirectory}</p>
              <p>💡 Type 'help' for available commands</p>
              <p>---</p>
            </div>
          )}

          {/* Command History */}
          <div className="space-y-1 mb-2">
            {state.history.map((cmd, index) => (
              <div key={index} className="space-y-1">
                {/* Command Input */}
                <div className="flex items-center">
                  <span className="terminal-prompt text-sm">
                    {state.environment.USER}@terminalquest:{state.currentDirectory}$ 
                  </span>
                  <span className="text-white ml-1 font-mono text-sm">
                    {cmd.command}
                  </span>
                </div>
                
                {/* Command Output */}
                {cmd.output && (
                  <div className={`text-sm font-mono whitespace-pre-wrap ml-2 ${
                    cmd.success ? 'text-gray-300' : 'text-red-400'
                  }`}>
                    {cmd.output}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="terminal-prompt text-sm">
              {state.environment.USER}@terminalquest:{state.currentDirectory}$ 
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-white text-sm font-mono outline-none ml-1"
              placeholder="Enter command..."
              disabled={isExecuting}
              autoComplete="off"
              spellCheck={false}
            />
            {isExecuting && (
              <div className="ml-2">
                <svg className="animate-spin h-4 w-4 text-terminal-green" fill="none" viewBox="0 0 24 24">
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
              </div>
            )}
          </form>

          {/* Cursor when input is empty */}
          {!currentInput && !isExecuting && (
            <div className="flex items-center mt-1">
              <span className="terminal-prompt text-sm">
                {state.environment.USER}@terminalquest:{state.currentDirectory}$ 
              </span>
              <span className="terminal-cursor ml-1"></span>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-900 px-4 py-2 text-xs text-gray-400 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span>
              Directory: {state.currentDirectory} | Commands: {state.history.length}
            </span>
            <span>
              F11: Fullscreen | Ctrl+L: Clear | Ctrl+C: Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalSimulator;
