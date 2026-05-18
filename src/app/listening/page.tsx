'use client'

import { useState } from 'react'
import Link from 'next/link'
import listeningData from '@/data/listening.json'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AudioPlayer } from '@/components/listening/AudioPlayer'

export default function ListeningPage() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const exercise = activeExercise !== null ? listeningData[activeExercise] : null

  const handleSubmit = () => setShowResult(true)

  const score = exercise ? exercise.questions.reduce((acc, q) => {
    return acc + (answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim() ? 1 : 0)
  }, 0) : 0

  const resetExercise = () => {
    setActiveExercise(null)
    setAnswers({})
    setShowResult(false)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {!exercise ? (
          <>
            <h1 className="text-3xl font-bold mb-8">听力练习</h1>
            <div className="grid gap-4">
              {listeningData.map((item, index) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveExercise(index)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                          Part {item.part}
                        </span>
                        <span className={`px-2 py-1 text-sm rounded ${
                          item.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          item.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                    <span className="text-primary font-medium">开始练习 →</span>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">{exercise.title}</h1>
                <p className="text-gray-500">Part {exercise.part} · {exercise.difficulty}</p>
              </div>
              <Button onClick={resetExercise} variant="secondary">返回列表</Button>
            </div>
            
            <AudioPlayer src={exercise.audioUrl} />
            
            <div className="mt-6 space-y-4">
              {exercise.questions.map((q, idx) => (
                <div key={q.id} className="border-b border-gray-100 pb-4">
                  <p className="font-medium mb-3">Q{idx + 1}: {q.question}</p>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    disabled={showResult}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-100"
                    placeholder="输入答案"
                  />
                  {showResult && (
                    <p className={`mt-2 font-medium ${
                      answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim() 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim() ? '✓ 正确' : `✗ 正确答案: ${q.answer}`}
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
        )}
      </div>
    </main>
  )
}