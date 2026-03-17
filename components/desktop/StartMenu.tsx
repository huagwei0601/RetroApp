'use client'

import { useEffect, useRef } from 'react'
type AppItem = {
  id: string
  label: string
  emoji?: string
  src?: string
}

type StartMenuProps = {
  apps: AppItem[]
  onAppClick: (id: string) => void
  onClose: () => void
}

export function StartMenu({ apps, onAppClick, onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [onClose])

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 16px 4px 8px',
    cursor: 'default',
    fontSize: '11px',
    color: 'var(--win98-text)',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      ref={menuRef}
      className="win98-raised"
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '0',
        background: 'var(--win98-silver)',
        minWidth: '180px',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '28px',
            background: 'linear-gradient(to bottom, #1a1a80, #000000)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '8px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: '14px',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '1px',
              fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            }}
          >
            <span style={{ fontWeight: 700 }}>Windows</span>
            <span style={{ fontWeight: 400 }}>98</span>
          </span>
        </div>
        <div style={{ flex: 1 }}>
          {apps.map(app => (
            <div
              key={app.id}
              onClick={() => onAppClick(app.id)}
              style={menuItemStyle}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--win98-highlight)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--win98-highlight-text)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--win98-text)'
              }}
            >
              {app.src
                ? <img src={app.src} alt="" width={16} height={16} style={{ flexShrink: 0 }} />
                : <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{app.emoji}</span>
              }
              <span>{app.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
