import React from 'react';
import { User, Github, Instagram, MapPin, Heart, Zap, Code, Globe, Star, Award, Target } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>
      
      {/* Floating Logo */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
        <img 
          src="/file_00000000ad606230832c31a8ccabc924.png" 
          alt="Smart Code Composer Logo" 
          className="w-full h-full object-contain filter brightness-0 invert"
        />
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          {/* Logo and Title Section */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 mr-4 relative">
              <img 
                src="/file_00000000ad606230832c31a8ccabc924.png" 
                alt="Smart Code Composer Logo" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 font-mono">
                SMART CODE COMPOSER
              </h2>
              <p className="text-cyan-300 text-sm font-mono">[ AI_POWERED_CODE_ASSEMBLY_TOOL ]</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/30">
              <p className="text-lg">
                <strong className="text-cyan-400">Smart Code Composer</strong> is an innovative offline coding assistant that helps developers and creators complete their apps using block-based logic. Whether you're working on a website, tool, Discord bot, or small application — just feed your code blocks and instruction guides, and this tool will stitch them together intelligently.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/30">
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center font-mono">
                  <Target className="w-5 h-5 mr-2" />
                  [ WHY_IT_EXISTS ]
                </h3>
                <p className="text-sm">
                  This tool was created by <strong className="text-emerald-300">Rehan, a visionary Class 12 student from India 🇮🇳</strong>, to solve a major problem: how can someone with great ideas but limited coding experience turn their thoughts into real, working software — offline, privately, and without external help?
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center font-mono">
                  <Star className="w-5 h-5 mr-2" />
                  [ KEY_ADVANTAGES ]
                </h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 100% offline — works without internet</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Under 500MB — light, fast, and portable</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Accepts your vision, guides, and code blocks</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Fixes common syntax errors automatically</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Generates full apps ready to download</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center font-mono">
                <Award className="w-5 h-5 mr-2" />
                [ CREATOR_INFO ]
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm mb-4">
                    This tool was imagined and designed by <strong className="text-yellow-300">Rehan</strong>, also known as the <strong className="text-yellow-300">Creator of the Phoenix Protocol</strong>, a young innovator working on sustainable AI and ethical software development from India.
                  </p>
                  <div className="flex items-center space-x-2 text-yellow-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono text-sm">LOCATION: INDIA 🇮🇳</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-yellow-400 font-mono">[ CONNECT_WITH_REHAN ]</h4>
                  <div className="space-y-2">
                    <a 
                      href="https://github.com/REHAN2050" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-300 hover:text-yellow-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub: REHAN2050</span>
                    </a>
                    <a 
                      href="https://github.com/REHAN2050/Smart-Code-Composer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-300 hover:text-cyan-300 transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      <span>Smart Code Composer (Official Repo)</span>
                    </a>
                    <a 
                      href="https://github.com/REHAN2050/Sustainable-AI-By-Rehan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-300 hover:text-purple-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Sustainable AI Initiative</span>
                    </a>
                    <a 
                      href="https://instagram.com/brndxanm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-300 hover:text-pink-300 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram: @brndxanm</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-2xl p-6 border border-pink-500/30 text-center">
              <h3 className="text-xl font-bold text-pink-400 mb-4 font-mono">[ MOTTO ]</h3>
              <blockquote className="text-lg italic text-pink-200">
                "When guided well, even scattered blocks become a masterpiece."
              </blockquote>
              <p className="text-sm text-pink-300 mt-2 font-mono">— Rehan</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-6 border-t border-cyan-500/30">
          <p className="text-sm text-gray-400 flex items-center justify-center space-x-2 font-mono">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>by Rehan | India 🇮🇳</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;