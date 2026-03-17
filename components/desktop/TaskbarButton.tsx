'use client'

type TaskbarButtonProps = {
  label: string
  icon?: string
  onClick: () => void
  isActive?: boolean
}

export function TaskbarButton({ label, icon, onClick, isActive = false }: TaskbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={isActive ? 'win98-sunken' : 'win98-raised'}
      style={{
        background: isActive ? 'var(--win98-light)' : 'var(--win98-silver)',
        height: '30px',
        minWidth: '100px',
        maxWidth: '150px',
        padding: isActive ? '1px 6px 0 8px' : '0 8px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        fontWeight: isActive ? 700 : 400,
        color: 'var(--win98-text)',
        cursor: 'default',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      {/* Icon */}
      {icon && (
        <img src={icon} width={16} height={16} alt="" style={{ flexShrink: 0, imageRendering: 'pixelated' }} />
      )}

      {/* Label */}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
        {label}
      </span>

    </button>
  )
}
