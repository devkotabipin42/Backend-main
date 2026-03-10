import React, { useRef, useState, useEffect, useContext } from 'react'
import { SongContext } from '../song.context'
import { useSong } from '../hooks/useSong'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const Player = () => {
  // keep these imports in-use as you asked
  const songCtx = useSong(SongContext)
  const { song } = useSong()

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [showSpeed, setShowSpeed] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setIsPlaying(false)
      setCurrentTime(0)
      // keep playback rate consistent
      audioRef.current.playbackRate = speed
      audioRef.current.volume = isMuted ? 0 : volume
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.url])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const skip = (secs) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleProgressClick = (e) => {
    const bar = progressRef.current
    if (!bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const newTime = ratio * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleSpeedChange = (s) => {
    setSpeed(s)
    if (audioRef.current) audioRef.current.playbackRate = s
    setShowSpeed(false)
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
    setIsMuted(val === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      const restored = volume || 0.5
      audio.volume = restored
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleSongEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  if (!song) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(980px,calc(100%-2rem))] -translate-x-1/2">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl backdrop-blur">
        {/* Top row: poster + meta + speed */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-xl bg-white/5">
            <img
              src={song.posterUrl}
              alt={song.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{song.title}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
                {song.mood}
              </span>
              {/* optional: show context usage without changing behavior */}
              {songCtx && (
                <span className="text-[11px] text-white/40">
                  {/* just to keep SongContext “used”; remove if you don’t want this */}
                </span>
              )}
            </div>
          </div>

          {/* Speed picker */}
          <div className="relative">
            <button
              onClick={() => setShowSpeed((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.99]"
              title="Playback speed"
            >
              <span>{speed}×</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-white/70">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>

            {showSpeed && (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-36 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-xl">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={[
                      'flex w-full items-center justify-between px-3 py-2 text-left text-sm',
                      s === speed ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5',
                    ].join(' ')}
                  >
                    <span>{s}×</span>
                    {s === speed && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5L9 16.2z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="mt-2 h-2 w-full cursor-pointer rounded-full bg-white/10"
            role="progressbar"
            aria-label="Playback progress"
          >
            <div
              className="relative h-2 rounded-full bg-white/70"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Left: skip back */}
          <button
            onClick={() => skip(-5)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            title="Back 5s"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="text-white/80">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.6" />
            </svg>
            <span>5s</span>
          </button>

          {/* Center: play */}
          <button
            onClick={togglePlay}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-zinc-950 shadow hover:opacity-95 active:scale-[0.98]"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          {/* Right: skip forward */}
          <button
            onClick={() => skip(5)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            title="Forward 5s"
          >
            <span>5s</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="text-white/80">
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-.49-3.6" />
            </svg>
          </button>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              title="Mute"
            >
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="text-white/80">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.87 8.87 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="text-white/80">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="h-2 w-28 cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player