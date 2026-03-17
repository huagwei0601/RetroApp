import { render, screen, fireEvent } from '@testing-library/react'
import { Taskbar } from '@/components/desktop/Taskbar'

const baseProps = {
  openWindows: [],
  onWindowRestore: jest.fn(),
  onStartMenuAppClick: jest.fn(),
  onErrorApp: jest.fn(),
}

describe('Taskbar', () => {
  it('renders Start button', () => {
    render(<Taskbar {...baseProps} />)
    expect(screen.getByText(/Start/i)).toBeInTheDocument()
  })

  it('renders clock with time', () => {
    render(<Taskbar {...baseProps} />)
    expect(screen.getByTestId('taskbar-clock')).toBeInTheDocument()
  })

  it('toggles StartMenu on Start button click', () => {
    render(<Taskbar {...baseProps} />)
    fireEvent.click(screen.getByText(/Start/i))
    expect(screen.getByText('Spotify.exe')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/Start/i))
    expect(screen.queryByText('Spotify.exe')).not.toBeInTheDocument()
  })

  it('renders a TaskbarButton for each open window', () => {
    const windows = [
      { id: 'w1', appId: 'spotify' as const, label: 'Spotify.exe', isMinimized: true, isActive: false },
      { id: 'w2', appId: 'instagram' as const, label: 'Instagram.exe', isMinimized: false, isActive: true },
    ]
    render(<Taskbar {...baseProps} openWindows={windows} />)
    expect(screen.getByText('Spotify.exe')).toBeInTheDocument()
    expect(screen.getByText('Instagram.exe')).toBeInTheDocument()
  })

  it('calls onWindowRestore when a taskbar button is clicked', () => {
    const handler = jest.fn()
    const windows = [{ id: 'w1', appId: 'spotify' as const, label: 'Spotify.exe', isMinimized: true, isActive: false }]
    render(<Taskbar {...baseProps} openWindows={windows} onWindowRestore={handler} />)
    fireEvent.click(screen.getByText('Spotify.exe'))
    expect(handler).toHaveBeenCalledWith('w1')
  })
})
