import { Download } from 'lucide-react'
import { useInterviewStore } from '../store/interviewStore'

export const ExportResults = () => {
  const { answers, faceMetrics, speechMetrics } = useInterviewStore()

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

  const exportToJSON = () => {
    const data = {
      date: new Date().toISOString(),
      answers,
      faceMetrics,
      speechMetrics,
      overallScore: calculateOverallScore(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `interview-results-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportToJSON}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Export Results
    </button>
  )
}
