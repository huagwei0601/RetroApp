'use client'

import { useEffect, useRef } from 'react'

type SliderProps = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  disabled?: boolean
  label?: string
  showTicks?: boolean
}

export function Slider({ value, min, max, onChange, disabled = false, label, showTicks = false }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  const trackRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  const dragRef = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current || !trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const rawPct = (e.clientX - rect.left) / rect.width
      const clamped = Math.max(0, Math.min(1, rawPct))
      const next = Math.round(min + clamped * (max - min))
      onChangeRef.current(next)
    }
    const handleMouseUp = () => { dragRef.current = false }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [min, max])

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    dragRef.current = true
  }

  return (
    <div style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: '11px' }}>
      {label && (
        <div style={{ marginBottom: '4px', color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)' }}>
          {label}
        </div>
      )}
      <div style={{ position: 'relative', paddingTop: '8px', paddingBottom: '4px' }}>
        <div
          ref={trackRef}
          className="win98-sunken"
          style={{ height: '4px', background: 'var(--win98-silver)', position: 'relative' }}
        />
        <div
          data-thumb
          className="win98-raised"
          onMouseDown={handleThumbMouseDown}
          style={{
            position: 'absolute',
            top: '4px',
            left: `calc(${pct}% - 6px)`,
            width: '12px',
            height: '12px',
            background: 'var(--win98-silver)',
            cursor: disabled ? 'default' : 'ew-resize',
          }}
        />
      </div>
      {showTicks && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--win98-disabled)' }}>
          <span>{min}</span>
          <span>{Math.round((min + max) / 2)}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
