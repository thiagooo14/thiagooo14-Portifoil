import './style.scss'
import Criatura from './Criatura/Criatura'
import { useSessionStorage } from '../../hooks/useSessionStorage'

const Encontro = () => {
  const [criaturas, setCriaturas] = useSessionStorage<number[]>('encontro_criaturas', [0])

  const handleAddCriatura = () => {
    setCriaturas(prev => [...prev, prev.length])
  }

  return (
    <div className="encontro">
      <div className="encontro__header">
        <h2 className="encontro__title">Encontro</h2>
        <button 
          className="encontro__button encontro__button--add"
          onClick={handleAddCriatura}
        >
          Add
        </button>
      </div>
      <div className="encontro__criaturas">
        {criaturas.map((id) => (
          <Criatura key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default Encontro