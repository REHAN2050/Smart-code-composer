import React from 'react';
import { Upload, Brain, Zap, Download, CheckCircle, Clock } from 'lucide-react';

type Step = 'upload' | 'analyze' | 'generate' | 'download';

interface ProgressTrackerProps {
  currentStep: Step;
  progress: number;
  isProcessing: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  progress,
  isProcessing
}) => {
  const steps = [
    { id: 'upload', name: 'Upload', icon: Upload, color: 'blue' },
    { id: 'analyze', name: 'Analyze', icon: Brain, color: 'purple' },
    { id: 'generate', name: 'Generate', icon: Zap, color: 'yellow' },
    { id: 'download', name: 'Download', icon: Download, color: 'green' }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getStepColor = (stepId: string, baseColor: string) => {
    const status = getStepStatus(stepId);
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'active':
        return `text-${baseColor}-400 bg-${baseColor}-500/20 border-${baseColor}-500/50`;
      case 'pending':
        return 'text-white/40 bg-white/5 border-white/20';
      default:
        return 'text-white/40 bg-white/5 border-white/20';
    }
  };

  const getConnectorColor = (index: number) => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    return index <= currentIndex ? 'border-green-500/50' : 'border-white/20';
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${getStepColor(step.id, step.color)}`}>
                {getStepStatus(step.id) === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : getStepStatus(step.id) === 'active' && isProcessing ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              
              {/* Step Label */}
              <div className="ml-3">
                <div className={`text-sm font-medium ${
                  getStepStatus(step.id) === 'completed' ? 'text-green-400' :
                  getStepStatus(step.id) === 'active' ? 'text-white' : 'text-white/60'
                }`}>
                  {step.name}
                </div>
                {getStepStatus(step.id) === 'active' && isProcessing && (
                  <div className="text-xs text-white/60 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Processing...
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 border-t-2 border-dashed transition-all duration-300 ${getConnectorColor(index)}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-white/80 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        <div className="text-center">
          <p className="text-sm text-white/70">
            {currentStep === 'upload' && 'Upload your code blocks and instructions to get started'}
            {currentStep === 'analyze' && (isProcessing ? 'Analyzing code structure and dependencies...' : 'Code analysis complete')}
            {currentStep === 'generate' && (isProcessing ? 'Generating your project with AI assistance...' : 'Project generated successfully')}
            {currentStep === 'download' && 'Your project is ready for download!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;