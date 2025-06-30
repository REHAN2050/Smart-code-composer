import React from 'react';
import { 
  Code, 
  FileText, 
  Brain, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Play,
  Download,
  Eye,
  FolderOpen,
  Instagram,
  MapPin,
  User,
  Activity,
  Cpu,
  Database,
  Shield,
  Info
} from 'lucide-react';

interface DashboardProps {
  codeBlocks: any[];
  instructions: any[];
  analysisResult: any;
  generatedCode: string;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  codeBlocks,
  instructions,
  analysisResult,
  generatedCode,
  onNavigate
}) => {
  const stats = [
    {
      title: 'CODE_BLOCKS',
      value: codeBlocks.length,
      icon: Code,
      color: 'cyan',
      change: '+12%',
      status: 'ACTIVE'
    },
    {
      title: 'INSTRUCTIONS',
      value: instructions.length,
      icon: FileText,
      color: 'emerald',
      change: '+8%',
      status: 'READY'
    },
    {
      title: 'NEURAL_SCAN',
      value: analysisResult ? 1 : 0,
      icon: Brain,
      color: 'purple',
      change: analysisResult ? '+100%' : '0%',
      status: analysisResult ? 'COMPLETE' : 'PENDING'
    },
    {
      title: 'GENERATED',
      value: generatedCode ? 1 : 0,
      icon: Zap,
      color: 'pink',
      change: generatedCode ? '+100%' : '0%',
      status: generatedCode ? 'SUCCESS' : 'STANDBY'
    }
  ];

  const quickActions = [
    {
      title: 'CODE_MATRIX',
      description: 'Upload and analyze code fragments',
      icon: FolderOpen,
      color: 'emerald',
      action: () => onNavigate('upload'),
      status: 'READY'
    },
    {
      title: 'NEURAL_LINK',
      description: 'Connect with AI consciousness',
      icon: Brain,
      color: 'purple',
      action: () => onNavigate('chat'),
      status: 'ONLINE'
    },
    {
      title: 'HOLOGRAM',
      description: 'Visualize code in 3D space',
      icon: Eye,
      color: 'cyan',
      action: () => onNavigate('preview'),
      status: 'ACTIVE'
    },
    {
      title: 'ABOUT_TOOL',
      description: 'Learn about Smart Code Composer',
      icon: Info,
      color: 'yellow',
      action: () => onNavigate('about'),
      status: 'INFO'
    }
  ];

  const systemMetrics = [
    { label: 'CPU_USAGE', value: '23%', icon: Cpu, color: 'cyan' },
    { label: 'MEMORY', value: '1.2GB', icon: Database, color: 'purple' },
    { label: 'SECURITY', value: 'SECURE', icon: Shield, color: 'emerald' },
    { label: 'UPTIME', value: '99.9%', icon: Activity, color: 'pink' }
  ];

  return (
    <div className="space-y-8 relative">
      {/* Welcome Section with Gaming Style */}
      <div className="relative overflow-hidden bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-mono text-cyan-400">[ SYSTEM_ONLINE ]</div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl font-bold font-mono">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                WELCOME_BACK
              </span>
            </h1>
            
            <div className="text-2xl font-mono text-white">
              <span className="text-cyan-400">USER:</span> REHAN 🇮🇳
            </div>
            
            <p className="text-gray-400 font-mono text-lg">
              Neural interface ready for code composition
            </p>
            
            <div className="flex items-center space-x-8 text-sm font-mono">
              <div className="flex items-center space-x-2 text-cyan-300">
                <MapPin className="w-4 h-4" />
                <span>LOCATION: INDIA.exe 🇮🇳</span>
              </div>
              <a 
                href="https://instagram.com/brndxanm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
                <span>SOCIAL: @brndxanm</span>
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-cyan-400" />
                </div>
              </div>
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-lg animate-bounce">
                🇮🇳
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="relative overflow-hidden bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 group hover:border-cyan-400/50 transition-all duration-300">
            {/* Hologram Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/10 border border-${stat.color}-500/30`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className={`text-xs px-3 py-1 rounded-full bg-${stat.color}-500/20 text-${stat.color}-300 font-mono border border-${stat.color}-500/30`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className={`text-3xl font-bold text-${stat.color}-400 font-mono`}>{stat.value}</div>
                <div className="text-sm text-gray-400 font-mono">{stat.title}</div>
                <div className={`text-xs text-${stat.color}-300 font-mono`}>[ {stat.status} ]</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Metrics */}
      <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-6 font-mono flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          [ SYSTEM_METRICS ]
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <div key={index} className={`bg-black/40 rounded-xl p-4 border border-${metric.color}-500/30 text-center`}>
              <metric.icon className={`w-6 h-6 text-${metric.color}-400 mx-auto mb-2`} />
              <div className={`text-lg font-bold text-${metric.color}-400 font-mono`}>{metric.value}</div>
              <div className="text-xs text-gray-400 font-mono">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-mono flex items-center">
          <Zap className="w-6 h-6 mr-3" />
          [ QUICK_ACCESS ]
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`relative overflow-hidden bg-black/60 backdrop-blur-xl border border-${action.color}-500/30 rounded-2xl p-8 text-left hover:border-${action.color}-400/50 transition-all duration-300 group`}
            >
              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${action.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r from-${action.color}-500/20 to-${action.color}-600/10 border border-${action.color}-500/30 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-8 h-8 text-${action.color}-400`} />
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full bg-${action.color}-500/20 text-${action.color}-300 font-mono border border-${action.color}-500/30`}>
                    [ {action.status} ]
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{action.title}</h3>
                <p className="text-gray-400 text-sm mb-6 font-mono">{action.description}</p>
                
                <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors font-mono">
                  <span>EXECUTE</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Blocks Matrix */}
      {codeBlocks.length > 0 && (
        <div className="bg-black/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-emerald-400 font-mono flex items-center">
              <Code className="w-5 h-5 mr-2" />
              [ CODE_MATRIX ] ({codeBlocks.length})
            </h3>
            <button
              onClick={() => onNavigate('upload')}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-mono hover:scale-110 transform duration-200"
            >
              VIEW_ALL {'>>'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {codeBlocks.slice(0, 6).map((block, index) => (
              <div key={index} className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-bold text-white font-mono truncate">{block.name}</div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-xs text-emerald-300 font-mono">
                  SIZE: {(block.size / 1024).toFixed(1)} KB
                </div>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  [ LOADED ]
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creator Section */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                <User className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                [ CREATOR ]
              </h3>
              <p className="text-gray-400 text-sm font-mono">Neural Architect • India 🇮🇳</p>
            </div>
          </div>
          
          <div className="text-lg font-bold text-white mb-4 font-mono">REHAN.exe</div>
          
          <div className="flex items-center justify-center space-x-8 text-sm font-mono">
            <a 
              href="https://instagram.com/brndxanm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW: @brndxanm</span>
            </a>
            <div className="flex items-center space-x-2 text-cyan-400">
              <MapPin className="w-4 h-4" />
              <span>MADE_IN: INDIA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;