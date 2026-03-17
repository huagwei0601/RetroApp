'use client'

type TitleBarProps = {
  title: string
  icon?: string
  isActive: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  onMouseDown: (e: React.MouseEvent) => void
}

export function TitleBar({
  title,
  icon,
  isActive,
  onMinimize,
  onMaximize,
  onClose,
  onMouseDown,
}: TitleBarProps) {
  const gradient = isActive
    ? 'linear-gradient(to right, var(--win98-titlebar), var(--win98-titlebar-gradient-end))'
    : 'linear-gradient(to right, var(--win98-titlebar-inactive), var(--win98-titlebar-inactive-gradient-end))'

  const ctrlBtnStyle: React.CSSProperties = {
    width: '16px',
    height: '14px',
    background: 'var(--win98-silver)',
    color: 'var(--win98-text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexShrink: 0,
  }

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 2px 2px 4px',
        height: '18px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', minWidth: 0, overflow: 'hidden' }}>
        {icon && <img src={icon} width={14} height={14} alt="" style={{ flexShrink: 0 }} />}
        <span style={{ color: 'var(--win98-titletext)', fontWeight: 700, fontSize: '11px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {title}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '2px', marginLeft: '4px', flexShrink: 0 }}>
        {/* Minimize */}
        <button
          className="win98-btn-reset win98-raised"
          title="Minimize"
          onClick={(e) => { e.stopPropagation(); onMinimize() }}
          style={ctrlBtnStyle}
        >
          {/* flat bar at bottom */}
          <div style={{
            width: '8px',
            height: '2px',
            background: 'var(--win98-text)',
            marginTop: '6px',
          }} />
        </button>

        {/* Maximize */}
        <button
          className="win98-btn-reset win98-raised"
          title="Maximize"
          onClick={(e) => { e.stopPropagation(); onMaximize() }}
          style={ctrlBtnStyle}
        >
          {/* rectangle with thick top border */}
          <div style={{
            width: '8px',
            height: '7px',
            borderTop: '2px solid var(--win98-text)',
            borderLeft: '1px solid var(--win98-text)',
            borderRight: '1px solid var(--win98-text)',
            borderBottom: '1px solid var(--win98-text)',
          }} />
        </button>

        {/* Close */}
        <button
          className="win98-btn-reset win98-raised"
          title="Close"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          style={{ ...ctrlBtnStyle, fontWeight: 700, fontSize: '11px' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
