import { useState } from 'react'
import { Settings as SettingsIcon, Save } from 'lucide-react'

interface SettingsProps {
  onClose: () => void
}

export const Settings = ({ onClose }: SettingsProps) => {
  const [settings, setSettings] = useState({
    videoQuality: 'high',
    autoSave: true,
    showTips: true,
    recordVideo: false,
    aiAnalysis: true,
    speechRecognition: true,
  })

  const handleSave = () => {
    localStorage.setItem('interviewSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <SettingsIcon className="mr-2" />
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Video Settings */}
            <div>
              <h3 className="font-semibold mb-3">Video Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Video Quality</label>
                  <select
                    value={settings.videoQuality}
                    onChange={(e) =>
                      setSettings({ ...settings, videoQuality: e.target.value })
                    }
                    className="border rounded px-3 py-1"
                  >
                    <option value="low">Low (360p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="high">High (1080p)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Record Video Sessions</label>
                  <input
                    type="checkbox"
                    checked={settings.recordVideo}
                    onChange={(e) =>
                      setSettings({ ...settings, recordVideo: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* AI Settings */}
            <div>
              <h3 className="font-semibold mb-3">AI Features</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">AI Behavior Analysis</label>
                    <p className="text-xs text-gray-600">
                      Real-time feedback on eye contact, posture, etc.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.aiAnalysis}
                    onChange={(e) =>
                      setSettings({ ...settings, aiAnalysis: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Speech Recognition</label>
                    <p className="text-xs text-gray-600">
                      Transcribe your answers automatically
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.speechRecognition}
                    onChange={(e) =>
                      setSettings({ ...settings, speechRecognition: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* General Settings */}
            <div>
              <h3 className="font-semibold mb-3">General</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Show Interview Tips</label>
                  <input
                    type="checkbox"
                    checked={settings.showTips}
                    onChange={(e) =>
                      setSettings({ ...settings, showTips: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Auto-save Progress</label>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) =>
                      setSettings({ ...settings, autoSave: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Settings
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
