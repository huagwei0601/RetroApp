'use client'

import { useRef } from 'react'
import { TitleBar } from './TitleBar'

type WindowProps = {
  title: string
  icon?: string
  width?: number
  height?: number
  position: { x: number; y: number }
  zIndex?: number
  isActive: boolean
  isMinimized: boolean
  onFocus: () => void
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onDrag: (pos: { x: number; y: number }) => void
  children: React.ReactNode
  noPadding?: boolean
}

export function Window({
  title,
  icon,
  width = 400,
  height = 300,
  position,
  zIndex,
  isActive,
  isMinimized,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onDrag,
  children,
  noPadding = false,
}: WindowProps) {
  // Keep latest onDrag in a ref so event listeners always call the current version
  const onDragRef = useRef(onDrag)
  onDragRef.current = onDrag

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const originX = position.x
    const originY = position.y

    const handleMouseMove = (ev: MouseEvent) => {
      onDragRef.current({
        x: originX + ev.clientX - startX,
        y: originY + ev.clientY - startY,
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="win98-window"
      onMouseDown={onFocus}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width,
        height,
        zIndex,
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TitleBar
        title={title}
        icon={icon}
        isActive={isActive}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onMouseDown={handleTitleBarMouseDown}
      />
      <div style={{ flex: 1, overflow: 'hidden', padding: noPadding ? 0 : '8px', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
