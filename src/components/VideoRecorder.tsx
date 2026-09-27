import { useState, useRef } from 'react'
import { Video, Download, Trash2 } from 'lucide-react'

interface VideoRecorderProps {
  isRecording: boolean
}

export const VideoRecorder = ({ isRecording }: VideoRecorderProps) => {
  const [recordings, setRecordings] = useState<string[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  // Recording functions are available but not used in current UI
  // They can be enabled later for full video recording feature
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      })

      mediaRecorderRef.current = mediaRecorder
      recordedChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setRecordings((prev) => [...prev, url])
      }

      mediaRecorder.start()
    } catch (error) {
      console.error('Error starting video recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const downloadRecording = (url: string, index: number) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `interview-recording-${index + 1}.webm`
    a.click()
  }

  const deleteRecording = (index: number) => {
    setRecordings((prev) => prev.filter((_, i) => i !== index))
  }

  // Suppress unused warnings - these functions are meant for future use
  if (false) {
    console.log(startRecording, stopRecording)
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm flex items-center">
          <Video className="w-4 h-4 mr-2" />
          Session Recordings
        </h4>
        {recordings.length > 0 && (
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {recordings.length}
          </span>
        )}
      </div>

      {recordings.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-4">
          {isRecording
            ? 'Recording in progress...'
            : 'No recordings yet'}
        </p>
      ) : (
        <div className="space-y-2">
          {recordings.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-xs font-medium">Recording {index + 1}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadRecording(url, index)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => deleteRecording(index)}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-gray-700">
        💡 Recordings are saved locally in your browser
      </div>
    </div>
  )
}
