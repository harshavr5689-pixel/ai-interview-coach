import { useEffect } from 'react'
import { Keyboard } from 'lucide-react'

interface KeyboardShortcutsProps {
  onStartRecording?: () => void
  onStopRecording?: () => void
  onNextQuestion?: () => void
  onSkipQuestion?: () => void
}

export const KeyboardShortcuts = ({
  onStartRecording,
  onStopRecording,
  onNextQuestion,
  onSkipQuestion,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key.toLowerCase()) {
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            onStartRecording?.()
          }
          break
        case 'e':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            onStopRecording?.()
          }
          break
        case 'n':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            onNextQuestion?.()
          }
          break
        case 'arrowright':
          if (e.ctrlKey) {
            e.preventDefault()
            onSkipQuestion?.()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onStartRecording, onStopRecording, onNextQuestion, onSkipQuestion])

  return null
}

export const KeyboardShortcutsHelp = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h4 className="font-semibold text-sm mb-3 flex items-center">
        <Keyboard className="w-4 h-4 mr-2" />
        Keyboard Shortcuts
      </h4>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Start Recording</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl + S</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Stop Recording</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl + E</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Next Question</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl + N</kbd>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Skip Question</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl + →</kbd>
        </div>
      </div>
    </div>
  )
}
