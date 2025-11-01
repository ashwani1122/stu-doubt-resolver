'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaMicrophone, FaStop } from 'react-icons/fa'
import { Subject, DoubtData } from '@/types'

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export default function AskDoubt() {
  const router = useRouter()
  const [doubt, setDoubt] = useState<string>('')
  const [subject, setSubject] = useState<Subject>('Math')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Initialize Web Speech API
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onstart = () => {
        setIsRecording(true)
      }

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setDoubt(prev => prev + ' ' + transcript)
      }

      recognitionInstance.onend = () => {
        setIsRecording(false)
      }

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }

    //   setRecognition(recognitionInstance)
    }
  }, [])

  const startRecording = (): void => {
    if (recognition) {
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
    }
  }

  const stopRecording = (): void => {
    if (recognition) {
      recognition.stop()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    if (doubt.trim() === '') {
      alert('Please enter or speak your doubt')
      return
    }

    const doubtData: DoubtData = { doubt, subject }
    
    // Store doubt in localStorage and navigate to chat
    localStorage.setItem('currentDoubt', JSON.stringify(doubtData))
    router.push('/chat')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Whats Your Doubt? 🤔
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Subject Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Subject:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Type or speak your doubt:
            </label>
            <textarea
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              placeholder="Example: I don't understand how to multiply fractions..."
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            />
          </div>

          {/* Voice Input Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'btn-secondary'
              }`}
            >
              {isRecording ? (
                <>
                  <FaStop /> Stop Recording
                </>
              ) : (
                <>
                  <FaMicrophone /> Tap to Speak
                </>
              )}
            </button>
            {isRecording && (
              <p className="text-center text-sm text-gray-600 mt-2">
                Listening... Speak your doubt clearly
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full text-lg"
          >
            Ask AI Tutor 🤖
          </button>
        </form>

        <button
          onClick={() => router.push('/')}
          className="mt-4 text-gray-600 hover:text-gray-800 underline"
        >
          ← Back to Home
        </button>
      </motion.div>
    </div>
  )
}
