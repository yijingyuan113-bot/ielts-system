'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Card } from '@/components/ui/Card'
import { RadarChart } from '@/components/dashboard/RadarChart'
import { Button } from '@/components/ui/Button'

interface ScoreRecord {
  date: string
  listening: number
  speaking: number
  reading: number
  writing: number
}

export default function ProgressPage() {
  const [history, setHistory] = useLocalStorage<ScoreRecord[]>('ielts-history', [])
  const latestScores = history.length > 0 ? history[history.length - 1] : null

  const radarData = latestScores ? [
    { label: '听力', value: latestScores.listening },
    { label: '口语', value: latestScores.speaking },
    { label: '阅读', value: latestScores.reading },
    { label: '写作', value: latestScores.writing },
  ] : [
    { label: '听力', value: 0 },
    { label: '口语', value: 0 },
    { label: '阅读', value: 0 },
    { label: '写作', value: 0 },
  ]

  const addSampleData = () => {
    const newRecord: ScoreRecord = {
      date: new Date().toLocaleDateString('zh-CN'),
      listening: Math.round(Math.random() * 2 + 6),
      speaking: Math.round(Math.random() * 2 + 6),
      reading: Math.round(Math.random() * 2 + 6),
      writing: Math.round(Math.random() * 2 + 6),
    }
    setHistory([...history, newRecord])
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">学习进度</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">四项能力</h2>
            <div className="flex justify-center">
              <RadarChart scores={radarData} />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">最新成绩</h2>
            {latestScores ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-lg">听力</span>
                  <span className="text-2xl font-bold text-blue-600">{latestScores.listening}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-lg">口语</span>
                  <span className="text-2xl font-bold text-green-600">{latestScores.speaking}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-lg">阅读</span>
                  <span className="text-2xl font-bold text-orange-600">{latestScores.reading}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-lg">写作</span>
                  <span className="text-2xl font-bold text-purple-600">{latestScores.writing}</span>
                </div>
                <div className="border-t pt-3 text-sm text-gray-500">
                  记录时间: {latestScores.date}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">暂无记录，开始练习后会自动记录</p>
                <Button onClick={addSampleData} variant="outline">添加示例数据</Button>
              </div>
            )}
          </Card>

          <Card className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">历史记录</h2>
              {history.length === 0 && (
                <Button onClick={addSampleData} size="sm">添加示例</Button>
              )}
            </div>
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((record, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-gray-600">{record.date}</span>
                    <div className="flex gap-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">听: {record.listening}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">口: {record.speaking}</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">阅: {record.reading}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">写: {record.writing}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">暂无历史记录</p>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}