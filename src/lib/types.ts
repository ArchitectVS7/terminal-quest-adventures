
export interface Mission {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description?: string;
  category?: string;
  estimatedTime?: string;
  completionRate?: number;
}

export interface MissionDetail {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialState: TerminalState;
  hints: string[];
  objectives: string[];
  category: string;
  estimatedTime: string;
}

export interface TerminalState {
  currentDirectory: string;
  files: Record<string, string | null>; // null for directories
  history: TerminalCommand[];
  environment: Record<string, string>;
}

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: number;
  success: boolean;
}

export interface CommandResponse {
  output: string;
  success: boolean;
  newState?: Partial<TerminalState>;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  completedMissions: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: string;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  soundEnabled: boolean;
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  prompt: string;
  expectedCommand: string;
  hints: string[];
  explanation?: string;
}

export interface Theme {
  id: string;
  name: string;
  previewImage: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export type AuthMode = 'login' | 'signup';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
