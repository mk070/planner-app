import React, { useState, useEffect } from 'react';

export default function GameWidget() {
  const [numbers, setNumbers] = useState([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    setNumbers(shuffleArray(numbers));
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleNumberClick = (index) => {
    if (solved) return;

    const emptyIndex = numbers.indexOf(9);
    const targetIndex = index;

    if (isAdjacent(targetIndex, emptyIndex)) {
      const newNumbers = [...numbers];
      [newNumbers[targetIndex], newNumbers[emptyIndex]] = [newNumbers[emptyIndex], newNumbers[targetIndex]];
      setNumbers(newNumbers);

      const isSolved = newNumbers.every((number, index) => number === index + 1);
      if (isSolved) {
        setSolved(true);
      }
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  const resetGame = () => {
    setSolved(false);
    generateNumbers();
  };

  const puzzleBoardStyle = {
    width: '300px',
    height: '300px',
    border: '2px solid #ccc',
    display: 'flex',
    flexWrap: 'wrap',
  };

  const puzzleNumberStyle = {
    width: 'calc(33.33% - 4px)',
    height: 'calc(33.33% - 4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #ccc',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  };

  const emptyNumberStyle = {
    backgroundColor: '#fff',
    cursor: 'default',
  };

  const clickableNumberStyle = {
    backgroundColor: '#efaeae',
  };

  const solvedTextStyle = {
    marginTop: '20px',
    fontWeight: 'bold',
  };

  const resetButtonStyle = {
    marginTop: '20px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={puzzleBoardStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          {numbers.map((number, index) => (
            <div
              key={index}
              style={{
                ...puzzleNumberStyle,
                ...(number === 9 ? emptyNumberStyle : clickableNumberStyle),
              }}
              onClick={() => handleNumberClick(index)}
            >
              {number !== 9 && number}
            </div>
          ))}
        </div>
      </div>
      {solved && <div style={solvedTextStyle}>Congratulations! Puzzle solved!</div>}
      <button style={resetButtonStyle} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
