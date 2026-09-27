import { useState } from 'react'
import { Home, TrendingUp, Eye, Mic, Award } from 'lucide-react'
import { useInterviewStore } from '../store/interviewStore'
import { AdvancedAnalytics } from './AdvancedAnalytics'
import { ExportResults } from './ExportResults'

interface ResultsProps {
  onBackToHome: () => void
}

export function Results({ onBackToHome }: ResultsProps) {
  const { answers, faceMetrics, speechMetrics } = useInterviewStore()
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate overall scores
  const calculateOverallScore = () => {
    if (answers.length === 0) return 0
    const total = answers.reduce((sum, answer) => {
      const score = answer.analysis
        ? (answer.analysis.confidence + answer.analysis.clarity + answer.analysis.relevance) / 3
        : 50
      return sum + score
    }, 0)
    return Math.round(total / answers.length)
  }

  const calculateEyeContactScore = () => {
    if (faceMetrics.length === 0) return 0
    const avg = faceMetrics.reduce((sum, m) => sum + m.eyeContact, 0) / faceMetrics.length
    return Math.round(avg)
  }

  const calculateSpeechScore = () => {
    if (speechMetrics.length === 0) return 0
    const avgClarity = speechMetrics.reduce((sum, m) => sum + m.clarity * 100, 0) / speechMetrics.length
    return Math.round(avgClarity)
  }

  const overallScore = calculateOverallScore()
  const eyeContactScore = calculateEyeContactScore()
  const speechScore = calculateSpeechScore()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interview Results</h1>
              <p className="text-gray-600 mt-1">Review your performance and get insights</p>
            </div>
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Overall Score Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-indigo-600" />
              <h3 className="font-semibold text-gray-700">Overall Score</h3>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <p className="text-sm text-gray-500 mt-1">{getScoreLabel(overallScore)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h3 className="font-semibold text-gray-700">Content Quality</h3>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <p className="text-sm text-gray-500 mt-1">{answers.length} answers analyzed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8 text-green-600" />
              <h3 className="font-semibold text-gray-700">Eye Contact</h3>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(eyeContactScore)}`}>
              {eyeContactScore}
            </div>
            <p className="text-sm text-gray-500 mt-1">{getScoreLabel(eyeContactScore)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mic className="w-8 h-8 text-purple-600" />
              <h3 className="font-semibold text-gray-700">Speech Clarity</h3>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(speechScore)}`}>
              {speechScore}
            </div>
            <p className="text-sm text-gray-500 mt-1">{getScoreLabel(speechScore)}</p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Analytics
              </button>
              <ExportResults />
            </div>
          </div>

          {showAdvanced && <AdvancedAnalytics />}

          <div className="space-y-6">
            {answers.map((answer, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Question {index + 1}: {answer.question}
                    </h3>
                    <p className="text-gray-700 mb-3">{answer.answer}</p>
                  </div>
                </div>

                {answer.analysis && (
                  <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Confidence</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${answer.analysis.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{Math.round(answer.analysis.confidence)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Clarity</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${answer.analysis.clarity}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{Math.round(answer.analysis.clarity)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Relevance</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${answer.analysis.relevance}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{Math.round(answer.analysis.relevance)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {answer.analysis && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Sentiment</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">
                      {answer.analysis.sentiment}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Recommendations</h2>
          <ul className="space-y-3">
            {overallScore < 70 && (
              <li className="flex items-start gap-3">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-gray-700">
                  Focus on providing more detailed and structured answers
                </span>
              </li>
            )}
            {eyeContactScore < 70 && (
              <li className="flex items-start gap-3">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-gray-700">
                  Maintain better eye contact with the camera during responses
                </span>
              </li>
            )}
            {speechScore < 70 && (
              <li className="flex items-start gap-3">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-gray-700">
                  Practice speaking more clearly and at a moderate pace
                </span>
              </li>
            )}
            {overallScore >= 70 && eyeContactScore >= 70 && speechScore >= 70 && (
              <li className="flex items-start gap-3">
                <span className="text-green-600">✅</span>
                <span className="text-gray-700">
                  Great performance! Keep practicing to maintain consistency
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
