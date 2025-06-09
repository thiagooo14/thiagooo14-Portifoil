import { useState } from 'react';
import './style.scss'
import { useSessionStorage } from '../../hooks/useSessionStorage';

const ToDo = () => {
  const [items, setItems] = useSessionStorage<string[]>('todo_items', []);
  const [inputValue, setInputValue] = useState<string>('');
  const [completedItems, setCompletedItems] = useSessionStorage<boolean[]>('todo_completed', []);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddItem = (input: string) => {
    const newItems = input
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '')

    if (newItems.length > 0) {
      if (isEditing) {
        setItems(newItems)
        setCompletedItems(new Array(newItems.length).fill(false))
        setIsEditing(false)
      } else {
        setItems([...items, ...newItems])
        setCompletedItems([...completedItems, ...new Array(newItems.length).fill(false)])
      }
      setInputValue('')
      setIsInputVisible(false)
    }
  }

  const toggleComplete = (index: number) => {
    const newCompletedItems = [...completedItems]
    newCompletedItems[index] = !newCompletedItems[index]
    setCompletedItems(newCompletedItems)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem(inputValue)
    }
  }

  const handleEdit = () => {
    setInputValue(items.join(', '))
    setIsEditing(true)
    setIsInputVisible(true)
  }

  const handleClear = () => {
    if (isEditing) {
      setItems([])
      setCompletedItems([])
      setInputValue('')
      setIsInputVisible(false)
      setIsEditing(false)
    } else {
      setIsInputVisible(false)
      setInputValue('')
      setIsEditing(false)
    }
  }

  return (
    <div className="todo">
      <p className="todo__title">Equipamento</p>

      <div className="todo__actions">
        {isInputVisible && (
          <>
          <div className="todo__input-container">
            <input
              type="text"
              className='todo__input-container__input'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              placeholder="Digite os itens separados por vírgula..."
            />
          </div>
            <button className="todo__button" onClick={() => handleAddItem(inputValue)}>
              {isEditing ? 'Salvar' : 'Adicionar'}
            </button>
            <button
              className="todo__button"
              onClick={handleClear}
            >
              Limpar
            </button>
          </>
        )}
      </div>

      {!isInputVisible &&(<div className="todo__list-container">
        <ul className="todo__list">
          {items.map((item, index) => (
            <li
              key={index}
              className={`todo__list-item ${completedItems[index] ? 'completed' : ''}`}
              onClick={() => toggleComplete(index)}
            >
              {item}{index < items.length - 1 ? ',' : ''}
            </li>
          ))}
        </ul>
      </div>)}
      {!isInputVisible && (
        <button
          className="todo__button"
          onClick={handleEdit}
        >
          {items.length === 0 ? 'Adicionar Item' : 'Editar'}
        </button>
      )}
    </div>
  )
}

export default ToDo