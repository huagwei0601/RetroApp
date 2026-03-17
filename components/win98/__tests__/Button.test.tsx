import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>OK</Button>)
    expect(screen.getByText('OK')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>OK</Button>)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>OK</Button>)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('wraps in outline div when isPrimary', () => {
    const { container } = render(<Button isPrimary>Next</Button>)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.outline).toBe('1px solid var(--win98-text)')
  })

  it('applies win98-raised class by default', () => {
    render(<Button>OK</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('win98-raised')
  })

  it('applies win98-sunken class when pressed', () => {
    render(<Button>OK</Button>)
    const btn = screen.getByRole('button')
    fireEvent.mouseDown(btn)
    expect(btn.className).toContain('win98-sunken')
    expect(btn.className).not.toContain('win98-raised')
  })
})
