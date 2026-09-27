/**
 * Speech Analysis utilities
 * Analyzes speaking patterns, filler words, pace, etc.
 */

export interface SpeechMetrics {
  pace: number
  volume: number
  clarity: number
  fillerWords: number
}

export interface DetailedSpeechMetrics {
  wordsPerMinute: number
  fillerWordCount: number
  pauseCount: number
  averagePauseLength: number
  clarity: number
  volume: number
}

// Service class used by components
export class SpeechAnalysisService {
  private analyzer: SpeechAnalyzer

  constructor() {
    this.analyzer = new SpeechAnalyzer()
  }

  start() {
    this.analyzer.start()
  }

  analyzeText(text: string) {
    this.analyzer.analyzeText(text)
  }

  getSimpleMetrics(): SpeechMetrics {
    const detailed = this.analyzer.getMetrics()
    return {
      pace: detailed.wordsPerMinute,
      volume: detailed.volume,
      clarity: detailed.clarity / 100, // Convert to 0-1 range
      fillerWords: detailed.fillerWordCount
    }
  }

  getDetailedMetrics(): DetailedSpeechMetrics {
    return this.analyzer.getMetrics()
  }

  getSuggestions(): string[] {
    return this.analyzer.getSuggestions()
  }
}

const FILLER_WORDS = [
  'um', 'uh', 'like', 'you know', 'so', 'basically', 'actually',
  'literally', 'kind of', 'sort of', 'i mean', 'well', 'yeah', 'right'
]

export class SpeechAnalyzer {
  private startTime: number = 0
  private wordCount: number = 0
  private fillerCount: number = 0
  private pauseTimes: number[] = []

  start() {
    this.startTime = Date.now()
    this.wordCount = 0
    this.fillerCount = 0
    this.pauseTimes = []
  }

  analyzeText(text: string): void {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0)
    this.wordCount = words.length

    // Count filler words
    this.fillerCount = 0
    for (const word of words) {
      if (FILLER_WORDS.includes(word)) {
        this.fillerCount++
      }
    }

    // Check for multi-word fillers
    const fullText = text.toLowerCase()
    for (const filler of FILLER_WORDS) {
      if (filler.includes(' ')) {
        const count = (fullText.match(new RegExp(filler, 'g')) || []).length
        this.fillerCount += count
      }
    }
  }

  recordPause(duration: number) {
    this.pauseTimes.push(duration)
  }

  getMetrics(): DetailedSpeechMetrics {
    const elapsedMinutes = (Date.now() - this.startTime) / 60000
    const wpm = elapsedMinutes > 0 ? Math.round(this.wordCount / elapsedMinutes) : 0

    const avgPause = this.pauseTimes.length > 0
      ? this.pauseTimes.reduce((a, b) => a + b, 0) / this.pauseTimes.length
      : 0

    // Calculate clarity score (lower filler words = higher clarity)
    const fillerRatio = this.wordCount > 0 ? this.fillerCount / this.wordCount : 0
    const clarity = Math.max(0, Math.min(100, 100 - (fillerRatio * 200)))

    return {
      wordsPerMinute: wpm,
      fillerWordCount: this.fillerCount,
      pauseCount: this.pauseTimes.length,
      averagePauseLength: avgPause,
      clarity,
      volume: 75, // Mock volume - would need audio analysis
    }
  }

  getSuggestions(): string[] {
    const metrics = this.getMetrics()
    const suggestions: string[] = []

    if (metrics.wordsPerMinute < 120) {
      suggestions.push('Try to speak a bit faster - aim for 130-150 words per minute')
    } else if (metrics.wordsPerMinute > 160) {
      suggestions.push('Slow down a bit - you might be speaking too fast')
    }

    if (metrics.fillerWordCount > 5) {
      suggestions.push(`Reduce filler words (found ${metrics.fillerWordCount}) - pause instead`)
    }

    if (metrics.clarity < 70) {
      suggestions.push('Work on speaking more clearly and confidently')
    }

    return suggestions
  }
}
