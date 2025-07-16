
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Home from './Home'

// Mock do useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Home', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render the home page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText('Thiago B. S. Tavares')).toBeInTheDocument()
    expect(screen.getByText(/Muito Prazer!/i)).toBeInTheDocument()
    expect(screen.getByText(/me chamo Thiago/i)).toBeInTheDocument()
    expect(screen.getByText(/portifolio/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Projeto Ficha/i })).toBeInTheDocument()
  })

  it('should navigate to /ficha when Projeto Ficha button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    const button = screen.getByRole('button', { name: /Projeto Ficha/i })
    await user.click(button)
    
    expect(mockNavigate).toHaveBeenCalledWith('/ficha')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})
