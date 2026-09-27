import { useState } from 'react'
import { Home } from './components/Home'
import { InterviewSession } from './components/InterviewSession'
import { Results } from './components/Results'
import { useInterviewStore } from './store/interviewStore'

type Screen = 'home' | 'interview' | 'results'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const { resetSession } = useInterviewStore()

  const handleStartInterview = () => {
    resetSession()
    setCurrentScreen('interview')
  }

  const handleEndInterview = () => {
    setCurrentScreen('results')
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentScreen === 'home' && (
        <Home onStartInterview={handleStartInterview} />
      )}
      {currentScreen === 'interview' && (
        <InterviewSession onEndInterview={handleEndInterview} />
      )}
      {currentScreen === 'results' && (
        <Results onBackToHome={handleBackToHome} />
      )}
    </div>
  )
}

export default App
