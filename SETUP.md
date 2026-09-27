# AI Interview Coach - Setup Instructions

## ✅ Node.js is Already Installed!

Node.js v24.19.0 and npm v11.17.0 are installed on your system.

## 🚀 Quick Start

### Option 1: Use the Batch File (Easiest)

1. **Close this terminal completely**
2. **Open a NEW terminal window** (PowerShell or Command Prompt)
3. Navigate to the project folder:
   ```
   cd "C:\Users\harsh\OneDrive\Desktop\interview coach"
   ```
4. Run the installation script:
   ```
   install.bat
   ```

### Option 2: Manual Installation

1. **Close this terminal completely**
2. **Open a NEW terminal window** (this refreshes the PATH)
3. Navigate to the project:
   ```
   cd "C:\Users\harsh\OneDrive\Desktop\interview coach"
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the app:
   ```
   npm run dev
   ```

## ⚠️ Important: Why Close the Terminal?

Node.js was just installed, so the current terminal doesn't know about it yet. Opening a NEW terminal will load the updated PATH variable.

## 📱 After Installation

Once `npm install` completes successfully:

1. Run: `npm run dev`
2. Open browser to: `http://localhost:3000`
3. Allow camera and microphone access when prompted
4. Start practicing interviews!

## 🎯 Features Available

- ✅ Real-time webcam analysis
- ✅ AI behavior feedback
- ✅ Speech recognition
- ✅ 8+ company-specific questions (Google, Meta, Amazon, etc.)
- ✅ Performance analytics
- ✅ Progress tracking

## 🐛 Troubleshooting

### If you get "node is not recognized":
- Close ALL terminal windows
- Open a fresh new terminal
- Try again

### If npm install fails:
- Make sure you have internet connection
- Try running: `npm cache clean --force`
- Then run: `npm install` again

### If the app doesn't start:
- Check if another app is using port 3000
- Try: `npm run dev -- --port 3001`

## 📞 Need Help?

Check the README.md file for more details about the application features.
