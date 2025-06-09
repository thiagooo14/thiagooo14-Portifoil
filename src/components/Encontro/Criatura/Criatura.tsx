import { useEffect, useState } from 'react'
import './style.scss'
import { useSessionStorage } from '../../../hooks/useSessionStorage'

interface CriaturaProps {
  id: number;
}

function Criatura({ id }: CriaturaProps) {
  const [habilidade, setHabilidade] = useSessionStorage<number>(`criatura_${id}_habilidade`, 0)
  const [energia, setEnergia] = useSessionStorage<number>(`criatura_${id}_energia`, 0)
  const [energiaAtual, setEnergiaAtual] = useSessionStorage<number>(`criatura_${id}_energia_atual`, 0)
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    if (energiaAtual > 0) {
      setIsEditing(false)
    }
  }, [energiaAtual])

  const handleHabilidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabilidade(parseInt(e.target.value) || 0)
  }

  const handleEnergiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnergia(parseInt(e.target.value) || 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnergiaAtual(energia)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div className='criatura'>
      {!isEditing ? (
        <>
          <div className='criatura__header'>
            <div className='criatura__status'>
              <p className='criatura__text'>Habilidade: {habilidade}</p>
              <p className='criatura__text'>Energia: {energia}</p>
            </div>
            <button
              className='criatura__button criatura__button--edit'
              onClick={handleEdit}
            >
              E
            </button>
          </div>
          <p className='criatura__energy'>{energiaAtual}</p>
          <div className='criatura__controls'>
            <button
              className='criatura__button criatura__button--modifier'
              onClick={() => setEnergiaAtual(prev => Math.max(0, prev - 1))}
            >
              -
            </button>
            <button
              className='criatura__button criatura__button--modifier'
              onClick={() => setEnergiaAtual(prev => Math.min(energia, prev + 1))}
            >
              +
            </button>
          </div>
        </>
      ) : (
        <form className='criatura__form' onSubmit={handleSubmit}>
          <div className='criatura__input-group'>
            <label className='criatura__label'>Habilidade:</label>
            <input
              className='criatura__input'
              type="number"
              min="0"
              value={habilidade}
              placeholder='0'
              onChange={handleHabilidadeChange}
            />
          </div>
          <div className='criatura__input-group'>
            <label className='criatura__label'>Energia:</label>
            <input
              className='criatura__input'
              type="number"
              min="0"
              value={energia}
              placeholder='0'
              onChange={handleEnergiaChange}
            />
          </div>
          <button className='criatura__button criatura__button--confirm' type="submit">
            Confirmar
          </button>
        </form>
      )}
    </div>
  )
}

export default Criatura;