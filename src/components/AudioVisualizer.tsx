import { useAudioLevel } from '../hooks/useAudioLevel'
import { Mic } from 'lucide-react'

interface AudioVisualizerProps {
  isActive: boolean
}

export const AudioVisualizer = ({ isActive }: AudioVisualizerProps) => {
  const audioLevel = useAudioLevel(isActive)

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold flex items-center">
          <Mic className="w-4 h-4 mr-2" />
          Audio Level
        </span>
        <span className="text-xs text-gray-600">
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-100 ${
              audioLevel > 70
                ? 'bg-green-500'
                : audioLevel > 30
                ? 'bg-yellow-500'
                : 'bg-red-400'
            }`}
            style={{ width: `${audioLevel}%` }}
          />
        </div>
        
        {/* Visual bars */}
        <div className="flex space-x-1 mt-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all duration-100 ${
                audioLevel > i * 10 ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
              style={{
                height: `${Math.max(4, (audioLevel > i * 10 ? audioLevel / 5 : 4))}px`,
              }}
            />
          ))}
        </div>
      </div>

      {audioLevel < 20 && isActive && (
        <p className="text-xs text-orange-600 mt-2">
          ⚠️ Low audio level - speak louder or check your microphone
        </p>
      )}
      {audioLevel > 90 && isActive && (
        <p className="text-xs text-orange-600 mt-2">
          ⚠️ Audio level too high - lower your volume
        </p>
      )}
    </div>
  )
}
