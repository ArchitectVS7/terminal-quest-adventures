
import React, { useState } from 'react';
import { TutorialStep } from '@/lib/types';
import TerminalPreview from './TerminalPreview';

export interface TutorialStepperProps {
  steps: TutorialStep[];
  onComplete: () => void;
}

const TutorialStepper: React.FC<TutorialStepperProps> = ({
  steps,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['Welcome to Terminal Quest! Follow the instructions to learn basic commands.']);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isCurrentStepCompleted = completedSteps.has(currentStepIndex);
  const allStepsCompleted = completedSteps.size === steps.length;

  const handleCommand = async (command: string) => {
    setIsExecuting(true);
    
    // Add command to history
    const commandLine = `user@terminal:~$ ${command}`;
    setTerminalHistory(prev => [...prev, commandLine]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if command matches expected
    const isCorrect = command.trim().toLowerCase() === currentStep.expectedCommand.toLowerCase();
    
    if (isCorrect) {
      // Success response
      const successMessage = currentStep.explanation || `Great! You used '${command}' correctly.`;
      setTerminalHistory(prev => [...prev, successMessage]);
      
      // Mark step as completed
      setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
      
      // Auto-advance to next step after a delay
      setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
          setShowHint(false);
        } else {
          // All steps completed
          setTerminalHistory(prev => [...prev, '🎉 Congratulations! Tutorial completed successfully!']);
          setTimeout(onComplete, 1500);
        }
      }, 1000);
    } else {
      // Error response
      setTerminalHistory(prev => [...prev, `Command '${command}' not recognized. Try again or use a hint.`]);
    }

    setIsExecuting(false);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setShowHint(false);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  if (allStepsCompleted) {
    return (
      <div className="text-center py-8">
        <div className="animate-fade-in">
          <div className="w-16 h-16 bg-terminal-green rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-orbitron font-bold text-terminal-green mb-2">
            Tutorial Complete!
          </h2>
          <p className="text-gray-300 mb-6">
            You've mastered the basics. Ready for real missions?
          </p>
          <button
            onClick={onComplete}
            className="btn-primary"
          >
            Start Your Quest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-neutral-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-orbitron font-bold text-white">Tutorial Progress</h2>
          <span className="text-sm text-gray-400">
            {completedSteps.size} / {steps.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-terminal-green h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStepIndex(index)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              completedSteps.has(index)
                ? 'bg-terminal-green text-black'
                : index === currentStepIndex
                ? 'bg-terminal-cyan text-black'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {completedSteps.has(index) ? '✓' : index + 1}
          </button>
        ))}
      </div>

      {/* Current Step Instructions */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-orbitron font-semibold text-xl text-white mb-2">
              Step {currentStepIndex + 1}: {currentStep.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {currentStep.description}
            </p>
            <div className="bg-terminal-green/10 border border-terminal-green/30 rounded-lg p-4">
              <p className="text-terminal-green font-mono">
                <strong>Task:</strong> {currentStep.prompt}
              </p>
            </div>
          </div>
          
          {isCurrentStepCompleted && (
            <div className="ml-4 text-terminal-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Hint Toggle */}
        {currentStep.hints.length > 0 && (
          <button
            onClick={toggleHint}
            className="text-terminal-cyan hover:text-cyan-300 text-sm transition-colors mb-4"
          >
            {showHint ? '🔍 Hide Hint' : '💡 Need a hint?'}
          </button>
        )}

        {/* Hint Display */}
        {showHint && (
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-4 animate-fade-in">
            <h4 className="text-terminal-cyan font-semibold mb-2">Hint:</h4>
            <ul className="space-y-1">
              {currentStep.hints.map((hint, index) => (
                <li key={index} className="text-cyan-300 text-sm">
                  • {hint}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Terminal */}
      <TerminalPreview
        history={terminalHistory}
        onCommand={handleCommand}
        isExecuting={isExecuting}
        placeholder={`Try: ${currentStep.expectedCommand}`}
      />

      {/* Navigation Controls */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isCurrentStepCompleted || currentStepIndex === steps.length - 1}
          className="px-4 py-2 bg-terminal-green text-black rounded hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TutorialStepper;
