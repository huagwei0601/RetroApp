import { render, screen, fireEvent } from '@testing-library/react'
import { Desktop } from '@/components/desktop/Desktop'

describe('Desktop', () => {
  it('renders system icons', () => {
    render(<Desktop />)
    expect(screen.getByText('My Computer')).toBeInTheDocument()
    expect(screen.getByText('Recycle Bin')).toBeInTheDocument()
  })

  it('renders app icons', () => {
    render(<Desktop />)
    expect(screen.getByText('Spotify')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })

  it('shows error dialog when a system icon is double-clicked', () => {
    render(<Desktop />)
    fireEvent.doubleClick(screen.getByText('My Computer').closest('[data-system-icon]')!)
    expect(screen.getByText(/This program cannot be opened/)).toBeInTheDocument()
  })

  it('closes error dialog when OK is clicked', () => {
    render(<Desktop />)
    fireEvent.doubleClick(screen.getByText('My Computer').closest('[data-system-icon]')!)
    fireEvent.click(screen.getByText('OK'))
    expect(screen.queryByText(/This program cannot be opened/)).not.toBeInTheDocument()
  })

  it('opens a window when app icon is double-clicked', () => {
    render(<Desktop />)
    fireEvent.doubleClick(screen.getByText('Spotify').closest('[data-app-icon]')!)
    expect(screen.getAllByText('Spotify.exe').length).toBeGreaterThan(0)
  })

  it('renders taskbar', () => {
    render(<Desktop />)
    expect(screen.getByText(/Start/i)).toBeInTheDocument()
    expect(screen.getByTestId('taskbar-clock')).toBeInTheDocument()
  })
})
