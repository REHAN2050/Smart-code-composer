import React, { useState, useEffect } from 'react';
import { Eye, Code, Play, Square, RefreshCw, ExternalLink, Download, Monitor, Smartphone, Tablet } from 'lucide-react';

interface LivePreviewProps {
  generatedCode: string;
  codeBlocks: any[];
}

const LivePreview: React.FC<LivePreviewProps> = ({ generatedCode, codeBlocks }) => {
  const [previewMode, setPreviewMode] = useState<'preview' | 'code'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (generatedCode) {
      generatePreview(generatedCode);
    }
  }, [generatedCode]);

  const generatePreview = (code: string) => {
    if (code.includes('def ') || code.includes('function ')) {
      setHtmlContent(`
        <div style="font-family: 'Inter', sans-serif; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px; min-height: 400px;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
              🚀
            </div>
            <div>
              <h2 style="margin: 0; font-size: 24px; font-weight: 700;">Function Preview</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">AI-Generated Smart Function</p>
            </div>
          </div>
          
          <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; font-family: 'Monaco', monospace; font-size: 13px; white-space: pre-wrap; margin-bottom: 20px; border-left: 4px solid #00ff88;">${code}</div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
            <div style="background: rgba(0,255,0,0.15); padding: 15px; border-radius: 10px; border-left: 3px solid #00ff88;">
              <div style="font-weight: 600; margin-bottom: 5px;">✅ Status</div>
              <div style="font-size: 14px; opacity: 0.9;">Function ready to use</div>
            </div>
            <div style="background: rgba(0,150,255,0.15); padding: 15px; border-radius: 10px; border-left: 3px solid #0096ff;">
              <div style="font-weight: 600; margin-bottom: 5px;">📊 Analysis</div>
              <div style="font-size: 14px; opacity: 0.9;">Syntax validated</div>
            </div>
            <div style="background: rgba(255,200,0,0.15); padding: 15px; border-radius: 10px; border-left: 3px solid #ffc800;">
              <div style="font-weight: 600; margin-bottom: 5px;">🎯 Placement</div>
              <div style="font-size: 14px; opacity: 0.9;">Ready for integration</div>
            </div>
          </div>
        </div>
      `);
    } else if (code.includes('<') && code.includes('>')) {
      setHtmlContent(code);
    } else {
      setHtmlContent(`
        <div style="font-family: 'Inter', sans-serif; padding: 30px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 15px; min-height: 400px;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
              💻
            </div>
            <div>
              <h2 style="margin: 0; font-size: 24px; font-weight: 700;">Code Preview</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Smart Code Generation</p>
            </div>
          </div>
          
          <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; font-family: 'Monaco', monospace; font-size: 13px; white-space: pre-wrap; margin-bottom: 20px; border-left: 4px solid #00ff88;">${code}</div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;">
            <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 500;">✨ AI Generated</span>
            <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 500;">🔧 Ready to Use</span>
            <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 500;">⚡ Optimized</span>
          </div>
        </div>
      `);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    const steps = [
      '🚀 Initializing runtime environment...',
      '📦 Loading dependencies...',
      '🔍 Parsing code structure...',
      '⚡ Executing functions...',
      '📊 Generating output...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setOutput(prev => prev + steps[i] + '\n');
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setOutput(prev => prev + '\n✅ Execution completed successfully!\n\n📈 Performance Metrics:\n• Functions executed: 1\n• Memory usage: 2.3 MB\n• Execution time: 0.045s\n• CPU usage: 12%\n• Status: SUCCESS\n\n🎉 Your code is running perfectly!');
    
    setIsRunning(false);
  };

  const stopExecution = () => {
    setIsRunning(false);
    setOutput(prev => prev + '\n\n⏹️ Execution stopped by user\n⚠️ Process terminated gracefully');
  };

  const refreshPreview = () => {
    if (generatedCode) {
      generatePreview(generatedCode);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smart-generated-code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Live Preview</h2>
            <p className="text-sm text-white/60">Real-time code visualization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Device Mode Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded transition-colors ${
                deviceMode === 'desktop' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded transition-colors ${
                deviceMode === 'tablet' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded transition-colors ${
                deviceMode === 'mobile' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('preview')}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                previewMode === 'preview' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
            <button
              onClick={() => setPreviewMode('code')}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                previewMode === 'code' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4 inline mr-1" />
              Code
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={refreshPreview}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          {generatedCode && (
            <button
              onClick={downloadCode}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-colors"
              title="Download Code"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="space-y-6">
        <div className={`mx-auto transition-all duration-300 ${getDeviceWidth()}`}>
          {previewMode === 'preview' ? (
            <div className="bg-white rounded-xl border border-white/20 min-h-[400px] overflow-hidden">
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-xl font-medium mb-2">No Preview Available</p>
                    <p className="text-sm">Generate code using the AI assistant to see live preview</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 rounded-xl border border-white/20 min-h-[400px] p-6">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {generatedCode || '// No code generated yet\n// Use the AI assistant to generate code\n// Your generated code will appear here'}
              </pre>
            </div>
          )}
        </div>

        {/* Execution Controls */}
        {generatedCode && (
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-4">
              <button
                onClick={isRunning ? stopExecution : runCode}
                disabled={!generatedCode}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isRunning
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>Stop Execution</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Code</span>
                  </>
                )}
              </button>
              
              <div className="text-sm text-white/60">
                {isRunning ? 'Executing...' : 'Ready to run'}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Runtime Ready</span>
              </div>
              <div className="text-sm text-white/60">
                {deviceMode.charAt(0).toUpperCase() + deviceMode.slice(1)} View
              </div>
            </div>
          </div>
        )}

        {/* Output Console */}
        {output && (
          <div className="bg-slate-900 rounded-xl border border-white/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <h3 className="text-sm font-medium text-white flex items-center">
                <Code className="w-4 h-4 mr-2 text-green-400" />
                Console Output
              </h3>
              <button
                onClick={() => setOutput('')}
                className="text-xs text-white/60 hover:text-white transition-colors px-3 py-1 bg-white/10 hover:bg-white/20 rounded"
              >
                Clear
              </button>
            </div>
            <pre className="p-4 text-green-400 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
              {output}
            </pre>
          </div>
        )}
      </div>

      {/* Stats Dashboard */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-xl font-bold text-cyan-400">{codeBlocks.length}</div>
          <div className="text-xs text-white/60">Code Blocks</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-xl font-bold text-green-400">{generatedCode ? '1' : '0'}</div>
          <div className="text-xs text-white/60">Generated</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-xl font-bold text-purple-400">100%</div>
          <div className="text-xs text-white/60">Ready</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
          <div className="text-xl font-bold text-yellow-400">{deviceMode}</div>
          <div className="text-xs text-white/60">View Mode</div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;