'use client'

type DesktopIconProps = {
  emoji: string
  src?: string       // if provided, renders an <img> instead of the emoji
  iconSize?: number  // px size of the icon image, default 32
  rounded?: boolean  // adds border-radius to the icon image
  label: string
  selected?: boolean
  onSingleClick?: () => void
  onDoubleClick?: () => void
}

export function DesktopIcon({
  emoji,
  src,
  iconSize = 32,
  rounded = false,
  label,
  selected = false,
  onSingleClick,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <div
      onClick={onSingleClick}
      onDoubleClick={onDoubleClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        cursor: 'default',
        userSelect: 'none',
        padding: '4px',
        width: '90px',
      }}
    >
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          background: selected ? 'var(--win98-highlight)' : 'transparent',
        }}
      >
        {src
          ? <img src={src} alt={label} style={{ width: `${iconSize}px`, height: `${iconSize}px`, objectFit: 'contain', imageRendering: 'pixelated', display: 'block', borderRadius: rounded ? '22%' : undefined }} />
          : emoji}
      </div>
      <span
        style={{
          color: 'var(--win98-titletext)',
          textShadow: '1px 1px 0 var(--win98-text)',
          fontSize: '11px',
          textAlign: 'center',
          maxWidth: '90px',
          wordBreak: 'normal',
          overflowWrap: 'normal',
          background: selected ? 'var(--win98-highlight)' : 'transparent',
          padding: '1px 2px',
        }}
      >
        {label}
      </span>
    </div>
  )
}
