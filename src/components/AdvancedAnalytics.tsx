import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'
import { useInterviewStore } from '../store/interviewStore'

export const AdvancedAnalytics = () => {
  const { answers } = useInterviewStore()

  if (answers.length === 0) {
    return null
  }

  const getTimelineData = () => {
    return answers.map((answer, index) => ({
      question: index + 1,
      score: answer.analysis
        ? Math.round(
            (answer.analysis.confidence + 
             answer.analysis.clarity + 
             answer.analysis.relevance) / 3
          )
        : 50,
    }))
  }

  const timeline = getTimelineData()
  const avgScore = Math.round(
    timeline.reduce((sum, item) => sum + item.score, 0) / timeline.length
  )

  const trend = timeline.length > 1
    ? timeline[timeline.length - 1].score - timeline[0].score
    : 0

  const maxScore = Math.max(...timeline.map((t) => t.score))

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <BarChart3 className="mr-2" />
        Performance Timeline
      </h3>

      {/* Trend Indicator */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 mb-1">Performance Trend</div>
          <div className="flex items-center">
            <TrendingUp
              className={`mr-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}
            />
            <span className={`text-2xl font-bold ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 mb-1">Average Score</div>
          <div className="text-2xl font-bold text-indigo-600">{avgScore}%</div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="space-y-3">
        {timeline.map((item) => (
          <div key={item.question} className="flex items-center">
            <div className="w-16 text-sm font-medium text-gray-600">
              Q{item.question}
            </div>
            <div className="flex-1 relative">
              <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div
                  className={`h-8 rounded-full transition-all ${
                    item.score >= 80
                      ? 'bg-green-500'
                      : item.score >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  {item.score}%
                </div>
              </div>
              {item.score === maxScore && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                    Best
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-2">Insights</h4>
            <ul className="text-xs space-y-1 text-gray-700">
              {trend > 10 && (
                <li>✓ Great improvement! You're getting more comfortable</li>
              )}
              {trend < -10 && (
                <li>• Performance declined - stay focused and energized</li>
              )}
              {avgScore >= 80 && (
                <li>✓ Consistently strong performance across questions</li>
              )}
              {timeline.some((t, i) => i > 0 && Math.abs(t.score - timeline[i - 1].score) > 20) && (
                <li>• Noticeable variation between questions - aim for consistency</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
