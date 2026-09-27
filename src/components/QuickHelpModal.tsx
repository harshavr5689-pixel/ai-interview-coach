import { X, Lightbulb, Eye, Mic, MessageSquare, Clock } from 'lucide-react'

interface QuickHelpModalProps {
  onClose: () => void
}

export function QuickHelpModal({ onClose }: QuickHelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Quick Help</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Body Language */}
          <div className="bg-blue-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Body Language</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Look at the camera, not yourself on screen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Smile naturally to show confidence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Sit upright with good posture
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Avoid fidgeting or excessive movement
              </li>
            </ul>
          </div>

          {/* Speaking Tips */}
          <div className="bg-green-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Mic className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Speaking Tips</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                Speak clearly at moderate pace (130-150 wpm)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                Avoid filler words: "um," "uh," "like"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                Project your voice with confidence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                Take brief pauses to think
              </li>
            </ul>
          </div>

          {/* STAR Method */}
          <div className="bg-purple-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">STAR Method</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="bg-white p-3 rounded-lg">
                <span className="font-bold text-purple-600">S</span>ituation - Set the context
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-bold text-purple-600">T</span>ask - Explain the challenge
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-bold text-purple-600">A</span>ction - Describe what YOU did
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="font-bold text-purple-600">R</span>esult - Share the outcome
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="bg-orange-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Answer Length</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                Aim for 2-3 minutes per answer
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                Too short? Add specific examples
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                Too long? Stay focused on key points
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                Pause 3-5 seconds before starting
              </li>
            </ul>
          </div>

          {/* Quick Reminders */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Reminders</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="bg-white p-3 rounded-lg">
                ✓ Be specific with examples
              </div>
              <div className="bg-white p-3 rounded-lg">
                ✓ Show enthusiasm
              </div>
              <div className="bg-white p-3 rounded-lg">
                ✓ Use metrics when possible
              </div>
              <div className="bg-white p-3 rounded-lg">
                ✓ Stay relevant to question
              </div>
              <div className="bg-white p-3 rounded-lg">
                ✓ Demonstrate learning
              </div>
              <div className="bg-white p-3 rounded-lg">
                ✓ End with summary
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  )
}
