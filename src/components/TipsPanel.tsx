import { Lightbulb, AlertCircle } from 'lucide-react'

interface TipsPanelProps {
  tips: string[]
}

export const TipsPanel = ({ tips }: TipsPanelProps) => {
  const defaultTips = [
    'Maintain eye contact with the camera',
    'Speak clearly and at a moderate pace',
    'Use the STAR method for behavioral questions',
    'Be specific with examples from your experience',
    'Show confidence in your answers'
  ]

  const displayTips = tips.length > 0 ? tips : defaultTips

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
        <h3 className="font-bold text-lg">Interview Tips</h3>
      </div>
      
      <div className="space-y-3">
        {displayTips.map((tip, index) => (
          <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{tip}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <h4 className="font-semibold text-sm mb-2">Pro Tips:</h4>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Pause before answering to collect your thoughts</li>
          <li>• Keep answers between 2-3 minutes</li>
          <li>• Smile naturally and show enthusiasm</li>
          <li>• Ask for clarification if needed</li>
        </ul>
      </div>
    </div>
  )
}
