import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Video as VideoIcon, VideoOff, ArrowRight, Home, HelpCircle } from 'lucide-react'
import Webcam from 'react-webcam'
import { useInterviewStore } from '../store/interviewStore'
import { analyzeAnswer } from '../utils/aiService'
import { FaceDetectionService } from '../utils/faceDetection'
import { SpeechAnalysisService } from '../utils/speechAnalysis'
import { TipsPanel } from './TipsPanel'
import { AudioVisualizer } from './AudioVisualizer'
import { QuickHelpModal } from './QuickHelpModal'
import { AnimatedAICoach } from './AnimatedAICoach'

interface InterviewSessionProps {
  onEndInterview: () => void
}

const INTERVIEW_QUESTIONS = [
  "Tell me about yourself and your background.",
  "What are your greatest strengths?",
  "Describe a challenging situation you faced and how you handled it.",
  "Where do you see yourself in five years?",
  "Why do you want to work for our company?",
  "What is your greatest weakness?",
  "Tell me about a time you demonstrated leadership.",
  "How do you handle stress and pressure?",
  "What motivates you in your work?",
  "Do you have any questions for us?"
]

export function InterviewSession({ onEndInterview }: InterviewSessionProps) {
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [tips, setTips] = useState<string[]>([])
  const [showHelp, setShowHelp] = useState(false)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  
  const webcamRef = useRef<Webcam>(null)
  const faceDetectionRef = useRef<FaceDetectionService>()
  const speechAnalysisRef = useRef<SpeechAnalysisService>()
  const analysisIntervalRef = useRef<NodeJS.Timeout>()

  const {
    currentQuestion,
    nextQuestion,
    addAnswer,
    addFaceMetrics,
    addSpeechMetrics
  } = useInterviewStore()

  useEffect(() => {
    // Initialize services
    faceDetectionRef.current = new FaceDetectionService()
    speechAnalysisRef.current = new SpeechAnalysisService()

    // Start periodic analysis
    analysisIntervalRef.current = setInterval(() => {
      if (webcamRef.current?.video) {
        // Face detection analysis would go here
        const mockMetrics = {
          eyeContact: Math.random() * 100,
          expressions: { neutral: 0.7, smile: 0.3 },
          headPose: 'forward'
        }
        addFaceMetrics(mockMetrics)
      }

      // Speech analysis would go here
      const mockSpeechMetrics = {
        pace: 120 + Math.random() * 40,
        volume: 0.5 + Math.random() * 0.3,
        clarity: 0.7 + Math.random() * 0.2,
        fillerWords: Math.floor(Math.random() * 3)
      }
      addSpeechMetrics(mockSpeechMetrics)
    }, 2000)

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current)
      }
    }
  }, [addFaceMetrics, addSpeechMetrics])

  const handleNextQuestion = async () => {
    if (!currentAnswer.trim()) {
      setTips(['Please provide an answer before moving to the next question'])
      return
    }

    setIsAnalyzing(true)
    
    try {
      const question = INTERVIEW_QUESTIONS[currentQuestion]
      const analysis = await analyzeAnswer(question, currentAnswer)
      
      addAnswer({
        question,
        answer: currentAnswer,
        timestamp: Date.now(),
        analysis
      })

      setCurrentAnswer('')
      setTips([])
      
      if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
        nextQuestion()
      } else {
        onEndInterview()
      }
    } catch (error) {
      console.error('Analysis error:', error)
      setTips(['Failed to analyze answer. Please try again.'])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end the interview?')) {
      onEndInterview()
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1} of {INTERVIEW_QUESTIONS.length}
              </h2>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / INTERVIEW_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={handleEndInterview}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              End Interview
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Quick Help
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
                {isVideoEnabled ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    className="w-full h-full object-cover"
                    mirrored
                    onUserMedia={(stream) => setVideoStream(stream)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <VideoOff className="w-16 h-16" />
                  </div>
                )}
                <AudioVisualizer isActive={isAudioEnabled} />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    isVideoEnabled
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isVideoEnabled ? (
                    <><VideoIcon className="w-5 h-5 inline mr-2" />Video On</>
                  ) : (
                    <><VideoOff className="w-5 h-5 inline mr-2" />Video Off</>
                  )}
                </button>
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    isAudioEnabled
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isAudioEnabled ? (
                    <><Mic className="w-5 h-5 inline mr-2" />Mic On</>
                  ) : (
                    <><MicOff className="w-5 h-5 inline mr-2" />Mic Off</>
                  )}
                </button>
              </div>
            </div>

            {/* Question & Answer */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">QUESTION</h3>
                <p className="text-xl font-semibold text-gray-900">
                  {INTERVIEW_QUESTIONS[currentQuestion]}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">YOUR ANSWER</h3>
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here or speak..."
                  className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                  disabled={isAnalyzing}
                />
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={isAnalyzing || !currentAnswer.trim()}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  'Analyzing...'
                ) : currentQuestion < INTERVIEW_QUESTIONS.length - 1 ? (
                  <>Next Question <ArrowRight className="w-5 h-5" /></>
                ) : (
                  'Finish Interview'
                )}
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Animated AI Coach */}
            <AnimatedAICoach
              isActive={true}
              videoStream={videoStream}
              currentAnswer={currentAnswer}
              isTyping={currentAnswer.length > 0}
            />
            
            {/* Tips Panel */}
            <TipsPanel tips={tips} />
          </div>
        </div>
      </div>

      {/* Quick Help Modal */}
      {showHelp && <QuickHelpModal onClose={() => setShowHelp(false)} />}
    </div>
  )
}
