import { useState } from 'react'
import { 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play,
  Eye,
  Mic,
  Target,
  TrendingUp,
  Award,
  Lightbulb
} from 'lucide-react'

interface TrainingGuideProps {
  onClose: () => void
  onComplete: () => void
}

interface TrainingStep {
  id: number
  title: string
  description: string
  icon: typeof BookOpen
  tips: string[]
  videoTip?: string
  practiceTask?: string
}

const trainingSteps: TrainingStep[] = [
  {
    id: 1,
    title: 'Welcome to AI Interview Coach',
    description: 'Learn how to ace your interviews with AI-powered feedback. This guide will walk you through everything you need to know.',
    icon: BookOpen,
    tips: [
      'This training takes about 10 minutes to complete',
      'You can pause and resume anytime',
      'Practice exercises are included to help you learn',
      'Complete all steps to unlock expert tips'
    ],
    practiceTask: 'Click "Next" when you\'re ready to begin'
  },
  {
    id: 2,
    title: 'Setting Up Your Environment',
    description: 'Proper setup is crucial for the best interview practice experience.',
    icon: Target,
    tips: [
      'Find a quiet space with minimal background noise',
      'Ensure good lighting - face a window or lamp',
      'Position your camera at eye level',
      'Test your microphone before starting',
      'Sit upright with good posture',
      'Have a glass of water nearby'
    ],
    videoTip: 'Your camera should show your face and upper body clearly. Avoid backlighting from windows.',
    practiceTask: 'Adjust your camera and check your lighting right now'
  },
  {
    id: 3,
    title: 'Understanding Body Language',
    description: 'Your non-verbal communication is just as important as what you say.',
    icon: Eye,
    tips: [
      'Maintain eye contact by looking at the camera, not yourself',
      'Smile naturally - it shows confidence and friendliness',
      'Keep your hands visible and use natural gestures',
      'Avoid fidgeting, touching your face, or excessive movement',
      'Sit up straight with shoulders back',
      'Nod occasionally to show engagement'
    ],
    videoTip: 'The app tracks your eye contact and facial expressions in real-time.',
    practiceTask: 'Practice looking at the camera for 30 seconds with a natural smile'
  },
  {
    id: 4,
    title: 'Mastering Your Voice',
    description: 'How you speak can make or break an interview.',
    icon: Mic,
    tips: [
      'Speak clearly and at a moderate pace (130-150 words per minute)',
      'Project your voice with confidence',
      'Vary your tone to show enthusiasm',
      'Pause briefly before answering to gather your thoughts',
      'Avoid filler words like "um," "uh," "like"',
      'Practice breathing techniques to reduce nervousness'
    ],
    videoTip: 'The app monitors your speaking pace, volume, and filler word usage.',
    practiceTask: 'Read this aloud clearly: "I am confident, prepared, and ready to succeed in my interview"'
  },
  {
    id: 5,
    title: 'The STAR Method',
    description: 'Structure your answers effectively using this proven technique.',
    icon: Award,
    tips: [
      'S - Situation: Set the context (when/where)',
      'T - Task: Explain what was required',
      'A - Action: Describe what YOU did specifically',
      'R - Result: Share the outcome and what you learned',
      'Use specific numbers and metrics when possible',
      'Keep examples relevant to the question asked'
    ],
    videoTip: 'STAR method works best for behavioral questions like "Tell me about a time when..."',
    practiceTask: 'Think of a challenge you overcame and outline it using STAR method'
  },
  {
    id: 6,
    title: 'Understanding the Questions',
    description: 'Learn the types of questions you\'ll encounter and how to approach them.',
    icon: Lightbulb,
    tips: [
      'Behavioral: Focus on past experiences (use STAR method)',
      'Situational: Describe how you would handle hypothetical scenarios',
      'Strengths: Be honest but relevant to the role',
      'Weaknesses: Show self-awareness and improvement efforts',
      'Technical: Break down your problem-solving process',
      'Always relate answers back to the role requirements'
    ],
    practiceTask: 'Review the 10 practice questions you\'ll encounter'
  },
  {
    id: 7,
    title: 'Real-Time Feedback',
    description: 'Understand how the AI analyzes your performance.',
    icon: TrendingUp,
    tips: [
      'Confidence Score: Based on answer content and body language',
      'Clarity Score: How well-structured and understandable your answer is',
      'Relevance Score: How directly you addressed the question',
      'Eye Contact: Percentage of time looking at camera',
      'Speech Metrics: Pace, volume, and filler word count',
      'Use feedback to improve with each question'
    ],
    videoTip: 'Higher scores mean better performance. Aim for 80+ in all categories.',
    practiceTask: 'During practice, focus on one metric at a time to improve'
  },
  {
    id: 8,
    title: 'Best Practices During Interview',
    description: 'Tips to maximize your performance during the practice session.',
    icon: CheckCircle,
    tips: [
      'Read each question carefully before answering',
      'Take 3-5 seconds to think before speaking',
      'Aim for 2-3 minute answers (not too short or long)',
      'Be specific with examples and details',
      'Show enthusiasm and genuine interest',
      'If stuck, it\'s okay to say "Let me think about that..."',
      'End answers with a summary statement when possible'
    ],
    practiceTask: 'Keep these tips in mind during your practice session'
  },
  {
    id: 9,
    title: 'Reviewing Your Results',
    description: 'How to analyze your performance and improve.',
    icon: Award,
    tips: [
      'Review overall scores first to identify weak areas',
      'Watch for patterns across multiple questions',
      'Read personalized recommendations carefully',
      'Export results to track progress over time',
      'Focus on improving one area per practice session',
      'Practice regularly - consistency is key'
    ],
    videoTip: 'Use the Advanced Analytics to see your performance timeline and trends.',
    practiceTask: 'After your first session, identify your top 2 areas for improvement'
  },
  {
    id: 10,
    title: 'You\'re Ready!',
    description: 'Congratulations! You\'ve completed the training guide.',
    icon: Play,
    tips: [
      'You now know how to use the AI Interview Coach effectively',
      'Remember: Practice makes perfect',
      'Start with a practice session to get comfortable',
      'Review your results and improve with each attempt',
      'The more you practice, the better you\'ll perform in real interviews',
      'Good luck - you\'ve got this! 🚀'
    ],
    practiceTask: 'Click "Start Practicing" to begin your first interview session'
  }
]

export function TrainingGuide({ onClose, onComplete }: TrainingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const step = trainingSteps[currentStep]
  const Icon = step.icon
  const progress = ((currentStep + 1) / trainingSteps.length) * 100

  const handleNext = () => {
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id])
    }
    
    if (currentStep < trainingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkipToEnd = () => {
    setCompletedSteps(trainingSteps.map(s => s.id))
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Training Guide</h2>
                <p className="text-indigo-100 text-sm">
                  Step {currentStep + 1} of {trainingSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
          <p className="text-lg text-gray-700 mb-6">{step.description}</p>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Key Points
            </h4>
            <ul className="space-y-3">
              {step.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Tip */}
          {step.videoTip && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-600" />
                Pro Tip
              </h4>
              <p className="text-gray-700">{step.videoTip}</p>
            </div>
          )}

          {/* Practice Task */}
          {step.practiceTask && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Practice Task
              </h4>
              <p className="text-gray-700 font-medium">{step.practiceTask}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
              <button
                onClick={handleSkipToEnd}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                Skip Training
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Completion Dots */}
              <div className="flex gap-1">
                {trainingSteps.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentStep
                        ? 'bg-indigo-600 w-6'
                        : completedSteps.includes(s.id)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                {currentStep < trainingSteps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Start Practicing
                    <Play className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
