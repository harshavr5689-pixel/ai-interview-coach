import { create } from 'zustand'

export interface Answer {
  question: string
  answer: string
  timestamp: number
  analysis?: {
    confidence: number
    clarity: number
    relevance: number
    sentiment: string
  }
}

export interface FaceMetrics {
  eyeContact: number
  expressions: Record<string, number>
  headPose: string
}

export interface SpeechMetrics {
  pace: number
  volume: number
  clarity: number
  fillerWords: number
}

interface InterviewState {
  answers: Answer[]
  currentQuestion: number
  isRecording: boolean
  faceMetrics: FaceMetrics[]
  speechMetrics: SpeechMetrics[]
  addAnswer: (answer: Answer) => void
  nextQuestion: () => void
  setRecording: (recording: boolean) => void
  addFaceMetrics: (metrics: FaceMetrics) => void
  addSpeechMetrics: (metrics: SpeechMetrics) => void
  resetSession: () => void
}

export const useInterviewStore = create<InterviewState>((set) => ({
  answers: [],
  currentQuestion: 0,
  isRecording: false,
  faceMetrics: [],
  speechMetrics: [],
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  setRecording: (recording) => set({ isRecording: recording }),
  addFaceMetrics: (metrics) => set((state) => ({ faceMetrics: [...state.faceMetrics, metrics] })),
  addSpeechMetrics: (metrics) => set((state) => ({ speechMetrics: [...state.speechMetrics, metrics] })),
  resetSession: () => set({
    answers: [],
    currentQuestion: 0,
    isRecording: false,
    faceMetrics: [],
    speechMetrics: []
  })
}))
