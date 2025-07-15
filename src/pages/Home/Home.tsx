// import Jokenpo from '../Jokenpo/Jokenpo';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Thiago B. S. Tavares</h1>
      <p>Muito Prazer!, me chamo Thiago, sou desenvolvedor Full-stack, com foco em Front-End.</p>
      <p>quando tenho um tempo livre atualizo meu portifolio com alguns projetos a parte que eu faço</p>
      <button onClick={() => navigate('/ficha')}>
        Projeto Ficha
      </button>
      {/* <Jokenpo /> */}
    </div>
  );
};

export default Home;
