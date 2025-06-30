import React, { useState, useCallback } from 'react';
import { Upload, Code, Brain, Download, AlertCircle, CheckCircle, FileText, Zap, Settings, Play, MessageCircle, Eye, Home, FolderOpen, Bot, Monitor, User, Menu, X, Instagram, MapPin, Info } from 'lucide-react';
import FileUploader from './components/FileUploader';
import CodeInput from './components/CodeInput';
import AnalysisResults from './components/AnalysisResults';
import CodeAnalyzer from './components/CodeAnalyzer';
import ProjectGenerator from './components/ProjectGenerator';
import ProgressTracker from './components/ProgressTracker';
import AIChat from './components/AIChat';
import LivePreview from './components/LivePreview';
import Dashboard from './components/Dashboard';
import AboutSection from './components/AboutSection';
import { codeAnalyzer, AnalysisResult } from './services/codeAnalyzer';

interface CodeBlock {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
}

interface Instruction {
  id: string;
  name: string;
  content: string;
  type: 'guide' | 'vision' | 'chat';
}

type Step = 'upload' | 'analyze' | 'generate' | 'download';
type ActiveView = 'dashboard' | 'upload' | 'chat' | 'preview' | 'profile' | 'about';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [codeAnalysisResult, setCodeAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');

  const navigationItems = [
    { id: 'dashboard', name: 'Command Center', icon: Home, color: 'cyan' },
    { id: 'upload', name: 'Code Matrix', icon: FolderOpen, color: 'emerald' },
    { id: 'chat', name: 'Neural Link', icon: Bot, color: 'purple' },
    { id: 'preview', name: 'Hologram', icon: Monitor, color: 'blue' },
    { id: 'about', name: 'About Tool', icon: Info, color: 'yellow' },
    { id: 'profile', name: 'Profile', icon: User, color: 'pink' }
  ];

  const handleFilesUploaded = useCallback((files: File[]) => {
    const newCodeBlocks: CodeBlock[] = [];
    const newInstructions: Instruction[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.md') || file.name.includes('readme') || file.name.includes('guide')) {
          newInstructions.push({
            id: Date.now() + Math.random().toString(),
            name: file.name,
            content,
            type: 'guide'
          });
        } else {
          newCodeBlocks.push({
            id: Date.now() + Math.random().toString(),
            name: file.name,
            content,
            type: file.type || 'text/plain',
            size: file.size
          });
        }

        setCodeBlocks(prev => [...prev, ...newCodeBlocks]);
        setInstructions(prev => [...prev, ...newInstructions]);
      };
      reader.readAsText(file);
    });
  }, []);

  const handleCodeSubmit = useCallback(async (code: string) => {
    setIsAnalyzingCode(true);
    setCodeAnalysisResult(null);

    try {
      const files = codeBlocks.map(block => ({
        name: block.name,
        content: block.content,
        path: block.name,
        type: block.type
      }));

      const result = await codeAnalyzer.analyzeCodePlacement({
        codeSnippet: code,
        files
      });

      setCodeAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzingCode(false);
    }
  }, [codeBlocks]);

  const handleCodeGenerated = useCallback((code: string) => {
    setGeneratedCode(code);
  }, []);

  const handleAnalyze = useCallback(async () => {
    setIsProcessing(true);
    setCurrentStep('analyze');
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const mockResult: any = {
      blocks: codeBlocks,
      connections: codeBlocks.map((block, index) => ({
        from: block.id,
        to: codeBlocks[(index + 1) % codeBlocks.length]?.id || block.id,
        type: 'dependency'
      })),
      errors: [
        { id: '1', message: 'Missing import statement in utils.js', severity: 'error' },
        { id: '2', message: 'Unused variable "temp" in main.py', severity: 'warning' },
        { id: '3', message: 'Consider adding error handling', severity: 'info' }
      ],
      suggestions: [
        'Add input validation to prevent XSS attacks',
        'Consider using environment variables for configuration',
        'Add unit tests for critical functions'
      ],
      missingParts: [
        'Database connection configuration',
        'Error handling middleware',
        'API route definitions'
      ]
    };

    setAnalysisResult(mockResult);
    setIsProcessing(false);
  }, [codeBlocks]);

  const handleGenerate = useCallback(async () => {
    setIsProcessing(true);
    setCurrentStep('generate');
    setProgress(0);

    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    setCurrentStep('download');
    setIsProcessing(false);
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob(['Mock generated project files'], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const resetApp = useCallback(() => {
    setCurrentStep('upload');
    setCodeBlocks([]);
    setInstructions([]);
    setAnalysisResult(null);
    setCodeAnalysisResult(null);
    setProgress(0);
    setIsProcessing(false);
    setIsAnalyzingCode(false);
    setGeneratedCode('');
    setActiveView('dashboard');
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            codeBlocks={codeBlocks}
            instructions={instructions}
            analysisResult={analysisResult}
            generatedCode={generatedCode}
            onNavigate={setActiveView}
          />
        );
      
      case 'upload':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FileUploader onFilesUploaded={handleFilesUploaded} />
              <CodeInput onCodeSubmit={handleCodeSubmit} isAnalyzing={isAnalyzingCode} />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <AnalysisResults result={codeAnalysisResult} isAnalyzing={isAnalyzingCode} />
              <CodeAnalyzer 
                analysisResult={analysisResult} 
                onAnalyze={handleAnalyze}
                canAnalyze={codeBlocks.length > 0}
                isProcessing={isProcessing && currentStep === 'analyze'}
              />
            </div>

            <ProjectGenerator 
              onGenerate={handleGenerate}
              onDownload={handleDownload}
              canGenerate={analysisResult !== null && currentStep !== 'upload'}
              canDownload={currentStep === 'download'}
              isProcessing={isProcessing && currentStep === 'generate'}
            />
          </div>
        );
      
      case 'chat':
        return (
          <div className="max-w-6xl mx-auto">
            <AIChat onCodeGenerated={handleCodeGenerated} codeBlocks={codeBlocks} />
          </div>
        );
      
      case 'preview':
        return (
          <div className="max-w-6xl mx-auto">
            <LivePreview generatedCode={generatedCode} codeBlocks={codeBlocks} />
          </div>
        );

      case 'about':
        return (
          <div className="max-w-6xl mx-auto">
            <AboutSection />
          </div>
        );
      
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 relative">
                    <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                      <User className="w-20 h-20 text-cyan-400" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                      🇮🇳
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    REHAN
                  </h1>
                  <div className="text-cyan-300 text-lg mb-2 font-mono">[ NEURAL_ARCHITECT ]</div>
                  <p className="text-gray-400 mb-6">Smart Code Composer Developer</p>
                  
                  <div className="flex items-center justify-center space-x-8 mb-8">
                    <div className="flex items-center space-x-2 text-cyan-300">
                      <MapPin className="w-5 h-5" />
                      <span className="font-mono">INDIA.exe 🇮🇳</span>
                    </div>
                    <a 
                      href="https://instagram.com/brndxanm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="font-mono">@brndxanm</span>
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-black/60 rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="text-4xl font-bold text-cyan-400 font-mono">{codeBlocks.length}</div>
                        <div className="text-sm text-gray-400 font-mono">CODE_BLOCKS</div>
                      </div>
                    </div>
                    <div className="bg-black/60 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="text-4xl font-bold text-purple-400 font-mono">{instructions.length}</div>
                        <div className="text-sm text-gray-400 font-mono">INSTRUCTIONS</div>
                      </div>
                    </div>
                    <div className="bg-black/60 rounded-2xl p-6 border border-pink-500/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="text-4xl font-bold text-pink-400 font-mono">{generatedCode ? '1' : '0'}</div>
                        <div className="text-sm text-gray-400 font-mono">GENERATED</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">[ SYSTEM_INFO ]</h3>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <div className="flex items-start space-x-3">
                        <span className="text-cyan-400 font-mono">{'>'}</span>
                        <p>Passionate neural architect from India 🇮🇳 crafting next-gen code composition systems.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-purple-400 font-mono">{'>'}</span>
                        <p>Building AI-powered solutions to revolutionize coding efficiency and accessibility.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-pink-400 font-mono">{'>'}</span>
                        <p>Follow the digital journey on Instagram @brndxanm for cutting-edge updates!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-500 bg-black/60 backdrop-blur-xl border-r border-cyan-500/30 flex flex-col relative overflow-hidden`}>
          {/* Sidebar Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent"></div>
          
          {/* Logo */}
          <div className="relative z-10 p-6 border-b border-cyan-500/30">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 relative flex items-center justify-center">
                  <img 
                    src="/file_00000000ad606230832c31a8ccabc924.png" 
                    alt="Smart Code Composer Logo" 
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xs animate-pulse">
                    🇮🇳
                  </div>
                </div>
                <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              </div>
              {sidebarOpen && (
                <div className="animate-fadeIn">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
                    SMART_CODE
                  </h1>
                  <p className="text-xs text-cyan-300 font-mono">by REHAN.exe</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 relative z-10">
            <div className="space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as ActiveView)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    activeView === item.id
                      ? `bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/10 border border-${item.color}-500/50 shadow-lg shadow-${item.color}-500/25`
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                  }`}
                >
                  {activeView === item.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent animate-pulse`}></div>
                  )}
                  <div className="relative z-10 flex items-center space-x-4">
                    <item.icon className={`w-6 h-6 ${
                      activeView === item.id ? `text-${item.color}-400` : 'group-hover:text-white'
                    } transition-colors`} />
                    {sidebarOpen && (
                      <span className={`font-medium font-mono ${
                        activeView === item.id ? `text-${item.color}-300` : 'group-hover:text-white'
                      } transition-colors`}>
                        {item.name}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </nav>

          {/* Creator Info & Sidebar Toggle */}
          <div className="relative z-10 p-4 border-t border-cyan-500/30 space-y-4">
            {sidebarOpen && (
              <div className="text-center animate-fadeIn">
                <div className="text-xs text-gray-500 mb-2 font-mono">[ CREATOR ]</div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
                    <User className="w-4 h-4 text-white" />
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-sm text-white font-medium font-mono">REHAN 🇮🇳</span>
                    <a 
                      href="https://instagram.com/brndxanm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-xs text-pink-400 hover:text-pink-300 transition-colors font-mono"
                    >
                      @brndxanm
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-white transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/50 group"
            >
              <div className="relative">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-cyan-500/30 backdrop-blur-xl bg-black/40 p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                  {activeView === 'dashboard' && '[ COMMAND_CENTER ]'}
                  {activeView === 'upload' && '[ CODE_MATRIX ]'}
                  {activeView === 'chat' && '[ NEURAL_LINK ]'}
                  {activeView === 'preview' && '[ HOLOGRAM ]'}
                  {activeView === 'about' && '[ ABOUT_TOOL ]'}
                  {activeView === 'profile' && '[ USER_PROFILE ]'}
                </h2>
                <p className="text-sm text-gray-400 font-mono mt-1">
                  {activeView === 'dashboard' && 'System overview and mission control'}
                  {activeView === 'upload' && 'Upload and analyze code fragments'}
                  {activeView === 'chat' && 'AI neural network interface'}
                  {activeView === 'preview' && 'Holographic code visualization'}
                  {activeView === 'about' && 'Tool information and creator details'}
                  {activeView === 'profile' && 'User data and statistics'}
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-sm text-cyan-300 font-mono">
                  <span className="text-gray-500">BLOCKS:</span> {codeBlocks.length} 
                  <span className="text-gray-500 ml-4">GUIDES:</span> {instructions.length}
                </div>
                <button
                  onClick={resetApp}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 text-white text-sm transition-all duration-300 border border-red-500/30 hover:border-red-400/50 font-mono group"
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span>RESET</span>
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Progress Tracker - Only show on upload page */}
          {activeView === 'upload' && (
            <ProgressTracker currentStep={currentStep} progress={progress} isProcessing={isProcessing} />
          )}

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto relative">
            <div className="relative z-10">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;