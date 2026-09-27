import { Briefcase, Video, TrendingUp, Award } from 'lucide-react'

interface HomeProps {
  onStartInterview: () => void
}

export function Home({ onStartInterview }: HomeProps) {
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

        <div className="text-center">
          <button
            onClick={onStartInterview}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl text-xl font-semibold shadow-lg transition-colors"
          >
            Start Practice Interview
          </button>
          <p className="text-gray-500 mt-4 text-sm">
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
    </div>
  )
}
