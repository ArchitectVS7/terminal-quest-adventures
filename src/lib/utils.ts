
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for Terminal Quest

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export function sanitizeCommand(command: string): string {
  // Basic command sanitization
  return command.trim().replace(/[;&|`$()]/g, '');
}

export function parseCommandArgs(command: string): { cmd: string; args: string[] } {
  const parts = command.trim().split(/\s+/);
  return {
    cmd: parts[0] || '',
    args: parts.slice(1)
  };
}

export function generatePrompt(user: string, directory: string): string {
  return `${user}@terminalquest:${directory}$ `;
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'text-green-400 bg-green-400/20';
    case 'medium': return 'text-yellow-400 bg-yellow-400/20';
    case 'hard': return 'text-red-400 bg-red-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
