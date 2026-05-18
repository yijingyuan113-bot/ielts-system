'use client'

import { useRef } from 'react'
import { useRecorder } from '@/hooks/useRecorder'
import { Button } from '@/components/ui/Button'

export function Recorder() {
  const { isRecording, audioUrl, startRecording, stopRecording } = useRecorder()
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl">
      <div className="flex gap-4">
        {!isRecording ? (
          <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600 px-6">
            🎤 开始录音
          </Button>
        ) : (
          <Button onClick={stopRecording} className="bg-gray-500 hover:bg-gray-600 px-6">
            ⏹ 停止录音
          </Button>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center gap-2 text-red-500">
          <span className="animate-pulse text-2xl">●</span>
          <span className="font-medium">录音中...</span>
        </div>
      )}

      {audioUrl && (
        <div className="w-full mt-4">
          <p className="text-sm text-gray-500 mb-2">录音回放:</p>
          <audio ref={audioRef} src={audioUrl} controls className="w-full" />
        </div>
      )}
    </div>
  )
}