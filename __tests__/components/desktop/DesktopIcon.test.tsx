import { render, screen, fireEvent } from '@testing-library/react'
import { DesktopIcon } from '@/components/desktop/DesktopIcon'

describe('DesktopIcon', () => {
  it('renders emoji and label', () => {
    render(<DesktopIcon emoji="💻" label="My Computer" />)
    expect(screen.getByText('💻')).toBeInTheDocument()
    expect(screen.getByText('My Computer')).toBeInTheDocument()
  })

  it('calls onSingleClick on click', () => {
    const handler = jest.fn()
    render(<DesktopIcon emoji="💻" label="My Computer" onSingleClick={handler} />)
    fireEvent.click(screen.getByText('My Computer').parentElement!)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('calls onDoubleClick on double click', () => {
    const handler = jest.fn()
    render(<DesktopIcon emoji="💻" label="My Computer" onDoubleClick={handler} />)
    fireEvent.doubleClick(screen.getByText('My Computer').parentElement!)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('shows highlight background when selected', () => {
    render(<DesktopIcon emoji="💻" label="My Computer" selected />)
    const labelEl = screen.getByText('My Computer')
    expect(labelEl).toHaveStyle({ background: 'var(--win98-highlight)' })
  })
})
