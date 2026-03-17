import { render, screen, fireEvent } from '@testing-library/react'
import { Scrollbar } from '../Scrollbar'

describe('Scrollbar', () => {
  it('renders up and down arrows for vertical', () => {
    render(<Scrollbar orientation="vertical" value={50} onChange={jest.fn()} />)
    expect(screen.getByText('▲')).toBeInTheDocument()
    expect(screen.getByText('▼')).toBeInTheDocument()
  })

  it('renders left and right arrows for horizontal', () => {
    render(<Scrollbar orientation="horizontal" value={50} onChange={jest.fn()} trackLength={200} />)
    expect(screen.getByText('◀')).toBeInTheDocument()
    expect(screen.getByText('▶')).toBeInTheDocument()
  })

  it('calls onChange with decremented value when up arrow clicked', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} />)
    fireEvent.click(screen.getByText('▲'))
    expect(handleChange).toHaveBeenCalledWith(40)
  })

  it('calls onChange with incremented value when down arrow clicked', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} />)
    fireEvent.click(screen.getByText('▼'))
    expect(handleChange).toHaveBeenCalledWith(60)
  })

  it('clamps value at 0 when already at minimum', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={0} onChange={handleChange} />)
    fireEvent.click(screen.getByText('▲'))
    expect(handleChange).toHaveBeenCalledWith(0)
  })

  it('clamps value at 100 when already at maximum', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={100} onChange={handleChange} />)
    fireEvent.click(screen.getByText('▼'))
    expect(handleChange).toHaveBeenCalledWith(100)
  })

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn()
    render(<Scrollbar orientation="vertical" value={50} onChange={handleChange} disabled />)
    fireEvent.click(screen.getByText('▲'))
    expect(handleChange).not.toHaveBeenCalled()
  })
})
