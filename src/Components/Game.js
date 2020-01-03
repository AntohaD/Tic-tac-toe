import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../helpers/calculateWinner';

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ]);

  function handleClick(i) {
    setHistory(history.slice(0, stepNumber + 1));
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(history.concat({
      squares: squares
    }),);
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
  }

  function jumpTo(step) {
    setHistory([{squares: Array(9).fill(null)}]);
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  let text;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    if (move < 1) {
      return (
        <button 
          key={step}
          className="game-btn"
          onClick={() => {jumpTo(move)}}
        >
          Start the Game
        </button>
      )
    };
  });

  let status;
  if (winner) {
    status = winner;
    text = 'winner is ';
  } else {
    status = xIsNext ? 'X' : 'O';
    text = 'Next Player: ';
  }

  return (
    <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board 
              onClick={(i) => handleClick(i)}
              squares={current.squares}
            />
          </div>
          <div className="game-info">
            <div className="game-info-title">
              {text} <span className="game-span">{status}</span>
            </div>
            <div>{moves}</div>
          </div>
        </div>
        <a href="https://github.com/AntohaD/Tic-tac-toe" className="gitHub">This progect on GitHub</a>
      </div>
  )
}

export default Game;