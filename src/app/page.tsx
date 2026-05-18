'use client'

import Link from 'next/link'

const modules = [
  { name: '听力', href: '/listening', icon: '🎧', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  { name: '口语', href: '/speaking', icon: '🎤', color: 'bg-gradient-to-br from-green-500 to-green-600' },
  { name: '阅读', href: '/reading', icon: '📖', color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
  { name: '写作', href: '/writing', icon: '✍️', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
  { name: '词汇', href: '/vocabulary', icon: '📚', color: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  { name: '进度', href: '/progress', icon: '📊', color: 'bg-gradient-to-br from-cyan-500 to-cyan-600' },
]

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          IELTS Master
        </h1>
        <p className="text-xl text-gray-600">目标 8 分 · 全面提升</p>
        <div className="mt-4 flex justify-center gap-4">
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">听力</span>
          <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">口语</span>
          <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">阅读</span>
          <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">写作</span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {modules.map((module, idx) => (
          <Link key={module.name} href={module.href}
            className={`${module.color} rounded-2xl p-8 text-white text-center hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-6xl mb-4 block relative z-10">{module.icon}</span>
            <span className="text-2xl font-bold relative z-10">{module.name}</span>
          </Link>
        ))}
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm"><p>持续学习，实现梦想 ✨</p></footer>
    </main>
  )
}