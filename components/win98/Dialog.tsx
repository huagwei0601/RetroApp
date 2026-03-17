'use client'

import { useState, useRef } from 'react'
import { Button } from './Button'

const ICONS = { info: 'ℹ️', warning: '⚠️', error: '❌', question: '❓' } as const

type DialogProps = {
  title: string
  icon?: keyof typeof ICONS
  message: string
  buttons: { label: string; onClick: () => void; isPrimary?: boolean }[]
  isOpen: boolean
  onClose: () => void
}

export function Dialog({ title, icon, message, buttons, isOpen, onClose }: DialogProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const onDragRef = useRef(setPos)
  onDragRef.current = setPos

  if (!isOpen) return null

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = (e.currentTarget as HTMLElement).closest<HTMLElement>('[data-dialog]')!
    const rect = el.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const originX = rect.left
    const originY = rect.top

    const handleMouseMove = (ev: MouseEvent) => {
      onDragRef.current({ x: originX + ev.clientX - startX, y: originY + ev.clientY - startY })
    }
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const dialogStyle: React.CSSProperties = pos
    ? { position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999 }
    : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999 }

  return (
    <div data-dialog style={{ ...dialogStyle, minWidth: '240px', maxWidth: '360px' }} className="win98-window">
      {/* Inline title bar — always active gradient, close button only */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        style={{
          background: 'linear-gradient(to right, var(--win98-titlebar), var(--win98-titlebar-gradient-end))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 2px 2px 4px',
          height: '18px',
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        <span style={{ color: 'var(--win98-titletext)', fontWeight: 700, fontSize: '11px' }}>{title}</span>
        <button
          className="win98-btn-reset win98-raised"
          onClick={onClose}
          onMouseDown={e => e.stopPropagation()}
          title="Close"
          style={{ width: '16px', height: '14px', background: 'var(--win98-silver)', fontWeight: 700, fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          X
        </button>
      </div>

      <div style={{ padding: '20px 12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {icon && <span style={{ fontSize: '32px', lineHeight: 1, flexShrink: 0 }}>{ICONS[icon]}</span>}
        <span style={{ fontSize: '11px', fontFamily: "'MS Sans Serif', Tahoma, sans-serif" }}>{message}</span>
      </div>

      <div style={{ borderTop: '1px solid var(--win98-dark)', padding: '12px', display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
        {buttons.map((btn, i) => (
          <Button key={i} onClick={btn.onClick} isPrimary={btn.isPrimary}>{btn.label}</Button>
        ))}
      </div>
    </div>
  )
}
