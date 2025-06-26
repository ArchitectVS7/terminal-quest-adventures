
import { useState, useCallback, useRef, useEffect } from 'react';
import { TerminalState, TerminalCommand, CommandResponse } from '@/lib/types';
import { api } from '@/lib/api';

export interface UseTerminalProps {
  missionId?: string;
  initialState?: TerminalState;
  onCommand?: (command: string) => Promise<CommandResponse>;
}

export function useTerminal({ missionId, initialState, onCommand }: UseTerminalProps = {}) {
  const [state, setState] = useState<TerminalState>(
    initialState || {
      currentDirectory: '/home/user',
      files: {},
      history: [],
      environment: {
        USER: 'user',
        HOME: '/home/user',
        PATH: '/usr/bin:/bin:/usr/local/bin'
      }
    }
  );

  const [isExecuting, setIsExecuting] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const executeCommand = useCallback(async (command: string) => {
    if (!command.trim() || isExecuting) return;

    setIsExecuting(true);
    const timestamp = Date.now();

    try {
      let response: CommandResponse;
      
      if (onCommand) {
        response = await onCommand(command);
      } else if (missionId) {
        response = await api.executeCommand(missionId, command, state);
      } else {
        // Basic local command handling
        response = handleLocalCommand(command, state);
      }

      const newCommand: TerminalCommand = {
        command,
        output: response.output,
        timestamp,
        success: response.success
      };

      setState(prevState => ({
        ...prevState,
        ...response.newState,
        history: [...prevState.history, newCommand]
      }));

      setCurrentInput('');
    } catch (error) {
      const errorCommand: TerminalCommand = {
        command,
        output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp,
        success: false
      };

      setState(prevState => ({
        ...prevState,
        history: [...prevState.history, errorCommand]
      }));
    } finally {
      setIsExecuting(false);
    }
  }, [missionId, onCommand, state, isExecuting]);

  const clearHistory = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      history: []
    }));
  }, []);

  const resetTerminal = useCallback(() => {
    if (initialState) {
      setState(initialState);
    }
    setCurrentInput('');
  }, [initialState]);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.history]);

  return {
    state,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearHistory,
    resetTerminal,
    isExecuting,
    terminalRef
  };
}

function handleLocalCommand(command: string, state: TerminalState): CommandResponse {
  const parts = command.trim().split(' ');
  const cmd = parts[0];

  switch (cmd) {
    case 'help':
      return {
        output: `Available commands:
ls       - list directory contents
cd       - change directory
pwd      - print working directory
cat      - display file contents
clear    - clear terminal screen
help     - show this help message`,
        success: true
      };

    case 'clear':
      return {
        output: '',
        success: true
      };

    case 'pwd':
      return {
        output: state.currentDirectory,
        success: true
      };

    case 'whoami':
      return {
        output: state.environment.USER || 'user',
        success: true
      };

    case 'echo':
      return {
        output: parts.slice(1).join(' '),
        success: true
      };

    default:
      return {
        output: `${cmd}: command not found`,
        success: false
      };
  }
}
