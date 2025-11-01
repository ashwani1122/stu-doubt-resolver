'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaRobot, 
  FaMicrophone, 
  FaBrain, 
  FaChartLine,
  FaGraduationCap,
  FaMagic,
  FaRocket
} from 'react-icons/fa'
import { ReactNode } from 'react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8"
          >
            <FaRocket className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              Powered by AI • 100% Free
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Never Have Doubts
            </span>
            <br />
            <span className="text-gray-800">
              Ever Again! 🚀
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Your AI-powered learning companion that explains concepts with
            <span className="font-bold text-purple-600"> voice</span>,
            <span className="font-bold text-blue-600"> animations</span>, and
            <span className="font-bold text-pink-600"> mnemonics</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-bold rounded-2xl shadow-2xl transition-all"
            >
              <span className="flex items-center gap-2 justify-center">
                <FaGraduationCap /> Start Learning Free
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/ask-doubt')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 text-lg font-bold rounded-2xl shadow-xl border-2 border-purple-200 transition-all"
            >
              Try as Guest →
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <FeatureCard 
              icon={<FaMicrophone className="text-4xl" />}
              title="Voice Input"
              description="Ask doubts naturally by speaking"
              gradient="from-blue-500 to-cyan-500"
              delay={0}
            />
            <FeatureCard 
              icon={<FaRobot className="text-4xl" />}
              title="AI Tutor"
              description="Get instant, personalized explanations"
              gradient="from-purple-500 to-pink-500"
              delay={0.1}
            />
            <FeatureCard 
              icon={<FaBrain className="text-4xl" />}
              title="Smart Mnemonics"
              description="Remember concepts forever"
              gradient="from-pink-500 to-rose-500"
              delay={0.2}
            />
            <FeatureCard 
              icon={<FaChartLine className="text-4xl" />}
              title="Track Progress"
              description="See your learning journey"
              gradient="from-orange-500 to-yellow-500"
              delay={0.3}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <StatItem number="10K+" label="Happy Students" />
            <StatItem number="50K+" label="Doubts Solved" />
            <StatItem number="4.9★" label="Student Rating" />
            <StatItem number="Free" label="Forever" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

function FeatureCard({ icon, title, description, gradient, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + delay }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-300" 
           style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} 
      />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-white/50 transition-all duration-300">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto text-white shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-semibold">{label}</div>
    </div>
  )
}
