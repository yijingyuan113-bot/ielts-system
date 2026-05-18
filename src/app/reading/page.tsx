'use client'

import { useState } from 'react'
import readingData from '@/data/reading.json'
import { Card } from '@/components/ui/Card'
import { Timer } from '@/components/ui/Timer'
import { Button } from '@/components/ui/Button'

export default function ReadingPage() {
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const exercise = readingData[0]

  const handleSubmit = () => setShowResult(true)
  const score = exercise.questions.reduce((acc, q) => 
    acc + (selected[q.id] === q.answer ? 1 : 0), 0)

  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{exercise.title}</h1>
            <p className="text-gray-500 mt-1">判断题练习</p>
          </div>
          <Timer initialSeconds={exercise.timeLimit * 60} onComplete={handleSubmit} />
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-3">阅读文章</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{exercise.passage}</p>
        </div>

        <div className="space-y-4">
          {exercise.questions.map((q, idx) => (
            <div key={q.id} className="border p-4 rounded-lg">
              <p className="font-medium mb-3">Q{idx + 1}: {q.question}</p>
              <div className="flex gap-4">
                {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => !showResult && setSelected({ ...selected, [q.id]: opt })}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selected[q.id] === opt 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    disabled={showResult}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showResult && (
                <p className={`mt-2 font-medium ${
                  selected[q.id] === q.answer ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selected[q.id] === q.answer ? '✓ 正确' : `✗ 正确答案: ${q.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {!showResult ? (
            <Button onClick={handleSubmit}>提交答案</Button>
          ) : (
            <div className="text-xl font-bold">
              得分: {score}/{exercise.questions.length}
            </div>
          )}
        </div>
      </Card>
    </main>
  )
}