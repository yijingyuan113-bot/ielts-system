'use client'

import { useState } from 'react'
import writingData from '@/data/writing.json'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export default function WritingPage() {
  const [content, setContent] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [showSamples, setShowSamples] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  
  const task = writingData[currentTaskIndex]
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">写作练习</h1>
            <p className="text-gray-500 mt-1">Task 2 议论文</p>
          </div>
          <div className="flex gap-2">
            <select 
              className="p-2 border rounded"
              value={currentTaskIndex}
              onChange={(e) => {
                setCurrentTaskIndex(Number(e.target.value))
                setContent('')
                setShowFeedback(false)
              }}
            >
              {writingData.map((t, i) => (
                <option key={t.id} value={i}>题目 {i + 1}</option>
              ))}
            </select>
            <Button onClick={() => setShowSamples(true)} variant="outline">
              📚 高分例文
            </Button>
          </div>
        </div>

        <Card>
          <div className="p-4 bg-blue-50 rounded-lg mb-6">
            <p className="text-lg">{task.question}</p>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在此输入你的作文... (建议至少250词)"
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">
              字数: <span className={`font-bold ${wordCount >= 250 ? 'text-green-600' : 'text-orange-500'}`}>
                {wordCount}
              </span> 
              {wordCount < 250 && <span className="text-sm"> (建议≥250)</span>}
            </span>
            <div className="flex gap-4">
              <Button onClick={() => setShowFeedback(!showFeedback)} variant="secondary">
                {showFeedback ? '隐藏反馈' : '查看反馈'}
              </Button>
              <Button onClick={() => setContent('')} variant="outline">
                清空
              </Button>
            </div>
          </div>

          {showFeedback && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span>📋</span> 评分标准参考
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white rounded">
                  <p className="font-medium text-blue-700">Task Achievement</p>
                  <p className="text-gray-600 mt-1">{task.bandDescriptors.ta}</p>
                </div>
                <div className="p-3 bg-white rounded">
                  <p className="font-medium text-blue-700">Coherence & Cohesion</p>
                  <p className="text-gray-600 mt-1">{task.bandDescriptors.cc}</p>
                </div>
                <div className="p-3 bg-white rounded">
                  <p className="font-medium text-blue-700">Lexical Resource</p>
                  <p className="text-gray-600 mt-1">{task.bandDescriptors.lr}</p>
                </div>
                <div className="p-3 bg-white rounded">
                  <p className="font-medium text-blue-700">Grammatical Range</p>
                  <p className="text-gray-600 mt-1">{task.bandDescriptors.gr}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={showSamples} onClose={() => setShowSamples(false)} title="高分例文背诵">
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {task.sampleEssays.map((sample, idx) => (
            <div key={idx} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full">
                  Band {sample.band}
                </span>
              </div>
              <h3 className="text-blue-600 font-semibold mb-3">{sample.title}</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{sample.essay}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </main>
  )
}