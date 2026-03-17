import { render, screen, fireEvent } from '@testing-library/react'
import { TitleBar } from '../TitleBar'

const noop = () => {}

describe('TitleBar', () => {
  it('renders title text', () => {
    render(<TitleBar title="My App" isActive onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('calls onMinimize when _ clicked', () => {
    const handleMinimize = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={handleMinimize} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Minimize'))
    expect(handleMinimize).toHaveBeenCalledTimes(1)
  })

  it('calls onMaximize when □ clicked', () => {
    const handleMaximize = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={handleMaximize} onClose={noop} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Maximize'))
    expect(handleMaximize).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when X clicked', () => {
    const handleClose = jest.fn()
    render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={noop} onClose={handleClose} onMouseDown={noop} />)
    fireEvent.click(screen.getByTitle('Close'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('uses active gradient when isActive is true', () => {
    const { container } = render(<TitleBar title="App" isActive onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    const bar = container.firstChild as HTMLElement
    expect(bar.style.background).toContain('var(--win98-titlebar)')
  })

  it('uses inactive gradient when isActive is false', () => {
    const { container } = render(<TitleBar title="App" isActive={false} onMinimize={noop} onMaximize={noop} onClose={noop} onMouseDown={noop} />)
    const bar = container.firstChild as HTMLElement
    expect(bar.style.background).toContain('var(--win98-titlebar-inactive)')
  })
})
