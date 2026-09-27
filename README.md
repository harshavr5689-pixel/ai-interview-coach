# 🎯 AI Interview Coach

An intelligent interview preparation application powered by AI, providing real-time feedback on your interview performance through video analysis, speech recognition, and AI-powered content evaluation.

![AI Interview Coach](https://img.shields.io/badge/Version-1.0.0-blue) ![Build Status](https://img.shields.io/badge/Build-Passing-success) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Quick Start

The application is now **built and ready to run**!

### Running the Application

**Option 1: Double-click the start file**
```bash
# Windows
start.bat
```

**Option 2: Using npm**
```bash
npm run dev
```

Then open your browser to: **http://localhost:3000**

## ✨ Features

### 🎭 Animated AI Coach (NEW!)
- **Live anime-style character** that interacts with you in real-time
- **Expressive emotions** (happy, thinking, excited, concerned, encouraging)
- **Animated eyes** that blink and follow your actions
- **Speaking animations** with mood-based colors
- **Posture feedback** - reminds you to sit straight and maintain eye contact
- **Typing guidance** - eyes look down when you type, gives real-time tips
- **Content coaching** - encourages examples, metrics, and specificity
- **Personality-driven** - feels like a real friend helping you succeed
- **Sleeping/waking states** - comes alive when you start practicing

### 🤖 Live AI Coach (NEW!)
- **Real-time guidance** as you type your answers
- **Contextual suggestions** based on question type
- **STAR method coaching** for behavioral questions
- **Answer length monitoring** with optimal timing
- **Filler word detection** and alerts
- **Enthusiasm and specificity checks**
- **Progressive guidance** that adapts to your response
- **Non-intrusive updates** every 0.8 seconds

### 🎓 Interactive Training Guide
- **10-step comprehensive training** covering all interview best practices
- **Body language coaching** with camera tips
- **Voice training** with speaking guidelines
- **STAR method tutorial** for structured answers
- **Practice tasks** for hands-on learning
- **Quick Help modal** accessible during interviews
- **Progress tracking** with completion status

### 🎥 Video Analysis
- **Real-time webcam monitoring** with facial expression tracking
- **Eye contact detection** to improve engagement
- **Body language feedback** for professional presence

### 🎤 Speech Analysis
- **Speech clarity** and pace monitoring
- **Filler word detection** (um, uh, like, etc.)
- **Volume level tracking** for optimal audio

### 🤖 AI-Powered Feedback
- **Intelligent answer analysis** using advanced algorithms
- **Confidence scoring** based on content quality
- **Clarity and relevance metrics** for each response
- **Sentiment analysis** of your answers

### 📊 Performance Tracking
- **Question-by-question breakdown** with detailed metrics
- **Performance timeline** showing improvement over time
- **Overall scores** for confidence, clarity, and relevance
- **Advanced analytics** with trend visualization

### 📝 Interview Questions
Includes 10 comprehensive interview questions covering:
1. Tell me about yourself
2. Greatest strengths
3. Handling challenging situations
4. Five-year career goals
5. Why this company?
6. Greatest weakness
7. Leadership experience
8. Stress management
9. Motivation factors
10. Questions for the interviewer

### 💾 Export & Review
- **Export results to JSON** for detailed analysis
- **Performance summaries** with actionable recommendations
- **Historical tracking** across multiple sessions

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Video Capture**: React Webcam
- **AI Analysis**: Custom AI service (extensible to OpenAI API)
- **Face Detection**: TensorFlow.js (placeholder for full implementation)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup Steps

1. **Install dependencies** (already done if you ran install.bat):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
interview-coach/
├── src/
│   ├── components/          # React components
│   │   ├── Home.tsx        # Landing page
│   │   ├── InterviewSession.tsx  # Main interview interface
│   │   ├── Results.tsx     # Results dashboard
│   │   ├── TipsPanel.tsx   # Interview tips display
│   │   ├── AdvancedAnalytics.tsx  # Performance charts
│   │   ├── ExportResults.tsx  # Export functionality
│   │   ├── AudioVisualizer.tsx  # Audio level display
│   │   ├── VideoRecorder.tsx  # Video recording (future)
│   │   ├── Settings.tsx    # App settings
│   │   └── ...
│   ├── store/              # State management
│   │   └── interviewStore.ts  # Zustand store
│   ├── utils/              # Utility functions
│   │   ├── aiService.ts    # AI analysis service
│   │   ├── faceDetection.ts  # Face tracking
│   │   └── speechAnalysis.ts  # Speech processing
│   ├── hooks/              # Custom React hooks
│   │   └── useAudioLevel.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── dist/                   # Production build output
├── install.bat             # Windows installation script
├── start.bat               # Quick start script
└── package.json            # Dependencies and scripts
```

## 🎮 How to Use

### 0. **Complete Training (First-Time Users)**
   - Click "Start Training Guide" on the home page
   - Go through the 10-step interactive tutorial (10 minutes)
   - Learn body language, speaking tips, STAR method, and more
   - Understand how the AI analyzes your performance
   - Complete to unlock best results!

### 1. **Start Interview**
   - Click "Start Practice Interview" on the home page
   - Allow camera and microphone access when prompted

### 2. **Answer Questions**
   - Read the interview question displayed
   - **NEW**: Animated AI Coach wakes up and starts watching you!
   - Watch the coach's eyes look down as you type
   - Get real-time personality-driven feedback with emotions
   - Receive posture and positioning reminders
   - Type your answer with live coaching guidance
   - The system monitors your video and audio in real-time

### 3. **Receive Feedback**
   - Click "Next Question" to analyze your answer
   - Click "Quick Help" button for instant tips during interview
   - AI provides confidence, clarity, and relevance scores
   - Continue through all 10 questions

### 4. **Review Results**
   - View overall performance metrics
   - Check detailed analysis for each answer
   - Read personalized recommendations
   - Export results for future reference

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_api_key_here
```

*Note: The app works with mock AI analysis by default. Add an API key for real AI-powered feedback.*

## 🚢 Deployment

The application is ready to deploy to any static hosting service:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push the dist folder to your gh-pages branch
```

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Real OpenAI API integration
- [ ] Speech-to-text transcription
- [ ] Advanced face detection with TensorFlow.js
- [ ] Video recording and playback
- [ ] Multiple interview categories (technical, behavioral, etc.)
- [ ] Custom question sets
- [ ] Progress tracking across sessions
- [ ] Mobile app version

## 💡 Tips for Best Results

- **Lighting**: Ensure good lighting for accurate face detection
- **Audio**: Use a quality microphone for clear speech analysis
- **Camera**: Position camera at eye level for natural eye contact
- **Environment**: Choose a quiet space with minimal distractions
- **Practice**: Use regularly to track improvement over time

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, TypeScript, and AI**
