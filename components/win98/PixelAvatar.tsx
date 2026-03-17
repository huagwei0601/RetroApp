'use client'
import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// Render at 1/scale native size → CSS-upscale with image-rendering: pixelated
// Uses arc+clip (no getImageData) so external image URLs work without CORS
const DEFAULT_SCALE = 2

export function PixelAvatar({
  size,
  src,
  background,
  borderColor,
  borderWidth = 2,
  fontSize,
  scale = DEFAULT_SCALE,
  smooth = false,
  children,
  style,
}: {
  size: number
  src?: string
  background?: string
  borderColor?: string
  borderWidth?: number
  fontSize?: string | number
  scale?: number
  smooth?: boolean
  children?: ReactNode
  style?: CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const small = smooth ? size : Math.max(6, Math.round(size / scale))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const paint = (img?: HTMLImageElement) => {
      ctx.clearRect(0, 0, small, small)
      ctx.imageSmoothingEnabled = false
      // Clip to circle at small native size — arc anti-aliasing at this tiny
      // scale becomes visible stepped pixel blocks when upscaled
      ctx.save()
      ctx.beginPath()
      ctx.arc(small / 2, small / 2, small / 2, 0, Math.PI * 2)
      ctx.clip()
      if (background) {
        const resolved = background.startsWith('var(')
          ? getComputedStyle(canvas).getPropertyValue(background.slice(4, -1).trim()).trim()
          : background
        ctx.fillStyle = resolved || '#808080'
        ctx.fillRect(0, 0, small, small)
      }
      if (img) ctx.drawImage(img, 0, 0, small, small)
      ctx.restore()
    }

    if (src) {
      const img = new Image()
      // No crossOrigin — allows any external image; canvas will be tainted
      // but we never call getImageData so that's fine
      img.onload = () => paint(img)
      img.onerror = () => paint()
      img.src = src
    } else {
      paint()
    }
  }, [src, background, small])

  const fz = typeof fontSize === 'number' ? `${fontSize}px` : (fontSize ?? '14px')

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}>
      <canvas
        ref={canvasRef}
        width={small}
        height={small}
        style={{ width: size, height: size, imageRendering: smooth ? 'auto' : 'pixelated', display: 'block' }}
      />
      {borderColor && (
        <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <circle
            cx={size / 2} cy={size / 2}
            r={size / 2 - borderWidth / 2}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            shapeRendering="crispEdges"
          />
        </svg>
      )}
      {children && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: fz, pointerEvents: 'none',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
