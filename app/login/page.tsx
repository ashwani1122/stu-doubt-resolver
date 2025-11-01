'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // In production, implement Firebase authentication
    router.push('/ask-doubt')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back! 👋
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full mb-4">
            Login
          </button>

          <button
            type="button"
            onClick={() => router.push('/ask-doubt')}
            className="w-full text-gray-600 hover:text-gray-800 underline"
          >
            Continue as Guest
          </button>
        </form>
      </motion.div>
    </div>
  )
}
