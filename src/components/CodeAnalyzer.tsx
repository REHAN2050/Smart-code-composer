import React from 'react';
import { Brain, AlertCircle, CheckCircle, Info, Code, Link, Bug, Lightbulb } from 'lucide-react';

interface CodeBlock {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
}

interface AnalysisResult {
  blocks: CodeBlock[];
  connections: { from: string; to: string; type: string }[];
  errors: { id: string; message: string; severity: 'error' | 'warning' | 'info' }[];
  suggestions: string[];
  missingParts: string[];
}

interface CodeAnalyzerProps {
  analysisResult: AnalysisResult | null;
  onAnalyze: () => void;
  canAnalyze: boolean;
  isProcessing: boolean;
}

const CodeAnalyzer: React.FC<CodeAnalyzerProps> = ({
  analysisResult,
  onAnalyze,
  canAnalyze,
  isProcessing
}) => {
  const getSeverityIcon = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-purple-400" />
        Code Analysis
      </h2>

      {/* Analysis Button */}
      <div className="mb-6">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze || isProcessing}
          className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
            canAnalyze && !isProcessing
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing Code...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Analyze Code Blocks</span>
            </div>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Block Connections */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Link className="w-4 h-4 mr-2 text-green-400" />
              Block Connections
            </h3>
            <div className="space-y-2">
              {analysisResult.connections.map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="text-sm text-white">
                    {analysisResult.blocks.find(b => b.id === connection.from)?.name || 'Unknown'}
                  </div>
                  <div className="text-xs text-green-300 px-2 py-1 rounded-full bg-green-500/20">
                    {connection.type}
                  </div>
                  <div className="text-sm text-white">
                    {analysisResult.blocks.find(b => b.id === connection.to)?.name || 'Unknown'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Errors and Issues */}
          {analysisResult.errors.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <Bug className="w-4 h-4 mr-2 text-red-400" />
                Issues Found ({analysisResult.errors.length})
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analysisResult.errors.map((error) => (
                  <div key={error.id} className={`p-3 rounded-lg border ${getSeverityColor(error.severity)}`}>
                    <div className="flex items-start space-x-2">
                      {getSeverityIcon(error.severity)}
                      <div>
                        <p className="text-sm text-white font-medium">{error.message}</p>
                        <p className="text-xs text-white/60 mt-1 capitalize">{error.severity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {analysisResult.suggestions.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                AI Suggestions
              </h3>
              <div className="space-y-2">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-sm text-yellow-100">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Parts */}
          {analysisResult.missingParts.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-400" />
                Missing Components
              </h3>
              <div className="space-y-2">
                {analysisResult.missingParts.map((part, index) => (
                  <div key={index} className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <p className="text-sm text-orange-100">{part}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Summary */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-200">{analysisResult.blocks.length} blocks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-200">{analysisResult.connections.length} connections</span>
                </div>
              </div>
              <div className="text-purple-200">
                Analysis Complete
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder when no analysis */}
      {!analysisResult && !isProcessing && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-white/60 mb-2">Ready to analyze your code blocks</p>
          <p className="text-sm text-white/40">Upload files and click analyze to get started</p>
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzer;