import { useState } from 'react';
import './style.scss';
import ToDo from '../../components/ToDo/ToDo';
import Atributos from '../../components/Atributos/Atributos';
import Recurso from '../../components/Recurso/Recurso';
import Encontro from '../../components/Encontro/Encontro';

const Ficha = () => {
  const [showEncontro, setShowEncontro] = useState(false);

  const handleReset = () => {
    window.sessionStorage.clear();
    window.location.reload();
  };

  const toggleEncontro = () => {
    setShowEncontro(prev => !prev);
  };

  return (
    <div className="ficha-page">
      <div className="ficha-container">
        <div className="ficha-header">
          <h1>Ficha de Aventura</h1>
          <div className="ficha-header__buttons">
            <button
              className="ficha-header__button ficha-header__button--reset"
              onClick={handleReset}
            >
              Resetar Ficha
            </button>
            <button
              className="ficha-header__button ficha-header__button--encontro"
              onClick={toggleEncontro}
            >
              Encontro
            </button>
          </div>
        </div>

        <div className="atributos-section">
          <Atributos nome="Habilidade" />
          <Atributos nome="Energia" />
          <Atributos nome="Sorte" />
        </div>
        <ToDo />
        <div className="recursos">
          <Recurso nome="Ouro" />
          <Recurso nome="Provisões" />
        </div>
      </div>
      {showEncontro && (
        <div className="encontro-container">
          <Encontro />
        </div>
      )}
    </div>
  );
};

export default Ficha;
