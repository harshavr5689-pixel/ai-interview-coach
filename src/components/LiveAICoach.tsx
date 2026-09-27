import { useState, useEffect } from 'react'
import { Bot, Sparkles, TrendingUp, AlertCircle, CheckCircle, Eye, Clock, Mic } from 'lucide-react'

interface LiveAICoachProps {
  currentAnswer: string
  questionType: 'introduction' | 'strengths' | 'challenge' | 'goals' | 'company' | 'weakness' | 'leadership' | 'stress' | 'motivation' | 'questions'
  timeSpent: number
  isActive: boolean
}

interface CoachingMessage {
  id: string
  type: 'suggestion' | 'encouragement' | 'warning' | 'success' | 'tip'
  message: string
  icon: typeof Sparkles
  priority: 'high' | 'medium' | 'low'
}

export function LiveAICoach({ currentAnswer, questionType, timeSpent, isActive }: LiveAICoachProps) {
  const [messages, setMessages] = useState<CoachingMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)

  useEffect(() => {
    if (!isActive || !currentAnswer) {
      setMessages([])
      return
    }

    setIsThinking(true)
    const timer = setTimeout(() => {
      const newMessages = analyzeAnswerInRealTime(currentAnswer, questionType, timeSpent)
      setMessages(newMessages)
      setIsThinking(false)
    }, 800) // Small delay to avoid overwhelming user

    return () => clearTimeout(timer)
  }, [currentAnswer, questionType, timeSpent, isActive])

  const analyzeAnswerInRealTime = (
    answer: string,
    type: string,
    time: number
  ): CoachingMessage[] => {
    const suggestions: CoachingMessage[] = []
    const words = answer.trim().split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length
    const answerLower = answer.toLowerCase()

    // Word count and timing analysis
    if (wordCount < 20 && time > 10) {
      suggestions.push({
        id: 'word-count-low',
        type: 'suggestion',
        message: 'Your answer seems brief. Try to add more details and specific examples.',
        icon: AlertCircle,
        priority: 'high'
      })
    } else if (wordCount > 30 && wordCount < 80) {
      suggestions.push({
        id: 'word-count-good',
        type: 'success',
        message: 'Good answer length! Keep providing details.',
        icon: CheckCircle,
        priority: 'low'
      })
    } else if (wordCount > 150) {
      suggestions.push({
        id: 'word-count-high',
        type: 'warning',
        message: 'Your answer is getting long. Try to stay focused and concise.',
        icon: AlertCircle,
        priority: 'medium'
      })
    }

    // STAR method detection
    const hasSTAR = {
      situation: answerLower.includes('situation') || answerLower.includes('when') || answerLower.includes('at'),
      task: answerLower.includes('task') || answerLower.includes('needed') || answerLower.includes('had to'),
      action: answerLower.includes('i did') || answerLower.includes('i decided') || answerLower.includes('i took'),
      result: answerLower.includes('result') || answerLower.includes('outcome') || answerLower.includes('achieved')
    }

    if (type === 'challenge' || type === 'leadership') {
      if (wordCount > 20 && !hasSTAR.situation && !hasSTAR.task) {
        suggestions.push({
          id: 'star-start',
          type: 'suggestion',
          message: '💡 Start with the SITUATION: Describe when and where this happened.',
          icon: Sparkles,
          priority: 'high'
        })
      } else if (wordCount > 40 && hasSTAR.situation && !hasSTAR.action) {
        suggestions.push({
          id: 'star-action',
          type: 'suggestion',
          message: '💡 Now describe the ACTION: What did YOU specifically do?',
          icon: Sparkles,
          priority: 'high'
        })
      } else if (wordCount > 60 && hasSTAR.action && !hasSTAR.result) {
        suggestions.push({
          id: 'star-result',
          type: 'suggestion',
          message: '💡 Don\'t forget the RESULT: What was the outcome? Use numbers if possible!',
          icon: Sparkles,
          priority: 'high'
        })
      }
    }

    // Specific question type guidance
    switch (type) {
      case 'introduction':
        if (wordCount > 20 && !answerLower.includes('experience') && !answerLower.includes('background')) {
          suggestions.push({
            id: 'intro-experience',
            type: 'tip',
            message: '💼 Mention your relevant experience and background.',
            icon: Sparkles,
            priority: 'medium'
          })
        }
        if (wordCount > 30 && !answerLower.includes('passion') && !answerLower.includes('interest')) {
          suggestions.push({
            id: 'intro-passion',
            type: 'tip',
            message: '✨ Show your passion for the role or industry.',
            icon: Sparkles,
            priority: 'low'
          })
        }
        break

      case 'strengths':
        if (wordCount > 15 && !answerLower.includes('example')) {
          suggestions.push({
            id: 'strength-example',
            type: 'suggestion',
            message: '📊 Provide a specific example that demonstrates this strength.',
            icon: TrendingUp,
            priority: 'high'
          })
        }
        if (words.length > 20) {
          suggestions.push({
            id: 'strength-relevant',
            type: 'tip',
            message: '🎯 Make sure your strengths are relevant to the job role.',
            icon: CheckCircle,
            priority: 'medium'
          })
        }
        break

      case 'weakness':
        if (wordCount > 15 && !answerLower.includes('improve') && !answerLower.includes('working on')) {
          suggestions.push({
            id: 'weakness-improvement',
            type: 'suggestion',
            message: '📈 Show how you\'re actively working to improve this weakness.',
            icon: TrendingUp,
            priority: 'high'
          })
        }
        if (answerLower.includes('perfect') || answerLower.includes('too hard')) {
          suggestions.push({
            id: 'weakness-genuine',
            type: 'warning',
            message: '⚠️ Avoid cliché weaknesses. Be genuine but professional.',
            icon: AlertCircle,
            priority: 'high'
          })
        }
        break

      case 'company':
        if (wordCount > 15 && !answerLower.includes('mission') && !answerLower.includes('value')) {
          suggestions.push({
            id: 'company-values',
            type: 'tip',
            message: '🏢 Mention specific company values or mission that resonate with you.',
            icon: Sparkles,
            priority: 'medium'
          })
        }
        if (wordCount > 25 && !answerLower.includes('contribute') && !answerLower.includes('help')) {
          suggestions.push({
            id: 'company-contribute',
            type: 'suggestion',
            message: '💪 Explain how you can contribute to the company\'s success.',
            icon: TrendingUp,
            priority: 'high'
          })
        }
        break

      case 'goals':
        if (wordCount > 20 && !answerLower.includes('grow') && !answerLower.includes('develop')) {
          suggestions.push({
            id: 'goals-growth',
            type: 'tip',
            message: '🌱 Emphasize your desire to grow and develop professionally.',
            icon: Sparkles,
            priority: 'medium'
          })
        }
        break
    }

    // Filler words detection
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally']
    const fillerCount = fillerWords.reduce((count, filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi')
      return count + (answer.match(regex) || []).length
    }, 0)

    if (fillerCount > 3) {
      suggestions.push({
        id: 'filler-words',
        type: 'warning',
        message: '🗣️ Try to reduce filler words. Pause instead of saying "um" or "like".',
        icon: Mic,
        priority: 'medium'
      })
    }

    // First person usage
    const firstPersonCount = (answer.match(/\b(i|my|me)\b/gi) || []).length
    if (wordCount > 30 && firstPersonCount < 2) {
      suggestions.push({
        id: 'first-person',
        type: 'tip',
        message: '👤 Use "I" statements to show ownership of your accomplishments.',
        icon: Sparkles,
        priority: 'low'
      })
    }

    // Time-based encouragement
    if (time > 60 && wordCount > 100) {
      suggestions.push({
        id: 'doing-great',
        type: 'encouragement',
        message: '🌟 You\'re doing great! Keep up the detailed response.',
        icon: Sparkles,
        priority: 'low'
      })
    }

    // Enthusiasm check
    const enthusiasmWords = ['excited', 'passionate', 'love', 'enthusiastic', 'eager', 'motivated']
    const hasEnthusiasm = enthusiasmWords.some(word => answerLower.includes(word))
    
    if (wordCount > 40 && !hasEnthusiasm && (type === 'company' || type === 'motivation' || type === 'introduction')) {
      suggestions.push({
        id: 'show-enthusiasm',
        type: 'tip',
        message: '⚡ Show enthusiasm and genuine interest in your answer.',
        icon: Sparkles,
        priority: 'medium'
      })
    }

    // Specificity check
    const hasNumbers = /\d+/.test(answer)
    const hasPercentage = answer.includes('%')
    if (wordCount > 50 && !hasNumbers && !hasPercentage && (type === 'challenge' || type === 'leadership' || type === 'strengths')) {
      suggestions.push({
        id: 'use-metrics',
        type: 'tip',
        message: '📊 Add specific numbers or metrics to quantify your impact.',
        icon: TrendingUp,
        priority: 'medium'
      })
    }

    // Sort by priority
    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }).slice(0, 3) // Show max 3 messages at a time
  }

  if (!isActive) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="w-6 h-6 text-gray-400" />
          <h3 className="font-bold text-gray-400">AI Coach (Inactive)</h3>
        </div>
        <p className="text-gray-500 text-sm">
          Start typing your answer to receive live coaching suggestions...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Bot className="w-7 h-7 text-purple-600" />
          {isThinking && (
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            Live AI Coach
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {Math.floor(timeSpent)}s
        </div>
      </div>

      {messages.length === 0 && !isThinking ? (
        <div className="bg-white bg-opacity-50 rounded-lg p-4 text-center">
          <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">
            I'm analyzing your answer in real-time. Keep writing...
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {isThinking && messages.length === 0 && (
            <div className="bg-white bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="text-sm">Analyzing your response...</span>
              </div>
            </div>
          )}
          
          {messages.map((msg) => {
            const Icon = msg.icon
            const styles = {
              suggestion: 'bg-blue-100 border-blue-300 text-blue-900',
              encouragement: 'bg-green-100 border-green-300 text-green-900',
              warning: 'bg-orange-100 border-orange-300 text-orange-900',
              success: 'bg-emerald-100 border-emerald-300 text-emerald-900',
              tip: 'bg-purple-100 border-purple-300 text-purple-900'
            }

            const iconColors = {
              suggestion: 'text-blue-600',
              encouragement: 'text-green-600',
              warning: 'text-orange-600',
              success: 'text-emerald-600',
              tip: 'text-purple-600'
            }

            return (
              <div
                key={msg.id}
                className={`${styles[msg.type]} border-2 rounded-lg p-4 animate-fadeIn`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[msg.type]}`} />
                  <p className="text-sm font-medium leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-xs text-gray-600 text-center">
            💡 Suggestions update as you type
          </p>
        </div>
      )}
    </div>
  )
}
