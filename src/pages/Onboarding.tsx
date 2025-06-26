
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import TutorialStepper from '@/components/TutorialStepper';
import { TutorialStep } from '@/lib/types';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const tutorialSteps: TutorialStep[] = [
    {
      id: 'step1',
      title: 'List Directory Contents',
      description: 'Your first mission is to see what files and folders are in your current location. Use the ls command to list directory contents.',
      prompt: 'List all files in the current directory',
      expectedCommand: 'ls',
      hints: [
        'Type "ls" and press Enter',
        'This command shows files and directories in your current location',
        'ls stands for "list"'
      ],
      explanation: 'Perfect! The ls command shows you what files and directories are available. This is your window into the file system.'
    },
    {
      id: 'step2',
      title: 'Show Hidden Files',
      description: 'Many important system files are hidden from normal view. Learn to reveal them using special flags.',
      prompt: 'List all files including hidden ones',
      expectedCommand: 'ls -a',
      hints: [
        'Use the -a flag with ls',
        'The -a flag means "all" files',
        'Hidden files start with a dot (.)'
      ],
      explanation: 'Excellent! Hidden files (starting with .) are now visible. These often contain important configuration data.'
    },
    {
      id: 'step3',
      title: 'Navigate Directories',
      description: 'Movement is essential in the terminal. Learn to change your current directory using the cd command.',
      prompt: 'Change to the documents directory',
      expectedCommand: 'cd documents',
      hints: [
        'Use cd followed by the directory name',
        'cd stands for "change directory"',
        'Make sure to type the exact directory name'
      ],
      explanation: 'Great navigation! You can now move through the file system. Use "cd .." to go up one level.'
    },
    {
      id: 'step4',
      title: 'Find Your Location',
      description: 'When exploring file systems, you need to know where you are. The pwd command shows your current path.',
      prompt: 'Show your current directory path',
      expectedCommand: 'pwd',
      hints: [
        'Type "pwd" to see where you are',
        'pwd stands for "print working directory"',
        'This shows your full path in the system'
      ],
      explanation: 'Perfect! Now you know exactly where you are in the file system hierarchy.'
    },
    {
      id: 'step5',
      title: 'Read File Contents',
      description: 'The final basic skill is reading file contents. Use the cat command to display what\'s inside files.',
      prompt: 'Display the contents of welcome.txt',
      expectedCommand: 'cat welcome.txt',
      hints: [
        'Use cat followed by the filename',
        'cat stands for "concatenate" and can display file contents',
        'Make sure the file exists in your current directory'
      ],
      explanation: 'Awesome! You can now read files. These basic commands are the foundation of terminal mastery!'
    }
  ];

  const handleComplete = () => {
    // Mark onboarding as completed
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.onboardingComplete = true;
    localStorage.setItem('user', JSON.stringify(user));
    
    // Navigate to missions
    navigate('/missions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
      <Navigation />
      
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              <span className="text-terminal-green">Terminal</span> Bootcamp
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master the essential commands through hands-on practice. These skills will be your foundation for every hacker challenge ahead.
            </p>
          </div>

          {/* Tutorial Stepper */}
          <TutorialStepper
            steps={tutorialSteps}
            onComplete={handleComplete}
          />

          {/* Help Section */}
          <div className="mt-12 bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <h3 className="font-orbitron font-semibold text-lg text-white mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-terminal-green font-semibold mb-2">Basic Commands</h4>
                <ul className="space-y-1 text-gray-300">
                  <li><span className="font-mono text-terminal-green">ls</span> - List files and directories</li>
                  <li><span className="font-mono text-terminal-green">cd</span> - Change directory</li>
                  <li><span className="font-mono text-terminal-green">pwd</span> - Show current directory</li>
                  <li><span className="font-mono text-terminal-green">cat</span> - Display file contents</li>
                </ul>
              </div>
              <div>
                <h4 className="text-terminal-cyan font-semibold mb-2">Pro Tips</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Press Tab to auto-complete commands</li>
                  <li>• Use Up/Down arrows for command history</li>
                  <li>• Add -a to ls to see hidden files</li>
                  <li>• Type exactly as shown for best results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
