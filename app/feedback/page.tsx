'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaStar, FaSmile, FaMeh } from 'react-icons/fa'
import { FeedbackData } from '@/types'

export default function Feedback() {
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    const feedbackData: FeedbackData = {
      rating,
      helpful,
      feedback
    }
    
    // Save feedback (in production, send to database)
    console.log(feedbackData)
    
    // Show success and redirect
    alert('Thank you for your feedback! 🎉')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          How was your learning experience? 📚
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Was it helpful? */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Did this resolve your doubt?
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHelpful(true)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  helpful === true
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <FaSmile className="text-5xl text-green-500" />
                <p className="mt-2 font-semibold">Yes!</p>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHelpful(false)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  helpful === false
                    ? 'bg-orange-100 border-orange-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <FaMeh className="text-5xl text-orange-500" />
                <p className="mt-2 font-semibold">Not Really</p>
              </motion.button>
            </div>
          </div>

          {/* Star Rating */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Rate the explanation clarity:
            </p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  className="text-4xl"
                >
                  <FaStar
                    className={
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Any other feedback? (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what we can improve..."
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full text-lg">
            Submit Feedback
          </button>
        </form>
      </motion.div>
    </div>
  )
}
