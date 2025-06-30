import React from 'react';
import { MapPin, AlertTriangle, CheckCircle, Package, Import, Code2 } from 'lucide-react';
import { AnalysisResult } from '../services/codeAnalyzer';

interface AnalysisResultsProps {
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, isAnalyzing }) => {
  if (isAnalyzing) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/60 mb-2">Analyzing your code...</p>
          <p className="text-sm text-white/40">Finding optimal placement and detecting issues</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-400" />
          Analysis Results
        </h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-white/60 mb-2">Ready to analyze your code</p>
          <p className="text-sm text-white/40">Enter code in the input area and click analyze</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-400" />
        Analysis Results
      </h2>

      <div className="space-y-6">
        {/* Main Suggestion */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
            Placement Suggestions
          </h3>
          <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-white whitespace-pre-wrap">
            {result.suggestion}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-blue-200">
              Confidence: <span className="font-semibold">{result.confidence}%</span>
            </div>
            <div className="text-sm text-blue-200">
              Best placement: <span className="font-semibold">{result.placement}</span>
            </div>
          </div>
        </div>

        {/* Errors */}
        {result.errors.length > 0 && (
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Issues Found ({result.errors.length})
            </h3>
            <div className="space-y-2">
              {result.errors.map((error, index) => (
                <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-red-500/20">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                      error.severity === 'error' ? 'text-red-400' :
                      error.severity === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                    }`} />
                    <div>
                      <p className="text-sm text-white font-medium">
                        Line {error.line}: {error.message}
                      </p>
                      <p className="text-xs text-white/60 mt-1 capitalize">{error.severity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dependencies */}
        {result.dependencies.length > 0 && (
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2 text-green-400" />
              Dependencies Found
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.dependencies.map((dep, index) => (
                <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Imports */}
        {result.missingImports.length > 0 && (
          <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Import className="w-5 h-5 mr-2 text-yellow-400" />
              Suggested Imports
            </h3>
            <div className="space-y-2">
              {result.missingImports.map((imp, index) => (
                <div key={index} className="bg-slate-900/50 rounded-lg p-2 font-mono text-sm text-yellow-200">
                  {imp}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Summary */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-200">Analysis Complete</span>
              </div>
              <div className="flex items-center space-x-1">
                <Package className="w-4 h-4 text-blue-400" />
                <span className="text-blue-200">{result.dependencies.length} dependencies</span>
              </div>
            </div>
            <div className="text-green-200">
              Ready for integration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;