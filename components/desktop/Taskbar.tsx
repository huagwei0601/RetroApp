'use client'

import { useState, useEffect, useRef } from 'react'
import { StartMenu } from './StartMenu'
import { TaskbarButton } from './TaskbarButton'
import type { AppId } from '@/lib/types'

const START_ITEMS: { id: string; label: string; src: string; real?: AppId }[] = [
  { id: 'mycomputer', label: 'My Computer',          src: '/my-computer.png' },
  { id: 'network',    label: 'Network Neighborhood', src: '/network-neighborhood.png' },
  { id: 'recycle',    label: 'Recycle Bin',          src: '/recycle-bin.webp' },
  { id: 'spotify',    label: 'Spotify.exe',          src: '/spotify.svg',    real: 'spotify' },
  { id: 'instagram',  label: 'Instagram.exe',        src: '/instagram.png',  real: 'instagram' },
]

type TaskbarWindow = {
  id: string
  appId: AppId
  label: string
  icon?: string
  isMinimized: boolean
  isActive: boolean
}

type TaskbarProps = {
  openWindows: TaskbarWindow[]
  onWindowRestore: (id: string) => void
  onStartMenuAppClick: (id: AppId) => void
  onErrorApp: () => void
}

function formatTime(date: Date): string {
  const h = date.getHours()
  const m = date.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`
}

export function Taskbar({ openWindows, onWindowRestore, onStartMenuAppClick, onErrorApp }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false)
  const [time, setTime] = useState(() => formatTime(new Date()))
  // Prevents StartMenu's outside-mousedown from firing when the Start button itself is clicked
  const skipCloseRef = useRef(false)

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  const handleStartMouseDown = () => {
    // If the menu is open, flag that we want to skip the outside-click close
    // so the menu closes via the toggle rather than double-toggling back open
    if (startOpen) {
      skipCloseRef.current = true
    }
  }

  const handleStartClick = () => {
    setStartOpen(v => !v)
  }

  const handleMenuClose = () => {
    if (skipCloseRef.current) {
      skipCloseRef.current = false
      return
    }
    setStartOpen(false)
  }

  return (
    <div
      className="win98-raised"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'var(--win98-silver)',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '0 2px',
        zIndex: 500,
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onMouseDown={handleStartMouseDown}
          onClick={handleStartClick}
          className={startOpen ? 'win98-sunken' : 'win98-raised'}
          style={{
            background: 'var(--win98-silver)',
            height: '30px',
            padding: '0 8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--win98-text)',
            cursor: 'default',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/win98-logo.svg" alt="" width={16} height={16} style={{ display: 'block', flexShrink: 0 }} />
          Start
        </button>
        {startOpen && (
          <StartMenu
            apps={START_ITEMS}
            onAppClick={id => {
              const item = START_ITEMS.find(i => i.id === id)
              if (item?.real) onStartMenuAppClick(item.real)
              else onErrorApp()
              setStartOpen(false)
            }}
            onClose={handleMenuClose}
          />
        )}
      </div>

      <div style={{ width: '1px', height: '28px', background: 'var(--win98-dark)', margin: '0 2px' }} />

      <div style={{ display: 'flex', gap: '2px', flex: 1, overflow: 'hidden' }}>
        {openWindows.map(w => (
          <TaskbarButton
            key={w.id}
            label={w.label}
            icon={w.icon}
            onClick={() => onWindowRestore(w.id)}
            isActive={w.isActive}
          />
        ))}
      </div>

      <div
        data-testid="taskbar-clock"
        className="win98-sunken"
        style={{
          height: '22px',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--win98-text)',
          flexShrink: 0,
        }}
      >
        {time}
      </div>
    </div>
  )
}
