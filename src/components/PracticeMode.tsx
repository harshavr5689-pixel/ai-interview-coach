import { useState } from 'react'
import { Play, Settings, BookOpen } from 'lucide-react'

interface PracticeModeProps {
  onSelectMode: (mode: 'full' | 'quick' | 'custom') => void
}

export const PracticeMode = ({ onSelectMode }: PracticeModeProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('')

  const modes = [
    {
      id: 'full',
      name: 'Full Interview',
      icon: Play,
      duration: '45-60 min',
      questions: '8-12 questions',
      description: 'Complete interview experience with all question types',
      color: 'indigo',
    },
    {
      id: 'quick',
      name: 'Quick Practice',
      icon: Settings,
      duration: '15-20 min',
      questions: '3-5 questions',
      description: 'Fast practice session for busy schedules',
      color: 'green',
    },
    {
      id: 'custom',
      name: 'Custom Session',
      icon: BookOpen,
      duration: 'Your choice',
      questions: 'Your choice',
      description: 'Pick specific question types and difficulty',
      color: 'purple',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Practice Mode</h2>
        <p className="text-gray-600">Select the session type that fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <button
              key={mode.id}
              onClick={() => {
                setSelectedMode(mode.id)
                onSelectMode(mode.id as any)
              }}
              className={`p-6 border-2 rounded-2xl text-left transition-all hover:shadow-xl ${
                selectedMode === mode.id
                  ? `border-${mode.color}-600 bg-${mode.color}-50 shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full bg-${mode.color}-100 flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${mode.color}-600`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
              <div className="space-y-1 mb-3 text-sm text-gray-600">
                <div>⏱️ {mode.duration}</div>
                <div>❓ {mode.questions}</div>
              </div>
              <p className="text-sm text-gray-700">{mode.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
