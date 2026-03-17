import { render, screen, fireEvent } from '@testing-library/react'
import { StartMenu } from '@/components/desktop/StartMenu'

const APP_ITEMS = [
  { id: 'spotify',   label: 'Spotify.exe',   src: '/spotify.svg' },
  { id: 'instagram', label: 'Instagram.exe', src: '/instagram.png' },
]

describe('StartMenu', () => {
  it('renders app items', () => {
    render(<StartMenu apps={APP_ITEMS} onAppClick={jest.fn()} onClose={jest.fn()} />)
    expect(screen.getByText('Spotify.exe')).toBeInTheDocument()
    expect(screen.getByText('Instagram.exe')).toBeInTheDocument()
  })

  it('calls onAppClick with id when app item clicked', () => {
    const handler = jest.fn()
    render(<StartMenu apps={APP_ITEMS} onAppClick={handler} onClose={jest.fn()} />)
    fireEvent.click(screen.getByText('Spotify.exe'))
    expect(handler).toHaveBeenCalledWith('spotify')
  })

  it('calls onClose when clicking outside', () => {
    const onClose = jest.fn()
    render(
      <div>
        <StartMenu apps={APP_ITEMS} onAppClick={jest.fn()} onClose={onClose} />
        <div data-testid="outside">outside</div>
      </div>
    )
    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
