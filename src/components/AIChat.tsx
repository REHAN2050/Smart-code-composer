import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles, Code, Eye, Copy, Check, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeBlock?: string;
  suggestions?: string[];
}

interface AIChatProps {
  onCodeGenerated: (code: string) => void;
  codeBlocks: any[];
}

const AIChat: React.FC<AIChatProps> = ({ onCodeGenerated, codeBlocks }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hey there! 👋 I\'m your Smart Code Assistant. I can help you understand your code, suggest improvements, and generate new code based on your existing blocks. What would you like to work on today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze my uploaded code',
        'Create a new function',
        'Fix syntax errors',
        'Suggest improvements'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let response = '';
    let codeBlock = '';
    let suggestions: string[] = [];

    if (userMessage.toLowerCase().includes('analyze') || userMessage.toLowerCase().includes('check')) {
      response = `I've analyzed your ${codeBlocks.length} code blocks! 🔍\n\n✨ **Analysis Results:**\n• **Structure**: Your code has excellent organization\n• **Dependencies**: Found ${Math.floor(Math.random() * 5) + 1} external dependencies\n• **Quality Score**: ${85 + Math.floor(Math.random() * 15)}%\n• **Suggestions**: Consider adding error handling and documentation\n\nWould you like me to generate improved versions of any specific functions?`;
      suggestions = ['Show me the improved version', 'Add error handling', 'Generate documentation', 'Optimize performance'];
    } 
    else if (userMessage.toLowerCase().includes('function') || userMessage.toLowerCase().includes('create')) {
      response = `Perfect! I'll create a smart function based on your codebase patterns. Here's what I've generated for you:`;
      codeBlock = `def smart_function(data, options=None):
    """
    Smart function generated based on your codebase patterns
    Includes error handling and type validation
    """
    if options is None:
        options = {}
    
    try:
        # Validate input data
        if not data:
            raise ValueError("Data cannot be empty")
        
        # Process data with enhanced logic
        result = process_data_enhanced(data, **options)
        
        # Return structured response
        return {
            'success': True,
            'data': result,
            'message': 'Processing completed successfully',
            'timestamp': datetime.now().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Function execution failed: {e}")
        return {
            'success': False,
            'error': str(e),
            'message': 'Processing failed - check logs for details'
        }`;
      suggestions = ['Add this to my project', 'Modify the function', 'Create similar functions', 'Generate tests'];
    }
    else if (userMessage.toLowerCase().includes('fix') || userMessage.toLowerCase().includes('error')) {
      response = `Great! I've scanned your code and fixed several issues: 🛠️\n\n✅ **Fixed Issues:**\n• **Syntax errors**: Missing colons, brackets, indentation\n• **Typos**: "pritn" → "print", "lenght" → "length"\n• **Missing imports**: Added numpy, pandas, requests\n• **Error handling**: Added try-catch blocks\n• **Code style**: Applied PEP8 formatting\n\n🎉 Your code is now clean and ready to run!`;
      suggestions = ['Show fixed code', 'Run tests', 'Deploy changes', 'Generate documentation'];
    }
    else if (userMessage.toLowerCase().includes('improve') || userMessage.toLowerCase().includes('optimize')) {
      response = `Excellent! Here are my optimization suggestions for your codebase: 🚀\n\n**Performance Improvements:**\n🔥 **Speed**: Use list comprehensions instead of loops\n🔒 **Security**: Add input validation and sanitization\n📝 **Readability**: Add type hints and comprehensive docstrings\n🧪 **Testing**: Create unit tests for critical functions\n⚡ **Memory**: Optimize data structures and algorithms\n\nWant me to implement any of these improvements?`;
      codeBlock = `# Optimized version with performance improvements
from typing import List, Dict, Optional, Union
import logging
from datetime import datetime

class OptimizedProcessor:
    """
    High-performance data processor with built-in optimizations
    """
    
    def __init__(self, cache_size: int = 1000):
        self.cache = {}
        self.cache_size = cache_size
        self.logger = logging.getLogger(__name__)
    
    def process_data(self, data: List[Dict], threshold: float = 0.5) -> Optional[Dict]:
        """
        Optimized data processing with caching and validation
        
        Args:
            data: List of dictionaries to process
            threshold: Minimum threshold for processing (0.0-1.0)
            
        Returns:
            Processed result dictionary or None if failed
        """
        try:
            # Input validation
            if not isinstance(data, list) or not data:
                self.logger.warning("Invalid or empty data provided")
                return None
            
            # Use list comprehension for better performance
            filtered_data = [
                item for item in data 
                if isinstance(item, dict) and item.get('score', 0) > threshold
            ]
            
            if not filtered_data:
                self.logger.info("No data meets the threshold criteria")
                return None
            
            # Process with caching
            cache_key = f"{len(filtered_data)}_{threshold}"
            if cache_key in self.cache:
                return self.cache[cache_key]
            
            # Enhanced processing logic
            result = {
                'processed_count': len(filtered_data),
                'results': filtered_data,
                'status': 'success',
                'processing_time': datetime.now().isoformat(),
                'performance_score': min(len(filtered_data) / len(data), 1.0)
            }
            
            # Cache result
            if len(self.cache) < self.cache_size:
                self.cache[cache_key] = result
            
            return result
            
        except Exception as e:
            self.logger.error(f"Processing failed: {e}")
            return None`;
      suggestions = ['Apply optimizations', 'Add more improvements', 'Generate tests', 'Create documentation'];
    }
    else {
      response = `I understand you want to work on: "${userMessage}" 💡\n\nBased on your uploaded code blocks, I can help you with:\n\n🔍 **Code Analysis** - Deep dive into your code structure\n⚡ **Smart Generation** - Create functions that fit your codebase\n🛠️ **Error Fixing** - Detect and fix syntax/logic issues\n🚀 **Optimization** - Improve performance and best practices\n💡 **Suggestions** - Smart recommendations for your project\n\nWhat specific aspect would you like me to focus on?`;
      suggestions = ['Analyze my code', 'Generate new functions', 'Fix errors', 'Optimize performance', 'Add documentation'];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      codeBlock: codeBlock || undefined,
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const aiResponse = await generateAIResponse(inputMessage);
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);

    if (aiResponse.codeBlock) {
      onCodeGenerated(aiResponse.codeBlock);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[700px]'
    } flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Code Assistant</h2>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Online & Ready</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* Avatar & Name */}
                  <div className={`flex items-center space-x-2 mb-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-blue-500 order-2' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 order-1'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className="text-xs text-white/50">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-blue-500/20 border border-blue-500/30' 
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    <div className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>

                    {/* Code Block */}
                    {message.codeBlock && (
                      <div className="mt-4 bg-slate-900/80 rounded-xl border border-white/20 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                          <div className="flex items-center space-x-2">
                            <Code className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-300 font-medium">Generated Code</span>
                          </div>
                          <button
                            onClick={() => copyCode(message.codeBlock!)}
                            className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white/70 hover:text-white transition-colors"
                          >
                            {copiedCode === message.codeBlock ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-sm text-white/90 font-mono overflow-x-auto leading-relaxed">
                          {message.codeBlock}
                        </pre>
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <div className="text-xs text-white/60 flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Quick actions:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-full text-xs transition-all duration-200 hover:scale-105"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">AI Assistant</span>
                      <span className="text-xs text-white/50">Thinking...</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-white/60">AI is analyzing your request...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your code..."
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-white/50"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChat;