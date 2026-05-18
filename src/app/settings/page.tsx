'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const [targetScore, setTargetScore] = useLocalStorage('ielts-target', 8)
  const [dailyGoal, setDailyGoal] = useLocalStorage('ielts-daily-goal', 60)

  const handleReset = () => {
    if (confirm('确定要清除所有数据吗？这将删除所有学习记录和设置。')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">设置</h1>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">学习目标</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  目标分数
                </label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {[6, 6.5, 7, 7.5, 8, 8.5, 9].map((s) => (
                    <option key={s} value={s}>
                      {s} 分 {s === 8 && '⭐ (当前设定)'}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  你设定的目标是 {targetScore} 分
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每日学习时长（分钟）
                </label>
                <input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  min="15"
                  max="240"
                />
                <p className="text-sm text-gray-500 mt-2">
                  建议每天学习 {dailyGoal} 分钟
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">数据管理</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  你的学习数据存储在浏览器本地，包括历史成绩和设置。
                  如需备份，可以导出数据或截图进度页面。
                </p>
              </div>
              <Button onClick={handleReset} className="bg-red-500 hover:bg-red-600">
                🗑️ 清除所有数据
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">关于系统</h2>
            <div className="space-y-2 text-gray-600">
              <p>📖 版本: 1.0.0</p>
              <p>🎯 功能: 雅思听说读写全面练习</p>
              <p>📚 特点: 支持听力变速、口语录音、阅读计时、写作高分例文</p>
              <p>🔧 技术: Next.js + TypeScript + Tailwind CSS</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}