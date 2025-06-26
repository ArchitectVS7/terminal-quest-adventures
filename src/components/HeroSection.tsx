
import React from 'react';

export interface HeroSectionProps {
  headline: string;
  subtext: string;
  ctaLabel: string;
  onCTAClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subtext,
  ctaLabel,
  onCTAClick
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-terminal-dark via-neutral-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2339FF14\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 animate-fade-in">
          <span className="text-terminal-green">Terminal</span>{' '}
          <span className="text-white">Quest</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
          {subtext}
        </p>

        {/* Terminal Preview */}
        <div className="terminal-window max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="terminal-header">
            <div className="terminal-button bg-red-500"></div>
            <div className="terminal-button bg-yellow-500"></div>
            <div className="terminal-button bg-green-500"></div>
            <span className="text-gray-400 text-xs ml-3">Terminal Quest - Learn CLI Through Adventure</span>
          </div>
          <div className="terminal-content">
            <div className="space-y-2">
              <div className="flex">
                <span className="terminal-prompt">user@terminalquest:~$ </span>
                <span className="text-white ml-1">ls -la</span>
              </div>
              <div className="text-gray-400 text-sm">
                drwxr-xr-x 3 user user 4096 Jan 15 10:30 missions<br/>
                drwxr-xr-x 2 user user 4096 Jan 15 10:29 .secrets<br/>
                -rw-r--r-- 1 user user  128 Jan 15 10:28 welcome.txt
              </div>
              <div className="flex">
                <span className="terminal-prompt">user@terminalquest:~$ </span>
                <span className="text-white ml-1">cat welcome.txt</span>
              </div>
              <div className="text-terminal-green text-sm">
                Welcome to Terminal Quest! Your hacker journey begins now...
              </div>
              <div className="flex">
                <span className="terminal-prompt">user@terminalquest:~$ </span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onCTAClick}
          className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200 animate-glow"
          style={{ animationDelay: '0.6s' }}
        >
          {ctaLabel}
        </button>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-center">
            <div className="w-12 h-12 bg-terminal-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Realistic CLI</h3>
            <p className="text-gray-400 text-sm">Experience authentic terminal environments with real command behavior</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-terminal-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-terminal-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Hacker Challenges</h3>
            <p className="text-gray-400 text-sm">Solve cyberpunk-themed puzzles that teach real-world skills</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-white mb-2">Progress Tracking</h3>
            <p className="text-gray-400 text-sm">Monitor your command mastery with detailed analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
