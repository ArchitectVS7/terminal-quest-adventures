
import { Mission, MissionDetail, CommandResponse, User, AuthCredentials } from './types';

// Mock API functions - in production these would connect to a real backend
export class ApiClient {
  private baseUrl = '/api';

  async getMissions(): Promise<Mission[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'm1',
        title: 'File System Basics',
        difficulty: 'Easy',
        description: 'Learn to navigate directories and list files',
        category: 'Navigation',
        estimatedTime: '10 min',
        completionRate: 92
      },
      {
        id: 'm2',
        title: 'Finding Hidden Files',
        difficulty: 'Easy',
        description: 'Discover hidden configuration files',
        category: 'Discovery',
        estimatedTime: '15 min',
        completionRate: 78
      },
      {
        id: 'm3',
        title: 'Network Reconnaissance',
        difficulty: 'Medium',
        description: 'Use network tools to gather intelligence',
        category: 'Network',
        estimatedTime: '25 min',
        completionRate: 65
      },
      {
        id: 'm4',
        title: 'Log Analysis Challenge',
        difficulty: 'Medium',
        description: 'Parse system logs to find security breaches',
        category: 'Analysis',
        estimatedTime: '30 min',
        completionRate: 54
      },
      {
        id: 'm5',
        title: 'Advanced Shell Scripting',
        difficulty: 'Hard',
        description: 'Create complex automation scripts',
        category: 'Scripting',
        estimatedTime: '45 min',
        completionRate: 32
      },
      {
        id: 'm6',
        title: 'System Penetration Test',
        difficulty: 'Hard',
        description: 'Comprehensive security assessment',
        category: 'Security',
        estimatedTime: '60 min',
        completionRate: 28
      }
    ];
  }

  async getMissionDetail(id: string): Promise<MissionDetail> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const missions: Record<string, MissionDetail> = {
      'm1': {
        id: 'm1',
        title: 'File System Basics',
        description: 'Welcome to your first mission! Learn to navigate the file system using basic commands like ls, cd, and pwd.',
        difficulty: 'Easy',
        category: 'Navigation',
        estimatedTime: '10 min',
        objectives: [
          'Use ls to list directory contents',
          'Navigate to the documents folder using cd',
          'Find the secret.txt file',
          'Display the contents of secret.txt'
        ],
        hints: [
          'Try ls -a to see hidden files',
          'Use cd documents to enter the documents folder',
          'The cat command displays file contents'
        ],
        initialState: {
          currentDirectory: '/home/user',
          files: {
            '/home/user': null,
            '/home/user/documents': null,
            '/home/user/downloads': null,
            '/home/user/.bashrc': 'export PATH=$PATH:/usr/local/bin',
            '/home/user/documents/secret.txt': 'Congratulations! You found the secret file. Mission complete!',
            '/home/user/documents/readme.md': '# Welcome\nThis is your home directory.',
            '/home/user/downloads/file1.zip': 'Binary data...'
          },
          history: [],
          environment: {
            USER: 'user',
            HOME: '/home/user',
            PATH: '/usr/bin:/bin:/usr/local/bin'
          }
        }
      },
      'm2': {
        id: 'm2',
        title: 'Finding Hidden Files',
        description: 'System administrators often hide important configuration files. Learn to find and examine these hidden files.',
        difficulty: 'Easy',
        category: 'Discovery',
        estimatedTime: '15 min',
        objectives: [
          'Find all hidden files in the home directory',
          'Examine the .config directory',
          'Locate the database credentials in .env',
          'Extract the password from the configuration'
        ],
        hints: [
          'Hidden files start with a dot (.)',
          'Use ls -la to see all files including hidden ones',
          'Check inside the .config directory',
          'Look for .env files which often contain credentials'
        ],
        initialState: {
          currentDirectory: '/home/user',
          files: {
            '/home/user': null,
            '/home/user/.config': null,
            '/home/user/.bashrc': 'export PATH=$PATH:/usr/local/bin',
            '/home/user/.profile': 'source ~/.bashrc',
            '/home/user/.env': 'DB_PASSWORD=h4ck3r_p@ssw0rd\nAPI_KEY=secret123',
            '/home/user/.config/app.conf': 'debug=true\nlog_level=info',
            '/home/user/public_file.txt': 'This is a public file'
          },
          history: [],
          environment: {
            USER: 'user',
            HOME: '/home/user',
            PATH: '/usr/bin:/bin:/usr/local/bin'
          }
        }
      }
    };

    const mission = missions[id];
    if (!mission) {
      throw new Error(`Mission ${id} not found`);
    }

    return mission;
  }

  async executeCommand(missionId: string, command: string, currentState: any): Promise<CommandResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simple command simulation
    const parts = command.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'ls':
        const showHidden = args.includes('-a') || args.includes('-la');
        const longFormat = args.includes('-l') || args.includes('-la');
        const directory = args.find(arg => !arg.startsWith('-')) || currentState.currentDirectory;
        
        const files = Object.keys(currentState.files)
          .filter(path => path.startsWith(directory + '/') && path !== directory)
          .filter(path => showHidden || !path.split('/').pop()?.startsWith('.'))
          .map(path => path.replace(directory + '/', '').split('/')[0])
          .filter((file, index, arr) => arr.indexOf(file) === index);

        return {
          output: files.join(longFormat ? '\n' : '  '),
          success: true
        };

      case 'cd':
        const targetDir = args[0] || '/home/user';
        const newPath = targetDir.startsWith('/') ? targetDir : `${currentState.currentDirectory}/${targetDir}`;
        
        if (currentState.files[newPath] === null) {
          return {
            output: '',
            success: true,
            newState: { currentDirectory: newPath }
          };
        } else {
          return {
            output: `cd: ${targetDir}: No such file or directory`,
            success: false
          };
        }

      case 'pwd':
        return {
          output: currentState.currentDirectory,
          success: true
        };

      case 'cat':
        const filePath = args[0];
        const fullPath = filePath?.startsWith('/') ? filePath : `${currentState.currentDirectory}/${filePath}`;
        
        if (currentState.files[fullPath] && currentState.files[fullPath] !== null) {
          return {
            output: currentState.files[fullPath],
            success: true
          };
        } else {
          return {
            output: `cat: ${filePath}: No such file or directory`,
            success: false
          };
        }

      default:
        return {
          output: `${cmd}: command not found`,
          success: false
        };
    }
  }

  async authenticate(credentials: AuthCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication
    if (credentials.email && credentials.password) {
      return {
        id: 'user123',
        email: credentials.email,
        name: 'Terminal Hacker',
        completedMissions: ['m1'],
        preferences: {
          theme: 'default',
          fontSize: 'medium',
          highContrast: false,
          soundEnabled: true
        }
      };
    }
    
    throw new Error('Invalid credentials');
  }
}

export const api = new ApiClient();
