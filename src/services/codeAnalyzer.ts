// Core code analysis service based on your existing logic
export interface CodeFile {
  name: string;
  content: string;
  path: string;
  type: string;
}

export interface AnalysisRequest {
  codeSnippet: string;
  files: CodeFile[];
}

export interface AnalysisResult {
  suggestion: string;
  placement: string;
  confidence: number;
  errors: Array<{
    line: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
  }>;
  dependencies: string[];
  missingImports: string[];
}

export class SmartCodeAnalyzer {
  private codebase: CodeFile[] = [];

  async analyzeCodePlacement(request: AnalysisRequest): Promise<AnalysisResult> {
    this.codebase = request.files;
    
    // Simulate your backend analysis logic
    const analysis = await this.performAnalysis(request.codeSnippet);
    
    return {
      suggestion: this.generatePlacementSuggestion(request.codeSnippet, analysis),
      placement: this.findBestPlacement(request.codeSnippet),
      confidence: this.calculateConfidence(analysis),
      errors: this.detectSyntaxErrors(request.codeSnippet),
      dependencies: this.extractDependencies(request.codeSnippet),
      missingImports: this.findMissingImports(request.codeSnippet)
    };
  }

  private async performAnalysis(codeSnippet: string) {
    // Your core analysis logic here
    const functionMatches = this.findFunctionMatches(codeSnippet);
    const variableMatches = this.findVariableMatches(codeSnippet);
    const importMatches = this.findImportMatches(codeSnippet);
    
    return {
      functions: functionMatches,
      variables: variableMatches,
      imports: importMatches
    };
  }

  private generatePlacementSuggestion(codeSnippet: string, analysis: any): string {
    // Enhanced suggestion generation based on your logic
    const suggestions = [];
    
    if (codeSnippet.includes('def ') || codeSnippet.includes('function ')) {
      suggestions.push('📍 This appears to be a function definition');
      
      if (codeSnippet.includes('solve_equation') || codeSnippet.includes('calculate')) {
        suggestions.push('🧮 Best placement: utils/math.py or helpers/calculations.js');
      } else if (codeSnippet.includes('api') || codeSnippet.includes('request')) {
        suggestions.push('🌐 Best placement: api/routes.py or services/api.js');
      } else if (codeSnippet.includes('render') || codeSnippet.includes('component')) {
        suggestions.push('🎨 Best placement: components/ or templates/');
      }
    }

    if (codeSnippet.includes('import ') || codeSnippet.includes('from ')) {
      suggestions.push('📦 Import statement detected - should be at top of file');
    }

    if (codeSnippet.includes('class ')) {
      suggestions.push('🏗️ Class definition - consider models/ or classes/ directory');
    }

    return suggestions.join('\n') || '🤔 Unable to determine optimal placement. Please provide more context.';
  }

  private findBestPlacement(codeSnippet: string): string {
    // Logic to find the best file placement
    const codeType = this.detectCodeType(codeSnippet);
    
    switch (codeType) {
      case 'function':
        return this.findBestFunctionPlacement(codeSnippet);
      case 'class':
        return this.findBestClassPlacement(codeSnippet);
      case 'import':
        return 'Top of existing file or new module';
      default:
        return 'Create new file or add to existing module';
    }
  }

  private detectCodeType(code: string): string {
    if (code.includes('def ') || code.includes('function ')) return 'function';
    if (code.includes('class ')) return 'class';
    if (code.includes('import ') || code.includes('from ')) return 'import';
    if (code.includes('const ') || code.includes('let ') || code.includes('var ')) return 'variable';
    return 'unknown';
  }

  private findBestFunctionPlacement(code: string): string {
    // Analyze function content to suggest best placement
    if (code.includes('math') || code.includes('calculate') || code.includes('solve')) {
      return 'utils/math_helpers.py';
    }
    if (code.includes('api') || code.includes('request') || code.includes('response')) {
      return 'api/handlers.py';
    }
    if (code.includes('render') || code.includes('template')) {
      return 'views/components.py';
    }
    return 'helpers/utilities.py';
  }

  private findBestClassPlacement(code: string): string {
    if (code.includes('Model') || code.includes('Database')) {
      return 'models/';
    }
    if (code.includes('Service') || code.includes('Handler')) {
      return 'services/';
    }
    return 'classes/';
  }

  private calculateConfidence(analysis: any): number {
    // Calculate confidence based on matches found
    let confidence = 0;
    
    if (analysis.functions.length > 0) confidence += 30;
    if (analysis.variables.length > 0) confidence += 20;
    if (analysis.imports.length > 0) confidence += 25;
    
    return Math.min(confidence + 25, 100); // Base confidence + matches
  }

  private detectSyntaxErrors(code: string) {
    const errors = [];
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      // Basic syntax error detection
      if (line.includes('pritn')) {
        errors.push({
          line: index + 1,
          message: 'Did you mean "print"?',
          severity: 'error' as const
        });
      }
      
      if (line.includes('def ') && !line.includes(':')) {
        errors.push({
          line: index + 1,
          message: 'Missing colon after function definition',
          severity: 'error' as const
        });
      }
      
      // Check for unmatched brackets
      const openBrackets = (line.match(/\(/g) || []).length;
      const closeBrackets = (line.match(/\)/g) || []).length;
      if (openBrackets !== closeBrackets) {
        errors.push({
          line: index + 1,
          message: 'Unmatched parentheses',
          severity: 'warning' as const
        });
      }
    });
    
    return errors;
  }

  private extractDependencies(code: string): string[] {
    const dependencies = [];
    const importRegex = /(?:import|from)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    
    while ((match = importRegex.exec(code)) !== null) {
      dependencies.push(match[1]);
    }
    
    return [...new Set(dependencies)];
  }

  private findMissingImports(code: string): string[] {
    const missing = [];
    
    // Check for common functions without imports
    if (code.includes('numpy') && !code.includes('import numpy')) {
      missing.push('import numpy as np');
    }
    if (code.includes('pandas') && !code.includes('import pandas')) {
      missing.push('import pandas as pd');
    }
    if (code.includes('requests') && !code.includes('import requests')) {
      missing.push('import requests');
    }
    
    return missing;
  }

  private findFunctionMatches(code: string) {
    const functions = [];
    const functionRegex = /def\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    
    while ((match = functionRegex.exec(code)) !== null) {
      functions.push(match[1]);
    }
    
    return functions;
  }

  private findVariableMatches(code: string) {
    const variables = [];
    const varRegex = /(?:^|\s)([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
    let match;
    
    while ((match = varRegex.exec(code)) !== null) {
      variables.push(match[1]);
    }
    
    return variables;
  }

  private findImportMatches(code: string) {
    const imports = [];
    const importRegex = /(?:import|from)\s+([^\n]+)/g;
    let match;
    
    while ((match = importRegex.exec(code)) !== null) {
      imports.push(match[1].trim());
    }
    
    return imports;
  }
}

export const codeAnalyzer = new SmartCodeAnalyzer();