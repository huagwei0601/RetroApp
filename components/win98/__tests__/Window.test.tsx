import { render, screen } from '@testing-library/react'
import { Window } from '../Window'

const baseProps = {
  title: 'Test Window',
  position: { x: 100, y: 100 },
  isActive: true,
  isMinimized: false,
  onFocus: jest.fn(),
  onMinimize: jest.fn(),
  onMaximize: jest.fn(),
  onClose: jest.fn(),
  onDrag: jest.fn(),
}

describe('Window', () => {
  it('renders title and children', () => {
    render(<Window {...baseProps}><div>content</div></Window>)
    expect(screen.getByText('Test Window')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('is hidden when minimized', () => {
    const { container } = render(<Window {...baseProps} isMinimized><div>content</div></Window>)
    const win = container.firstChild as HTMLElement
    expect(win.style.display).toBe('none')
  })
})
