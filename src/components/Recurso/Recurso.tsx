import { useSessionStorage } from '../../hooks/useSessionStorage'
import './style.scss'

const Recurso = ({ nome }: { nome: string }) => {
  const [currentValue, setCurrentValue] = useSessionStorage<number>(`recurso_${nome}`, 0)

  const incrementValue = () => {
    setCurrentValue(prev => prev + 1);
  };

  const decrementValue = () => {
    if (currentValue > 0) {
      setCurrentValue(prev => prev - 1);
    }
  };


  return (
    <div className="recurso">
      <p className="recurso__nome">{nome}</p>
      <div className="recurso_controles">
        <span className="recurso__valor">{currentValue}</span>
        <div>
          <button
            className="recurso__botao recurso__botao--modificador"
            onClick={decrementValue}
          >
            -
          </button>
          <button
            className="recurso__botao recurso__botao--modificador"
            onClick={incrementValue}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default Recurso