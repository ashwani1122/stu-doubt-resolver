'use client'

import { motion } from 'framer-motion'
import { FaLightbulb, FaBrain, FaMagic } from 'react-icons/fa'

interface ConceptAnimationProps {
  concept: string;
  type: 'formula' | 'diagram' | 'mnemonic';
}

export default function ConceptAnimation({ concept, type }: ConceptAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-200 my-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          {type === 'formula' && <FaBrain className="text-white text-xl" />}
          {type === 'diagram' && <FaMagic className="text-white text-xl" />}
          {type === 'mnemonic' && <FaLightbulb className="text-white text-xl" />}
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {type === 'formula' && '📐 Formula Breakdown'}
          {type === 'diagram' && '🎨 Visual Diagram'}
          {type === 'mnemonic' && '💡 Memory Trick'}
        </h3>
      </div>

      {/* Animated Content */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {type === 'formula' && <FormulaAnimation concept={concept} />}
        {type === 'diagram' && <DiagramAnimation concept={concept} />}
        {type === 'mnemonic' && <MnemonicAnimation concept={concept} />}
      </div>
    </motion.div>
  )
}

function FormulaAnimation({ concept }: { concept: string }) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-mono text-center bg-purple-100 rounded-xl p-4"
      >
        {concept}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4"
      >
        {['Step 1', 'Step 2', 'Step 3'].map((step, i) => (
          <motion.div
            key={step}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.2 }}
            className="bg-blue-50 rounded-xl p-3 text-center"
          >
            <div className="text-sm font-semibold text-blue-600">{step}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function DiagramAnimation({ concept }: { concept: string }) {
  return (
    <div className="relative h-64 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 300 200">
        <motion.circle
          cx="150"
          cy="100"
          r="60"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.line
          x1="150"
          y1="40"
          x2="150"
          y2="160"
          stroke="#EC4899"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.line
          x1="90"
          y1="100"
          x2="210"
          y2="100"
          stroke="#3B82F6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </svg>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="absolute text-center"
      >
        <div className="text-lg font-bold text-gray-800">{concept}</div>
      </motion.div>
    </div>
  )
}

function MnemonicAnimation({ concept }: { concept: string }) {
  const letters = concept.split('')
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {letters.slice(0, 10).map((letter, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
          >
            {letter.toUpperCase()}
          </motion.div>
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center text-gray-700 font-semibold"
      >
        Remember: Each letter helps you memorize!
      </motion.p>
    </div>
  )
}
