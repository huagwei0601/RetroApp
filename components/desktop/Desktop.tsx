'use client'

import { useState, useRef } from 'react'
import { DesktopIcon } from './DesktopIcon'
import { Taskbar } from './Taskbar'
import { Dialog } from '@/components/win98/Dialog'
import { Window } from '@/components/win98/Window'
import { InstagramApp } from '@/components/apps/instagram'
import { SpotifyApp } from '@/components/apps/spotify'
import type { AppId, DesktopState } from '@/lib/types'

const SYSTEM_ICONS: { emoji: string; src?: string; iconSize?: number; label: string }[] = [
  { emoji: '💻', src: '/my-computer.png', label: 'My Computer' },
  { emoji: '🌐', src: '/network-neighborhood.png', label: 'Network Neighborhood' },
  { emoji: '🗑️', src: '/recycle-bin.webp', label: 'Recycle Bin' },
]

const APP_ICONS: { appId: AppId; emoji: string; src?: string; rounded?: boolean; label: string }[] = [
  { appId: 'spotify',   emoji: '🎵', src: '/spotify.svg', label: 'Spotify' },
  { appId: 'instagram', emoji: '📷', src: '/instagram.png', rounded: true, label: 'Instagram' },
]

const APP_LABELS: Record<AppId, string> = {
  spotify:   'Spotify.exe',
  instagram: 'Instagram.exe',
}

const APP_ICON_SRCS: Record<AppId, string> = {
  spotify:   '/spotify.svg',
  instagram: '/instagram.png',
}

const APP_SIZE: Record<AppId, { width: number; height: number }> = {
  spotify:   { width: 900, height: 600 },
  instagram: { width: 330, height: 570 },
}

function AppContent({ appId }: { appId: AppId }) {
  if (appId === 'instagram') return <InstagramApp />
  if (appId === 'spotify')   return <SpotifyApp />
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--win98-text)', fontSize: '13px' }}>
      {APP_LABELS[appId]} — coming soon
    </div>
  )
}

export function Desktop() {
  const [state, setState] = useState<DesktopState>({
    openWindows: [],
  })
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const zCounter = useRef(10)

  const openApp = (appId: AppId) => {
    // If already open, just focus it
    const existing = state.openWindows.find(w => w.appId === appId)
    if (existing) {
      focusWindow(existing.id)
      return
    }
    zCounter.current += 1
    setState(prev => ({
      ...prev,
      openWindows: [...prev.openWindows, {
        id: `${appId}-${Date.now()}`,
        appId,
        position: { x: 120 + prev.openWindows.length * 24, y: 60 + prev.openWindows.length * 24 },
        isMinimized: false,
        zIndex: zCounter.current,
      }],
    }))
  }

  const focusWindow = (id: string) => {
    zCounter.current += 1
    const z = zCounter.current
    setState(prev => ({
      ...prev,
      openWindows: prev.openWindows.map(w => w.id === id ? { ...w, zIndex: z, isMinimized: false } : w),
    }))
  }

  const closeWindow = (id: string) => {
    setState(prev => ({ ...prev, openWindows: prev.openWindows.filter(w => w.id !== id) }))
  }

  const minimizeWindow = (id: string) => {
    setState(prev => ({
      ...prev,
      openWindows: prev.openWindows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    }))
  }

  const dragWindow = (id: string, pos: { x: number; y: number }) => {
    setState(prev => ({
      ...prev,
      openWindows: prev.openWindows.map(w => w.id === id ? { ...w, position: pos } : w),
    }))
  }

  const activeId = state.openWindows.reduce<typeof state.openWindows[0] | undefined>(
    (top, w) => (!top || w.zIndex > top.zIndex) ? w : top,
    undefined
  )?.id

  const taskbarWindows = state.openWindows.map(w => ({
    id: w.id,
    appId: w.appId,
    label: APP_LABELS[w.appId],
    icon: APP_ICON_SRCS[w.appId],
    isMinimized: w.isMinimized,
    isActive: w.id === activeId,
  }))

  return (
    <div
      onClick={() => setSelectedIcon(null)}
      style={{ position: 'fixed', inset: 0, background: 'var(--win98-desktop)', overflow: 'hidden' }}
    >
      {/* Icon column */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          padding: '8px',
        }}
      >
        {SYSTEM_ICONS.map(icon => (
          <div
            key={icon.label}
            data-system-icon={icon.label}
            onClick={e => { e.stopPropagation(); setSelectedIcon(icon.label) }}
            onDoubleClick={e => { e.stopPropagation(); setErrorDialogOpen(true) }}
            style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <DesktopIcon
              emoji={icon.emoji}
              src={icon.src}
              iconSize={icon.iconSize}
              label={icon.label}
              selected={selectedIcon === icon.label}
              onSingleClick={() => setSelectedIcon(icon.label)}
            />
          </div>
        ))}

        {APP_ICONS.map(icon => (
          <div
            key={icon.appId}
            data-app-icon={icon.appId}
            onClick={e => { e.stopPropagation(); setSelectedIcon(icon.appId) }}
            onDoubleClick={e => { e.stopPropagation(); openApp(icon.appId) }}
            style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <DesktopIcon
              emoji={icon.emoji}
              src={icon.src}
              rounded={icon.rounded}
              label={icon.label}
              selected={selectedIcon === icon.appId}
              onSingleClick={() => setSelectedIcon(icon.appId)}
            />
          </div>
        ))}

      </div>

      {/* Open app windows */}
      {state.openWindows.map(w => (
        <Window
          key={w.id}
          title={APP_LABELS[w.appId]}
          icon={APP_ICON_SRCS[w.appId]}
          position={w.position}
          zIndex={w.zIndex}
          isActive={w.id === activeId}
          isMinimized={w.isMinimized}
          onFocus={() => focusWindow(w.id)}
          onMinimize={() => minimizeWindow(w.id)}
          onMaximize={() => {}}
          onClose={() => closeWindow(w.id)}
          onDrag={pos => dragWindow(w.id, pos)}
          width={APP_SIZE[w.appId].width}
          height={APP_SIZE[w.appId].height}
          noPadding={w.appId === 'instagram' || w.appId === 'spotify'}
        >
          <AppContent appId={w.appId} />
        </Window>
      ))}

      <Dialog
        title="Windows 98"
        icon="error"
        message="This program cannot be opened. Double-click Instagram.exe or Spotify.exe to get started."
        isOpen={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        buttons={[{ label: 'OK', onClick: () => setErrorDialogOpen(false), isPrimary: true }]}
      />

      <Taskbar
        openWindows={taskbarWindows}
        onWindowRestore={id => focusWindow(id)}
        onStartMenuAppClick={openApp}
        onErrorApp={() => setErrorDialogOpen(true)}
      />
    </div>
  )
}
