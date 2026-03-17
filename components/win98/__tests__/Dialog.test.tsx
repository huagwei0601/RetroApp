import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from '../Dialog'

const baseProps = {
  title: 'Confirm',
  message: 'Are you sure?',
  buttons: [{ label: 'OK', onClick: jest.fn(), isPrimary: true }],
  isOpen: true,
  onClose: jest.fn(),
}

describe('Dialog', () => {
  it('renders title and message when open', () => {
    render(<Dialog {...baseProps} />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<Dialog {...baseProps} isOpen={false} />)
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument()
  })

  it('calls button onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Dialog {...baseProps} buttons={[{ label: 'OK', onClick: handleClick }]} />)
    fireEvent.click(screen.getByText('OK'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders warning icon for warning type', () => {
    render(<Dialog {...baseProps} icon="warning" />)
    expect(screen.getByText('⚠️')).toBeInTheDocument()
  })
})
