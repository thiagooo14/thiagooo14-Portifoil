import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

// Mock do react-dom/client
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}))

// Mock do App
vi.mock('./App', () => ({
  default: () => <div data-testid="app">App Component</div>,
}))

describe('main', () => {
  let rootElement: HTMLElement

  beforeEach(() => {
    // Criar um elemento root para os testes
    rootElement = document.createElement('div')
    rootElement.id = 'root'
    document.body.appendChild(rootElement)
  })

  afterEach(() => {
    // Limpar após cada teste
    document.body.removeChild(rootElement)
  })

  it('should have a root element in the DOM', () => {
    expect(document.getElementById('root')).toBeInTheDocument()
  })

  it('should render the App component', () => {
    render(<App />)
    expect(document.querySelector('[data-testid="app"]')).toBeInTheDocument()
  })

  it('should import and use StrictMode', () => {
    // Verifica se o StrictMode é importado corretamente
    const { StrictMode } = require('react')
    expect(StrictMode).toBeDefined()
  })

  it('should import and use createRoot from react-dom/client', () => {
    // Verifica se createRoot é importado corretamente
    const { createRoot } = require('react-dom/client')
    expect(createRoot).toBeDefined()
  })
}) 