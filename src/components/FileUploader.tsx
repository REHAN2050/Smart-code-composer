import React, { useCallback, useState } from 'react';
import { Upload, FileCode, FileText, Folder, X } from 'lucide-react';

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesUploaded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }, []);

  const processFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(file => {
      const validExtensions = ['.js', '.py', '.html', '.css', '.json', '.md', '.txt', '.tsx', '.ts', '.jsx'];
      return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    onFilesUploaded(validFiles);
  }, [onFilesUploaded]);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.md') || fileName.includes('readme')) {
      return <FileText className="w-4 h-4 text-blue-400" />;
    }
    return <FileCode className="w-4 h-4 text-green-400" />;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Folder className="w-5 h-5 mr-2 text-blue-400" />
        Upload Code & Instructions
      </h2>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-white/20 hover:border-white/40 hover:bg-white/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".js,.py,.html,.css,.json,.md,.txt,.tsx,.ts,.jsx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-white">
              Drop your files here
            </p>
            <p className="text-sm text-blue-200 mt-1">
              or click to browse files
            </p>
          </div>
          
          <div className="text-xs text-blue-300">
            Supports: JS, Python, HTML, CSS, JSON, Markdown, TypeScript
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white mb-3">Uploaded Files</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-blue-200">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <h4 className="text-sm font-medium text-blue-200 mb-2">💡 Pro Tips:</h4>
        <ul className="text-xs text-blue-300 space-y-1">
          <li>• Include README.md files for project context</li>
          <li>• Upload related code blocks together</li>
          <li>• Add instruction files to guide the AI</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;