import { useState, useEffect } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './style.scss';

const Atributos = ({ nome }: { nome: string }) => {
  const [maxValue, setMaxValue] = useSessionStorage<number>(`${nome}_max`, 0);
  const [currentValue, setCurrentValue] = useSessionStorage<number>(`${nome}_current`, 0);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [tempMaxValue, setTempMaxValue] = useState<string>('0');

  useEffect(() => {
    if (maxValue > 0) {
      setIsEditing(false);
    }
  }, [maxValue]);

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMaxValue(e.target.value);
  };

  const handleMaxValueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(tempMaxValue) || 0;
    setMaxValue(value);
    setCurrentValue(value);
    setIsEditing(false);
  };

  const incrementValue = () => {
    if (currentValue < maxValue) {
      setCurrentValue(prev => prev + 1);
    }
  };

  const decrementValue = () => {
    if (currentValue > 0) {
      setCurrentValue(prev => prev - 1);
    }
  };

  const handleEdit = () => {
    setTempMaxValue(maxValue.toString());
    setIsEditing(true);
  };

  return (
    <div className="atributo">
      <div className="atributo__header">
        <p className="atributo__titulo">{nome}</p>
        {!isEditing && (
          <button
            className="atributo__botao atributo__botao--editar"
            onClick={handleEdit}
          >
            E
          </button>
        )}
      </div>
      {isEditing ? (
        <form className="atributo__form" onSubmit={handleMaxValueSubmit}>
          <input
            className="atributo__input"
            type="number"
            min="0"
            value={tempMaxValue}
            onChange={handleMaxValueChange}
            placeholder="0"
          />
          <button className="atributo__botao atributo__botao--confirmar" type="submit">
            Confirmar
          </button>
        </form>
      ) : (
        <div className="atributo__controles">
          <span className="atributo__valor">{currentValue}/{maxValue}</span>
          <div className="atributo__botoes">
            <button
              className="atributo__botao atributo__botao--modificador"
              onClick={incrementValue}
            >
              +
            </button>
            <button
              className="atributo__botao atributo__botao--modificador"
              onClick={decrementValue}
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Atributos;