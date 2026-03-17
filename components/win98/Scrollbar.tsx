'use client'

import { useEffect, useRef, useState } from 'react'

type ScrollbarProps = {
  orientation: 'vertical' | 'horizontal'
  value: number       // 0–100
  onChange: (value: number) => void
  trackLength?: number // px — required for horizontal, ignored for vertical (uses 100%)
  disabled?: boolean
}

const ARROW_SIZE = 17
const STEP = 10

export function Scrollbar({ orientation, value, onChange, trackLength = 200, disabled = false }: ScrollbarProps) {
  const isVertical = orientation === 'vertical'
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  // For vertical: measure the track div so thumb calc is always accurate
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackPx, setTrackPx] = useState(isVertical ? 200 : trackLength - ARROW_SIZE * 2)

  useEffect(() => {
    if (!isVertical) return
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setTrackPx(el.clientHeight))
    ro.observe(el)
    setTrackPx(el.clientHeight)
    return () => ro.disconnect()
  }, [isVertical])

  const thumbSize   = Math.max(20, trackPx * 0.25)
  const trackInner  = trackPx - thumbSize
  const thumbOffset = (value / 100) * trackInner

  const dragRef = useRef<{ startPos: number; startValue: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const delta = (isVertical ? e.clientY : e.clientX) - dragRef.current.startPos
      const pct   = trackInner > 0 ? (delta / trackInner) * 100 : 0
      const next  = Math.max(0, Math.min(100, dragRef.current.startValue + pct))
      onChangeRef.current(Math.round(next))
    }
    const handleMouseUp = () => { dragRef.current = null }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup',   handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup',   handleMouseUp)
    }
  }, [isVertical, trackInner])

  const handleArrow = (delta: number) => {
    if (disabled) return
    onChangeRef.current(Math.max(0, Math.min(100, value + delta)))
  }

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.stopPropagation()
    dragRef.current = { startPos: isVertical ? e.clientY : e.clientX, startValue: value }
  }

  const arrowBtnStyle: React.CSSProperties = {
    width: `${ARROW_SIZE}px`,
    height: `${ARROW_SIZE}px`,
    background: 'var(--win98-silver)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    flexShrink: 0,
    fontFamily: 'inherit',
    cursor: 'default',
  }

  const trackStyle: React.CSSProperties = {
    background: '#D0D0D0',
    position: 'relative',
    overflow: 'hidden',
  }

  if (isVertical) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: `${ARROW_SIZE}px`, height: '100%' }}>
        <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} onClick={() => handleArrow(-STEP)}>▲</button>
        <div ref={trackRef} style={{ ...trackStyle, flex: 1 }}>
          <div
            className="win98-raised"
            onMouseDown={handleThumbMouseDown}
            style={{
              position: 'absolute',
              top: thumbOffset,
              left: '1px',
              width: '15px',
              height: `${thumbSize}px`,
              background: 'var(--win98-silver)',
              cursor: disabled ? 'default' : 'ns-resize',
            }}
          />
        </div>
        <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} onClick={() => handleArrow(STEP)}>▼</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: `${ARROW_SIZE}px`, width: `${trackLength}px` }}>
      <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} onClick={() => handleArrow(-STEP)}>◀</button>
      <div style={{ ...trackStyle, flex: 1 }}>
        <div
          className="win98-raised"
          onMouseDown={handleThumbMouseDown}
          style={{
            position: 'absolute',
            left: thumbOffset,
            top: '1px',
            height: '13px',
            width: `${thumbSize}px`,
            background: 'var(--win98-silver)',
            cursor: disabled ? 'default' : 'ew-resize',
          }}
        />
      </div>
      <button className="win98-btn-reset win98-raised" style={arrowBtnStyle} onClick={() => handleArrow(STEP)}>▶</button>
    </div>
  )
}
