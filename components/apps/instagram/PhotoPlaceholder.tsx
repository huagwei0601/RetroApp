type PhotoPlaceholderProps = {
  shade: string
  src?: string          // if provided, renders an image
  size?: number         // fixed square size (used in profile grid, story)
  fullWidth?: boolean   // fills container width at 1:1 aspect ratio (used in feed)
  smooth?: boolean      // disables pixelated rendering (for regular photos)
  onClick?: () => void
  selected?: boolean
}

export function PhotoPlaceholder({ shade, src, size, fullWidth = false, smooth = false, onClick, selected }: PhotoPlaceholderProps) {
  const tileSize = size ? Math.max(8, Math.floor(size / 10)) : 20

  const containerStyle: React.CSSProperties = fullWidth
    ? { width: '100%', aspectRatio: '1 / 1' }
    : { width: size, height: size, flexShrink: 0 }

  return (
    <div
      onClick={onClick}
      style={{
        ...containerStyle,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        borderTop:    '2px solid var(--win98-darker)',
        borderLeft:   '2px solid var(--win98-darker)',
        borderBottom: '2px solid var(--win98-light)',
        borderRight:  '2px solid var(--win98-light)',
        outline: selected ? '2px solid var(--win98-highlight)' : 'none',
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            imageRendering: smooth ? 'auto' : 'pixelated',
          }}
        />
      ) : (
        <>
          {/* Checkerboard background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(45deg, ${shade}88 25%, transparent 25%),
              linear-gradient(-45deg, ${shade}88 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${shade}88 75%),
              linear-gradient(-45deg, transparent 75%, ${shade}88 75%)
            `,
            backgroundSize: `${tileSize * 2}px ${tileSize * 2}px`,
            backgroundPosition: `0 0, 0 ${tileSize}px, ${tileSize}px -${tileSize}px, -${tileSize}px 0`,
            backgroundColor: shade,
          }} />
          {/* Camera icon */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: (size && size > 60) || fullWidth ? '28px' : '14px',
            color: 'var(--win98-dark)',
          }}>
            🖼
          </div>
        </>
      )}
    </div>
  )
}
