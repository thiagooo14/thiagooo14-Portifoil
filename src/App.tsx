import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Ficha from './pages/Ficha/Ficha'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ficha" element={<Ficha />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
