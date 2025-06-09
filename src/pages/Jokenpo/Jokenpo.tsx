import { useState } from 'react';

const JokenpoLagartoSpock = () => {
  const jokenpo = ['pedra', 'papel', 'tesoura', 'lagarto', 'spock'];
  const [playerChoiceIndex, setPlayerChoiceIndex] = useState<number | null>(
    null
  );
  const [computerChoiceIndex, setComputerChoiceIndex] = useState<number | null>(
    null
  );
  const [confirm, setConfirm] = useState(false);

  // Lógica de vitória: [quem vence] vence [quem perde]
  const winningConditions: Record<number, number[]> = {
    0: [2, 3], // Pedra vence Tesoura, Lagarto
    1: [0, 4], // Papel vence Pedra, Spock
    2: [1, 3], // Tesoura vence Papel, Lagarto
    3: [4, 1], // Lagarto vence Spock, Papel
    4: [2, 0], // Spock vence Tesoura, Pedra
  };

  const randomChoice = () => {
    return Math.floor(Math.random() * jokenpo.length);
  };

  const handleClick = (index: number) => {
    setPlayerChoiceIndex(index);
    setComputerChoiceIndex(randomChoice());
    setConfirm(true);
  };

  const result = () => {
    if (playerChoiceIndex === computerChoiceIndex) {
      return 'Empate';
    } else if (
      playerChoiceIndex !== null &&
      computerChoiceIndex !== null &&
      winningConditions[playerChoiceIndex]?.includes(computerChoiceIndex)
    ) {
      return 'Você venceu';
    } else {
      return 'Você perdeu';
    }
  };

  const handleReplay = () => {
    setPlayerChoiceIndex(null);
    setComputerChoiceIndex(null);
  };

  return (
    <div>
      <h1>Jokenpo: Pedra, Papel, Tesoura, Lagarto, Spock</h1>
      {jokenpo.map((item, index) => (
        <button onClick={() => handleClick(index)} key={index}>
          {item}
        </button>
      ))}
      {confirm &&
        computerChoiceIndex !== null &&
        playerChoiceIndex !== null && (
          <div>
            <p>Você escolheu {jokenpo[playerChoiceIndex]}</p>
              <div>
                <p>O Computador Escolheu: {jokenpo[computerChoiceIndex]}</p>
                <p>
                  <b>{result()}</b>
                </p>
                <button onClick={handleReplay}>Rejogar?</button>
              </div>
          </div>
        )}
    </div>
  );
};

export default JokenpoLagartoSpock;
