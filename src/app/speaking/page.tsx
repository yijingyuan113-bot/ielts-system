'use client'

import { useState } from 'react'
import speakingData from '@/data/speaking.json'
import { Card } from '@/components/ui/Card'
import { Recorder } from '@/components/speaking/Recorder'
import { Timer } from '@/components/ui/Timer'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export default function SpeakingPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPracticing, setIsPracticing] = useState(false)
  const [showSample, setShowSample] = useState(false)
  
  const current = speakingData[currentIndex]

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">口语练习</h1>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">题目 {currentIndex + 1} / {speakingData.length}</span>
          <Button onClick={() => setShowSample(true)} variant="outline" size="sm">
            查看参考回答
          </Button>
        </div>

        <Card>
          {!isPracticing ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Topic {currentIndex + 1}</h2>
              <p className="text-lg mb-6 p-4 bg-gray-50 rounded-lg">{current.question}</p>
              
              {current.hints && (
                <div className="text-left mb-6">
                  <p className="text-sm text-gray-500 mb-2">提示:</p>
                  <ul className="space-y-2">
                    {current.hints.map((hint, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="text-primary">•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button 
                onClick={() => setIsPracticing(true)} 
                className="px-8 py-3 text-lg"
              >
                开始练习
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <Timer 
                  initialSeconds={current.duration} 
                  onComplete={() => setIsPracticing(false)} 
                />
              </div>
              
              <p className="text-lg mb-6 p-4 bg-gray-50 rounded-lg">{current.question}</p>
              <Recorder />
              
              <button
                onClick={() => {
                  setIsPracticing(false)
                  if (currentIndex < speakingData.length - 1) {
                    setCurrentIndex(currentIndex + 1)
                  }
                }}
                className="mt-6 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {currentIndex < speakingData.length - 1 ? '下一题 →' : '完成 ✓'}
              </button>
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={showSample} onClose={() => setShowSample(false)} title="参考回答">
        <div className="space-y-2">
          <p className="text-lg font-medium mb-4 p-4 bg-gray-50 rounded">{current.question}</p>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-700 mb-2">Sample Answer:</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{current.sampleAnswer}</p>
          </div>
        </div>
      </Modal>
    </main>
  )
}