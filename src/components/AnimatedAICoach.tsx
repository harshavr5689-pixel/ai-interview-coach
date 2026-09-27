import { useState, useEffect } from 'react'
import { Volume2, Sparkles } from 'lucide-react'

interface AnimatedAICoachProps {
  isActive: boolean
  videoStream?: MediaStream | null
  currentAnswer: string
  isTyping: boolean
}

type CoachMood = 'happy' | 'thinking' | 'excited' | 'concerned' | 'encouraging' | 'neutral'
type CoachMessage = {
  text: string
  type: 'posture' | 'typing' | 'content' | 'encouragement' | 'instruction'
  mood: CoachMood
}

export function AnimatedAICoach({ isActive, videoStream, currentAnswer, isTyping }: AnimatedAICoachProps) {
  const [mood, setMood] = useState<CoachMood>('neutral')
  const [currentMessage, setCurrentMessage] = useState<CoachMessage | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [blinkState, setBlinkState] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Animated coach messages
  useEffect(() => {
    if (!isActive) return

    const checkInterval = setInterval(() => {
      analyzeAndSpeak()
    }, 5000) // Check every 5 seconds

    return () => clearInterval(checkInterval)
  }, [isActive, currentAnswer, isTyping, videoStream])

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true)
      setTimeout(() => setBlinkState(false), 150)
    }, 3000 + Math.random() * 2000) // Random blink

    return () => clearInterval(blinkInterval)
  }, [])

  // Eye movement animation
  useEffect(() => {
    const moveEyes = setInterval(() => {
      if (isTyping) {
        // Look down when typing
        setEyePosition({ x: 0, y: 15 })
      } else if (isSpeaking) {
        // Look at user when speaking
        setEyePosition({ x: 0, y: 0 })
      } else {
        // Random gentle movement
        const x = (Math.random() - 0.5) * 10
        const y = (Math.random() - 0.5) * 10
        setEyePosition({ x, y })
      }
    }, 2000)

    return () => clearInterval(moveEyes)
  }, [isTyping, isSpeaking])

  const analyzeAndSpeak = () => {
    const messages: CoachMessage[] = []
    
    // Posture and positioning checks
    if (videoStream) {
      messages.push({
        text: "Great! I can see you clearly. Keep maintaining eye contact with the camera!",
        type: 'posture',
        mood: 'happy'
      })
      
      // Random posture reminders
      if (Math.random() > 0.7) {
        messages.push({
          text: "Remember to sit up straight! Good posture shows confidence.",
          type: 'posture',
          mood: 'encouraging'
        })
      }
    }

    // Typing guidance
    if (isTyping) {
      const wordCount = currentAnswer.trim().split(/\s+/).length
      
      if (wordCount < 10) {
        messages.push({
          text: "Good start! Take your time and add more details to your answer.",
          type: 'typing',
          mood: 'encouraging'
        })
      } else if (wordCount > 50 && wordCount < 100) {
        messages.push({
          text: "Excellent! You're providing detailed responses. Keep going!",
          type: 'content',
          mood: 'excited'
        })
      } else if (wordCount > 150) {
        messages.push({
          text: "You're doing great, but try to be more concise. Stay focused!",
          type: 'content',
          mood: 'concerned'
        })
      }
    } else if (currentAnswer.length === 0) {
      messages.push({
        text: "I'm ready when you are! Start typing your answer and I'll guide you.",
        type: 'instruction',
        mood: 'neutral'
      })
    }

    // Content quality checks
    if (currentAnswer.length > 50) {
      const hasExample = currentAnswer.toLowerCase().includes('example') || 
                         currentAnswer.toLowerCase().includes('when i') ||
                         currentAnswer.toLowerCase().includes('at my')
      
      if (!hasExample) {
        messages.push({
          text: "Try adding a specific example from your experience!",
          type: 'content',
          mood: 'thinking'
        })
      }

      const hasMetrics = /\d+/.test(currentAnswer)
      if (!hasMetrics && Math.random() > 0.5) {
        messages.push({
          text: "Numbers make your answer stronger! Can you quantify your impact?",
          type: 'content',
          mood: 'encouraging'
        })
      }
    }

    // General encouragement
    if (Math.random() > 0.7 && currentAnswer.length > 100) {
      messages.push({
        text: "You're doing amazing! I believe in you! 💪",
        type: 'encouragement',
        mood: 'excited'
      })
    }

    // Select and display a message
    if (messages.length > 0) {
      const selectedMessage = messages[Math.floor(Math.random() * messages.length)]
      speak(selectedMessage)
    }
  }

  const speak = (message: CoachMessage) => {
    setCurrentMessage(message)
    setMood(message.mood)
    setIsSpeaking(true)
    setIsAnimating(true)

    // Speak animation duration
    setTimeout(() => {
      setIsAnimating(false)
      setIsSpeaking(false)
    }, 4000)

    // Clear message after showing
    setTimeout(() => {
      setCurrentMessage(null)
    }, 8000)
  }

  const getMoodEmoji = (mood: CoachMood): string => {
    switch (mood) {
      case 'happy': return '😊'
      case 'thinking': return '🤔'
      case 'excited': return '🌟'
      case 'concerned': return '😐'
      case 'encouraging': return '💪'
      default: return '😊'
    }
  }

  const getMoodColor = (mood: CoachMood): string => {
    switch (mood) {
      case 'happy': return '#10b981'
      case 'thinking': return '#8b5cf6'
      case 'excited': return '#f59e0b'
      case 'concerned': return '#ef4444'
      case 'encouraging': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  if (!isActive) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 text-center">
        <div className="opacity-50">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {/* Sleeping coach */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Head */}
              <circle cx="100" cy="100" r="60" fill="#4f46e5" opacity="0.3" />
              {/* Closed eyes */}
              <path d="M 70 90 Q 80 95 90 90" stroke="#1e1b4b" strokeWidth="3" fill="none" />
              <path d="M 110 90 Q 120 95 130 90" stroke="#1e1b4b" strokeWidth="3" fill="none" />
              {/* Mouth */}
              <circle cx="100" cy="120" r="8" fill="#1e1b4b" opacity="0.3" />
              {/* ZZZ */}
              <text x="140" y="70" fontSize="20" fill="#4f46e5" opacity="0.5">Z</text>
              <text x="150" y="55" fontSize="16" fill="#4f46e5" opacity="0.4">Z</text>
              <text x="158" y="43" fontSize="12" fill="#4f46e5" opacity="0.3">Z</text>
            </svg>
          </div>
          <p className="text-gray-500">AI Coach is resting...</p>
          <p className="text-sm text-gray-400 mt-2">I'll wake up when you start!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border-2 border-indigo-200">
      {/* Coach Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          </div>
          <span className="font-bold text-gray-700">AI Coach</span>
          {isSpeaking && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Speaking...</span>
            </div>
          )}
        </div>
        <Sparkles className={`w-5 h-5 text-purple-500 ${isAnimating ? 'animate-spin' : ''}`} />
      </div>

      {/* Animated Coach Character */}
      <div className="relative mb-6">
        <div className={`w-48 h-48 mx-auto relative transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
            {/* Glow effect when speaking */}
            {isSpeaking && (
              <circle 
                cx="100" 
                cy="100" 
                r="70" 
                fill={getMoodColor(mood)} 
                opacity="0.2"
                className="animate-pulse"
              />
            )}
            
            {/* Head */}
            <circle 
              cx="100" 
              cy="100" 
              r="60" 
              fill="url(#headGradient)"
              stroke={getMoodColor(mood)}
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>

            {/* Hair/Top decoration */}
            <circle cx="85" cy="65" r="12" fill="#312e81" />
            <circle cx="100" cy="60" r="15" fill="#312e81" />
            <circle cx="115" cy="65" r="12" fill="#312e81" />

            {/* Eyes */}
            <g className="transition-all duration-200" transform={`translate(${eyePosition.x}, ${eyePosition.y})`}>
              {blinkState ? (
                <>
                  {/* Closed eyes */}
                  <path d="M 75 95 Q 85 98 95 95" stroke="#1e1b4b" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M 105 95 Q 115 98 125 95" stroke="#1e1b4b" strokeWidth="4" fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Open eyes */}
                  <ellipse cx="85" cy="95" rx="12" ry="16" fill="white" />
                  <ellipse cx="115" cy="95" rx="12" ry="16" fill="white" />
                  <circle cx="85" cy="95" r="8" fill="#1e1b4b" />
                  <circle cx="115" cy="95" r="8" fill="#1e1b4b" />
                  <circle cx="87" cy="92" r="3" fill="white" /> {/* Shine */}
                  <circle cx="117" cy="92" r="3" fill="white" /> {/* Shine */}
                </>
              )}
            </g>

            {/* Eyebrows */}
            <path 
              d={mood === 'concerned' 
                ? "M 70 80 Q 85 75 95 78" 
                : mood === 'excited'
                ? "M 70 85 Q 85 80 95 83"
                : "M 70 83 Q 85 80 95 83"
              } 
              stroke="#1e1b4b" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d={mood === 'concerned' 
                ? "M 105 78 Q 115 75 130 80" 
                : mood === 'excited'
                ? "M 105 83 Q 115 80 130 85"
                : "M 105 83 Q 115 80 130 83"
              } 
              stroke="#1e1b4b" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
            />

            {/* Mouth */}
            {isSpeaking ? (
              <g className="animate-pulse">
                <ellipse cx="100" cy="125" rx="15" ry="12" fill="#1e1b4b" />
                <ellipse cx="100" cy="123" rx="10" ry="8" fill="#ef4444" />
              </g>
            ) : (
              <path 
                d={mood === 'happy' || mood === 'excited'
                  ? "M 80 120 Q 100 135 120 120" 
                  : mood === 'concerned'
                  ? "M 80 130 Q 100 125 120 130"
                  : "M 80 125 Q 100 128 120 125"
                } 
                stroke="#1e1b4b" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
              />
            )}

            {/* Blush when excited or happy */}
            {(mood === 'excited' || mood === 'happy') && (
              <>
                <circle cx="65" cy="110" r="8" fill="#f472b6" opacity="0.5" />
                <circle cx="135" cy="110" r="8" fill="#f472b6" opacity="0.5" />
              </>
            )}
          </svg>
        </div>

        {/* Mood indicator */}
        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
          {getMoodEmoji(mood)}
        </div>
      </div>

      {/* Speech Bubble */}
      {currentMessage && (
        <div className={`relative bg-white rounded-2xl p-4 shadow-lg border-2 animate-fadeIn`}
             style={{ borderColor: getMoodColor(mood) }}>
          {/* Triangle pointer */}
          <div 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderBottom: `12px solid ${getMoodColor(mood)}`
            }}
          />
          
          {/* Message type badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: getMoodColor(mood), 
                    color: 'white' 
                  }}>
              {currentMessage.type === 'posture' && '📸 Posture'}
              {currentMessage.type === 'typing' && '⌨️ Typing'}
              {currentMessage.type === 'content' && '💡 Content'}
              {currentMessage.type === 'encouragement' && '💪 Motivation'}
              {currentMessage.type === 'instruction' && '📋 Guide'}
            </span>
          </div>

          {/* Message text */}
          <p className="text-gray-800 font-medium leading-relaxed">
            {currentMessage.text}
          </p>

          {/* Speaking animation indicator */}
          {isSpeaking && (
            <div className="mt-3 flex gap-1 justify-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      )}

      {/* No message - show status */}
      {!currentMessage && (
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {isTyping 
              ? "I'm watching you type... Keep going! ✨" 
              : "I'm here to help! Start typing your answer."}
          </p>
        </div>
      )}

      {/* Quick tips bar */}
      <div className="mt-4 pt-4 border-t border-indigo-200">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-white rounded-lg">
            <div className="text-2xl mb-1">👁️</div>
            <div className="text-gray-600">Eye Contact</div>
          </div>
          <div className="text-center p-2 bg-white rounded-lg">
            <div className="text-2xl mb-1">🪑</div>
            <div className="text-gray-600">Sit Straight</div>
          </div>
          <div className="text-center p-2 bg-white rounded-lg">
            <div className="text-2xl mb-1">😊</div>
            <div className="text-gray-600">Smile</div>
          </div>
        </div>
      </div>
    </div>
  )
}
