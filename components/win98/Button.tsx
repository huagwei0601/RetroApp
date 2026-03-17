'use client'

import { useState } from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  isPrimary?: boolean
  variant?: 'default' | 'default-wide'
  type?: 'button' | 'submit'
}

export function Button({
  children,
  onClick,
  disabled = false,
  isPrimary = false,
  variant = 'default',
  type = 'button',
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)
  const minWidth = variant === 'default-wide' ? '100px' : '75px'

  const button = (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`win98-btn-reset ${pressed ? 'win98-sunken' : 'win98-raised'}`}
      style={{
        minWidth,
        height: '23px',
        // Pressed: shift content 1px down+right (Win98 sunken visual)
        padding: pressed ? '1px 11px 0 13px' : '0 12px',
        background: 'var(--win98-silver)',
        color: disabled ? 'var(--win98-disabled)' : 'var(--win98-text)',
        pointerEvents: disabled ? 'none' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  )

  if (isPrimary) {
    return (
      <div style={{ outline: '1px solid var(--win98-text)', display: 'inline-flex' }}>
        {button}
      </div>
    )
  }

  return button
}
