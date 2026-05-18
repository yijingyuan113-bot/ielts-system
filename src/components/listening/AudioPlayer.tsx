'use client'

import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Button } from '@/components/ui/Button'

interface AudioPlayerProps {
  src: string
  onComplete?: () => void
}

export function AudioPlayer({ src, onComplete }: AudioPlayerProps) {
  const { audioRef, isPlaying, currentTime, duration, playbackRate, play, pause, seek, setRate } = useAudioPlayer()

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <audio ref={audioRef} src={src} onEnded={onComplete} />
      
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={isPlaying ? pause : play} className="w-12 h-12 rounded-full">
          {isPlaying ? '⏸' : '▶'}
        </Button>
        
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <span className="text-sm text-gray-600 font-mono min-w-[80px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">速度:</span>
        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
          <button
            key={rate}
            onClick={() => setRate(rate)}
            className={`px-3 py-1 rounded text-sm ${
              playbackRate === rate ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  )
}