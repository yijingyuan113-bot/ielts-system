'use client'

import { useState, useEffect } from 'react'
import { vocabularyData, levelLabels, levelColors, Word } from '@/data/vocabulary.json'

const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'academic', name: '学术', icon: '📖' },
  { id: 'environment', name: '环境', icon: '🌍' },
  { id: 'technology', name: '科技', icon: '💻' },
  { id: 'education', name: '教育', icon: '🎓' },
  { id: 'society', name: '社会', icon: '🏙️' },
  { id: 'health', name: '健康', icon: '❤️' },
]

export default function Vocabulary() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set())
  const [reviewWords, setReviewWords] = useState<Set<number>>(new Set())

  useEffect(() => {
    const savedKnown = localStorage.getItem('vocabulary_known')
    const savedReview = localStorage.getItem('vocabulary_review')
    if (savedKnown) setKnownWords(new Set(JSON.parse(savedKnown)))
    if (savedReview) setReviewWords(new Set(JSON.parse(savedReview)))
  }, [])

  useEffect(() => {
    localStorage.setItem('vocabulary_known', JSON.stringify([...knownWords]))
    localStorage.setItem('vocabulary_review', JSON.stringify([...reviewWords]))
  }, [knownWords, reviewWords])

  let filteredWords: Word[] = []
  const cats = selectedCategory === 'all' ? Object.keys(vocabularyData) : [selectedCategory]
  cats.forEach(cat => { if (vocabularyData[cat]) filteredWords = [...filteredWords, ...vocabularyData[cat]] })

  const totalWords = Object.values(vocabularyData).flat().length

  const handleMark = (known: boolean) => {
    const w = filteredWords[currentIndex]
    if (known) {
      setKnownWords(prev => new Set([...prev, w.id]))
      setReviewWords(prev => { const n = new Set(prev); n.delete(w.id); return n })
    } else {
      setReviewWords(prev => new Set([...prev, w.id]))
    }
    setIsFlipped(false)
    setTimeout(() => setCurrentIndex(i => i < filteredWords.length - 1 ? i + 1 : 0), 200)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📚 雅思词汇背诵</h1>
        <p className="text-gray-600 mt-1">点击卡片翻转查看详细解释</p>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <span className="text-green-600">✓ 已掌握: {knownWords.size}</span>
          <span className="text-orange-500">⟳ 待复习: {reviewWords.size}</span>
        </div>
        <div className="mt-3 max-w-md mx-auto bg-white rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${(knownWords.size / totalWords) * 100}%` }} />
        </div>
      </header>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setCurrentIndex(0); setIsFlipped(false) }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-blue-100'}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {filteredWords.length > 0 && currentIndex < filteredWords.length ? (
        <div className="max-w-lg mx-auto">
          <div className="text-center text-sm text-gray-500 mb-4">{currentIndex + 1} / {filteredWords.length}</div>
          <div className="relative h-80 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            {!isFlipped ? (
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${levelColors[filteredWords[currentIndex].level]}`}>{levelLabels[filteredWords[currentIndex].level]}</span>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{filteredWords[currentIndex].word}</h2>
                <p className="text-lg text-gray-600 mb-2">{filteredWords[currentIndex].phonetic}</p>
                <p className="text-blue-600">{filteredWords[currentIndex].meaning}</p>
                <p className="text-sm text-gray-400 mt-4">点击翻转</p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{filteredWords[currentIndex].word}</h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{filteredWords[currentIndex].example}</p>
                <p className="text-gray-500 text-xs italic mb-3">{filteredWords[currentIndex].exampleTranslation}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {filteredWords[currentIndex].collocations.map((c, i) => <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{c}</span>)}
                </div>
                <div className="flex gap-3 mt-auto">
                  <button onClick={(e) => { e.stopPropagation(); handleMark(true) }} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium">✓ 已掌握</button>
                  <button onClick={(e) => { e.stopPropagation(); handleMark(false) }} className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium">⟳ 再复习</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20"><div className="text-6xl mb-4">🎉</div><h2 className="text-2xl font-bold text-gray-700">太棒了！</h2></div>
      )}

      <div className="text-center mt-10"><a href="/" className="inline-block px-6 py-3 bg-white rounded-full shadow-md font-medium text-gray-700">🏠 返回首页</a></div>
    </main>
  )
}