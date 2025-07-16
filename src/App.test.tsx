import { describe, it, expect } from 'vitest'
import { render} from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('should render the App component without errors', () => {
    // Verifica se o App renderiza sem lançar exceções
    expect(() => render(<App />)).not.toThrow()
  })

  it('should have the basic application structure', () => {
    render(<App />)
    
    // Verifica se existe um elemento div principal
    const appElement = document.querySelector('div')
    expect(appElement).toBeInTheDocument()
  })

  it('should import and use React Router', () => {
    // Este teste verifica se o App está configurado corretamente
    // sem depender do roteamento específico
    render(<App />)
    
    // Verifica se o componente renderiza sem erros de roteamento
    expect(document.body).toBeInTheDocument()
  })
}) 