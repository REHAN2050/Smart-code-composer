import React, { useState } from 'react';
import { Zap, Download, Code, Globe, Smartphone, Bot, Gamepad2, Wrench, ChevronRight, Sparkles } from 'lucide-react';

interface ProjectGeneratorProps {
  onGenerate: () => void;
  onDownload: () => void;
  canGenerate: boolean;
  canDownload: boolean;
  isProcessing: boolean;
}

const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({
  onGenerate,
  onDownload,
  canGenerate,
  canDownload,
  isProcessing
}) => {
  const [selectedOutputType, setSelectedOutputType] = useState<string>('website');

  const outputTypes = [
    { id: 'website', name: 'Website', icon: Globe, desc: 'Static/Dynamic sites' },
    { id: 'app', name: 'App', icon: Smartphone, desc: 'Flask/Android apps' },
    { id: 'tool', name: 'Tool', icon: Wrench, desc: 'Utilities & converters' },
    { id: 'bot', name: 'Discord Bot', icon: Bot, desc: 'With commands' },
    { id: 'game', name: 'Game', icon: Gamepad2, desc: 'HTML5/Python' }
  ];

  const generationSteps = [
    { name: 'Code Stitching', desc: 'Joining blocks logically' },
    { name: 'Gap Filling', desc: 'Adding missing connections' },
    { name: 'Error Fixing', desc: 'Correcting syntax issues' },
    { name: 'Validation', desc: 'Ensuring code runs' },
    { name: 'Packaging', desc: 'Creating final project' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
        Project Generator
      </h2>

      {/* Output Type Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white mb-3">Select Output Type</h3>
        <div className="grid grid-cols-1 gap-2">
          {outputTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedOutputType(type.id)}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedOutputType === type.id
                  ? 'border-yellow-500/50 bg-yellow-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <type.icon className={`w-5 h-5 ${
                  selectedOutputType === type.id ? 'text-yellow-400' : 'text-white/60'
                }`} />
                <div>
                  <div className="text-sm font-medium text-white">{type.name}</div>
                  <div className="text-xs text-white/60">{type.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generation Process */}
      {isProcessing && (
        <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Generation Process
          </h3>
          <div className="space-y-2">
            {generationSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/5">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                <div>
                  <div className="text-sm text-white">{step.name}</div>
                  <div className="text-xs text-white/60">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={!canGenerate || isProcessing}
          className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
            canGenerate && !isProcessing
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generating Project...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Generate {outputTypes.find(t => t.id === selectedOutputType)?.name}</span>
            </div>
          )}
        </button>

        {/* Download Button */}
        <button
          onClick={onDownload}
          disabled={!canDownload}
          className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
            canDownload
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Project ZIP</span>
          </div>
        </button>
      </div>

      {/* Generation Info */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
        <h4 className="text-sm font-medium text-yellow-200 mb-2">🚀 Generation Features:</h4>
        <ul className="text-xs text-yellow-300 space-y-1">
          <li>• Smart code stitching and dependency resolution</li>
          <li>• Automatic syntax error fixing</li>
          <li>• Missing component detection and filling</li>
          <li>• Project structure optimization</li>
          <li>• Ready-to-run output with documentation</li>
        </ul>
      </div>

      {/* Placeholder when not ready */}
      {!canGenerate && !canDownload && !isProcessing && (
        <div className="text-center py-8 mt-6 border-t border-white/10">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
            <Code className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-white/60 text-sm">Complete code analysis first</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGenerator;