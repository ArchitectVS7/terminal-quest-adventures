
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AuthForm from '@/components/AuthForm';
import { AuthMode, AuthCredentials } from '@/lib/types';
import { api } from '@/lib/api';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');

  const handleGetStarted = () => {
    setShowAuth(true);
    setAuthMode('signup');
  };

  const handleAuth = async (credentials: AuthCredentials) => {
    try {
      const user = await api.authenticate(credentials);
      console.log('Authentication successful:', user);
      
      // Simulate storing user session
      localStorage.setItem('user', JSON.stringify(user));
      
      // Navigate to onboarding for new users, missions for returning users
      if (authMode === 'signup' || user.completedMissions.length === 0) {
        navigate('/onboarding');
      } else {
        navigate('/missions');
      }
    } catch (error) {
      throw error; // Re-throw to let AuthForm handle the error display
    }
  };

  const handleModeSwitch = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-terminal-dark to-black">
      <Navigation />
      
      <main>
        {!showAuth ? (
          <HeroSection
            headline="Master the Command Line Through Epic Adventures"
            subtext="Join thousands of Campus Coders conquering realistic CLI challenges in our cyberpunk universe. No boring tutorials—just pure hacker-style learning."
            ctaLabel="Start Your Quest"
            onCTAClick={handleGetStarted}
          />
        ) : (
          <section className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              <AuthForm
                mode={authMode}
                onSubmit={handleAuth}
                onModeSwitch={handleModeSwitch}
              />
              
              {/* Back to Hero */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAuth(false)}
                  className="text-gray-400 hover:text-terminal-cyan transition-colors text-sm"
                >
                  ← Back to main page
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Features Section */}
      {!showAuth && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
                Why Terminal Quest?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Unlike traditional tutorials, we throw you into immersive scenarios where every command matters and every solution feels like a real hack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="mission-card group text-center animate-fade-in">
                <div className="w-16 h-16 bg-terminal-green/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-terminal-green/30 transition-colors">
                  <svg className="w-8 h-8 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">Realistic File Systems</h3>
                <p className="text-gray-300">
                  Navigate authentic directory structures with hidden files, permissions, and secrets—just like real systems.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="mission-card group text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-terminal-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-terminal-cyan/30 transition-colors">
                  <svg className="w-8 h-8 text-terminal-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">Progressive Missions</h3>
                <p className="text-gray-300">
                  Start with basic navigation, advance to log analysis, and master complex shell scripting through engaging scenarios.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="mission-card group text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-3">Instant Feedback</h3>
                <p className="text-gray-300">
                  Get immediate validation with detailed success indicators and helpful hints when you're stuck.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!showAuth && (
        <section className="py-20 px-4 border-t border-neutral-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">
              Ready to Become a <span className="text-terminal-green">CLI Master</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the ranks of elite Campus Coders who've mastered the terminal through our immersive quest system.
            </p>
            <button
              onClick={handleGetStarted}
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200"
            >
              Begin Your Journey
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
