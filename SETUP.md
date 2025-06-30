# Smart Code Composer - Offline Setup Guide

## 🚀 Quick Start (Offline Package)

### Prerequisites
- Node.js 18+ installed on your system
- Basic terminal/command prompt knowledge

### Installation Steps

1. **Download the Package**
   ```bash
   # If you have git
   git clone https://github.com/REHAN2050/Smart-Code-Composer.git
   cd Smart-Code-Composer
   
   # Or download ZIP and extract
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The tool is now running offline!

## 📦 Building for Production

To create a standalone build:

```bash
npm run build
```

The built files will be in the `dist/` folder. You can serve these with any static file server.

## 🔧 Offline Usage

Once running, Smart Code Composer works completely offline:

1. **Upload Code Blocks** - Drag & drop your code files
2. **Add Instructions** - Include README or guide files
3. **Analyze** - Let AI analyze your code structure
4. **Generate** - Create your complete project
5. **Download** - Get your ready-to-use project ZIP

## 📁 Supported File Types

- Python (.py)
- JavaScript/TypeScript (.js, .ts, .jsx, .tsx)
- HTML/CSS (.html, .css)
- JSON (.json)
- Markdown (.md)
- Text files (.txt)

## 🛠️ Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
Ensure you have sufficient disk space and Node.js 18+:
```bash
node --version
npm --version
```

## 🌟 Features

- **100% Offline** - No internet required after setup
- **Lightweight** - Under 500MB total size
- **Smart Analysis** - AI-powered code understanding
- **Multi-Language** - Supports major programming languages
- **Professional UI** - Gaming-inspired cyberpunk design
- **Real-time Preview** - See your code come to life

## 🔗 Creator Links

- **GitHub**: [REHAN2050](https://github.com/REHAN2050)
- **Instagram**: [@brndxanm](https://instagram.com/brndxanm)
- **Project**: [Smart-Code-Composer](https://github.com/REHAN2050/Smart-Code-Composer)

## 📄 License

Created by Rehan (REHAN2050) as part of the Sustainable AI Initiative.

---

**Made with ❤️ by Rehan | India 🇮🇳**