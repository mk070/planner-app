import React, { useState, useRef } from 'react';

export default function StopwatchWidget() {
    const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 24, marginBottom: 10 }}>Stopwatch</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          Time: {formatTime(time)}
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: 15,
              cursor: "pointer",
              marginRight: 10,
            }}
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: 15,
              cursor: "pointer",
              marginRight: 10,
            }}
            onClick={stopTimer}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: 15,
              cursor: "pointer",
            }}
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );

};


