
import React, { useState, useRef, useEffect } from 'react';

export interface TerminalPreviewProps {
  history: string[];
  onCommand: (command: string) => void;
  isExecuting?: boolean;
  placeholder?: string;
}

const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  history,
  onCommand,
  isExecuting = false,
  placeholder = "Type a command..."
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isExecuting) {
      onCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-window w-full max-w-2xl mx-auto">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-button bg-red-500"></div>
        <div className="terminal-button bg-yellow-500"></div>
        <div className="terminal-button bg-green-500"></div>
        <span className="text-gray-400 text-xs ml-3">Terminal Preview</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="terminal-content cursor-text"
        onClick={handleTerminalClick}
      >
        {/* Command History */}
        <div className="space-y-1 mb-2">
          {history.map((line, index) => {
            // Check if this line is a command (not a response)
            const isCommand = !line.startsWith('Great!') && 
                             !line.startsWith('Command') && 
                             !line.startsWith('Welcome') && 
                             !line.startsWith('🎉') &&
                             !line.includes('correctly') &&
                             !line.includes('not recognized');
            
            if (isCommand) {
              return (
                <div key={index} className="space-y-1">
                  {/* Show command with prompt */}
                  <div className="flex items-center">
                    <span className="terminal-prompt text-sm">user@terminal:~$ </span>
                    <span className="text-white ml-1 font-mono text-sm">{line}</span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="text-gray-300 text-sm font-mono ml-2">
                  {line}
                </div>
              );
            }
          })}
        </div>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="terminal-prompt text-sm">user@terminal:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            className="flex-1 bg-transparent text-white text-sm font-mono outline-none ml-1"
            placeholder={placeholder}
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
      </div>
    </div>
  );
};

export default TerminalPreview;
