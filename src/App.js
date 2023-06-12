import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [timer, setTimer] = useState(30);

  const characters = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    if (timer > 0 && isNameEntered) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    } else if (timer === 0 && isNameEntered) {
      calculateTotalAccuracy();
    }
  }, [timer, isNameEntered]);

  useEffect(() => {
    setCurrentCharacterIndex(getRandomCharacterIndex());
    setUserInput('');
  }, [currentCharacterIndex]);

  useEffect(() => {
    calculateAccuracy();
  }, [userInput]);

  const calculateAccuracy = () => {
    const currentCharacter = characters[currentCharacterIndex];
    if (userInput === currentCharacter) {
      const newAccuracy = ((currentCharacterIndex + 1) / characters.length) * 100;
      setAccuracy(newAccuracy.toFixed(2));
    } else {
      setAccuracy(0);
    }
  };

  const calculateTotalAccuracy = () => {
    const totalAccuracy = ((characters.length - 1) / characters.length) * 100;
    setTotalAccuracy(totalAccuracy.toFixed(2));
  };

  const getRandomCharacterIndex = () => {
    return Math.floor(Math.random() * characters.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNextCharacter();
    }
  };

  const handleNextCharacter = () => {
    setUserInput('');
    if (currentCharacterIndex === characters.length - 1) {
      setCurrentCharacterIndex(0);
    } else {
      setCurrentCharacterIndex(getRandomCharacterIndex());
    }
  };

  const handleStartGame = () => {
    if (name) {
      setIsNameEntered(true);
    }
  };

  return (
    <div className='App'>
       
        <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} disabled={isNameEntered} />
      
      <div className="name-container">{name && <span className="name">Hello, {name}</span>}</div>
      {!isNameEntered && <button onClick={handleStartGame}>Start Game</button>}
      <h1>Type the character shown:</h1>
      <h2>{characters[currentCharacterIndex]}</h2>
      <input className='box' type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyDown} disabled={!isNameEntered} />
      {isNameEntered && (
        <>
          <p>Time Remaining: {timer} seconds</p>
          <p>Total Accuracy: {totalAccuracy}%</p>
        </>
      )}
      
      
      <div className="timer-container"></div>
     
    </div>
  );
}



export default App;
