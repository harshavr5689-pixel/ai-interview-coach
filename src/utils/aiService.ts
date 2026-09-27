/**
 * AI Service for interview coaching feedback
 * Can integrate with OpenAI or other AI providers
 */

export interface AIFeedback {
  overallScore: number
  strengths: string[]
  improvements: string[]
  specificFeedback: string
  answerQuality: number
}

// Simplified analysis result for the interview store
export interface AnswerAnalysis {
  confidence: number
  clarity: number
  relevance: number
  sentiment: string
}

// Helper function for quick analysis
export async function analyzeAnswer(question: string, answer: string): Promise<AnswerAnalysis> {
  const service = new AICoachingService()
  const feedback = await service.analyzeAnswer(question, answer, 'general')
  
  return {
    confidence: feedback.overallScore,
    clarity: feedback.answerQuality,
    relevance: feedback.overallScore > 60 ? 75 + Math.random() * 20 : 50 + Math.random() * 20,
    sentiment: feedback.overallScore > 70 ? 'positive' : feedback.overallScore > 50 ? 'neutral' : 'needs improvement'
  }
}

export class AICoachingService {
  private apiKey: string | null

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null
  }

  async analyzeAnswer(
    _question: string,
    answer: string,
    category: string
  ): Promise<AIFeedback> {
    // Mock implementation - replace with actual API call
    if (!this.apiKey) {
      return this.getMockFeedback(answer, category)
    }

    try {
      // Example OpenAI integration:
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.apiKey}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     messages: [
      //       {
      //         role: 'system',
      //         content: 'You are an expert interview coach...'
      //       },
      //       {
      //         role: 'user',
      //         content: `Question: ${_question}\nAnswer: ${answer}\nCategory: ${category}`
      //       }
      //     ]
      //   })
      // })

      return this.getMockFeedback(answer, category)
    } catch (error) {
      console.error('AI analysis error:', error)
      return this.getMockFeedback(answer, category)
    }
  }

  private getMockFeedback(
    answer: string,
    category: string
  ): AIFeedback {
    const wordCount = answer.split(/\s+/).length
    const hasStarMethod = answer.toLowerCase().includes('situation') ||
                          answer.toLowerCase().includes('task') ||
                          answer.toLowerCase().includes('action') ||
                          answer.toLowerCase().includes('result')

    const answerQuality = Math.min(
      100,
      (wordCount / 150) * 50 + (hasStarMethod ? 30 : 0) + Math.random() * 20
    )

    const strengths: string[] = []
    const improvements: string[] = []

    if (wordCount > 100) {
      strengths.push('Provided detailed response with good length')
    } else {
      improvements.push('Try to provide more detailed examples')
    }

    if (hasStarMethod) {
      strengths.push('Used structured approach (STAR method)')
    } else if (category === 'behavioral') {
      improvements.push('Consider using the STAR method for behavioral questions')
    }

    if (answer.includes('team') || answer.includes('collaborate')) {
      strengths.push('Demonstrated teamwork and collaboration')
    }

    if (wordCount < 50) {
      improvements.push('Answer was too brief - aim for 2-3 minutes')
    }

    return {
      overallScore: Math.round(answerQuality),
      strengths,
      improvements,
      specificFeedback: this.generateSpecificFeedback(category, answerQuality),
      answerQuality: Math.round(answerQuality),
    }
  }

  private generateSpecificFeedback(category: string, score: number): string {
    if (score >= 80) {
      return `Excellent ${category} response! Your answer was well-structured and compelling.`
    } else if (score >= 60) {
      return `Good ${category} response. With more specific examples and details, you can make it even stronger.`
    } else {
      return `Your ${category} answer needs more depth. Focus on providing concrete examples and quantifiable results.`
    }
  }
}
