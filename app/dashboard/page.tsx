'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaTrophy, FaFire, FaBook, FaPlus } from 'react-icons/fa'
import { ReactNode } from 'react'
import { UserStats, RecentDoubt } from '@/types'

export default function Dashboard() {
  const router = useRouter()

  // Mock data (in production, fetch from database)
  const stats: UserStats = {
    doubtsResolved: 24,
    currentStreak: 5,
    subjectsMastered: ['Math', 'Science'],
  }

  const recentDoubts: RecentDoubt[] = [
    { id: 1, subject: 'Math', topic: 'Fractions', date: '2025-10-30', resolved: true },
    { id: 2, subject: 'Science', topic: 'Photosynthesis', date: '2025-10-29', resolved: true },
    { id: 3, subject: 'Math', topic: 'Decimals', date: '2025-10-28', resolved: true },
  ]

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Your Learning Progress 📊
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FaTrophy />}
            title="Doubts Resolved"
            value={stats.doubtsResolved.toString()}
            color="text-yellow-500"
          />
          <StatCard
            icon={<FaFire />}
            title="Current Streak"
            value={`${stats.currentStreak} days`}
            color="text-orange-500"
          />
          <StatCard
            icon={<FaBook />}
            title="Subjects Covered"
            value={stats.subjectsMastered.length.toString()}
            color="text-blue-500"
          />
        </div>

        {/* Recent Doubts */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recent Doubts
          </h2>
          <div className="space-y-3">
            {recentDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-800">{doubt.topic}</p>
                  <p className="text-sm text-gray-600">
                    {doubt.subject} • {doubt.date}
                  </p>
                </div>
                {doubt.resolved && (
                  <span className="text-green-500 font-semibold">✓ Resolved</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/ask-doubt')}
          className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 text-lg"
        >
          <FaPlus /> Ask New Doubt
        </button>
      </motion.div>
    </div>
  )
}

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  color: string;
}

function StatCard({ icon, title, value, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card text-center"
    >
      <div className={`text-5xl ${color} mb-3 flex justify-center`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </motion.div>
  )
}
