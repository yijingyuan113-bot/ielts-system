'use client'

import { useState, useEffect } from 'react'
import { Button } from './Button'

interface TimerProps {
  initialSeconds: number
  onComplete?: () => void
}

export function Timer({ initialSeconds, onComplete }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  useEffect(() => {
    if (seconds === 0 && onComplete) onComplete()
  }, [seconds, onComplete])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-4">
      <span className={`text-2xl font-mono ${seconds < 60 ? 'text-red-500' : ''}`}>
        {formatTime(seconds)}
      </span>
      <Button onClick={() => setIsRunning(!isRunning)} size="sm">
        {isRunning ? '暂停' : '开始'}
      </Button>
      <Button onClick={() => setSeconds(initialSeconds)} size="sm" variant="secondary">
        重置
      </Button>
    </div>
  )
}