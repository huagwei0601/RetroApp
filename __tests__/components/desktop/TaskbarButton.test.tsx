import { render, screen, fireEvent } from '@testing-library/react'
import { TaskbarButton } from '@/components/desktop/TaskbarButton'

describe('TaskbarButton', () => {
  it('renders label', () => {
    render(<TaskbarButton label="Spotify" onClick={jest.fn()} />)
    expect(screen.getByText('Spotify')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handler = jest.fn()
    render(<TaskbarButton label="Spotify" onClick={handler} />)
    fireEvent.click(screen.getByText('Spotify'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('renders with win98-sunken class when active', () => {
    const { container } = render(<TaskbarButton label="Spotify" onClick={jest.fn()} isActive />)
    expect(container.firstChild).toHaveClass('win98-sunken')
  })

  it('renders with win98-raised class when not active', () => {
    const { container } = render(<TaskbarButton label="Spotify" onClick={jest.fn()} />)
    expect(container.firstChild).toHaveClass('win98-raised')
  })
})
