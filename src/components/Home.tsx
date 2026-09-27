import { useState } from 'react'
import { Briefcase, Video, TrendingUp, Award, BookOpen } from 'lucide-react'
import { TrainingGuide } from './TrainingGuide'

interface HomeProps {
  onStartInterview: () => void
}

export function Home({ onStartInterview }: HomeProps) {
  const [showTraining, setShowTraining] = useState(false)
  const [hasCompletedTraining, setHasCompletedTraining] = useState(
    localStorage.getItem('trainingCompleted') === 'true'
  )

  const handleStartTraining = () => {
    setShowTraining(true)
  }

  const handleCompleteTraining = () => {
    setShowTraining(false)
    setHasCompletedTraining(true)
    localStorage.setItem('trainingCompleted', 'true')
    onStartInterview()
  }

  const handleCloseTraining = () => {
    setShowTraining(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-4 rounded-2xl">
              <Briefcase className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Interview Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice your interview skills with real-time AI feedback on your responses, 
            body language, and communication style
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Video className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Analysis</h3>
            <p className="text-gray-600">
              Get feedback on eye contact, facial expressions, and body language
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <TrendingUp className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Speech Analysis</h3>
            <p className="text-gray-600">
              Improve your pace, clarity, and reduce filler words
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Award className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Feedback</h3>
            <p className="text-gray-600">
              Receive detailed insights on content quality and delivery
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartInterview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl text-xl font-semibold shadow-lg transition-colors w-full sm:w-auto"
            >
              Start Practice Interview
            </button>
            
            <button
              onClick={handleStartTraining}
              className="bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <BookOpen className="w-5 h-5" />
              {hasCompletedTraining ? 'Review Training' : 'Start Training Guide'}
            </button>
          </div>
          
          {!hasCompletedTraining && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-yellow-800 font-semibold flex items-center gap-2 justify-center">
                <BookOpen className="w-5 h-5" />
                New here? Complete the 10-minute training guide first!
              </p>
            </div>
          )}
          
          <p className="text-gray-500 text-sm">
            Make sure to allow camera and microphone access
          </p>
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3">How it works:</h3>
          <ol className="space-y-2 text-gray-600">
            <li>1. Click "Start Practice Interview" and grant permissions</li>
            <li>2. Answer interview questions while being recorded</li>
            <li>3. Receive instant AI-powered feedback and insights</li>
            <li>4. Review your performance and track improvement over time</li>
          </ol>
        </div>
      </div>

      {/* Training Guide Modal */}
      {showTraining && (
        <TrainingGuide 
          onClose={handleCloseTraining}
          onComplete={handleCompleteTraining}
        />
      )}
    </div>
  )
}
