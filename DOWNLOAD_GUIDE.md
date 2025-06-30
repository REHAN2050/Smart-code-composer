# 📱 Smart Code Composer - Download & Update Guide

## 🚀 Method 1: Direct Download (Easiest)

### For Phone/Mobile:

1. **Download GitHub Mobile App**
   - Install "GitHub" app from Play Store/App Store
   - Login with your GitHub account (or create one)

2. **Download the Project**
   - Search for "REHAN2050/Smart-Code-Composer"
   - Click on the repository
   - Tap the green "Code" button
   - Select "Download ZIP"
   - Save to your phone's Downloads folder

3. **Extract and Setup**
   - Use any file manager app to extract the ZIP
   - You'll get a folder called "Smart-Code-Composer-main"

### For Computer:

1. **Direct Download**
   ```
   https://github.com/REHAN2050/Smart-Code-Composer/archive/refs/heads/main.zip
   ```
   - Click this link to download directly
   - Extract the ZIP file
   - Open terminal/command prompt in the folder

2. **Run the Application**
   ```bash
   npm install
   npm run dev
   ```

## 🔄 Method 2: Git Clone (For Developers)

```bash
# Clone the repository
git clone https://github.com/REHAN2050/Smart-Code-Composer.git

# Navigate to folder
cd Smart-Code-Composer

# Install dependencies
npm install

# Start the application
npm run dev
```

## 📱 Running on Phone (Android/iOS)

### Option A: Using Termux (Android)
1. **Install Termux** from F-Droid or Play Store
2. **Setup Node.js in Termux:**
   ```bash
   pkg update
   pkg install nodejs npm git
   ```
3. **Clone and Run:**
   ```bash
   git clone https://github.com/REHAN2050/Smart-Code-Composer.git
   cd Smart-Code-Composer
   npm install
   npm run dev
   ```
4. **Access:** Open browser and go to `localhost:5173`

### Option B: Using Code Editor Apps
1. **Install VS Code Mobile** or **Acode**
2. **Download project ZIP** and extract
3. **Open in editor** and use built-in terminal
4. **Run commands** as shown above

## 🔄 Future Updates - How to Update

### Method 1: Re-download (Simple)
1. **Check for Updates:**
   - Visit: https://github.com/REHAN2050/Smart-Code-Composer
   - Look for "Latest Release" or commit dates
   
2. **Download New Version:**
   - Download latest ZIP
   - Replace old folder with new one
   - Run `npm install` again

### Method 2: Git Pull (Advanced)
```bash
# Navigate to your project folder
cd Smart-Code-Composer

# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Restart application
npm run dev
```

### Method 3: Auto-Update Script
Create a file called `update.sh` (Linux/Mac) or `update.bat` (Windows):

**update.sh:**
```bash
#!/bin/bash
echo "🔄 Updating Smart Code Composer..."
git pull origin main
npm install
echo "✅ Update complete! Run 'npm run dev' to start."
```

**update.bat:**
```batch
@echo off
echo 🔄 Updating Smart Code Composer...
git pull origin main
npm install
echo ✅ Update complete! Run 'npm run dev' to start.
pause
```

## 📦 Creating Portable Version

### For Windows:
1. **Install pkg globally:**
   ```bash
   npm install -g pkg
   ```

2. **Build executable:**
   ```bash
   npm run build
   pkg package.json --out-path dist/
   ```

### For Android APK:
1. **Use Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add android
   npm run build
   npx cap copy
   npx cap open android
   ```

## 🌐 Online Access (No Download)

### Deploy to Free Hosting:
1. **Netlify (Recommended):**
   - Fork the GitHub repo
   - Connect to Netlify
   - Auto-deploy on updates

2. **Vercel:**
   - Import GitHub repo
   - Auto-deploy with every push

3. **GitHub Pages:**
   - Enable GitHub Pages in repo settings
   - Access via: `https://rehan2050.github.io/Smart-Code-Composer`

## 🔧 Troubleshooting

### Common Issues:

**1. Node.js Not Found:**
```bash
# Install Node.js from nodejs.org
# Or use package manager:
# Windows: choco install nodejs
# Mac: brew install node
# Linux: sudo apt install nodejs npm
```

**2. Permission Errors:**
```bash
# Fix npm permissions:
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

**3. Port Already in Use:**
```bash
# Use different port:
npm run dev -- --port 3000
```

**4. Memory Issues:**
```bash
# Increase Node.js memory:
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## 📱 Mobile-Specific Setup

### For iOS (Using iSH):
1. Install iSH from App Store
2. Run: `apk add nodejs npm git`
3. Follow standard installation steps

### For Android (Using UserLAnd):
1. Install UserLAnd from Play Store
2. Setup Ubuntu environment
3. Install Node.js and follow steps

## 🔄 Update Notifications

### Setup Auto-Check:
Add this to your `package.json`:
```json
{
  "scripts": {
    "check-updates": "npm outdated",
    "update-all": "npm update"
  }
}
```

### Manual Check:
```bash
# Check for updates
npm run check-updates

# Update all packages
npm run update-all
```

## 🎯 Quick Commands Reference

```bash
# Download project
git clone https://github.com/REHAN2050/Smart-Code-Composer.git

# Setup
cd Smart-Code-Composer && npm install

# Run
npm run dev

# Update
git pull && npm install

# Build for production
npm run build

# Check for updates
git fetch && git status
```

## 📞 Support

**Need Help?**
- 📧 Create issue on GitHub: https://github.com/REHAN2050/Smart-Code-Composer/issues
- 📱 Follow updates: [@brndxanm](https://instagram.com/brndxanm)
- 🔗 Check documentation: README.md in the project

---

**🇮🇳 Made with ❤️ by Rehan | India**

*"When guided well, even scattered blocks become a masterpiece."*