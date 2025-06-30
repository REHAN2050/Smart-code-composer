import React, { useState } from 'react';
import { Code, FileText, Lightbulb, AlertCircle } from 'lucide-react';

interface CodeInputProps {
  onCodeSubmit: (code: string) => void;
  isAnalyzing: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodeSubmit, isAnalyzing }) => {
  const [code, setCode] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const examples = [
    {
      title: 'Python Function',
      code: `def solve_equation(x, y):
    result = x * 2 + y
    return result`
    },
    {
      title: 'JavaScript API Call',
      code: `async function fetchUserData(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
}`
    },
    {
      title: 'React Component',
      code: `function UserCard({ user }) {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
    );
}`
    }
  ];

  const handleSubmit = () => {
    if (code.trim()) {
      onCodeSubmit(code);
    }
  };

  const insertExample = (exampleCode: string) => {
    setCode(exampleCode);
    setShowExamples(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Code className="w-5 h-5 mr-2 text-green-400" />
        Code Input & Analysis
      </h2>

      {/* Code Input Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white mb-2">
          Enter your partial code or logic:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Example: def solve_equation(x): ..."
          className="w-full h-40 p-4 bg-slate-900/50 border border-white/20 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
        />
      </div>

      {/* Examples Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center space-x-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          <span>{showExamples ? 'Hide' : 'Show'} Examples</span>
        </button>
      </div>

      {/* Examples */}
      {showExamples && (
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-medium text-white">Quick Examples:</h3>
          {examples.map((example, index) => (
            <div key={index} className="bg-slate-900/30 rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-300">{example.title}</span>
                <button
                  onClick={() => insertExample(example.code)}
                  className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 transition-colors"
                >
                  Use This
                </button>
              </div>
              <pre className="text-xs text-white/70 font-mono overflow-x-auto">
                {example.code}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!code.trim() || isAnalyzing}
        className={`w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
          code.trim() && !isAnalyzing
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            : 'bg-white/10 text-white/50 cursor-not-allowed'
        }`}
      >
        {isAnalyzing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Analyzing Code...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Analyze and Suggest Placement</span>
          </div>
        )}
      </button>

      {/* Tips */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <h4 className="text-sm font-medium text-green-200 mb-2 flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          Smart Analysis Tips:
        </h4>
        <ul className="text-xs text-green-300 space-y-1">
          <li>• Include function names and variable names for better placement suggestions</li>
          <li>• Add comments to help the AI understand your code's purpose</li>
          <li>• Partial code is fine - the tool will suggest where it fits best</li>
          <li>• Works with Python, JavaScript, TypeScript, and more</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeInput;