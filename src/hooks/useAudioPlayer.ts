import { useState, useRef, useEffect } from 'react'

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const play = () => audioRef.current?.play()
  const pause = () => audioRef.current?.pause()
  const seek = (time: number) => { if (audioRef.current) audioRef.current.currentTime = time }
  const setRate = (rate: number) => { 
    if (audioRef.current) audioRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }

  const togglePlay = () => {
    if (isPlaying) pause()
    else play()
    setIsPlaying(!isPlaying)
  }

  return { audioRef, isPlaying, currentTime, duration, playbackRate, play, pause, seek, setRate, togglePlay }
}