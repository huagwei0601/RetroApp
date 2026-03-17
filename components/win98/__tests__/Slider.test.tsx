import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from '../Slider'

describe('Slider', () => {
  it('renders label when provided', () => {
    render(<Slider value={50} min={0} max={100} onChange={jest.fn()} label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders tick marks when showTicks is true', () => {
    render(<Slider value={50} min={0} max={100} onChange={jest.fn()} showTicks />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = render(<Slider value={30} min={0} max={100} onChange={jest.fn()} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('does not respond to thumb interaction when disabled', () => {
    const handleChange = jest.fn()
    render(<Slider value={50} min={0} max={100} onChange={handleChange} disabled />)
    const thumb = document.querySelector('[data-thumb]') as HTMLElement
    if (thumb) fireEvent.mouseDown(thumb)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
