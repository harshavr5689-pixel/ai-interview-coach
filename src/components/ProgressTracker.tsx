import { useEffect, useState } from 'react'
import { Clock, Target, TrendingUp } from 'lucide-react'

interface ProgressTrackerProps {
  totalQuestions: number
  currentQuestion: number
  sessionStartTime: number | null
}

export const ProgressTracker = ({
  totalQuestions,
  currentQuestion,
  sessionStartTime,
}: ProgressTrackerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!sessionStartTime) return

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionStartTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const avgTimePerQuestion = currentQuestion > 0 ? elapsedTime / currentQuestion : 0
  const estimatedTimeRemaining = Math.floor(
    avgTimePerQuestion * (totalQuestions - currentQuestion)
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold mb-4">Session Progress</h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Questions</span>
          <span className="font-semibold">
            {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time Stats */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Elapsed Time</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {formatTime(elapsedTime)}
          </span>
        </div>

        {currentQuestion > 0 && (
          <>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium">Avg per Q</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {formatTime(Math.floor(avgTimePerQuestion))}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Est. Remaining</span>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {formatTime(estimatedTimeRemaining)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Milestone Messages */}
      {progress >= 25 && progress < 50 && (
        <div className="mt-4 p-2 bg-yellow-50 rounded text-xs text-center">
          🎯 Quarter way there! Keep it up!
        </div>
      )}
      {progress >= 50 && progress < 75 && (
        <div className="mt-4 p-2 bg-orange-50 rounded text-xs text-center">
          💪 Halfway done! You're doing great!
        </div>
      )}
      {progress >= 75 && progress < 100 && (
        <div className="mt-4 p-2 bg-green-50 rounded text-xs text-center">
          🚀 Almost there! Finish strong!
        </div>
      )}
    </div>
  )
}
