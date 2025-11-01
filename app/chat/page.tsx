'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaVolumeUp, 
  FaVolumeMute, 
  FaCheckCircle, 
  FaPaperPlane,
  FaMicrophone,
  FaLightbulb,
  FaBrain,
  FaRocket
} from 'react-icons/fa'
import Lottie from 'lottie-react'
import { Message, DoubtData } from '@/types'
import thinkingAnimation from '../assets/thinking.json'

export default function Chat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [doubtData, setDoubtData] = useState<DoubtData | null>(null)
  const [inputText, setInputText] = useState<string>('')
  const [showAnimation, setShowAnimation] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('currentDoubt')
    if (!stored) {
      router.push('/ask-doubt')
      return
    }

    const data: DoubtData = JSON.parse(stored)
    setDoubtData(data)

    const initialMessage: Message = {
      id: 1,
      text: data.doubt,
      sender: 'student',
      timestamp: new Date(),
    }
    
    setMessages([initialMessage])
    fetchAIResponse(data.doubt, data.subject)
  }, [router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchAIResponse = async (doubt: string, subject: string): Promise<void> => {
    setIsLoading(true)
    setShowAnimation(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doubt, subject }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: Date.now(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      setShowAnimation(false)

      // Auto-play voice response
      speakText(data.response)

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      }])
      setIsLoading(false)
      setShowAnimation(false)
    }
  }

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'student',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    if (doubtData) {
      await fetchAIResponse(inputText, doubtData.subject)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const speakText = (text: string): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleSpeech = (text: string): void => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      speakText(text)
    }
  }

  const handleMarkResolved = (): void => {
    window.speechSynthesis.cancel()
    router.push('/feedback')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header with Glassmorphism */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/20 shadow-xl"
      >
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <FaBrain className="text-white text-2xl" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Tutor
                </h1>
                <p className="text-sm text-gray-600">{doubtData?.subject}</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkResolved}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              <FaCheckCircle /> Mark Resolved
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`mb-6 flex ${
                message.sender === 'student' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex gap-3 max-w-[80%] ${
                message.sender === 'student' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {/* Avatar */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    message.sender === 'student'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}
                >
                  {message.sender === 'student' ? (
                    <span className="text-white font-bold text-lg">👤</span>
                  ) : (
                    <FaRocket className="text-white text-lg" />
                  )}
                </motion.div>

                {/* Message Bubble */}
                <div className={`relative ${
                  message.sender === 'student' ? 'items-end' : 'items-start'
                } flex flex-col gap-2`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-2xl shadow-xl ${
                      message.sender === 'student'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
                        : 'bg-white border-2 border-purple-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    
                    {/* Timestamp */}
                    <p className={`text-xs mt-2 ${
                      message.sender === 'student' 
                        ? 'text-blue-100' 
                        : 'text-gray-400'
                    }`}>
                      {message.timestamp?.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </motion.div>

                  {/* AI Message Actions */}
                  {message.sender === 'ai' && (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSpeech(message.text)}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
                      >
                        {isSpeaking ? (
                          <>
                            <FaVolumeMute /> Pause
                          </>
                        ) : (
                          <>
                            <FaVolumeUp /> Listen
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
                      >
                        <FaLightbulb /> Explain More
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex justify-start mb-6"
          >
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <FaRocket className="text-white" />
              </div>
              
              <div className="bg-white border-2 border-purple-100 rounded-2xl rounded-tl-none p-5 shadow-xl">
                <div className="flex gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-3 h-3 bg-purple-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-3 h-3 bg-pink-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                  />
                </div>
                <p className="text-gray-600 text-sm mt-2">AI Tutor is thinking...</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Animated Concept Visualization */}
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center my-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md">
              <div className="w-48 h-48 mx-auto">
                <Lottie 
                  animationData={thinkingAnimation}
                  loop={true}
                />
              </div>
              <p className="text-center text-gray-600 font-semibold mt-4">
                Preparing visual explanation...
              </p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a follow-up question..."
                className="w-full px-6 py-4 pr-24 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-gray-800 placeholder-gray-400 shadow-lg transition-all"
                disabled={isLoading}
              />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 bottom-3 p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white shadow-lg"
              >
                <FaMicrophone className="text-lg" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading || inputText.trim() === ''}
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-2xl text-white shadow-lg transition-all"
            >
              <FaPaperPlane className="text-xl" />
            </motion.button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {['Explain again', 'Give example', 'Create mnemonic', 'Show diagram'].map((action) => (
              <motion.button
                key={action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 rounded-xl text-sm font-semibold whitespace-nowrap shadow-md transition-all"
              >
                {action}
              </motion.button>
            ))}
          </div>

          {/* Mobile Mark Resolved Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMarkResolved}
            className="md:hidden w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            <FaCheckCircle /> Mark as Resolved
          </motion.button>
        </div>
      </div>
    </div>
  )
}
