import React, { useState } from "react";
import "./game.css";

const choices: string[] = ["Kéo", "Búa", "Bao"];

type ResultType = "Hòa" | "Người chơi thắng" | "Máy thắng";

interface GameHistory {
  playerChoice: string;
  computerChoice: string;
  result: ResultType;
}

const determineWinner = (playerChoice: string, computerChoice: string): ResultType => {
  if (playerChoice === computerChoice) return "Hòa";
  if (
    (playerChoice === "Kéo" && computerChoice === "Bao") ||
    (playerChoice === "Búa" && computerChoice === "Kéo") ||
    (playerChoice === "Bao" && computerChoice === "Búa")
  ) {
    return "Người chơi thắng";
  }
  return "Máy thắng";
};


const IndexPage: React.FC = () => {
  const [history, setHistory] = useState<GameHistory[]>([]);

  const playGame = (playerChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, computerChoice);
    setHistory([...history, { playerChoice, computerChoice, result }]);
  };

  return (
    <div className="game-container">
      <h2>Chơi Kéo Búa Bao</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => playGame(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div className="history-container">
        <h3>Lịch sử trận đấu</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              Bạn chọn: <p style={{color : 'red', display: 'inline'}}>{item.playerChoice}</p>, Máy chọn: <p style={{color : 'red',display: 'inline'}}>{item.computerChoice}</p> → Kết quả: <p style={{color : 'red', display: 'inline'}}>{item.result}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;